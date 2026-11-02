import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
  inject
} from '@angular/core';

interface Particle {
  /** Angle around the vortex centre, radians. */
  a: number;
  /** Distance from centre, in viewport-normalised units. */
  r: number;
  /** Angular velocity. */
  va: number;
  /** Inward drift per frame. */
  vr: number;
  /** 0..1 position along the brand gradient. */
  hue: number;
  size: number;
  alpha: number;
}

/**
 * Animated vortex background.
 *
 * Particles orbit a centre point, spiralling inward with angular velocity
 * rising as the radius falls — the same way a real vortex behaves — and are
 * recycled to the rim when they reach the core. Drawn as short motion-blur
 * trails on a composited canvas.
 *
 * Decorative only: `aria-hidden`, not focusable, and it gets out of the way
 * when it should —
 *   • `prefers-reduced-motion`  → one static frame, no loop
 *   • scrolled out of view      → loop suspended
 *   • tab hidden                → loop suspended
 *   • narrow viewport           → particle count scaled down
 */
@Component({
  selector: 'app-vortex',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<canvas #cv aria-hidden="true"></canvas>`,
  styles: [
    `
      :host {
        position: absolute;
        inset: 0;
        display: block;
        overflow: hidden;
        pointer-events: none;
        /* Fades out toward the edges so it never meets a hard border. */
        -webkit-mask-image: radial-gradient(
          ellipse 80% 70% at 50% 42%,
          #000 25%,
          transparent 80%
        );
        mask-image: radial-gradient(
          ellipse 80% 70% at 50% 42%,
          #000 25%,
          transparent 80%
        );
      }

      canvas {
        width: 100%;
        height: 100%;
      }
    `
  ]
})
export class VortexComponent implements AfterViewInit, OnDestroy {
  /** Particle count at desktop width. Scaled down on smaller screens. */
  @Input() density = 420;

  /** Overall opacity of the layer. */
  @Input() intensity = 0.75;

  /** Vortex centre, as a fraction of the canvas box. */
  @Input() cx = 0.5;
  @Input() cy = 0.42;

  @ViewChild('cv', { static: true })
  private canvasRef!: ElementRef<HTMLCanvasElement>;

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  private ctx: CanvasRenderingContext2D | null = null;
  private particles: Particle[] = [];
  private frame = 0;
  private running = false;
  private w = 0;
  private h = 0;
  private dpr = 1;

  private resizeObserver: ResizeObserver | null = null;
  private intersectionObserver: IntersectionObserver | null = null;
  private onVisibilityChange = () => this.sync();
  private inView = true;
  private reduced = false;

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d', { alpha: true });
    if (!this.ctx) return;

    this.reduced =
      typeof matchMedia !== 'undefined' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.measure();
    this.seed();

    if (this.reduced) {
      // One frame, so the area still reads as designed rather than empty.
      this.draw(true);
      return;
    }

    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.measure();
        this.seed();
      });
      this.resizeObserver.observe(this.host.nativeElement);
    }

    if (typeof IntersectionObserver !== 'undefined') {
      this.intersectionObserver = new IntersectionObserver(
        (entries) => {
          this.inView = entries.some((e) => e.isIntersecting);
          this.sync();
        },
        { threshold: 0 }
      );
      this.intersectionObserver.observe(this.host.nativeElement);
    }

    document.addEventListener('visibilitychange', this.onVisibilityChange);
    this.sync();
  }

  ngOnDestroy(): void {
    this.stop();
    this.resizeObserver?.disconnect();
    this.intersectionObserver?.disconnect();
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
  }

  // --- Loop control --------------------------------------------------------

  /** Run only while visible on screen and in a foreground tab. */
  private sync(): void {
    const shouldRun = this.inView && !document.hidden && !this.reduced;
    if (shouldRun) this.start();
    else this.stop();
  }

  private start(): void {
    if (this.running) return;
    this.running = true;
    const tick = () => {
      if (!this.running) return;
      this.draw(false);
      this.frame = requestAnimationFrame(tick);
    };
    this.frame = requestAnimationFrame(tick);
  }

  private stop(): void {
    this.running = false;
    cancelAnimationFrame(this.frame);
  }

  // --- Setup ---------------------------------------------------------------

  private measure(): void {
    const canvas = this.canvasRef.nativeElement;
    const rect = this.host.nativeElement.getBoundingClientRect();

    // Cap DPR at 2 — beyond that the pixel cost buys nothing visible here.
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = Math.max(rect.width, 1);
    this.h = Math.max(rect.height, 1);

    canvas.width = Math.floor(this.w * this.dpr);
    canvas.height = Math.floor(this.h * this.dpr);
    this.ctx?.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  private seed(): void {
    const count = this.scaledDensity();
    const maxR = Math.hypot(this.w, this.h) * 0.55;

    this.particles = Array.from({ length: count }, () => {
      // sqrt keeps the distribution even by area rather than clumping at the
      // centre, which is what a uniform random radius would do.
      const r = Math.sqrt(Math.random()) * maxR;
      return {
        a: Math.random() * Math.PI * 2,
        r,
        va: 0,
        vr: 0.12 + Math.random() * 0.38,
        hue: Math.random(),
        size: 0.5 + Math.random() * 1.3,
        alpha: 0.2 + Math.random() * 0.6
      };
    });
  }

  private scaledDensity(): number {
    if (this.w < 600) return Math.round(this.density * 0.4);
    if (this.w < 1000) return Math.round(this.density * 0.65);
    return this.density;
  }

  // --- Render --------------------------------------------------------------

  private draw(staticFrame: boolean): void {
    const ctx = this.ctx;
    if (!ctx) return;

    const centreX = this.w * this.cx;
    const centreY = this.h * this.cy;
    const maxR = Math.hypot(this.w, this.h) * 0.55;

    if (staticFrame) {
      ctx.clearRect(0, 0, this.w, this.h);
    } else {
      // Fade the previous frame instead of clearing it: that residue is the
      // motion trail, and it costs nothing.
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.14)';
      ctx.fillRect(0, 0, this.w, this.h);
      ctx.globalCompositeOperation = 'lighter';
    }

    for (const p of this.particles) {
      if (!staticFrame) {
        // Closer to the core, faster the sweep. The +60 floor stops the
        // innermost particles from spinning out of control.
        p.va = 2.2 / (p.r + 60);
        p.a += p.va;
        p.r -= p.vr;

        // Recycle to the rim once it reaches the core.
        if (p.r < 12) {
          p.r = maxR;
          p.a = Math.random() * Math.PI * 2;
          p.hue = Math.random();
        }
      }

      const x = centreX + Math.cos(p.a) * p.r;
      const y = centreY + Math.sin(p.a) * p.r * 0.62; // squashed = perspective

      // Fade out at the rim so particles arrive rather than appear.
      const edge = 1 - Math.min(p.r / maxR, 1);
      const alpha = p.alpha * this.intensity * (0.25 + edge * 0.75);
      if (alpha <= 0.01) continue;

      ctx.fillStyle = this.colourAt(p.hue, alpha);

      if (staticFrame) {
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Trail: a short segment along the direction of travel.
        const trail = Math.min(p.va * p.r * 1.6, 9);
        const tx = centreX + Math.cos(p.a - p.va * 3) * p.r;
        const ty = centreY + Math.sin(p.a - p.va * 3) * p.r * 0.62;

        ctx.strokeStyle = this.colourAt(p.hue, alpha);
        ctx.lineWidth = p.size;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.stroke();

        if (trail > 6) {
          ctx.beginPath();
          ctx.arc(x, y, p.size * 0.9, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    ctx.globalCompositeOperation = 'source-over';
  }

  /** Interpolates gold → violet, matching --grad-brand. */
  private colourAt(t: number, alpha: number): string {
    const gold = [240, 201, 106];
    const violet = [124, 92, 255];
    const r = Math.round(gold[0] + (violet[0] - gold[0]) * t);
    const g = Math.round(gold[1] + (violet[1] - gold[1]) * t);
    const b = Math.round(gold[2] + (violet[2] - gold[2]) * t);
    return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
  }
}

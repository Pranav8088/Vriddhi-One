import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of, timeout } from 'rxjs';

export interface ContactPayload {
  name: string;
  email: string;
  /** Optional — company or organisation. */
  company?: string;
  /** What they want help with; maps to the enquiry subject. */
  topic?: string;
  message: string;
}

export type ContactResult =
  | { ok: true }
  | { ok: false; reason: 'validation' | 'unconfigured' | 'network' | 'server' };

/**
 * Submits the contact form.
 *
 * Posts to `/api/contact`, which is implemented twice — once as a Vercel
 * function (`api/contact.js`) and once as a Netlify function
 * (`netlify/functions/contact.js`, routed by `netlify.toml`) — so the same
 * frontend path works on either host.
 *
 * Failures are mapped to a small set of reasons the form can explain to the
 * visitor, rather than surfacing raw HTTP status codes.
 */
@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = '/api/contact';

  send(payload: ContactPayload): Observable<ContactResult> {
    return this.http
      .post<{ success?: boolean; error?: string }>(this.endpoint, payload)
      .pipe(
        timeout(20_000),
        map((): ContactResult => ({ ok: true })),
        catchError((error: unknown) => of(this.classify(error)))
      );
  }

  private classify(error: unknown): ContactResult {
    if (!(error instanceof HttpErrorResponse)) {
      return { ok: false, reason: 'network' };
    }

    // Status 0 means the request never reached the server — offline, DNS,
    // CORS, or the function is not deployed at all.
    if (error.status === 0) return { ok: false, reason: 'network' };
    if (error.status === 400) return { ok: false, reason: 'validation' };

    // The function answers 500 with this when BREVO_API_KEY is missing, which
    // is a deployment problem rather than anything the visitor can fix.
    if (error.status === 500 && /not configured/i.test(error.error?.error ?? '')) {
      return { ok: false, reason: 'unconfigured' };
    }

    return { ok: false, reason: 'server' };
  }
}

/** Shared email shape check. Deliberately permissive — the server revalidates. */
export function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

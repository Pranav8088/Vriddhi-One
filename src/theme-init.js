/*
 * Applies the stored theme before first paint, so someone who has overridden
 * their OS setting never sees a flash of the wrong theme.
 *
 * Deliberately an external file, not an inline <script>: the site's CSP sets
 * script-src 'self', which blocks inline execution. Kept tiny and dependency
 * free so it costs one small blocking request in <head>.
 *
 * NOTE: served from the site root and covered by an immutable cache rule, so
 * if this file ever changes, bump the filename and the <script src> with it.
 */
(function () {
  try {
    var stored = localStorage.getItem('vo-theme');
    if (stored === 'light' || stored === 'dark') {
      document.documentElement.setAttribute('data-theme', stored);
    }
  } catch (e) {
    /* Private mode, blocked storage: fall through to the OS preference. */
  }
})();

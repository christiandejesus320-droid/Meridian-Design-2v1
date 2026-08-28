(() => {
  const video = document.querySelector('[data-video]');
  const voiceButton = document.querySelector('[data-voice]');
  const shareButton = document.querySelector('[data-share]');
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#main-nav');
  const header = document.querySelector('[data-header]');

  if (video) {
    video.defaultPlaybackRate = 0.72;
    video.playbackRate = 0.72;
    const match = window.location.hash.match(/meridian-video&t=(\d+)/);
    if (match) {
      video.addEventListener('loadedmetadata', () => { video.currentTime = Number(match[1]); }, { once: true });
    }
  }

  voiceButton?.addEventListener('click', () => {
    if (!video) return;
    video.muted = !video.muted;
    voiceButton.textContent = video.muted ? 'Activar voz' : 'Silenciar voz';
    voiceButton.setAttribute('aria-pressed', String(!video.muted));
    if (video.paused) video.play().catch(() => {});
  });

  shareButton?.addEventListener('click', async () => {
    const seconds = video ? Math.floor(video.currentTime) : 0;
    const url = new URL(window.location.href);
    url.hash = `meridian-video&t=${seconds}`;
    const label = seconds ? `Meridian · fragmento en ${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}` : 'Meridian · Universal Workspace';
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Meridian / Universal Workspace', text: label, url: url.href });
        shareButton.innerHTML = 'Compartido <span aria-hidden="true">✓</span>';
      } else {
        await navigator.clipboard.writeText(url.href);
        shareButton.innerHTML = 'Enlace copiado <span aria-hidden="true">✓</span>';
      }
    } catch {
      shareButton.innerHTML = 'Compartir fragmento <span aria-hidden="true">↗</span>';
    }
  });

  navToggle?.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!open));
    nav?.classList.toggle('is-open', !open);
    navToggle.textContent = open ? 'Menú' : 'Cerrar';
  });

  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav?.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
    if (navToggle) navToggle.textContent = 'Menú';
  }));

  const syncHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 32);
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });
})();

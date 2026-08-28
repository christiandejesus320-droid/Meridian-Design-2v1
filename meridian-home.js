(() => {
  const video = document.querySelector('[data-video]');
  const voiceButton = document.querySelector('[data-voice]');
  const shareButton = document.querySelector('[data-share]');
  const timeLabel = document.querySelector('[data-time]');
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#main-nav');
  const header = document.querySelector('[data-header]');
  const chatForm = document.querySelector('[data-chat-form]');
  const chatInput = document.querySelector('[data-chat-input]');
  const chatMessages = document.querySelector('[data-chat-messages]');
  const chatStatus = document.querySelector('[data-chat-status]');
  const activityList = document.querySelector('[data-activity-list]');
  const activitySummary = document.querySelector('[data-activity-summary]');
  const secureChatLink = document.querySelector('[data-secure-chat]');
  let conversationId = crypto.randomUUID();
  let assistantNode = null;
  let assistantText = '';

  const formatTime = (seconds) => {
    const safeSeconds = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
    return `${String(Math.floor(safeSeconds / 60)).padStart(2, '0')}:${String(safeSeconds % 60).padStart(2, '0')}`;
  };

  const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);

  const appendMessage = (role, content = '') => {
    chatMessages?.querySelector('.chat-empty')?.remove();
    const node = document.createElement('article');
    node.className = `chat-message ${role}`;
    node.innerHTML = `<span class="chat-message-label">${role === 'user' ? 'Tú' : 'Meridian'}</span><p></p>`;
    node.querySelector('p').textContent = content;
    chatMessages?.appendChild(node);
    chatMessages?.scrollTo({ top: chatMessages.scrollHeight, behavior: 'smooth' });
    return node;
  };

  const addActivity = (label, state = 'running') => {
    if (!activityList) return;
    const row = document.createElement('p');
    row.dataset.state = state;
    row.textContent = `${state === 'success' ? '✓ ' : state === 'error' ? '× ' : '• '}${label}`;
    activityList.appendChild(row);
    activitySummary && (activitySummary.textContent = label);
    const activity = document.querySelector('[data-chat-activity]');
    if (activity) activity.open = true;
  };

  const handleStreamEvent = (envelope) => {
    const event = envelope?.event;
    if (!event || typeof event.type !== 'string') return;
    if (event.type === 'token' && typeof event.content === 'string') {
      assistantText += event.content;
      if (assistantNode) assistantNode.querySelector('p').textContent = assistantText;
      chatMessages?.scrollTo({ top: chatMessages.scrollHeight, behavior: 'smooth' });
    } else if (event.type === 'status') {
      chatStatus && (chatStatus.textContent = event.message || 'Trabajando…');
      addActivity(event.message || 'Procesando contexto');
    } else if (event.type === 'tool_start') {
      addActivity(`Herramienta activa: ${event.tool || 'herramienta'}`);
    } else if (event.type === 'tool_result') {
      addActivity(`Herramienta finalizada: ${event.ok ? 'resultado disponible' : 'requiere revisión'}`, event.ok ? 'success' : 'error');
    } else if (event.type === 'agent_activity') {
      addActivity(`${event.name || 'Agente'}: ${event.statusText || 'actividad en curso'}`);
    } else if (event.type === 'error') {
      chatStatus && (chatStatus.textContent = event.message || 'No se pudo completar la solicitud');
      addActivity(event.message || 'Error del agente', 'error');
    } else if (event.type === 'done') {
      chatStatus && (chatStatus.textContent = 'Respuesta completa');
      addActivity('Respuesta completa', 'success');
    }
  };

  const consumeSse = async (response) => {
    const reader = response.body?.getReader();
    if (!reader) throw new Error('El navegador no expone streaming para esta sesión.');
    const decoder = new TextDecoder();
    let buffer = '';
    const drain = (flush = false) => {
      buffer = buffer.replace(/\r\n/g, '\n');
      let boundary = buffer.indexOf('\n\n');
      while (boundary >= 0) {
        const frame = buffer.slice(0, boundary);
        buffer = buffer.slice(boundary + 2);
        const data = frame.split('\n').filter((line) => line.startsWith('data:')).map((line) => line.slice(5).trimStart()).join('\n');
        if (data) { try { handleStreamEvent(JSON.parse(data)); } catch { addActivity('Se recibió un evento incompleto', 'error'); } }
        boundary = buffer.indexOf('\n\n');
      }
      if (flush && buffer.trim()) { try { handleStreamEvent(JSON.parse(buffer.replace(/^data:\s*/, ''))); } catch {} buffer = ''; }
    };
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      drain();
    }
    buffer += decoder.decode();
    drain(true);
  };

  if (video) {
    video.defaultPlaybackRate = 0.72;
    video.playbackRate = 0.72;
    video.addEventListener('timeupdate', () => {
      if (timeLabel) timeLabel.textContent = `${formatTime(video.currentTime)} / SLOW CINEMA`;
    });
    const match = window.location.hash.match(/meridian-video&t=(\d+)/);
    if (match) video.addEventListener('loadedmetadata', () => { video.currentTime = Number(match[1]); }, { once: true });
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
      if (navigator.share) { await navigator.share({ title: 'Meridian / Universal Workspace', text: label, url: url.href }); shareButton.innerHTML = 'Compartido <span aria-hidden="true">✓</span>'; }
      else { await navigator.clipboard.writeText(url.href); shareButton.innerHTML = 'Enlace copiado <span aria-hidden="true">✓</span>'; }
    } catch { shareButton.innerHTML = 'Compartir fragmento <span aria-hidden="true">↗</span>'; }
  });

  chatForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const message = chatInput?.value.trim();
    if (!message || !chatInput) return;
    chatInput.value = '';
    appendMessage('user', message);
    assistantText = '';
    assistantNode = appendMessage('assistant');
    chatStatus && (chatStatus.textContent = 'Conectando con Meridian…');
    addActivity('Conectando con la sesión del workspace');
    const submit = chatForm.querySelector('button');
    if (submit) submit.disabled = true;
    try {
      const response = await fetch('/api/chat/stream', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', 'Accept': 'text/event-stream', 'Idempotency-Key': crypto.randomUUID() },
        body: JSON.stringify({ message, conversationId, chatHistory: [] }),
      });
      if (response.status === 401 || response.status === 403 || response.status === 404 || response.status === 501) {
        throw new Error('El chat operativo se abre desde el workspace seguro de Meridian para conservar MCPs, skills y tu sesión.');
      }
      if (!response.ok) throw new Error('La conexión operativa de Meridian no está disponible en este origen.');
      await consumeSse(response);
    } catch (error) {
      const messageText = error instanceof Error ? error.message : 'No se pudo abrir el chat.';
      if (assistantNode) assistantNode.querySelector('p').textContent = messageText;
      chatStatus && (chatStatus.textContent = 'Sesión segura requerida');
      addActivity('Abre la conversación segura para continuar', 'error');
      if (secureChatLink) secureChatLink.focus();
    } finally {
      if (submit) submit.disabled = false;
    }
  });

  navToggle?.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!open));
    nav?.classList.toggle('is-open', !open);
    navToggle.textContent = open ? 'Menú' : 'Cerrar';
  });
  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { nav?.classList.remove('is-open'); navToggle?.setAttribute('aria-expanded', 'false'); if (navToggle) navToggle.textContent = 'Menú'; }));
  const syncHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 32);
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });
})();

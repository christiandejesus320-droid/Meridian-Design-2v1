(() => {
  const endpoint = "https://ywhufiiecrgtosmfsyug.supabase.co/functions/v1/meridian-chat";
  const key = "meridian-public-conversation-v1";
  const id = () => {
    try {
      let value = localStorage.getItem(key);
      if (!value) { value = crypto?.randomUUID?.() || `meridian-${Date.now()}`; localStorage.setItem(key, value); }
      return value;
    } catch { return `meridian-${Date.now()}`; }
  };

  const footer = `
    <div class="meridian-footer-shell"><div class="meridian-footer-intro">
      <a class="system-logo meridian-footer-brand" href="https://meridian-completo.vercel.app/" target="_blank" rel="noopener"><i></i>MERIDIAN</a>
      <p>El workspace de productividad e IA para individuos y equipos que necesitan pensar y ejecutar m\u00e1s r\u00e1pido.</p>
      <a class="meridian-footer-cta" href="https://meridian-completo.vercel.app/" target="_blank" rel="noopener">Abrir Meridian App <span>\u2197</span></a>
    </div><div class="meridian-footer-grid">
      <div><strong>Producto</strong><a href="https://meridian-completo.vercel.app/#" target="_blank" rel="noopener">Tareas y proyectos</a><a href="https://meridian-completo.vercel.app/#" target="_blank" rel="noopener">Notas y documentos</a><a href="https://meridian-completo.vercel.app/#" target="_blank" rel="noopener">Calendario</a><a href="https://meridian-completo.vercel.app/#" target="_blank" rel="noopener">Copiloto de IA</a><a href="https://meridian-completo.vercel.app/#" target="_blank" rel="noopener">CRM</a></div>
      <div><strong>Empresa</strong><a href="https://meridian-completo.vercel.app/#" target="_blank" rel="noopener">Sobre Meridian</a><a href="https://meridian-completo.vercel.app/#" target="_blank" rel="noopener">Clientes</a><a href="https://meridian-completo.vercel.app/#" target="_blank" rel="noopener">Carreras</a><a href="https://meridian-completo.vercel.app/#" target="_blank" rel="noopener">Prensa</a><a href="contacto.html#formulario">Contacto</a></div>
      <div><strong>Recursos</strong><a href="index.html#chat">Centro de ayuda con IA</a><a href="index.html#chat">Gu\u00edas y plantillas</a><a href="ecosystem.html">Novedades y Cosmos</a><a href="https://meridian-completo.vercel.app/#" target="_blank" rel="noopener">API para desarrolladores</a><a href="novaxco.html">Tienda NOVAXCO</a></div>
      <div><strong>Legal</strong><a href="terminos.html">T\u00e9rminos de Servicio</a><a href="privacidad.html">Pol\u00edtica de Privacidad</a><a href="contacto.html#formulario">Solicitar soporte</a><span class="meridian-footer-note">Producto en desarrollo: si ves un error, cu\u00e9ntanos para que lo revisemos.</span></div>
    </div></div><div class="meridian-footer-bottom"><span>MERIDIAN \u00a9 2026 \u00b7 Santo Domingo</span><span>Dise\u00f1o \u00b7 IA \u00b7 Marketing \u00b7 3D</span><a href="#inicio">Volver arriba \u2191</a></div>`;

  document.querySelectorAll(".system-footer, .footer").forEach((element) => { element.classList.add("meridian-footer"); element.innerHTML = footer; });
  const nav = document.getElementById("systemLinks");
  if (nav && !nav.querySelector('a[href="novaxco.html"]')) { const link = document.createElement("a"); link.href = "novaxco.html"; link.textContent = "NOVAXCO Shop"; nav.insertBefore(link, nav.querySelector(".system-nav-cta")); }

  const form = document.querySelector("form[data-meridian-contact]");
  const status = document.getElementById("formStatus");
  const show = (message, state = "success") => { if (!status) return; status.hidden = false; status.dataset.state = state; status.textContent = message; };
  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const button = form.querySelector("button[type=submit]");
    if (button) button.disabled = true;
    show("Enviando tu solicitud al sistema Meridian\u2026");
    try {
      const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "contact", conversationId: id(), contact: { name: data.get("nombre"), email: data.get("email"), plan: data.get("plan"), link: data.get("enlace"), message: data.get("mensaje"), page: location.href } }) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "No se pudo enviar la solicitud.");
      form.reset(); show(result.message || "Solicitud recibida. Nuestro equipo la revisar\u00e1 y te responder\u00e1 pronto.");
    } catch (error) { show(error instanceof Error ? error.message : "No se pudo enviar la solicitud. Int\u00e9ntalo de nuevo.", "error"); }
    finally { if (button) button.disabled = false; }
  });
})();


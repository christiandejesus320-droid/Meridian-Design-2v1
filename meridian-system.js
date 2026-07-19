(() => {
  const pageMenuButton = document.querySelector(".system-menu-toggle");
  const pageLinks = document.getElementById("systemLinks");

  const setPageMenu = (open) => {
    if (!pageMenuButton || !pageLinks) return;
    pageMenuButton.setAttribute("aria-expanded", String(open));
    pageLinks.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
  };

  pageMenuButton?.addEventListener("click", () => setPageMenu(!pageLinks.classList.contains("open")));
  pageLinks?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setPageMenu(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setPageMenu(false);
  });

  const observer = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      }, { threshold: 0.12 })
    : null;

  document.querySelectorAll(".reveal-system").forEach((element) => {
    if (observer) observer.observe(element);
    else element.classList.add("is-visible");
  });

  const planSelect = document.getElementById("plan");
  const requestedPlan = new URLSearchParams(window.location.search).get("plan");
  if (planSelect && requestedPlan) {
    const matchingOption = [...planSelect.options].find((option) => option.value === requestedPlan);
    if (matchingOption) planSelect.value = requestedPlan;
  }

  const sentNotice = document.getElementById("formStatus");
  if (sentNotice && new URLSearchParams(window.location.search).get("enviado") === "1") sentNotice.hidden = false;

  const contactForm = document.querySelector("form[data-meridian-contact]");
  contactForm?.addEventListener("submit", (event) => {
    if (!window.location.hostname.endsWith("github.io") && window.location.protocol !== "file:") return;
    event.preventDefault();
    const data = new FormData(contactForm);
    const subject = encodeURIComponent(`Meridian · ${data.get("plan") || "Nuevo proyecto"}`);
    const body = encodeURIComponent([
      `Nombre: ${data.get("nombre") || ""}`,
      `Email: ${data.get("email") || ""}`,
      `Plan: ${data.get("plan") || ""}`,
      `Enlace: ${data.get("enlace") || ""}`,
      "",
      String(data.get("mensaje") || ""),
    ].join("\n"));
    window.location.href = `mailto:christiandejesus320@gmail.com?subject=${subject}&body=${body}`;
  });
})();


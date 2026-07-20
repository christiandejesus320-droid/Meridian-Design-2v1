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
})();

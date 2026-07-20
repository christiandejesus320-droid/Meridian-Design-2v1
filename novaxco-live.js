(() => {
  const SHOP_ORIGIN = "https://novabomb.store";
  const links = document.getElementById("links");
  const menu = document.getElementById("menuToggle");
  const grid = document.getElementById("productGrid");
  const search = document.getElementById("search");
  const filters = [...document.querySelectorAll(".filter")];
  const status = document.getElementById("catalogStatus");
  const cartBar = document.getElementById("cartBar");
  const cartCount = document.getElementById("cartCount");
  const cartTotal = document.getElementById("cartTotal");
  const clearCartButton = document.getElementById("clearCart");
  const checkoutButton = document.getElementById("checkoutCart");
  const CART_KEY = "novaxco-meridian-cart-v1";

  let activeFilter = "all";
  let products = [];
  let cart = loadCart();

  const escapeHTML = (value = "") => String(value).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character]);

  const money = (amount, currency = "USD") => new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(Number(amount || 0));

  const setMenu = (open) => {
    links.classList.toggle("open", open);
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  };

  function loadCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    renderCart();
  }

  function renderCart() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
    cartBar.hidden = count === 0;
    cartCount.textContent = String(count);
    cartTotal.textContent = money(total);
  }

  function fallbackProducts() {
    return (window.NOVAXCO_PRODUCTS || []).map((product) => ({
      ...product,
      id: product.url,
      handle: product.url.split("/").filter(Boolean).pop(),
      collections: [],
      variants: [],
      currency: "USD",
    }));
  }

  async function fetchWithTimeout(url, timeout = 12000) {
    const controller = typeof AbortController === "function" ? new AbortController() : null;
    const timer = setTimeout(() => controller?.abort(), timeout);
    try {
      return await fetch(url, {
        cache: "no-store",
        signal: controller?.signal,
        headers: { Accept: "application/json" },
      });
    } finally {
      clearTimeout(timer);
    }
  }

  function visibleProducts() {
    const query = search.value.toLowerCase().trim();
    return products.filter((product) => {
      const categoryMatch = activeFilter === "all" || product.category === activeFilter;
      const haystack = [
        product.title,
        product.description,
        product.search,
        ...(product.collections || []),
      ].join(" ").toLowerCase();
      return categoryMatch && (!query || haystack.includes(query));
    });
  }

  function productCard(product, index) {
    const variants = (product.variants || []).filter((variant) => variant.available !== false);
    const options = variants.map((variant) => `
      <option value="${escapeHTML(variant.id)}" data-price="${escapeHTML(variant.price)}">
        ${escapeHTML(variant.title)} · ${escapeHTML(money(variant.price, product.currency))}
      </option>`).join("");
    const action = variants.length
      ? `<select class="variant-select" aria-label="Elegir variante de ${escapeHTML(product.title)}">${options}</select>
         <button class="pill dark add-cart" type="button" data-product-id="${escapeHTML(product.id)}">Agregar al carrito</button>`
      : `<a class="pill dark" href="${escapeHTML(product.url)}" target="_blank" rel="noopener">Comprar en NOVAXCO →</a>`;

    return `<article class="card" data-category="${escapeHTML(product.category)}">
      <a class="card-media" href="${escapeHTML(product.url)}" target="_blank" rel="noopener">
        <img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.alt || product.title)}" loading="${index ? "lazy" : "eager"}" decoding="async">
      </a>
      <div class="card-body">
        <div class="collection-tags">${(product.collections || []).map((name) => `<span>${escapeHTML(name)}</span>`).join("")}</div>
        <h3>${escapeHTML(product.title)}</h3>
        <p>${escapeHTML(product.description || "Pieza oficial NOVAXCO disponible en Shopify.")}</p>
        <span class="price">Desde ${escapeHTML(money(product.price, product.currency))}</span>
        ${action}
        <a class="detail-link" href="${escapeHTML(product.url)}" target="_blank" rel="noopener">Ver tallas y detalles ↗</a>
      </div>
    </article>`;
  }

  function renderProducts() {
    const visible = visibleProducts();
    grid.innerHTML = visible.length
      ? visible.map(productCard).join("")
      : '<div class="empty-state"><b>No encontramos piezas con esa búsqueda.</b><span>Prueba con hoodie, set, Gothic o Streetwear Premium.</span></div>';
  }

  function addToCart(productId, select) {
    const product = products.find((item) => String(item.id) === String(productId));
    const variant = product?.variants?.find((item) => String(item.id) === select.value);
    if (!product || !variant) return;
    const existing = cart.find((item) => String(item.variantId) === String(variant.id));
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        variantId: String(variant.id),
        quantity: 1,
        price: Number(variant.price),
        title: product.title,
        variantTitle: variant.title,
      });
    }
    saveCart();
    cartBar.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  async function loadProducts() {
    products = fallbackProducts();
    renderProducts();
    status.innerHTML = products.length
      ? `<span class="live-dot"></span> Catálogo listo · conectando precios con Shopify…`
      : "Conectando con el catálogo oficial de Shopify…";
    try {
      const response = await fetchWithTimeout(`/api/shopify-products?t=${Date.now()}`);
      if (!response.ok) throw new Error(`Shopify respondió ${response.status}`);
      const payload = await response.json();
      if (!Array.isArray(payload.products) || !payload.products.length) throw new Error("Catálogo vacío");
      products = payload.products;
      status.innerHTML = `<span class="live-dot"></span> Catálogo conectado con Shopify · ${escapeHTML(payload.updatedLabel || "actualizado ahora")}`;
      renderProducts();
    } catch (error) {
      console.warn("No se pudo actualizar Shopify:", error);
      products = fallbackProducts();
      renderProducts();
      status.textContent = products.length
        ? "Catálogo disponible. Las fichas oficiales mantienen precios y disponibilidad actuales."
        : "No pudimos cargar el catálogo. Abre la tienda oficial para continuar.";
    }
  }

  menu.addEventListener("click", () => setMenu(!links.classList.contains("open")));
  document.querySelectorAll(".links a").forEach((anchor) => anchor.addEventListener("click", () => setMenu(false)));
  filters.forEach((button) => button.addEventListener("click", () => {
    filters.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    renderProducts();
  }));
  search.addEventListener("input", renderProducts);
  grid.addEventListener("click", (event) => {
    const button = event.target.closest(".add-cart");
    if (!button) return;
    addToCart(button.dataset.productId, button.previousElementSibling);
  });
  clearCartButton.addEventListener("click", () => {
    cart = [];
    saveCart();
  });
  checkoutButton.addEventListener("click", () => {
    if (!cart.length) return;
    const lines = cart.map((item) => `${encodeURIComponent(item.variantId)}:${item.quantity}`).join(",");
    window.location.assign(`${SHOP_ORIGIN}/cart/${lines}`);
  });

  renderCart();
  loadProducts();
})();

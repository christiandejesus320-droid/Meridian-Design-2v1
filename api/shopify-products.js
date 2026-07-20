const SHOP_ORIGIN = "https://novabomb.store";
const COLLECTIONS = [
  { handle: "gothic-punk", title: "Gothic & Punk" },
  { handle: "streetwear-premium-nuevo-estandar", title: "Streetwear Premium" },
  { handle: "novaxco-drops", title: "NOVAXCO Drops" },
];

async function fetchShopify(path) {
  const response = await fetch(`${SHOP_ORIGIN}${path}`, {
    headers: {
      Accept: "application/json",
      "User-Agent": "Meridian-Design-Catalog/1.0",
    },
  });
  if (!response.ok) throw new Error(`Shopify ${response.status}: ${path}`);
  return response.json();
}

function plainText(html = "") {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function categoryFor(product) {
  const text = [product.title, product.product_type, ...(product.tags || [])].join(" ").toLowerCase();
  return /\b(set|conjunto|pants|jogger)\b/.test(text) ? "set" : "hoodie";
}

module.exports = async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed" });
  }

  try {
    const [catalog, ...collectionResults] = await Promise.all([
      fetchShopify("/products.json?limit=250"),
      ...COLLECTIONS.map((collection) => fetchShopify(`/collections/${collection.handle}/products.json?limit=250`).catch(() => ({ products: [] }))),
    ]);

    const collectionsByProduct = new Map();
    collectionResults.forEach((result, index) => {
      (result.products || []).forEach((product) => {
        const key = String(product.id);
        const current = collectionsByProduct.get(key) || [];
        current.push(COLLECTIONS[index].title);
        collectionsByProduct.set(key, current);
      });
    });

    const products = (catalog.products || []).map((product) => {
      const variants = (product.variants || []).map((variant) => ({
        id: String(variant.id),
        title: variant.title || "Única",
        price: Number(variant.price || 0),
        available: variant.available !== false,
      }));
      const availableVariants = variants.filter((variant) => variant.available);
      const pricedVariants = availableVariants.length ? availableVariants : variants;
      const price = pricedVariants.length ? Math.min(...pricedVariants.map((variant) => variant.price)) : 0;
      const collections = collectionsByProduct.get(String(product.id)) || [];
      const description = plainText(product.body_html).slice(0, 180);
      const image = product.image?.src || product.images?.[0]?.src || "";
      return {
        id: String(product.id),
        handle: product.handle,
        category: categoryFor(product),
        title: product.title,
        description,
        search: [product.title, product.product_type, ...(product.tags || []), ...collections].join(" ").toLowerCase(),
        price,
        currency: "USD",
        url: `${SHOP_ORIGIN}/products/${product.handle}`,
        image,
        alt: product.title,
        collections,
        variants,
      };
    }).filter((product) => product.image && product.variants.length);

    response.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    response.setHeader("Content-Type", "application/json; charset=utf-8");
    return response.status(200).json({
      shop: "NOVAXCO",
      updatedAt: new Date().toISOString(),
      updatedLabel: "actualizado en tiempo real",
      products,
    });
  } catch (error) {
    console.error("Shopify catalog error", error);
    return response.status(502).json({ error: "No se pudo conectar con Shopify" });
  }
};

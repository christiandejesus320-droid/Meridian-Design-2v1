const GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models";
const DEFAULT_MODEL = "gemini-3.5-flash";
const MAX_MESSAGE_LENGTH = 6_000;
const MAX_HISTORY_ITEMS = 10;
const MAX_HISTORY_CHARACTERS = 30_000;
const MAX_ATTACHMENT_BYTES = 3_500_000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_REQUESTS = 12;

const requestBuckets = new Map();

const SYSTEM_INSTRUCTION = `Eres Meridian AI, el asistente público de Meridian Design, creado por Christian Junior de Jesús.
Responde principalmente en español, con claridad, criterio creativo y pasos utilizables. Puedes ayudar a preparar campañas, briefs, identidades, landings, contenido, SEO, producto y estrategia.
Conoces el ecosistema Meridian: AI Workspace, Tasks, Calendar, Notes, CRM, Analytics, Members, Notifications, Skills, Integrations, Settings y Billing.
Este chat público no tiene una sesión privada del usuario. Nunca digas que leíste datos privados, conectaste una cuenta, ejecutaste una integración, creaste una tarea o cambiaste Meridian si no recibiste un resultado verificable de una herramienta autenticada.
Cuando el usuario pida operar datos privados, explícale brevemente que debe abrir Meridian App e iniciar sesión para usar el copiloto operativo. No solicites contraseñas, claves API, tokens ni secretos.
Si el usuario comparte un enlace, puedes analizar su intención y proponer una estructura de trabajo, pero no afirmes que visitaste el enlace a menos que su contenido esté incluido en el mensaje.
Mantén un tono profesional, creativo y conciso. Usa listas solo cuando mejoren la claridad.`;

function jsonResponse(payload, status = 200, extraHeaders = {}) {
  return Response.json(payload, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      ...extraHeaders,
    },
  });
}

function normalizeHistory(value) {
  if (!Array.isArray(value)) return [];

  let totalCharacters = 0;
  const normalized = [];

  for (const item of value.slice(-MAX_HISTORY_ITEMS)) {
    if (!item || typeof item !== "object") continue;
    if (item.role !== "user" && item.role !== "assistant") continue;
    if (typeof item.content !== "string") continue;

    const content = item.content.trim().slice(0, 6_000);
    if (!content || totalCharacters + content.length > MAX_HISTORY_CHARACTERS) break;

    normalized.push({
      role: item.role === "assistant" ? "model" : "user",
      parts: [{ text: content }],
    });
    totalCharacters += content.length;
  }

  return normalized;
}

function decodeTextAttachment(base64) {
  try {
    return Buffer.from(base64, "base64").toString("utf8").slice(0, 20_000);
  } catch {
    return "";
  }
}

function buildUserParts(message, attachment) {
  const parts = [];
  if (message) parts.push({ text: message });

  if (!attachment || typeof attachment !== "object") return parts;

  const name = typeof attachment.name === "string" ? attachment.name.slice(0, 180) : "archivo";
  const mimeType = typeof attachment.type === "string" ? attachment.type.toLowerCase() : "";
  const data = typeof attachment.data === "string" ? attachment.data : "";
  const estimatedBytes = Math.floor((data.length * 3) / 4);

  if (!data || estimatedBytes > MAX_ATTACHMENT_BYTES) {
    throw new Error("ATTACHMENT_TOO_LARGE");
  }

  if (mimeType === "text/plain" || mimeType === "text/markdown" || name.toLowerCase().endsWith(".md")) {
    const text = decodeTextAttachment(data);
    if (!text) throw new Error("INVALID_ATTACHMENT");
    parts.push({ text: `Contenido del archivo ${name}:\n\n${text}` });
    return parts;
  }

  if (mimeType.startsWith("image/") || mimeType === "application/pdf") {
    parts.push({ inlineData: { mimeType, data } });
    parts.push({ text: `Analiza el archivo adjunto llamado ${name} como parte de la solicitud.` });
    return parts;
  }

  throw new Error("UNSUPPORTED_ATTACHMENT");
}

function isAllowedOrigin(request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  const allowedOrigins = [process.env.URL, process.env.DEPLOY_PRIME_URL]
    .filter(Boolean)
    .map((value) => {
      try {
        return new URL(value).origin;
      } catch {
        return null;
      }
    })
    .filter(Boolean);

  if (allowedOrigins.length === 0) return true;
  return allowedOrigins.includes(origin) || /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
}

function isRateLimited(request) {
  const forwardedFor = request.headers.get("x-forwarded-for") || "unknown";
  const clientId = forwardedFor.split(",")[0].trim();
  const now = Date.now();
  const bucket = requestBuckets.get(clientId);

  if (!bucket || now - bucket.startedAt >= RATE_LIMIT_WINDOW_MS) {
    requestBuckets.set(clientId, { startedAt: now, count: 1 });
    return false;
  }

  bucket.count += 1;
  return bucket.count > RATE_LIMIT_REQUESTS;
}

function extractResponseText(payload) {
  const parts = payload?.candidates?.[0]?.content?.parts;
  if (!Array.isArray(parts)) return "";
  return parts
    .filter((part) => part && typeof part.text === "string" && part.thought !== true)
    .map((part) => part.text)
    .join("\n")
    .trim();
}

export default async function handler(request) {
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: { "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" },
    });
  }

  if (request.method !== "POST") return jsonResponse({ error: "Método no permitido." }, 405, { Allow: "POST, OPTIONS" });
  if (!isAllowedOrigin(request)) return jsonResponse({ error: "Origen no autorizado." }, 403);
  if (isRateLimited(request)) return jsonResponse({ error: "Has enviado muchos mensajes. Espera un minuto e inténtalo de nuevo." }, 429);

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 5_800_000) return jsonResponse({ error: "La solicitud es demasiado grande." }, 413);

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "La solicitud no contiene JSON válido." }, 400);
  }

  const message = typeof body?.message === "string" ? body.message.trim().slice(0, MAX_MESSAGE_LENGTH) : "";
  if (!message && !body?.attachment) return jsonResponse({ error: "Escribe un mensaje o adjunta un archivo." }, 400);

  let userParts;
  try {
    userParts = buildUserParts(message, body?.attachment);
  } catch (error) {
    if (error instanceof Error && error.message === "ATTACHMENT_TOO_LARGE") {
      return jsonResponse({ error: "El archivo debe pesar menos de 3.5 MB." }, 413);
    }
    if (error instanceof Error && error.message === "UNSUPPORTED_ATTACHMENT") {
      return jsonResponse({ error: "Formato no compatible. Usa una imagen, PDF, TXT o Markdown." }, 415);
    }
    return jsonResponse({ error: "No pude leer el archivo adjunto." }, 400);
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return jsonResponse({ error: "Meridian AI todavía no tiene GEMINI_API_KEY configurada en Netlify." }, 503);

  const model = (process.env.GEMINI_MODEL || DEFAULT_MODEL).trim();
  const contents = [...normalizeHistory(body?.history), { role: "user", parts: userParts }];
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 45_000);

  try {
    const response = await fetch(`${GEMINI_ENDPOINT}/${encodeURIComponent(model)}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
        contents,
        generationConfig: { temperature: 0.75, maxOutputTokens: 2_048 },
      }),
      signal: controller.signal,
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error("Gemini request failed", { status: response.status, model });
      if (response.status === 429) return jsonResponse({ error: "Meridian AI está recibiendo muchas solicitudes. Inténtalo de nuevo en un momento." }, 429);
      if (response.status === 400 || response.status === 401 || response.status === 403) {
        return jsonResponse({ error: "La credencial o el modelo de Gemini no son válidos. Revisa la configuración privada de Netlify." }, 502);
      }
      return jsonResponse({ error: "Gemini no pudo completar la respuesta en este momento." }, 502);
    }

    const answer = extractResponseText(payload);
    if (!answer) return jsonResponse({ error: "Gemini devolvió una respuesta vacía." }, 502);

    return jsonResponse({ message: answer, model });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return jsonResponse({ error: "Meridian AI tardó demasiado en responder. Inténtalo otra vez." }, 504);
    }
    console.error("Gemini request unavailable", { model });
    return jsonResponse({ error: "No fue posible conectar con Gemini." }, 502);
  } finally {
    clearTimeout(timeout);
  }
}


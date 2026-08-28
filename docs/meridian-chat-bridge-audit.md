

# Auditoría del chat real — 2026-08-28

## Resultado

La aplicación `meridian-completo` es una aplicación Next.js 16 con React 19, Vercel AI SDK, `@modelcontextprotocol/sdk`, `@elevenlabs/client`, Supabase y NextAuth. El componente real de chat es `MeridianUnifiedChat`.

## Contrato real observado

El navegador de la aplicación publica solicitudes a `/api/chat/stream` y consume `text/event-stream`. Los eventos normalizados incluyen `status`, `token`, `tool_start`, `tool_result`, `agent_activity`, `ui_component`, `artifact`, `code_execution`, `error` y `done`. La aplicación ya tiene un parser SSE con pacing de tokens y sincronización de eventos para la UI.

El catálogo MCP autenticado usa `/api/mcp/catalog` y expone como fallback seguro Notion, Slack, Figma, Linear y GitHub. El catálogo de skills usa `/api/skills`, combina skills core y remotas, y el runtime de ejecución usa `/api/skills/[id]/run`.

## Seguridad y límite de dominio

La aplicación usa NextAuth con estrategia JWT. Supabase actúa como prueba de identidad durante OAuth y no permanece como sesión de navegador pública. Por ello, un sitio estático separado no puede compartir automáticamente la cookie JWT ni llamar al endpoint de streaming como si fuera una sesión autenticada. El frontend de Meridian Design usa `credentials: include` solo cuando el endpoint está en el mismo origen; ante 401, 403 o 404 deriva al workspace autenticado. No se copian secretos, tokens, MCP servers ni lógica backend.

## Decisión de implementación

Los cambios se realizan únicamente en `Meridian-Design-2v1`. La web muestra una superficie realista de workspace, compositor, streaming SSE, estados de herramientas y acceso a la conversación segura. La ejecución completa de MCPs queda delegada al backend de `meridian-completo`, sin modificarlo. Para que la ejecución inline sea real en producción, Meridian Design debe servirse en el mismo origen autenticado de la aplicación o mediante una integración de dominio/reverse proxy que preserve la sesión; no debe resolverse con un iframe ni con credenciales expuestas.

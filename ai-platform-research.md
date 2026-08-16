# Investigación para Meridian Design

## Capacidades verificadas

OpenAI AgentKit presenta un lienzo visual para construir y versionar flujos multiagente, un registro de conectores, ChatKit para interfaces conversacionales embebibles y capacidades de evaluación como datasets, trace grading, optimización de prompts y soporte de modelos de terceros. La fuente también describe guardrails para PII, jailbreaks y comportamiento no deseado.

OpenAI documenta conectores y servidores MCP remotos como herramientas para que los modelos accedan a servicios externos. Los servidores remotos requieren una URL y pueden importar herramientas, filtrar herramientas permitidas y solicitar aprobación antes de compartir datos. La documentación remarca que se debe confiar explícitamente en un servidor MCP porque puede exfiltrar datos del contexto.

Claude Design se presenta como una experiencia conversacional para crear diseños, prototipos interactivos, presentaciones, one-pagers y materiales de marketing. Sus patrones principales son: sistema de marca construido desde código y archivos de diseño; importación de texto, imágenes y documentos; comentarios inline y edición directa; controles granulares de espaciado, color y layout; colaboración; exportación a PPTX, PDF, Canva o HTML; y handoff hacia Claude Code. También menciona voz, vídeo, shaders, 3D e IA como posibilidades de prototipado avanzado.

MCP se describe como un estándar abierto para conectar aplicaciones de IA con sistemas externos. Sus casos de uso incluyen calendario, Notion, bases de datos, generación de aplicaciones desde diseños Figma y creación de modelos 3D con Blender. El ecosistema incluye clientes como Claude, ChatGPT, VS Code y Cursor.

## Traducción visual para Meridian

La nueva experiencia debe presentar Meridian como un sistema, no solo como un estudio: una portada editorial con declaración de misión, una sección de plataforma con módulos de Meridian App, un visualizador de flujos tipo Agent Builder, un registro de conectores/MCP, una matriz de modelos, una zona de laboratorio con vídeo y 3D, una sección de documentos y un archivo de novedades. Los elementos no disponibles como funciones reales se mostrarán con claridad como demos visuales o roadmap, nunca como integraciones activas.

## Fuentes

- https://openai.com/index/introducing-agentkit/
- https://developers.openai.com/api/docs/guides/tools-connectors-mcp
- https://www.anthropic.com/news/claude-design-anthropic-labs
- https://modelcontextprotocol.io/docs/2026-07-28/getting-started/intro
- https://www.youtube.com/watch?v=_4LgsMQJoRY

## Verificación local

La vista local muestra correctamente el menú sin el botón NOVAXCO y añade los módulos Meridian App, MCP Connectors, Model Router, Creative Lab, Agents/Evals/Guardrails y Updates. Los enlaces externos y el vídeo local aparecen en el DOM. La consola no registra errores bloqueantes; solo persiste el aviso no bloqueante de Supabase sobre múltiples instancias de GoTrueClient.

## Recursos visuales públicos encontrados

La búsqueda visual encontró referencias de un mapa de clientes y servidores MCP de Andreessen Horowitz, diagramas de arquitectura MCP, dashboards de AI y productividad, y laboratorios futuristas generados por IA. Se conservarán como referencias visuales o enlaces atribuidos, no como activos copiados sin licencia.

- MCP Market Map / Andreessen Horowitz: imagen local de referencia en `/home/ubuntu/upload/search_images/DNRXLqyZP3Ii.png`.
- MCP architecture diagram / Addy Osmani: imagen local de referencia en `/home/ubuntu/upload/search_images/VRhoK7GKNjrt.png`.
- MCP deep dive / Andreessen Horowitz: imagen local de referencia en `/home/ubuntu/upload/search_images/ikRMQs8hxPoT.png`.
- AI Dashboard Design: imagen local de referencia en `/home/ubuntu/upload/search_images/lMs05DCaEblU.webp`.
- AI productivity dashboard: imagen local de referencia en `/home/ubuntu/upload/search_images/S52ZdZ2Ji7cO.png`.
- Vídeo OpenAI × Figma sobre MCP: https://www.youtube.com/watch?v=_4LgsMQJoRY

## Actualización biográfica

La vista local confirma que el menú incluye `Fundador`, que la fotografía proporcionada se carga desde `assets/christian-junior-de-jesus.jpeg`, y que aparecen la biografía editorial, los datos de base/foco/ahora, documentos, herramientas públicas y enlaces profesionales. La consola no muestra errores bloqueantes; permanece únicamente el aviso no bloqueante de Supabase sobre múltiples instancias de GoTrueClient.

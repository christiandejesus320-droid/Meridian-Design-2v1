# Mapa de flujo de la referencia OpenAI

## Navegación principal

La página abre con una navegación superior minimalista que separa Investigación, Productos, Negocios, Desarrolladores, Empresa y Fundación. En el extremo derecho aparecen búsqueda, Inicio de sesión y una llamada a la acción de producto. La navegación funciona como un índice de todo el ecosistema, no solo como enlaces de una landing.

## Hero conversacional

El primer bloque no usa una imagen dominante, sino una pregunta centrada: “¿En qué puedo ayudarte?”. Debajo aparece un campo conversacional con botón de envío y, más abajo, accesos rápidos para Business, hablar con el asistente, Investigación y Plataforma API. La página convierte la home en una puerta de entrada a tareas, producto e información.

## Editorial por capas

Después del hero aparecen módulos de contenido agrupados por intención: noticias destacadas, noticias recientes, historias, investigaciones recientes y contenido para empresas. Cada bloque usa tarjetas con imagen, titular, categoría y fecha o duración. Cada agrupación tiene un enlace “Ver más” o “Ver todos”.

## Arquitectura de producto y plataforma

El footer repite la arquitectura de navegación en columnas: Investigación incluye índice, descripción general, economía, modelos y seguridad; Productos incluye ChatGPT, Business, Enterprise, educación, Codex y notas de lanzamiento; Plataforma API incluye overview, login, documentación; Business incluye soluciones, recursos, historias, socios y ventas; Desarrolladores incluye SDK, modelos abiertos, docs, recursos y foro; Empresa incluye historia, principios, empleos, noticias y soporte.

## Traducción para Meridian Design

Meridian debe conservar su identidad visual y convertir esta lógica en un ecosistema propio. La navegación propuesta es: Meridian, Plataforma, Investigación, Productos, Negocios, Desarrolladores, Empresa y Fundador. El hero debe ser “¿Qué quieres construir?”, con Meridian Chat, accesos a Meridian App, Business, Research y API. Los módulos editoriales deben organizarse como Meridian Research, Product Updates, Meridian Stories, Creative Lab y Meridian Business. El footer debe actuar como mapa del sistema con páginas y recursos propios.

## Fuente

https://openai.com/es-419/

## Investigación

La sección Investigación conserva la misma navegación global, pero cambia la home por un catálogo. Presenta un título directo, filtros de tipo —Todo, Publicación, Conclusión, Hitos y Comunicado de prensa—, controles de Filtrar y Ordenar, y un interruptor para mostrar u ocultar la versión multimedia de las tarjetas. Cada entrada combina categoría, fecha, titular, descripción y, en algunos casos, una imagen o contenido multimedia. Meridian puede convertir esto en `Meridian Research` con filtros por Investigación, Producto, Sistema, Seguridad y Caso de estudio, además de tarjetas con lectura, vídeo o prototipo.

## Negocios

La sección Business cambia el tono hacia una propuesta de valor y segmenta por funciones: Finanzas, Análisis de datos, Ventas, Marketing, Operaciones, Ingeniería, Diseño y Seguridad. También presenta historias de clientes con vídeo, logos de empresas, una navegación secundaria con Productos, Soluciones, Recursos, Clientes y Precios, y una plataforma por pestañas que agrupa ChatGPT Work, Codex y API. Meridian puede traducirlo como `Meridian Business`, con soluciones para estudios creativos, agencias, startups y equipos de marketing; historias visuales; y una plataforma por pestañas para Workspace, Agents y API.

## Plataforma API

La API usa un hero orientado a construir productos de IA, con CTA para hablar con expertos y comenzar a desarrollar. Luego muestra logos de clientes, una sección de modelos con información de capacidad y precio, guías de prompts, ejemplos frontend, migración, modalidades de voz e imagen, API Realtime, vídeo y casos de clientes. El footer enlaza SDK de aplicaciones, modelos abiertos, documentación, recursos y foro. Meridian debe convertir esto en `Meridian API`, con Model Router, MCP, documentación, ejemplos, Playground, Skills, multimodalidad y enlaces al repositorio/API real cuando estén disponibles.

## Empresa y Fundación

La página Empresa mantiene un tono institucional: etiqueta de sección, titular “Sobre nosotros”, misión clara, visión futura, enlaces a plan y principios, explicación de estructura y acceso a vacantes. Después conecta con investigación, productos, noticias y soporte. Meridian puede reinterpretar esto como `About Meridian`, `Meridian Principles`, `Founder`, `Careers / Collaborate`, `Company Notes` y un espacio de impacto o fundación futura, evitando afirmar estructuras legales que no existan.

## Implementación local del flujo Meridian

La versión local ya muestra la nueva sección `MERIDIAN / ECOSYSTEM` con seis áreas: Investigación, Productos, Negocios, Desarrolladores, Empresa y Fundación. El flujo incluye una navegación interna, un hero editorial de Research, tarjetas de producto y Business, Developer Flow con enlace a MCP, Company, Foundation en exploración y CTA de Meridian Chat. La consola no registra errores bloqueantes; solo permanece el aviso no bloqueante de Supabase sobre múltiples instancias de GoTrueClient.

# Meridian Design System v1

## Dirección

Meridian Design usa una dirección editorial tecnológica basada en tres señales: **señal**, **contexto** y **control**. La interfaz mantiene el fondo oscuro y la calidez editorial existentes, pero ahora los componentes comparten tokens explícitos para evitar decisiones aisladas.

## Tokens principales

| Categoría | Tokens |
|---|---|
| Superficies | `--meridian-paper`, `--meridian-paper-soft`, `--meridian-night`, `--meridian-night-soft` |
| Señal y confianza | `--meridian-signal`, `--meridian-signal-soft`, `--meridian-trust`, `--meridian-focus` |
| Líneas | `--meridian-line`, `--meridian-line-light` |
| Ritmo | Escala base de 4 px: `4, 8, 12, 16, 24, 32, 48` |
| Radios | `8, 12, 18` px para componentes funcionales; no se añaden pills indiscriminadas |
| Motion | `180ms cubic-bezier(.2,.75,.25,1)` y suspensión completa con `prefers-reduced-motion` |

## Componentes

Los componentes de acción comparten altura mínima de 44 px, foco visible, estados disabled, hover y reduced motion. Los botones y enlaces siguen usando elementos nativos; no se convierten `div` o `span` en controles.

La navegación declara `data-meridian-component="navigation"`, el contenido principal declara `data-meridian-surface="application-design"` y el chat declara `data-meridian-component="public-chat"`. Esto permite conectar la experiencia con contratos de API sin acoplarla a lógica de backend.

## Estados del chat

| Estado | Atributo | Señal de interfaz |
|---|---|---|
| Preparado | `data-meridian-state="idle"` | El usuario puede escribir o elegir una sugerencia. |
| Cargando | `data-meridian-state="loading"` | `aria-busy="true"`, texto de estado y cursor de progreso. |
| Completado | `data-meridian-state="completed"` | Mensaje final y señal verde de finalización. |
| Error | `data-meridian-state="error"` | Mensaje recuperable, señal coral y estado anunciado. |

El chat público conserva su límite: puede ayudar con creatividad y estrategia, pero no afirma leer workspace privado ni ejecutar acciones autenticadas. La acción «Abrir modo operativo» mantiene la frontera hacia Meridian App.

## Accesibilidad aplicada

La navegación tiene skip link, landmark principal, control nativo de menú, `aria-expanded`, `aria-controls` y cierre con Escape. El chat tiene nombre de formulario, `role="status"`, `role="log"`, `aria-live`, `aria-busy`, nombres accesibles para inputs y controles táctiles mínimos.

El foco se mantiene visible y no depende de hover. Los estados de error, loading y completed tienen texto además de color. Las animaciones no esenciales se desactivan con `prefers-reduced-motion`. Las superficies móviles conservan una jerarquía de acciones de ancho completo para evitar targets pequeños.

## Validación de esta fase

Antes de avanzar a la integración se deben ejecutar `node --check` en los chunks modificados, el detector mecánico de impeccable una sola vez, revisión de enlaces, diff check y preview Vercel `READY` asociada al commit correcto.

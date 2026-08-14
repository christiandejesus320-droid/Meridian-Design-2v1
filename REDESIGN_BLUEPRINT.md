# Meridian Design — Redesign Blueprint

## Dirección

La portada ahora organiza la experiencia alrededor de una secuencia simple: **explorar**, **entender** y **operar**. La referencia conceptual es la claridad conversacional, el control humano y la transparencia de capacidades; la identidad visual permanece propia de Meridian, con una base editorial oscura, coral, marfil y verde tenue.

## Cambios implementados

La nueva sección `#como-funciona` explica el flujo de trabajo en tres tarjetas, reduce la abstracción del 3D y hace explícita la separación entre la exploración pública y la operación privada. El bloque de confianza comunica que las acciones viven dentro del workspace autenticado y están sujetas a permisos, límites y estados revisables.

El sistema visual incorpora tokens locales para el nuevo bloque, estados `:focus-visible` con contraste alto, responsive de una columna en pantallas pequeñas y una regla de `prefers-reduced-motion` para no depender del hover o del movimiento como único canal de información.

El chat público ahora anuncia que opera en modo creatividad y estrategia sin acceso a datos privados. Su historial usa `role="log"` y `aria-live="polite"`, y el control de adjuntos tiene una etiqueta accesible. El mensaje evita prometer operaciones privadas y mantiene el CTA hacia el modo operativo autenticado.

## Principios de uso

La portada debe mantener una CTA primaria clara hacia la demo operativa y una CTA secundaria hacia el chat público. Los efectos 3D son una capa de atmósfera y demostración, no el sustituto de la propuesta de valor. Las futuras secciones deben reutilizar los tokens y evitar acumular nuevos estilos globales o componentes visualmente desconectados.

## Siguiente iteración recomendada

La siguiente fase debería sincronizar estos tokens con el frontend de `meridian-completo`, añadir un estado visible de disponibilidad conectado a `GET /ai/capabilities` y probar contraste, teclado, lector de pantalla y rendimiento móvil en navegadores reales.

## Integración de estados con Meridian API

La interfaz pública consume una semántica equivalente al contrato `GET /ai/interaction-contract`: `idle`, `loading`, `streaming`, `confirmation_required`, `completed` y `error`. El chat anuncia preparación, completado y recuperación mediante un estado accesible, mantiene `aria-busy` sincronizado y no usa `alert()` como único canal de error.

La navegación principal incorpora un skip link hacia `#main-content`, un landmark de navegación con nombre y controles táctiles de al menos 44 px. La página conserva la separación entre modo público y workspace autenticado: el frontend no asume permisos ni muestra acciones de escritura como si estuvieran disponibles.

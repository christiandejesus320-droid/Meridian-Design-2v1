# Meridian visual audit — 2026-08-28

## Estado observado

La URL de producción `https://meridian-design-2v1-oip11zo32-nexus-labs1.vercel.app` muestra una pantalla de login de Vercel, por lo que no es una superficie pública auditable sin una sesión autenticada.

El preview local sí carga después de reparar `meridian-chunk-09.js`, que tenía una comilla de cierre ausente en la cadena HTML. Antes de la reparación sólo aparecía el fallback `Activa JavaScript para entrar al sistema`.

## Primera pantalla local

La aplicación renderiza una navegación horizontal clara con `MERIDIAN`, `Home`, `Meridian`, `Plataforma`, `Fundador`, `Diseños`, `Publicaciones`, `Cosmos`, `Planes`, `Chat IA` y `Contacto`. La primera composición observada usa un hero visual oscuro con una imagen vertical de escritorio, esfera y líneas de luz, pero el mensaje principal no queda visible en el primer viewport observado. La navegación y el hero no comparten todavía una jerarquía editorial fuerte.

## Bloqueadores

1. El deployment de Vercel está protegido por login.
2. El ensamblaje actual depende de `document.open()`, `document.write()` y muchos chunks HTML como strings, lo que vuelve frágil la portada.
3. `meridian-chunk-09.js` estaba inválido y bloqueaba el render completo; se reparó localmente y todos los módulos pasan `node --check`.
4. El rediseño debe comenzar por una portada real y estable, no por añadir más efectos a los chunks existentes.

## Dirección aprobada

Mantener el contenido y las rutas existentes, pero crear una primera experiencia Meridian más ordenada: hero con mensaje y CTA, video espacial opcional con audio bajo interacción, navegación de producto, prueba visual de workspace y estados responsive. Aplicar NEXUS-ZERO con moderación: OLED, oklch, bento contextual, container queries y motion con fallback. No ocultar el contenido bajo una imagen ni reemplazar la lógica existente sin necesidad.

## Hero rediseñado observado

El hero actualizado sí renderiza en el preview local con una jerarquía de dos columnas: mensaje a la izquierda y video espacial a la derecha. El titular `El trabajo piensa contigo.` tiene contraste alto y un tratamiento editorial outline en la segunda línea. El bloque multimedia muestra `MERIDIAN / SPATIAL FIELD`, `20:08 / SLOW CINEMA`, superficie de video y caption con Share.

El desplazamiento del preview confirma que el contenido textual y las siguientes secciones siguen presentes. El reproductor aparece como elemento real HTML5 con controles nativos y el asset responde con `Content-type: video/mp4` y tamaño de 38,431,657 bytes.

Pendiente de validación: probar play/mute/seek en navegador y confirmar el deployment después de publicar. La producción de Vercel continúa protegida por login en la URL auditada.

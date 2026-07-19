# Meridian Design

Meridian Design es la presentación visual y creativa del ecosistema Meridian: una experiencia web que combina diseño gráfico, inteligencia artificial, marketing y elementos 3D en una interfaz editorial e interactiva.

El sitio funciona como una vitrina del lenguaje visual de Meridian y presenta su identidad, trabajos, recursos, proceso creativo e información institucional en una sola experiencia web.

## Sobre el fundador

**Christian Junior de Jesús** es el fundador y CEO de Meridian. Es emprendedor de software y creador de sistemas digitales enfocados en inteligencia artificial, automatización, productividad, marketing y productos SaaS.

Christian dirigió la visión del proyecto, la identidad de Meridian, la dirección creativa, las decisiones de producto y la preparación final de esta experiencia.

## Cómo se creó

Meridian Design fue creado mediante un proceso colaborativo entre dirección humana y herramientas avanzadas de desarrollo asistido por inteligencia artificial. El proyecto se construyó como una página HTML autocontenida, preparada para funcionar como un sitio estático sin instalación, compilación ni dependencias externas obligatorias.

El objetivo fue conservar una experiencia visual expresiva, profesional y adaptable a computadoras y dispositivos móviles, manteniendo todos los recursos principales dentro del propio sitio.

## Colaboradores y créditos

- **Christian Junior de Jesús** — Fundador, CEO, visión del producto y dirección creativa.
- **ChatGPT 5.6 Sol** — Concepto visual, estructura, producción del HTML y refinamiento técnico.
- **Claude Code** — Colaboración de ingeniería y apoyo en implementación.
- **OpenCode** — Asistencia de desarrollo y revisión técnica.

## Publicación

El repositorio conserva la publicación estática de GitHub Pages desde `main` y la raíz, pero también incluye una configuración de Netlify para el chat real y los formularios.

En Netlify, el comando de build crea `dist/` con los archivos públicos y mantiene `netlify/functions/` fuera de ese directorio. Configura `GEMINI_API_KEY` desde la UI de Netlify con alcance **Functions** y, opcionalmente, `GEMINI_MODEL=gemini-3.5-flash`. La clave nunca debe entrar a GitHub, HTML, JavaScript del navegador ni query params.

El chat público usa Gemini para creatividad, briefs, estrategia y análisis de archivos compatibles. Las operaciones privadas (tareas, CRM, calendario, notas, skills e integraciones) siguen en Meridian App detrás de NextAuth/JWT y permisos por usuario; hacer que una página anónima “acceda a todo” con una clave global rompería ese aislamiento. El botón **Abrir modo operativo** lleva a la aplicación autenticada.

No requiere `npm install` ni dependencias externas para el sitio. El archivo principal es `index.html`.

## Estructura

```text
.
├── index.html                 # Home y chat público
├── ecosystem.html             # Cosmos visual de integraciones
├── planes.html                # Propuesta visual de suscripciones
├── contacto.html              # Formulario Netlify / fallback mailto
├── meridian-system.css        # Sistema visual compartido
├── netlify/functions/chat.mjs # Proxy seguro hacia Gemini
├── netlify.toml               # Build, funciones y headers
└── README.md                  # Información, publicación y límites
```

## Propiedad

© 2026 Christian Junior de Jesús — Meridian. Todos los derechos reservados.


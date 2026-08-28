# MERIDIAN — PRODUCT ARCHITECTURE + UI ENGINE

Trabaja directamente sobre mi aplicación Meridian.

**App actual:** https://meridian-design-live.vercel.app/
**Repositorio de skills:** https://github.com/christiandejesus320-droid/universal-agent-skills-gateway

## DIRECTIVA

Primero inspecciona completamente la aplicación actual y su arquitectura. Después inspecciona y utiliza:

`skills/universal-agent-workspace/SKILL.md`

y carga bajo demanda las referencias que correspondan, especialmente:

- `references/elite-architecture-review.md`
- `references/nexus-zero-ui-engine.md`
- `references/webgl/webgl-shader-master-prompt.md`
- `references/webgl/realtime-webgl-workflow.md`
- `references/webgl/web-experience-production.md`

No copies todo indiscriminadamente. Usa la regla de selección mínima de la skill.

## OBJETIVO

Transformar Meridian en un AI Operating Workspace real.

No conviertas Meridian en una landing page.

Esta aplicación es el producto principal y debe contener:

- Console
- AI Workspace
- Agents
- Chat
- Projects
- Tasks
- Notes
- CRM
- Analytics
- Integrations
- MCP
- Files
- Artifacts
- Settings
- Billing

## ARQUITECTURA OBJETIVO

Diseña la aplicación alrededor de:

`Next.js → Edge Gateway → AI Gateway → Agent Runtime → MCP/Sandbox → Supabase`

### Edge

Utiliza Edge donde realmente aporte valor:

- chat streaming
- agent events
- sesiones
- routing
- respuestas de baja latencia

No fuerces sandbox/code execution dentro del Edge.

### AI Gateway

Implementa un contrato unificado para múltiples proveedores.

Usa Vercel AI SDK / `streamText` para streaming cuando corresponda.

El frontend nunca debe depender directamente de un proveedor específico.

### Agent Runtime

Debe soportar conceptualmente:

- tools
- MCP
- archivos
- shell aislado
- ejecución
- contexto
- eventos
- artifacts
- validación

### Supabase

Implementa aislamiento multi-tenant mediante RLS.

Cada dato debe estar correctamente relacionado con el usuario/tenant y las operaciones sensibles deben ejecutarse únicamente desde backend autorizado.

## EXPERIENCIA PRINCIPAL

El centro de Meridian debe ser un workspace de agentes.

Usa arquitectura split-pane / tri-pane:

```text
┌──────────────┬──────────────────────┬──────────────────────┐
│ CONTEXT      │ AGENT                │ ARTIFACT             │
│              │                      │                      │
│ Files        │ Chat                 │ Preview              │
│ MCP          │ Agent activity       │ Code                 │
│ Project      │ Tool calls           │ App                  │
│ Knowledge    │ Execution states     │ Dashboard            │
│              │                      │ Document             │
└──────────────┴──────────────────────┴──────────────────────┘
```

El usuario debe poder ver qué está haciendo el agente sin mostrar chain-of-thought privado.

Mostrar solamente estados operativos:

`Understanding → Planning → Searching → Using tool → Editing → Running → Validating → Done`

Estos estados deben provenir de eventos reales del runtime cuando sea posible, no de animaciones falsas.

## CONSOLE

La Console debe convertirse en el centro de control de Meridian.

Sidebar limpia:

```text
MERIDIAN

Console
AI
  Chat
  Agents
  Runs
  Artifacts

Workspace
  Projects
  Tasks
  Notes
  Files

Business
  CRM
  Analytics
  Automations

Integrations
  MCP
  Connections

Settings
Billing
```

Mantén la identidad visual existente de Meridian, pero elimina ruido visual y componentes innecesarios.

## DISEÑO

Dirección visual:

- OLED / dark-first
- premium
- técnica
- silenciosa
- extremadamente limpia
- alta densidad de información sin sentirse saturada

Usa CSS moderno:

- `clamp()`
- `oklch()`
- container queries
- `:has()`
- CSS transitions
- view transitions cuando sean apropiadas

No conviertas React state en una máquina de animaciones.

Usa Motion solamente cuando una interacción realmente lo necesite.

## GPU / VISUAL CORE

Cuando tenga sentido, utiliza WebGL/GLSL directamente, sin Three.js innecesariamente.

Posibles usos:

- background procedural
- spatial field
- partículas
- profundidad
- iluminación
- estados del sistema

Prioriza:

- 60/120 FPS
- DPR controlado
- fallback
- reduced motion
- pérdida de contexto
- bajo consumo
- accesibilidad

Nunca sacrifiques la funcionalidad por efectos visuales.

## REGLA CRÍTICA

NO reescribas toda la aplicación por gusto.

Primero:

1. Audita.
2. Identifica arquitectura existente.
3. Identifica qué funciona.
4. Identifica deuda técnica.
5. Define el mínimo cambio necesario.
6. Implementa por fases.
7. Ejecuta validaciones.
8. Corrige regresiones.

No modifiques archivos no relacionados.

No inventes APIs existentes.

No inventes integraciones.

No inventes capacidades del runtime.

## CONTRATO DE TRABAJO

Utiliza siempre:

`THINK → PLAN → BUILD → REVIEW → TEST`

Y al finalizar entrega:

```yaml
objective: "..."
problem: "..."
selected_capabilities: []
assumptions: []
plan: []
files_or_artifacts: []
checks_run: []
evidence: []
risks: []
human_confirmation_required: []
next_step: "..."
```

## PRIMERA FASE

NO empieces programando.

Primero realiza una auditoría completa de Meridian y produce:

1. Arquitectura actual.
2. Árbol de rutas.
3. Componentes principales.
4. Estado actual del Console.
5. Sistema de navegación.
6. Estado del AI Workspace.
7. Estado de MCP.
8. Estado de streaming.
9. Estado de Supabase/RLS.
10. Estado de artifacts.
11. Estado de WebGL/motion.
12. Problemas críticos.
13. Quick wins.
14. Arquitectura objetivo.
15. Plan de implementación por fases.

Después de esa auditoría, comienza únicamente con la primera fase de mayor impacto.

**No hagas cambios destructivos.**
**No hagas deploy automáticamente.**
**No expongas secretos.**
**No ejecutes acciones irreversibles sin autorización.**

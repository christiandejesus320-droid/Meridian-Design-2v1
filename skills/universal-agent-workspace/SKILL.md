---
name: universal-agent-workspace
description: Skill operativa universal para product architecture, AI workspace, UI engineering y ejecución segura con evidencia para Meridian.
license: MIT
metadata:
  version: 2026.3
  mode: universal-single-skill
  source_model: gstack-plus-agent-skills
  scope: meridian-ai-operating-workspace
---

# Universal Agent Workspace / Espacio Universal de Agentes

> One skill. Every model. Real work. / Una skill. Todos los modelos. Trabajo real.

## What this skill is / Qué es esta skill

Esta skill es un método operativo para trabajar con proyectos complejos como Meridian: entender arquitectura, decidir el contexto mínimo, seleccionar capacidades, ejecutar cambios pequeños y seguros, y cerrar cada tarea con evidencia verificable.

No es una landing page ni un prompt aislado. Es una estructura para crear un workspace real de IA: console, chat, files, artifacts, agents, tools, analytics, CRM, MCP y runtime operacional.

## START HERE / EMPIEZA AQUÍ

### Resource index / Índice de recursos

| Resource / Recurso | Open when / Abrir cuando | File / Archivo |
| --- | --- | --- |
| Expert architecture / Arquitectura de experto | Auditar producto y runtime | `references/elite-architecture-review.md` |
| UI engine / Motor UI | Diseñar el workspace premium y limpio | `references/nexus-zero-ui-engine.md` |
| Meridian implementation brief / Brief de implementación de Meridian | Trabajar con el producto real | `references/meridian-product-prompt.md` |
| WebGL | Cuando haya visual core, particles o motion procedural | `references/webgl/webgl-shader-master-prompt.md` |
| Realtime WebGL | Cuando hay feedback visual vivo | `references/webgl/realtime-webgl-workflow.md` |
| Web production | Cuando hay experiencia visual productiva | `references/webgl/web-experience-production.md` |

## Core operating loop / Bucle operativo central

`THINK → PLAN → BUILD → REVIEW → TEST → SHIP → REFLECT`

### THINK / PENSAR
- Reformular el objetivo real
- Identificar usuario, problema y restricciones
- Definir riesgo, supuestos e información faltante

### PLAN / PLANIFICAR
- Seleccionar solo las capacidades necesarias
- Definir archivos, secuencia y criterios de aceptación
- Establecer condiciones de parada y revisión humana

### BUILD / CONSTRUIR
- Implementar el cambio mínimo y reversible
- Mantener artefactos legibles y directos
- No inventar APIs ni integraciones inexistentes

### REVIEW / REVISAR
- Validar arquitectura, UX, seguridad, datos y prioridades del producto
- Detectar deuda técnica y problemas estructurales

### TEST / PROBAR
- Ejecutar los checks útiles y pequeños
- Verificar comportamiento real, no solo generación de código

### SHIP / ENTREGAR
- Preparar la entrega con evidencia clara
- Pedir confirmación antes de efectos externos o irreversibles

### REFLECT / APRENDER
- Extraer patrones reutilizables
- Registrar riesgos y decisiones relevantes

## Capability selection algorithm / Algoritmo de selección

1. Identificar el problema principal, no solo la tecnología pedida.
2. Elegir una capacidad principal y máximo tres de apoyo.
3. Preferir instrucciones locales, explícitas y revisadas.
4. Explicar por qué cada capacidad aplica y por qué se descarta otra.
5. Cargar contexto extra solo cuando la fase lo requiere.
6. No activar todos los módulos del sistema a la vez.

## Product intent for Meridian / Intención operativa para Meridian

Meridian debe convertirse en un AI Operating Workspace real, centrado en:

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

No debe limitarse a una landing page. Debe operar como un entorno de trabajo con paneles, agentes, estado, eventos, herramientas y artefactos.

### Arquitectura objetivo / Target architecture

`Next.js → Edge Gateway → AI Gateway → Agent Runtime → MCP/Sandbox → Supabase`

- Edge: streaming, sesiones, routing, eventos de baja latencia
- AI Gateway: contrato unificado para múltiples proveedores
- Agent Runtime: tools, archivos, shell aislado, ejecución, contexto, eventos, artifacts y validación
- Supabase: multi-tenant con RLS y separación por usuario/tenant

## Workspace UX model / Modelo UX del workspace

Utilizar arquitectura split-pane / tri-pane:

```text
┌──────────────┬──────────────────────┬──────────────────────┐
│ CONTEXT      │ AGENT                │ ARTIFACT             │
│ Files        │ Chat                 │ Preview              │
│ MCP          │ Agent activity       │ Code                 │
│ Project      │ Tool calls           │ App                  │
│ Knowledge    │ Execution states     │ Dashboard            │
│              │                      │ Document             │
└──────────────┴──────────────────────┴──────────────────────┘
```

Mostrar estados operativos reales, por ejemplo:

`Understanding → Planning → Searching → Using tool → Editing → Running → Validating → Done`

No mostrar chain-of-thought privado. Solo mostrar el estado útil para la operación.

## Console structure / Estructura de la Console

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

## Design direction / Dirección visual

- OLED / dark-first
- premium
- técnica
- silenciosa
- muy limpia
- alta densidad de información

Usar CSS moderno:

- `clamp()`
- `oklch()`
- container queries
- `:has()`
- transitions ligeras
- view transitions cuando aplique

No convertir el estado en animaciones artificiales.

## GPU / visual core / núcleo visual

Usar WebGL/GLSL solo cuando realmente mejore la comprensión o la experiencia, por ejemplo:

- background procedural
- spatial field
- partículas
- profundidad
- iluminación
- estados del sistema

Priorizar:

- 60/120 FPS
- DPR controlado
- fallback
- reduced motion
- bajo consumo
- accesibilidad

## Guardrails / Reglas de seguridad y responsabilidad

- No reescribir toda la app por gusto.
- Auditar antes de cambiar.
- Identificar arquitectura actual, puntos de dolor y deuda técnica.
- Aplicar mínimo cambio necesario.
- No inventar APIs existentes ni capacidades del runtime.
- No ejecutar acciones irreversibles sin autorización.
- No exponer secretos, tokens o datos privados.
- Validar cambios con pruebas y evidencia.

## Output contract / Contrato de salida

Siempre devolver este formato, incluso si el host no soporta JSON:

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

## First phase / Primera fase

No empezar programando sin auditoría. La primera fase debe responder:

1. Arquitectura actual
2. Árbol de rutas
3. Componentes principales
4. Estado actual del Console
5. Sistema de navegación
6. Estado del AI Workspace
7. Estado de MCP
8. Estado de streaming
9. Estado de Supabase/RLS
10. Estado de artifacts
11. Estado de WebGL/motion
12. Problemas críticos
13. Quick wins
14. Arquitectura objetivo
15. Plan de implementación por fases

## Definition of done / Definición de terminado

Una tarea está terminada cuando:

- el problema está explícito
- se selecciona el conjunto mínimo de capacidades
- existe el artefacto o cambio correspondiente
- pasan los checks relevantes
- se declaran riesgos y supuestos
- la salida es verificable y legible
- todo efecto externo tiene confirmación humana

## Source fidelity / Fidelidad de fuentes

Esta skill consolida un modelo operativo basado en prácticas de product architecture, tool orchestration, UI engineering y runtime-aware AI workflows. Tiene como objetivo mantener portabilidad y claridad de ejecución sin depender de un proveedor concreto.

## Minimal execution rule / Regla de ejecución mínima

Usar siempre:

`THINK → PLAN → BUILD → REVIEW → TEST`

Y cerrar con evidencia.

## Referencias cargadas bajo demanda

- `references/elite-architecture-review.md`
- `references/nexus-zero-ui-engine.md`
- `references/meridian-product-prompt.md`
- `references/webgl/webgl-shader-master-prompt.md`
- `references/webgl/realtime-webgl-workflow.md`
- `references/webgl/web-experience-production.md`

Cargar solo lo necesario para la fase actual. No copiar todo indiscriminadamente.

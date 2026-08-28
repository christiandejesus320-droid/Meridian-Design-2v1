# Elite Architecture Review / Revisión de Arquitectura Elite

## Purpose / Propósito

This reference is used when the task involves product architecture, system boundaries, runtime design, multi-tenant data flow, AI orchestration, and safe implementation planning.

Este documento se usa cuando la tarea implica arquitectura de producto, límites del sistema, diseño del runtime, flujo de datos multi-tenant, orquestación de IA y planificación segura de implementación.

## Core review questions / Preguntas centrales

1. What is the actual user problem? / ¿Cuál es el problema real del usuario?
2. What is the minimal architecture that solves it? / ¿Cuál es la arquitectura mínima que lo resuelve?
3. Where are the real boundaries? / ¿Dónde están los límites reales?
4. What must stay on the server? / ¿Qué debe quedarse en el backend?
5. What can live in the edge? / ¿Qué puede vivir en edge?
6. What is the runtime contract? / ¿Cuál es el contrato del runtime?
7. What is the tenant boundary? / ¿Cuál es el límite de tenant?
8. What is the evidence for correctness? / ¿Cuál es la evidencia de corrección?

## Recommended architecture / Arquitectura recomendada

```text
User / Client
  → UI shell
  → AI Workspace
  → Gateway
  → Runtime
  → Tools / MCP / Files / Sandbox
  → Storage / DB / RLS
```

## Design rules / Reglas de diseño

- Keep the client thin and stateful only where needed.
- Move sensitive logic to authorized backend paths.
- Isolate execution and tool access.
- Prefer explicit contracts over implicit magic.
- Treat the runtime as a system of events and artifacts, not just a chatbot UI.

## Meridian-specific priorities / Prioridades para Meridian

- Workspace must feel operational, not marketing-oriented.
- AI workflow should expose the visible state of execution without leaking internals.
- The app should keep a strong information density without feeling overloaded.
- The system should support real agent execution patterns: tools, files, state, memory, validation.

## Review output / Salida de revisión

Return:

- problem statement
- architecture summary
- critical risks
- minimum viable changes
- phase plan
- verification steps

## Evidence rule / Regla de evidencia

If a claim is not observable, say it is an assumption and keep it explicit.

Si un dato no es observable, decláralo como supuesto y mantenlo explícito.

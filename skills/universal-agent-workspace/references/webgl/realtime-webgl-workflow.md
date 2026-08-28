# Real-time WebGL Workflow / Flujo de WebGL en Tiempo Real

## Purpose / Propósito

This workflow is used when a feature needs live visual feedback, dynamic background system, or procedural motion tied to app state.

Este flujo se usa cuando una funcionalidad necesita feedback visual en tiempo real, fondo dinámico o movimiento procedural vinculado al estado de la app.

## Operational workflow / Flujo operativo

```text
Define purpose
Measure performance budget
Build fallback first
Implement minimal GPU layer
Validate at frame budget
Keep state-driven but readable
```

## Rules / Reglas

- The visual layer must not block primary functionality.
- If the effect fails, the app still works.
- Motion must serve understanding, not decoration.
- The effect should respond to real system state when relevant.

## Delivery checklist / Checklist de entrega

- effect objective
- fallback behavior
- performance budget
- reduced motion support
- visual validation
- technical explanation

## Decision / Decisión

If a WebGL effect does not improve understanding or product value, do not add it.

Si un efecto WebGL no mejora la comprensión ni el valor del producto, no lo añadas.

# WebGL Shader Master Prompt / Prompt Maestro de Shaders WebGL

## Scope / Alcance

Use this reference only when the feature benefits from visual computation, procedural motion, spatial field effects, particles or GPU-driven background feedback.

Usa esta referencia solo cuando la función se beneficia de cómputo visual, movimiento procedural, efectos de campo espacial, partículas o feedback de fondo driven por GPU.

## Design contract / Contrato de diseño

Before building a shader or GPU effect, define:

- purpose of the effect
- scene intent
- camera model
- coordinate system
- uniform inputs
- device tier
- performance budget
- fallback behavior
- reduced motion mode

## Example pipeline / Pipeline de ejemplo

```text
brief → hypothesis → prototype → shader → optimize → fallback → validate
```

## Constraints / Restricciones

- Prefer simple and purposeful visuals
- Keep it readable and not distracting
- Maintain a clear fallback without GPU
- Prevent excessive draw calls or overdraw
- Avoid motion as decoration

## Validation / Validación

Test:

- low-power device
- reduced motion
- no WebGL support
- responsiveness
- performance stability

## Output / Salida

Document:

- what the effect does
- why it matters
- how it works in plain terms
- what happens without GPU
- what was validated

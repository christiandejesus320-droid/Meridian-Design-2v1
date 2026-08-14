# Integración Meridian API ↔ Meridian Design

## Propósito

Meridian Design consume el contrato de interacción de Meridian API solo cuando el host proporciona una URL pública de API mediante `meta[name="meridian-api-base-url"]`. Si no existe esa configuración, la interfaz conserva su comportamiento público y usa sus estados locales.

## Flujo

```text
Host autenticado o aplicación Meridian
  └── expone meta meridian-api-base-url
        └── Meridian Design solicita GET /ai/interaction-contract
              └── API responde estados y límites seguros
                    └── Design guarda data-api-states en el chat
```

La consulta se realiza con `credentials: include` para respetar la sesión del host, pero Meridian Design no construye tokens, no lee secretos y no ejecuta operaciones privadas desde esta superficie pública. Si la ruta no existe, devuelve un error o no está configurada, la UI no falla: continúa con el contrato local mínimo.

## Contrato visual

El chat mantiene `data-api-contract="interaction/v1"` y representa estos estados:

| Estado API | Estado visual |
|---|---|
| `idle` | El usuario puede escribir o elegir una sugerencia. |
| `loading` | `aria-busy=true`, estado anunciado y acción en progreso. |
| `streaming` | El contenido se actualiza mientras llega la respuesta. |
| `confirmation_required` | La UI debe pedir confirmación antes de una operación sensible. |
| `completed` | La respuesta final está disponible. |
| `error` | Se muestra el problema y una vía de recuperación. |

La versión actual conecta directamente `loading`, `completed` y `error` con el chat público. `streaming` y `confirmation_required` quedan disponibles en `data-api-states` para la siguiente superficie autenticada, sin simular acciones que el chat público no puede ejecutar.

## Límite de seguridad

El chat público no debe enviar JWT, API keys, cookies de terceros ni datos de workspace. Las acciones privadas deben realizarse en Meridian App, donde Meridian API valida bearer token, entitlements, permisos de workspace y límites de uso.

## Verificación

La integración se considera válida cuando los chunks pasan `node --check`, el diff está limpio, el fallback sin API configurada funciona, el endpoint configurado responde sin secretos y el deployment de Meridian Design queda `READY` en Vercel.

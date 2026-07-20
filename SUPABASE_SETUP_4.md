## Memoria y enlace seguro

La migracion crea meridian_public_conversations, meridian_public_messages y meridian_public_context en el mismo proyecto de Supabase que Meridian App. RLS esta activo y no hay escritura directa desde el navegador; solo la Edge Function usa el secreto de servidor.

La pagina detecta correos y URLs. La funcion guarda el contexto, lee texto web con limite y conserva los ultimos mensajes para Gemini. El vinculo a un usuario privado requiere un backend autenticado que envie x-meridian-user-id y x-meridian-sync-token; nunca los envia el navegador.

Si GEMINI_API_KEY falta, el endpoint devuelve 503 de forma explicita.
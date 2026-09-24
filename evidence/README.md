# Capturas técnicas locales · 23 sep 2026

Las tres imágenes de esta carpeta provienen del navegador local en `http://127.0.0.1:4177/dist/`, después de `npm run build`. Muestran portada, formulario y el caso ficticio `RC-015` tras una verificación simulada. La recarga borra `RC-015`, porque no existe persistencia.

Son evidencia de una **prueba técnica local**, no de un despliegue HTTPS, una prueba con conductores, ni un chat fresco de persona. No deben rotularse como esos entregables.

`live-v1-rejected-counter.png` es distinta: proviene del primer despliegue HTTPS y muestra un defecto real del contador. El caso y el motivo son inventados; no representa una entrevista ni una reparación en campo.

`live-v2-rejected-counter.png` muestra la reprueba en una sesión nueva de Chrome tras el segundo despliegue HTTPS: el mismo tipo de caso rechazado sigue contando como abierto. Ambas imágenes son evidencia mecánica de prueba–corrección–redespliegue, no de persona.

`live-v3-versioned-assets.png` muestra la misma corrección en la pestaña que antes conservaba el módulo viejo, tras cargar el documento con una URL de versión. No implica que una pestaña abierta se actualice sola.

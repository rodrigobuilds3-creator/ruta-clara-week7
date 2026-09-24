# Ruta Clara · Week 7 Business Bending

Prototipo académico de la propuesta individual de Rodrigo Peña de León Pérez (Adversary): reporte pagado de riesgos viales, verificación independiente y cierre responsable. Está basado en un Blueprint provisional del Equipo 4, que **aún no documenta votación ni consenso final**. Ese archivo de trabajo no se publica en este repositorio.

## Estado

- Packet pre-código: [`docs/PACKET.md`](docs/PACKET.md), con mockup generado, benchmark, Mermaid, arquitectura, pruebas y condiciones.
- Implementación: mapa ilustrativo, formulario validado, kNN entrenado solo con ejemplos inventados, muestra opt-in de movimiento o simulación, registro de casos y controles de roles simulados.
- Diseño: interfaz renovada de estilo startup, con portada de producto, navegación, estados legibles y adaptación móvil. [Revisión de diseño](docs/DESIGN_REVIEW.md).
- Pruebas: `npm test` (10 pasan al 23 sep 2026). La prueba manual confirmó alta, verificación/pago elegible, validación de muestra vacía y foco en el caso creado.
- Paquete publicable: `npm run build` genera `dist/` con solo cinco archivos estáticos. La versión empaquetada se abrió y revisó en el navegador local; esto **no** es un despliegue público.
- PDF de packet: entregable separado, fuera de este repositorio.
- [Repositorio público de la semana 7](https://github.com/rodrigobuilds3-creator/ruta-clara-week7), con historial de desarrollo. Un flujo de GitHub Pages prueba la app y publica únicamente `dist/`.
- **Pendiente:** confirmar URL HTTPS pública y dos despliegues reales, prueba de persona en chat fresco con capturas, vídeo, BUILDCHAT completo y entrega en Brightspace.
- [Guía para grabar la demo](docs/DEMO_SHOTLIST.md).
- [Protocolo para la prueba de persona](docs/PERSONA_TEST_PROTOCOL.md) (preparado, no ejecutado).
- [Capturas técnicas locales](evidence/README.md) (no reemplazan capturas del chat de persona).

## Ejecutar

Desde esta carpeta:

```bash
python3 -m http.server 4177
```

Abrir `http://127.0.0.1:4177/`. Ejecutar pruebas con `npm test`. Para comprobar exactamente el paquete a publicar, ejecutar `npm run build` y abrir `http://127.0.0.1:4177/dist/` mientras corre el servidor. Publicar **solo `dist/`**, nunca la raíz del repositorio. `dist/` está ignorado por Git y no contiene la documentación ni los PDFs.

No hay servidor de aplicación, base de datos, credenciales, telemetría remota ni persistencia. Los casos desaparecen al recargar. El botón de sensor, si el dispositivo lo soporta, solicita permiso solo al pulsarlo y descarta los eventos crudos tras una ventana de tres segundos. No pruebes con datos reales.

## Límites del prototipo

El mapa no representa un corredor confirmado. El modelo kNN no está validado en campo y no estima seguridad. Las acciones de verificador y autoridad son simulaciones para probar el flujo, no permisos reales. “Pago elegible” no significa dinero transferido. Para un piloto real faltan actores, compensación, protección de datos, baseline, mantenimiento, soporte, prueba con conductores y autorización del equipo.

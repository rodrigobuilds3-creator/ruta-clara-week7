# Ruta Clara · Week 7 Business Bending

Prototipo académico de la propuesta individual de Rodrigo Peña de León Pérez (Adversary): reporte pagado de riesgos viales, verificación independiente y cierre responsable. Está basado en el [Blueprint del Equipo 4](/Users/rodrigopenadeleon/Downloads/BLUEPRINT%2007_team4.pdf), que **aún no documenta votación ni consenso final**.

## Estado

- Packet pre-código: [`docs/PACKET.md`](docs/PACKET.md), con mockup generado, benchmark, Mermaid, arquitectura, pruebas y condiciones.
- Implementación: mapa ilustrativo, formulario validado, kNN entrenado solo con ejemplos inventados, muestra opt-in de movimiento o simulación, registro de casos y controles de roles simulados.
- Pruebas: `node --test tests/*.test.mjs` (9 pasan al 23 sep 2026). La prueba manual confirmó alta, verificación/pago elegible, validación de muestra vacía y foco en el caso creado.
- PDF de packet: `../../../../output/pdf/PACKET_Rodrigo_Pena_WEEK7.pdf`.
- **Pendiente:** URL HTTPS pública, cinco commits, dos despliegues, prueba de persona en chat fresco con capturas, vídeo, BUILDCHAT completo y entrega en Brightspace.

## Ejecutar

Desde esta carpeta:

```bash
python3 -m http.server 4177
```

Abrir `http://127.0.0.1:4177/`. Ejecutar pruebas con `node --test tests/*.test.mjs`.

No hay servidor de aplicación, base de datos, credenciales, telemetría remota ni persistencia. Los casos desaparecen al recargar. El botón de sensor, si el dispositivo lo soporta, solicita permiso solo al pulsarlo y descarta los eventos crudos tras una ventana de tres segundos. No pruebes con datos reales.

## Límites del prototipo

El mapa no representa un corredor confirmado. El modelo kNN no está validado en campo y no estima seguridad. Las acciones de verificador y autoridad son simulaciones para probar el flujo, no permisos reales. “Pago elegible” no significa dinero transferido. Para un piloto real faltan actores, compensación, protección de datos, baseline, mantenimiento, soporte, prueba con conductores y autorización del equipo.

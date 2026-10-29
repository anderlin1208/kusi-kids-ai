# KUSI KIDS AI

Plataforma interactiva de educación inicial (3–5 años) con **26 actividades funcionales**, 8 mundos, motor de refuerzo basado en reglas, narración del dispositivo y paneles docente/familiar. **No utiliza base de datos ni backend.**

## Abrir localmente

Por restricciones de seguridad de los módulos ES, ejecutar con servidor HTTP local:

```bash
python3 -m http.server 8080
```

Abrir `http://localhost:8080`. No requiere `npm install`.

## Publicar en Render

1. Extraer el ZIP y subir su contenido a un repositorio GitHub.
2. Render → New → Static Site → conectar el repositorio.
3. Build Command: `echo "Sitio estático listo"`
4. Publish Directory: `.` (punto).
5. Crear el sitio. Render asignará una URL HTTPS.

Alternativa: Blueprint usando `render.yaml`.

## Qué funciona

- Preguntas con validación, pistas contextualizadas, narración con `speechSynthesis` (si el navegador admite español) y progreso.
- Selección adaptativa básica: tras un error se recomienda reforzar la misma área; tras completar actividades se recomiendan otras del mismo mundo.
- Perfil local anónimo, controles de accesibilidad y paneles con registros locales.
- Un conjunto de estudiantes y resultados **ficticios** se presenta etiquetado como demostración.
- Sin almacenamiento remoto ni recopilación de datos personales de menores.

## Límites

- «AI» es parte del nombre; NO hay modelo de IA generativa ni inferencias clínicas. La adaptación es mediante reglas transparentes.
- Los resultados no prueban impacto educativo. La preparación para primaria no se diagnostica automáticamente.
- La voz depende del navegador y de sus voces instaladas; la app sigue funcionando sin voz.
- Es una herramienta complementaria. Se recomienda acompañamiento adulto y actividades fuera de pantalla.
- Los datos de `localStorage` se guardan únicamente en ese navegador y pueden borrarse.

## Estructura

- `index.html`: punto de entrada.
- `src/app.js`: interacción y vistas.
- `src/content.js`: contenido educativo editable.
- `src/styles.css`: identidad visual responsive.
- `favicon.svg` y `manifest.webmanifest`: icono y manifiesto en la raíz pública.
- `_redirects`: fallback de URLs en Render.

## Aviso de privacidad

No ingreses nombres reales ni información personal de niños. Todos los perfiles de estudiantes de ejemplo son ficticios.

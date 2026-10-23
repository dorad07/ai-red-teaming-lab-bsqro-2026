# AI Red Teaming Lab

Laboratorio web interactivo, determinista y sin dependencias externas para demostrar prompt injection, RAG poisoning, exceso de agencia y evaluación automatizada.

## Ejecución local

Sirve la carpeta `dist` con cualquier servidor estático. Por ejemplo:

```bash
npx serve dist
```

No requiere API keys. Todo dato, herramienta y resultado es sintético.

## GitHub Pages

El workflow `.github/workflows/pages.yml` publica automáticamente el contenido
de `dist` en GitHub Pages cada vez que se actualiza la rama `main`.

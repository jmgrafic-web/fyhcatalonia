# Find Your Haven — sitio web

Sitio estático en Jekyll, listo para GitHub Pages. Cuatro idiomas (EN/ES/NL/FR)
para las páginas fijas, y una colección de artículos (`_articles/`) para la
revista/blog, pensada para ir creciendo sin tocar el resto del sitio.

## Estructura

```
_config.yml         configuración del sitio
_data/strings.yml    textos de interfaz (menú, botones) por idioma
_includes/           cabecera, pie, bloque SEO
_layouts/            plantilla general y plantilla de artículo
_articles/           un archivo .md por artículo — AQUÍ es donde se añade contenido
en/ es/ nl/ fr/       páginas de inicio por idioma
en|es|nl|fr/blog/     índice de la revista por idioma (se genera solo)
assets/               CSS y (cuando los añadas) imágenes
index.html            página raíz: selector de idioma + redirección automática
ARTICLES-GUIA.md      cómo añadir un artículo nuevo — léelo antes de publicar el primero
```

## Desplegar en GitHub Pages (la primera vez)

1. Crea un repositorio nuevo en GitHub y sube todo el contenido de esta carpeta
   a la raíz del repositorio (no lo metas dentro de una subcarpeta).
2. En el repositorio: **Settings → Pages → Build and deployment → Source**,
   elige **Deploy from a branch**, rama `main` (o `master`), carpeta `/ (root)`.
3. Espera 1-2 minutos y GitHub te dará la URL pública (algo como
   `https://tu-usuario.github.io/tu-repo/`).
4. Abre `_config.yml` y cambia el valor de `url:` por esa URL (o por tu dominio
   propio, si vas a conectar uno). Esto es importante para que el `sitemap.xml`,
   las etiquetas `hreflang` y los enlaces de SEO sean correctos.
5. Si conectas un dominio propio (recomendado, tipo `findyourhaven.com`):
   Settings → Pages → Custom domain, y sigue las instrucciones de GitHub para
   los registros DNS. Cuando lo tengas, vuelve a actualizar `url:` en `_config.yml`.

Cada `git push` a la rama principal reconstruye el sitio entero automáticamente
— no hace falta ningún paso manual adicional, ni siquiera para añadir artículos.

## Formularios (captación de clientes)

El sitio tiene **dos formularios**, ambos por Formspree (gratis, sin backend propio):

### 1. Formulario principal — "Solicita tu Informe Preliminar" (en la sección de contacto de cada home)
Es la vía principal de captación: un asistente interactivo de 5 pasos (zona, tipo de inmueble,
presupuesto, reforma y plazo, y datos de contacto) que termina en "En menos de 72h te enviaremos
tu Informe Preliminar". El envío del dossier en sí (con los inmuebles off-market, análisis de zona
y pre-propuesta) lo prepara el equipo de FYH manualmente a partir de las respuestas — este
formulario solo captura el brief de forma ágil y lo manda por email.

Para activarlo:
1. Crea una cuenta gratuita en [formspree.io](https://formspree.io) y un formulario nuevo (uno para
   este uso, o reutiliza el mismo en las 4 versiones si prefieres verlo todo en un solo sitio).
2. Copia su endpoint (`https://formspree.io/f/xxxxxxxx`).
3. Sustitúyelo en el atributo `data-formspree="..."` del `<div class="wizard">` en
   `en/index.html`, `es/index.html`, `nl/index.html` y `fr/index.html`.

El formulario envía vía JavaScript (fetch), sin recargar la página, y muestra el mensaje de
confirmación en el sitio. Las respuestas te llegan por email de Formspree con todas las
respuestas del brief ya legibles (zona, presupuesto, etc.), listas para que el equipo prepare el
Informe Preliminar.

### 2. Guía gratuita — lead magnet ("Comprar en la Costa Brava 2026")
Un PDF ya generado (`assets/downloads/guia-costa-brava-2026.pdf`) que se entrega a quien deja su
email desde el buscador de la Revista (`es/blog/index.html`). Es un formulario más simple, sin
JavaScript: al enviarlo, Formspree redirige a `/es/gracias-guia/`, página que muestra el botón de
descarga del PDF.

Para activarlo: mismo proceso — crea un formulario en Formspree y sustituye
`https://formspree.io/f/TU_ID_FORMSPREE` en `es/blog/index.html` (bloque `.leadbox`).

De momento la guía solo existe en español. Si quieres la versión en inglés, holandés o francés,
podemos traducir el mismo PDF y replicar el bloque `.leadbox` (y la página de gracias) en
`en/blog/index.html`, `nl/blog/index.html` y `fr/blog/index.html`.

### Antes de lanzar
- Antes de recoger datos personales de verdad (nombre, email, teléfono) en producción, conviene
  tener una política de privacidad enlazada desde el aviso de consentimiento del wizard — de
  momento el texto es genérico y no enlaza a ninguna página legal.
- El endpoint de Formspree en el plan gratuito tiene un límite mensual de envíos; revisa el plan
  si esperas mucho volumen.


## Vista previa en local (opcional)

Si tienes Ruby instalado:

```bash
bundle install
bundle exec jekyll serve
```

Y abre `http://localhost:4000`. No es obligatorio: puedes desplegar directamente
en GitHub Pages y revisar los cambios ahí, como comentabas que harías.

## Pendiente antes de pasar a producción

- [ ] Cambiar `url:` en `_config.yml` por el dominio o URL final.
- [ ] Activar los dos formularios con Formspree (ver sección "Formularios" arriba).
- [ ] Sustituir el email `hello@findyourhaven.com` si el definitivo es otro
      (aparece en el pie de página y en las 4 páginas de inicio).
- [ ] Añadir una imagen `assets/img/og-cover.jpg` (1200×630 px) para que los
      enlaces compartidos en redes sociales muestren una imagen — de momento
      esa etiqueta apunta a un archivo que no existe.
- [ ] Revisar los textos legales (política de privacidad, cookies) antes de recoger datos
      reales a través de los formularios.

`assets/downloads/_guide-source.html` es el HTML fuente con el que se generó el PDF de la
guía gratuita (por si quieres editar su contenido y volver a exportarlo a PDF); no es una
página del sitio y puedes borrarla si no la vas a tocar.

## Añadir artículos nuevos

Lee **ARTICLES-GUIA.md** — es el flujo completo, pensado para que escribamos el
contenido juntos y tú solo tengas que copiar un archivo y hacer `git push`.

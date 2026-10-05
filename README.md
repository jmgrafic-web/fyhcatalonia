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

## Identidad visual (colores y tipografía)

- **Azul corporativo: `#405C70`** (el del imagotipo y el dossier de colaboradores). Está en `assets/css/main.css`
  como `--med`; de él salen `--med-deep` (#22333F, bloques oscuros y menú móvil) y `--med-light` (#6D94B0).
  Al cambiar esas tres líneas cambia el azul de toda la web. Los valores anteriores (#2B5F7A / #163B4E / #4A8BA8)
  quedan anotados en un comentario justo debajo, por si hay que volver atrás.
- Tipografía: Cormorant Garamond (títulos) y DM Sans (texto). Acento cálido: `--accent` #C4956A.
- La **página raíz** (`index.html`, selector de idioma) usa ahora la misma foto, imagotipo y tipografías que la web.
  El navegador entra directo al primer idioma preferido del usuario que esté disponible (EN, ES, NL, FR).
- **Página 404** de marca (`404.html`), en los 4 idiomas y marcada como `noindex`.
- **PDF de la guía gratuita**, en los 4 idiomas, con esta identidad (imagotipo, fuentes y azul corporativo; texto
  seleccionable). Se generan desde `_guides/` (ver "Guía gratuita" más abajo).

## Imagotipo y favicons

El imagotipo se carga desde `assets/img/brand/` tal y como se entregó (sin tocar):
`fyh-mark-white(-sm).png` sobre la portada y `fyh-mark-blue(-sm).png` cuando la cabecera pasa a
fondo claro (al hacer scroll y en las páginas interiores). La versión pequeña (`-sm`) es la que
se ve en la cabecera; la grande se carga solo en pantallas de muy alta densidad. Tamaño: 28 px de alto.
Los favicons (`favicon-32.png`, `favicon-192.png`, `apple-touch-icon.png`) están hechos con ese
mismo imagotipo sobre fondo blanco cálido, para que se vean bien también en pestañas oscuras.

## Carrusel de imágenes del hero (portada)

La portada de cada idioma alterna dos imágenes de fondo: primero la del mar desde la terraza
(la de la marca) y después la cala de la Costa Brava. Cambian solas cada 10 segundos, o cuando
el usuario pulsa las flechas, los indicadores o desliza el dedo; se pausan al pasar el ratón
por los controles y no cambian solas si el usuario tiene activado "reducir movimiento".

- La imagen del mar tiene una versión por dispositivo (`assets/img/hero/`): escritorio (16:9),
  tablet vertical (3:4) y móvil vertical (9:16), cada una en WebP y JPG. El navegador elige la
  que corresponde; en horizontal (incluido un móvil girado) usa la de escritorio.
- Para cambiar la velocidad: `data-interval="10000"` (milisegundos) en `<section class="hero">`.
- Para añadir una tercera imagen: copia un bloque `<div class="hero-slide">…</div>` dentro de
  `.hero-bg` en los 4 `index.html`. Los indicadores y flechas se ajustan solos.
- Si una imagen es muy clara (como la del mar), añade la clase `hero-slide--light` a su
  diapositiva: aplica un velo azul más firme para que el texto blanco se lea.

## SEO: cómo está montado

- **hreflang** completo entre las 4 versiones de cada página (cada una se lista a sí misma), con `x-default` al inglés.
- Datos estructurados: `Organization` (portadas), `Article` y `BreadcrumbList` (artículos).
- Un H1 por página; títulos ≤ 62 caracteres y metadescripciones de 120-160 en todos los artículos.
- Enlazado interno: lecturas relacionadas curadas, 2-6 enlaces contextuales por artículo, portada → artículos,
  pie de página → guías principales, selector de idioma → mismo artículo en otro idioma.
- Sitemap automático (`jekyll-sitemap`); `noindex` en la 404 y en las páginas de agradecimiento.

## Nota sobre la URL actual

Este paquete está configurado para publicarse en `https://jmgrafic-web.github.io/fyhcatalonia/`
(repo de proyecto llamado `fyhcatalonia`). Todo el sitio usa `site.baseurl` internamente para
que los enlaces, el CSS y el JS funcionen correctamente bajo esa subcarpeta — no hace falta
tocar nada más para que funcione tal cual.

Si en el futuro **renombras el repo** o **conectas un dominio propio**, solo tienes que editar
dos líneas en `_config.yml`:
- `url:` → tu nuevo dominio (o `https://jmgrafic-web.github.io` si usas un dominio propio con este mismo repo)
- `baseurl:` → `""` (vacío) si el sitio pasa a vivir en la raíz del dominio, o `"/nuevo-nombre-repo"` si sigue siendo un repo de proyecto con otro nombre

Después de cambiar esas dos líneas, haz commit — GitHub reconstruye el sitio solo.

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
Hay un PDF por idioma (`assets/downloads/`): `guia-costa-brava-2026.pdf` (ES), `costa-brava-buying-guide-2026.pdf` (EN),
`costa-brava-koopgids-2026.pdf` (NL) y `guide-achat-costa-brava-2026.pdf` (FR). Se entregan a quien deja su email en
dos sitios: el bloque azul "Mantente informado" de la portada y el recuadro de la guía en el índice de la Revista.
Son formularios simples, sin JavaScript: al enviarlos, Formspree redirige a la página de agradecimiento del mismo
idioma, que muestra el botón de descarga (y, debajo, el paso al Informe Preliminar):

| Idioma | Página de agradecimiento |
|---|---|
| ES | `/es/gracias-guia/` |
| EN | `/en/thank-you-guide/` |
| NL | `/nl/bedankt-gids/` |
| FR | `/fr/merci-guide/` |

Esas páginas están marcadas `noindex` y fuera del sitemap. Para activarlo: crea un formulario en Formspree y
sustituye `TU_ID_FORMSPREE` / `YOUR_FORMSPREE_ID` en el bloque `.newsletter-form` de las 4 portadas y en el bloque
`.leadbox` de los 4 `blog/index.html`.

**Cambiar el contenido de la guía:** los textos de los 4 idiomas están en `_guides/build_guides.py` (diccionario `STR`) y
el diseño en `_guides/head.tpl`. Tras editar, `python3 _guides/build_guides.py` regenera los 4 PDF (necesita
`wkhtmltopdf` y las fuentes Cormorant Garamond / DM Sans instaladas con los nombres de familia indicados en el script).
Esa carpeta empieza por `_`, así que Jekyll no la publica.

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
- [x] Imagen para compartir en redes (`assets/img/og-cover.jpg`, 1200×630): ya creada a partir de la foto del mar.
- [ ] Revisar los textos legales (política de privacidad, cookies) antes de recoger datos
      reales a través de los formularios.



## Añadir artículos nuevos

Lee **ARTICLES-GUIA.md**: explica el encabezado de cada artículo (incluido el bloque `translations` con las 4 versiones
y las 3 "lecturas relacionadas"), cómo enlazar entre artículos y a la home, y qué hace el sitio automáticamente
(migas de pan, datos estructurados, columna "Guías" del pie, sitemap). Hoy hay 72 artículos: 18 por idioma.

# Cómo añadir un artículo nuevo a la Revista FYH

Esto es lo único que hace falta para publicar un artículo nuevo. No hay que tocar
ninguna otra página del sitio: ni la home, ni el índice de la revista, ni el menú.
Todo eso se actualiza solo en el momento en que GitHub Pages reconstruye el sitio.

## 1. Crea un archivo nuevo dentro de `_articles/`

Nombre del archivo: `{idioma}-{slug-descriptivo}.md`, por ejemplo:

```
_articles/es-guia-comprar-vivienda-sitges.md
_articles/en-buying-property-sitges-guide.md
```

## 2. Pega este encabezado (front matter) al principio, y complétalo

```yaml
---
layout: article
lang: es                      # es | en | nl | fr
topic: Guías de compra        # categoría corta, se muestra como etiqueta
title: "Título del artículo"
description: "Meta-descripción de 1-2 frases para SEO (150-160 caracteres)."
date: 2026-03-02
permalink: /es/blog/guia-comprar-vivienda-sitges/
image: "https://images.unsplash.com/photo-XXXXXXXXXXXXX-XXXXXXXXXXXX?auto=format&fit=crop&w=1800&q=75"
cta_body: "Frase de cierre invitando a contactar."
---
```

- `permalink` decide la URL final. Sigue siempre el patrón `/{idioma}/blog/{slug}/`.
- `image` es la foto de cabecera del artículo (y la miniatura en el índice de la revista).
  Usa una foto libre de Unsplash o Pexels: abre la foto en unsplash.com o pexels.com, copia la
  URL de la imagen (no la de la página) y añade `?auto=format&fit=crop&w=1800&q=75` al final
  (en Pexels: `?auto=compress&cs=tinysrgb&w=1800`). Pide a Claude que te busque una si no tienes
  ninguna a mano — dile el tema del artículo y te devuelve la URL ya lista para pegar aquí.
- `date` decide el orden en el listado de la revista (el más reciente, primero).
- Si más adelante traduces el mismo artículo a otro idioma, puedes enlazar ambas
  versiones añadiendo un bloque `translations:` igual al de las páginas de inicio,
  para que Google entienda que son la misma pieza en distintos idiomas:

```yaml
translations:
  es: /es/blog/guia-comprar-vivienda-sitges/
  en: /en/blog/buying-property-sitges-guide/
```

## 3. Escribe el contenido en Markdown, debajo del `---` final

Títulos con `##`, listas con `-`, negrita con `**así**`. El artículo hereda
automáticamente la cabecera, el pie, la tipografía y el bloque de contacto —
no hace falta ni HTML ni CSS.

Enlaza siempre a otros artículos o a secciones de la home cuando tenga sentido
(`/es/#servicios`, `/es/blog/otro-articulo/`) — el enlazado interno es una parte
importante del SEO de la revista.

## 4. Sube el archivo y haz push

```bash
git add _articles/es-guia-comprar-vivienda-sitges.md
git commit -m "Nuevo artículo: guía para comprar en Sitges"
git push
```

GitHub Pages reconstruye el sitio entero automáticamente en segundo plano
(tarda entre 30 segundos y un par de minutos). El artículo nuevo aparece solo
en el índice de la revista de su idioma — no hay que editarlo a mano.

## Cómo pedirme un artículo nuevo

Dime el tema y el idioma, por ejemplo:
"Escribe un artículo en inglés sobre cómo financiar una segunda residencia en España
siendo no residente." Te devuelvo el archivo `.md` completo, listo para copiar dentro
de `_articles/` y hacer push. No hace falta que me digas nada más — yo me encargo del
`permalink`, la meta-descripción y la estructura.

## Ideas de temas con buen potencial SEO (para ir ampliando)

- Financiación e hipotecas para no residentes en España
- Golden Visa: requisitos y cambios recientes
- Alquiler vacacional en Cataluña: licencia y normativa
- Vivir todo el año en la Costa Brava: sanidad, colegios, vida diaria
- Arquitectura mediterránea: qué buscar en una vivienda de los años 60-70
- Cadaqués, Begur, Llafranc: diferencias entre los pueblos de la Costa Brava
- Comprar para alquilar: rentabilidad real de una vivienda vacacional
- Errores legales más comunes al comprar sin abogado propio

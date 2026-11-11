# Roma by Barbies

Primera versión estática de la tienda de perfumes, con las imágenes aportadas por la marca.

## Vista previa

Desde esta carpeta: `node preview.mjs`, luego abrir `http://127.0.0.1:4180`.

## Catálogo

- `public/app.js`: 122 productos transcritos de los dos catálogos: 73 femeninos, 38 masculinos y 11 unisex. Flower de Kenzo aparece dos veces en la lámina femenina y se conserva una sola ficha. El archivo feminine-products.js contiene las incorporaciones femeninas.
- `public/assets/perfumes/`: una imagen individual por perfume, numerada según su ID en el catálogo.
- `public/assets/replicas/<slug>.jpg`: foto real del envase propio de Nova Roma para la vista de detalle (el `<slug>` es el Identificador de URL del producto, el mismo del CSV de carga masiva). La lista de réplicas con foto vive en `public/detail-view.js` (`replicaSlugs`); cada tanda nueva agrega sus slugs ahí y sus archivos acá. Sin foto, el detalle sigue mostrando el envase ilustrativo CSS de `public/packaging.css`.
- Las imágenes reconstruidas son ilustrativas para las tarjetas. Las fotos definitivas, variantes, notas, presentaciones y precios deben completarse con información de la marca.
- `public/assets/catalogo-original.jpg`: referencia original conservada.
- `public/styles.css`: identidad visual, catálogo y adaptación a pantallas pequeñas.

## Imágenes

Se utiliza la herramienta integrada ImageGen para reconstruir cada miniatura por separado. Criterio común: conservar silueta, color, tapa y orientación del frasco de referencia, con fondo marfil `#fff8fc`, sombra suave, producto completo y centrado. No se pretende recuperar información exacta que no existe en la fuente pequeña.

Las imágenes de góndola y las fotos de detalle son recursos distintos; estas últimas quedan a cargo de la marca. No se inventan precios ni disponibilidad de compra.


Para incorporar una foto de detalle real, agregar `detailImage` al producto con la ruta del archivo en `public/`. La imagen de góndola permanece en `image`; así se pueden actualizar por separado.

- Réplicas con foto: las 122 fragancias ya tienen su foto propia en `assets/replicas/<slug>.jpg` y su perfil completo en `detail-profiles.js` (familia, notas, descripción y ocasiones).

# Imágenes de góndola

Herramienta: ImageGen integrada. 122 imágenes individuales entre los dos catálogos, una llamada por producto. Nombres e identificación de archivos en `restoration-manifest.json`. Los originales PNG se conservan en `output/imagegen/`; los JPEG que usa el sitio están en `public/assets/perfumes/`.

## Prompt común

Use case: precise-object-edit. Asset type: individual ecommerce perfume shelf thumbnail. Input: the supplied perfume catalog sheet is the edit target. Isolate ONLY [PRODUCT] by [BRAND], located [ROW IN ORIGINAL SHEET]. Restore that exact tiny bottle into a sharp realistic studio product photograph, preserving its recognizable silhouette, proportions, front orientation, colors, cap and visible branding from the reference. ONE upright bottle centered on plain warm ivory #fff8fc seamless background, full bottle visible, 70% of square image height, subtle grounded shadow, consistent soft studio lighting, crisp glass/metal details. Do not reproduce the sheet, surrounding text, other perfumes, cards, packaging boxes, props or decorations. No added headings or overlay text. Do not invent unsupported label details. This is a reference-based reconstructed listing image; fidelity to that specific source bottle is essential. Output one square product image.

Las cuatro primeras imágenes usaron el mismo criterio de reconstrucción, con variaciones de redacción. Se revisaron las exportaciones en conjunto para comprobar asignación, encuadre y legibilidad en miniatura. La fuente pequeña limita la fidelidad exacta de etiquetas y detalles: son imágenes ilustrativas para la góndola. Las fotos de detalle definitivas quedan a cargo de la marca.

## Catálogo femenino

Fuente: `public/assets/catalogo-femeninas-original.jpg`. Se conservan 73 productos distintos; Flower de Kenzo aparece dos veces en la fuente y usa una sola ficha. IDs 50 a 122, con nombres, marcas y posición en la lámina en `public/feminine-products.js`; fuentes de las imágenes generadas en `feminine-restoration-manifest.json`.

Se aplica el mismo prompt común, indicando que se trata de la lámina rosa de fragancias femeninas y añadiendo la descripción visual del frasco correspondiente. Invariantes adicionales: conservar los colores reales del frasco, no recolorearlo para igualar la paleta de la web, no inventar una marca cuando no se indica. Fondo de todas las imágenes: blanco nube `#fff8fc`.

La paleta de las secciones se conserva por separado: Femeninas usa rosa pétalo y lavanda; Masculinas usa celeste y ciruela; Unisex usa blanco nube y fucsia. Las fotos de detalle y los datos comerciales quedan pendientes del material de la marca.

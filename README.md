# Mercadona Catalog - Prueba Frontend Angular
Este proyecto es una aplicación frontend en Angular para un catálogo de productos jerárquico (prueba técnica Mercadona).

# Instalación de Dependencias
`npm install`

## Carpeta del proyecto
1) Asegúrate de estar en la carpeta raíz del proyecto:
cd mercadona-catalog
2) Para levantar la aplicación en modo desarrollo introduce `npm start` y abre tu navegador en ruta http://localhost:4200/:


## Estructura del proyecto
src/app/core/ → Servicios, interfaces y enums.
src/app/shared/ → Componentes presentacionales, como tarjetas de productos, layout, buscador y ordenación.
src/app/features/ → Componentes inteligentes que coordinarán la lógica de navegación del catálogo, selección de productos y botón "Atrás".
src/app/app.component.html → Layout base con dos columnas y scroll independiente.
src/assets/ → Archivos estáticos (productos.json)
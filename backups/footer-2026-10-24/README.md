# Respaldo del footer anterior

Estado publicado: commit `6d5bc5d92950b6f50cd1a70a966e45060cb942f6`.
Guardado antes de implementar la propuesta editorial aprobada.

- SharedHomeSections.tsx.txt: componente anterior completo como referencia.
- footer-credits.css: estilos anteriores, sin modificar.

Para volver al diseño anterior SIN deshacer otros cambios:
1. Reemplazar únicamente el bloque <footer> de SharedHomeSections.tsx por el bloque de esta copia.
2. Eliminar de ese componente la importación de EditorialFooter.
3. Quitar de app/layout.tsx la importación de editorial-footer.css.
4. Actualizar la prueba de footer editorial, compilar, comprobar y publicar.

No restaurar todo el componente si hubo cambios posteriores en el formulario o video.
No hacer reset de main. El respaldo no se sirve como parte del sitio público.

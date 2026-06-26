# Taller de Computadoras — Consola

Sistema de consola para gestionar un taller de computadoras:
- **Computadoras**: registrar, mostrar, actualizar y eliminar computadoras (nuevas, en mantenimiento, reparadas).
- **Repuestos**: registrar, mostrar, actualizar y eliminar repuestos en inventario.

Construido con arquitectura Model / Controller / Helper, usando `inquirer` para los menús interactivos y `chalk` para dar color a la consola.

## Operaciones disponibles (CRUD)

Cada menú (Computadoras / Repuestos) ofrece:
1. **Mostrar**: lista todos los registros en formato tabla.
2. **Registrar**: pide los datos, valida que no estén vacíos/duplicados y guarda.
3. **Actualizar**: selecciona un registro existente de una lista, permite editar sus campos (con el valor actual como default) y guarda los cambios.
4. **Eliminar**: selecciona un registro de una lista y pide confirmación antes de borrarlo definitivamente.

## Datos guardados

### Computadora
- `marca`
- `modelo`
- `numeroSerie` (único, se valida que no se repita al crear)
- `estado`: Nueva | En mantenimiento | Reparada

### Repuesto
- `nombre` (único, se valida que no se repita al crear)
- `categoria`: RAM, Almacenamiento, Fuente de poder, Placa madre, Procesador, Tarjeta de video, Cooler, Otro
- `cantidad`
- `precio`

## Autores
- Leison David Duarte González — estructura base del proyecto, README y datos de ejemplo
- Lesbin Leonardo Diaz Medina — modelos de datos (incluyendo update/delete) e integración con los controladores

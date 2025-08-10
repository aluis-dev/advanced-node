# Node.js Fundamentals

Este proyecto es una colección de ejemplos prácticos que demuestran conceptos fundamentales de Node.js, enfocándose principalmente en Buffers y Streams.

## Estructura del Proyecto

```
.
├── buffers/
│   ├── alloc_vs_alloc_unsafe.ts    # Comparación de métodos de asignación de buffer
│   └── buffer_unsafe.ts            # Ejemplos de uso de buffers no seguros
├── streams/
│   ├── copy-with-custom-streams.ts # Copia de archivos con streams personalizados
│   ├── copy-with-one-buffer.ts     # Copia de archivos usando un único buffer
│   ├── copy-with-pipe.ts          # Copia de archivos usando pipe()
│   ├── read.ts                     # Ejemplo de lectura de streams
│   └── write.ts                    # Ejemplo de escritura de streams
└── package.json
```

## Características

### Buffers
- Implementación de diferentes métodos de asignación de memoria con buffers
- Comparación de rendimiento entre `Buffer.alloc()` y `Buffer.allocUnsafe()`
- Ejemplos de manejo de memoria y optimización

### Streams
- Diferentes métodos de copia de archivos usando streams
- Implementación de streams de lectura y escritura
- Manejo de backpressure
- Uso de pipes para transferencia de datos eficiente

## Requisitos

- Node.js (versión que soporte ESM)
- TypeScript

## Instalación

1. Clonar el repositorio
```bash
git clone https://github.com/aluis-dev/advanced-node.git
cd advanced-node
```

2. Instalar dependencias
```bash
npm install
```

## Uso

Los ejemplos están organizados en directorios temáticos. Cada archivo TypeScript es un ejemplo independiente que se puede ejecutar directamente:

```bash
# Para ejecutar ejemplos de buffers
npx ts-node buffers/alloc_vs_alloc_unsafe.ts

# Para ejecutar ejemplos de streams
npx ts-node streams/write.ts
```

## Ejemplos Destacados

### Manejo de Buffers
El proyecto incluye ejemplos de cómo trabajar con buffers en Node.js, demostrando las diferencias entre métodos seguros e inseguros de asignación de memoria.

### Operaciones con Streams
- **Escritura de Streams**: Ejemplo de cómo escribir grandes cantidades de datos manejando el backpressure.
- **Lectura de Streams**: Implementación de lectura eficiente de archivos.
- **Pipes**: Demostración del uso de pipes para transferencia de datos eficiente.

## Licencia

MIT

---

Desarrollado como parte de una serie de ejemplos avanzados de Node.js para demostrar conceptos fundamentales de la plataforma.

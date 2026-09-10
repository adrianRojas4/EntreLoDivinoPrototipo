# Entre lo Divino - Prototipo Interactivo

Prototipo interactivo y prueba de concepto para la tienda online **"Entre lo Divino"**, desarrollada con **Next.js (App Router)** y **Tailwind CSS**.

Incluye:
- **Vista de Vitrina (Storefront):** Grilla minimalista y elegante de productos con filtros por categoría y ordenamiento por precio.
- **Detalle de Producto Interactivo:**
  - Lupa de aumento interactiva con zoom en alta resolución (`react-inner-image-zoom`).
  - Reproductor de video demostrativo responsive para prendas/accesorios (`react-player`).
- **Paleta de Colores Modular:** Configurable al 100% mediante variables CSS en `src/app/globals.css`.

---

## Requisitos Previos

- **[Node.js](https://nodejs.org/)** versión **18.18.0** o superior (recomendado **Node.js 20+**).
- Gestor de paquetes **npm** (incluido por defecto con Node.js).

---

## Cómo ejecutar el proyecto localmente

Si has clonado o descargado este repositorio en tu máquina, sigue estos pasos:

### 1. Clonar el repositorio y entrar a la carpeta
```bash
git clone https://github.com/adrianRojas4/EntreLoDivinoPrototipo.git
cd EntreLoDivinoDemo
```

### 2. Instalar las dependencias
Descarga todas las librerías necesarias ejecutando:
```bash
npm install
```

### 3. Iniciar el servidor de desarrollo
```bash
npm run dev
```

### 4. Abrir en el navegador
Abre [http://localhost:3000](http://localhost:3000) en tu navegador web para interactuar con la demo.

---

## Scripts Disponibles

- `npm run dev`: Inicia el entorno de desarrollo local con recarga en caliente.
- `npm run build`: Genera la compilación de producción optimizada.
- `npm run start`: Inicia la aplicación en modo producción una vez compilada.
- `npm run lint`: Ejecuta el linter de ESLint.

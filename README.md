# SHOEMMELIER

Bienvenido a Shoemmelier, una aplicación para coleccionistas, donde poder alojar una base de datos de tú colección. Esta aplicación te permite ver diferentes modelos de zapatillas, buscar por estado, añadir nuevas zapatillas, editarlas, y borrarlas en caso de que sea necesario.

## Características

- Explora una amplia selección de zapatillas de moda.
- Filtra las zapatillas por estado.
- Regístrate como usuario para guardar tu colección.
- Gestiona tu perfil y actualiza tus datos personales.

## Tecnologías utilizadas

- Frontend: React.ts, React Router, CSS Modules
- Backend: Node.js, Express.js, MongoDB, Mongoose
- Autenticación y autorización: JWT, bcrypt
- Pruebas: Jest, React Testing Library
- Otros: HTML5, SCSS

## Instalación

1. Clona este repositorio en tu máquina local.
2. Navega hasta la carpeta del proyecto: `cd shoemmelier`.
3. Instala las dependencias del servidor: `npm install`.
4. Inicia el servidor y el cliente de forma simultánea: `npm run dev`.
5. Abre tu navegador y visita la aplicación en `http://localhost:5173`.

## Configuración del servidor

Para que la aplicación funcione correctamente, debes configurar algunas variables de entorno en el servidor. Crea un archivo `.env` en la carpeta raíz del servidor y proporciona los siguientes valores:

PORT=4206
MONGODB_URI=<URL_de_tu_base_de_datos_MongoDB>
JWT_SECRET=<clave_secreta_para_generar_tokens_JWT>

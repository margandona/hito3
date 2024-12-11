const express = require("express"); 
// Importa el módulo Express para crear una aplicación backend.

const usersRouter = require("./routes/users"); 
// Importa el enrutador definido en el archivo "users.js". 
// Este archivo debe contener las rutas para manejar las solicitudes relacionadas con los usuarios.

const app = express(); 
// Crea una instancia de la aplicación Express. 
// Esta instancia será utilizada para definir middleware y manejar rutas.

app.use(express.json()); 
// Middleware para analizar cuerpos de solicitudes JSON.
// Esto permite que el servidor procese solicitudes con contenido tipo JSON.

app.use("/api", usersRouter); 
// Monta el enrutador de usuarios en la ruta base "/api".
// Todas las rutas definidas en `users.js` estarán disponibles bajo "/api" (por ejemplo, "/api/users").

module.exports = app; 
// Exporta la instancia de la aplicación para que pueda ser utilizada en otros archivos, 
// como el servidor o los archivos de prueba.

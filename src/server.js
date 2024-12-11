const app = require("./app"); 
// Importa la instancia de la aplicación Express desde el archivo "app.js". 
// Este archivo contiene toda la configuración de rutas y middlewares.

const PORT = 4000; 
// Define el puerto en el que el servidor escuchará las solicitudes. 
// Aquí está configurado para usar el puerto 4000. Este valor podría cambiar según el entorno (desarrollo o producción).

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    // Inicia el servidor en el puerto especificado y registra un mensaje en la consola para indicar que el servidor está funcionando correctamente.
});

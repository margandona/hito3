const express = require("express"); 
// Importa el módulo Express para crear rutas específicas para los usuarios.

const router = express.Router(); 
// Crea un enrutador que agrupa las rutas relacionadas con los usuarios.

const {
  getUsersMock,
  getUserById,
  getUsersByStatus,
  getUsersByRole,
} = require("../mocks/users.mock"); 
// Importa funciones del mock de usuarios que permiten acceder y filtrar datos simulados.

// Middleware para validar el ID
const validateId = (req, res, next) => {
  const id = req.params.id; 
  // Obtiene el parámetro "id" de la solicitud.

  if (!/^\d+$/.test(id)) {
    // Verifica si el ID no es un número válido (solo dígitos).
    return res.status(400).json({ message: "Invalid ID format" }); 
    // Responde con un error 400 si el ID no es válido.
  }

  next(); 
  // Si el ID es válido, pasa el control al siguiente middleware o manejador de la ruta.
};

// Middleware para validar parámetros de consulta
const validateQuery = (req, res, next) => {
  const { isActive, role } = req.query; 
  // Obtiene los parámetros de consulta "isActive" y "role".

  if (isActive !== undefined && isActive !== "true" && isActive !== "false") {
    // Valida que el parámetro "isActive" sea "true" o "false" si está definido.
    return res.status(400).json({ message: "Invalid isActive value" });
  }

  if (role !== undefined && typeof role !== "string") {
    // Valida que el parámetro "role" sea una cadena de texto si está definido.
    return res.status(400).json({ message: "Invalid role value" });
  }

  next(); 
  // Si los parámetros son válidos, pasa el control al siguiente middleware o manejador de la ruta.
};

// Rutas

/**
 * GET /api/users
 * Devuelve todos los usuarios o aplica filtros según query params (isActive, role)
 */
router.get("/users", validateQuery, (req, res) => {
  const { isActive, role } = req.query; 
  // Extrae los parámetros de consulta "isActive" y "role".

  let users = getUsersMock(); 
  // Obtiene todos los usuarios del mock.

  if (isActive !== undefined) {
    // Filtra por estado activo/inactivo si "isActive" está definido.
    const status = isActive === "true"; 
    users = getUsersByStatus(status);
  }

  if (role !== undefined) {
    // Filtra por rol si "role" está definido.
    users = getUsersByRole(role);
  }

  res.status(200).json(users); 
  // Responde con la lista filtrada de usuarios.
});

/**
 * GET /api/users/:id
 * Devuelve un usuario por ID
 */
router.get("/users/:id", validateId, (req, res) => {
  const userId = parseInt(req.params.id, 10); 
  // Convierte el ID recibido como parámetro en un número entero.

  const user = getUserById(userId); 
  // Busca el usuario en el mock por su ID.

  if (!user) {
    // Si el usuario no existe, responde con un error 404.
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user); 
  // Si el usuario existe, responde con sus datos.
});

/**
 * Middleware para manejar rutas no encontradas
 */
router.use((req, res) => {
  res.status(404).json({ message: "Route not found" }); 
  // Responde con un error 404 si la ruta no coincide con ninguna definida.
});

module.exports = router; 
// Exporta el enrutador para que pueda ser utilizado en otros archivos (por ejemplo, en "app.js").

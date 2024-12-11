// Mock de usuarios: lista de objetos representando usuarios
const usersMock = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "admin",
      isActive: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "user",
      isActive: false,
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      role: "user",
      isActive: true,
    },
    {
      id: 4,
      name: "Bob Brown",
      email: "bob.brown@example.com",
      role: "moderator",
      isActive: true,
    },
  ];
  // Este array representa un conjunto de usuarios simulados que se usarán para pruebas.
  // Cada usuario tiene un ID, nombre, email, rol y estado activo o inactivo.
  
  /**
   * Devuelve una copia del mock completo de usuarios.
   * @returns {Array} Lista de usuarios.
   */
  const getUsersMock = () => [...usersMock];
  
  /**
   * Busca un usuario por su ID.
   * @param {number} id - ID del usuario a buscar.
   * @returns {Object|null} El usuario encontrado o null si no existe.
   */
  const getUserById = (id) => {
    const user = usersMock.find((user) => user.id === id);
    return user || null; // Si no encuentra el usuario, devuelve null.
  };
  
  /**
   * Filtra usuarios por su estado (activo/inactivo).
   * @param {boolean|string} isActive - Estado del usuario: true, false, o como string ("true"/"false").
   * @returns {Array} Lista de usuarios filtrados por estado.
   */
  const getUsersByStatus = (isActive) => {
    const status = typeof isActive === "boolean" ? isActive : Boolean(isActive);
    // Convierte isActive a boolean si no lo es.
    return usersMock.filter((user) => user.isActive === status);
  };
  
  /**
   * Filtra usuarios por su rol.
   * @param {string} role - Rol del usuario (ejemplo: "admin", "user").
   * @returns {Array} Lista de usuarios filtrados por rol.
   */
  const getUsersByRole = (role) => {
    if (!role) return []; // Devuelve un array vacío si no se proporciona un rol.
    return usersMock.filter((user) => user.role.toLowerCase() === role.toLowerCase());
  };
  
  /**
   * Filtra usuarios por múltiples criterios.
   * @param {Object} filters - Filtros aplicables: isActive, role.
   * @returns {Array} Lista de usuarios que coinciden con los filtros.
   */
  const filterUsers = ({ isActive, role }) => {
    let result = [...usersMock]; // Crea una copia del mock inicial.
  
    if (isActive !== undefined) {
      // Si isActive está definido, filtra por estado.
      result = result.filter((user) => user.isActive === (isActive === "true"));
    }
  
    if (role) {
      // Si role está definido, filtra por rol.
      result = result.filter((user) => user.role.toLowerCase() === role.toLowerCase());
    }
  
    return result; // Devuelve la lista filtrada.
  };
  
  module.exports = {
    getUsersMock, // Exporta la función para obtener el mock completo.
    getUserById, // Exporta la función para buscar un usuario por ID.
    getUsersByStatus, // Exporta la función para filtrar usuarios por estado.
    getUsersByRole, // Exporta la función para filtrar usuarios por rol.
    filterUsers, // Exporta la función para filtrar usuarios por múltiples criterios.
  };
  
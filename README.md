
# **Proyecto Backend en Node.js**

Este proyecto es una aplicación backend desarrollada con **Node.js** y  **Express** . Incluye un mock de datos para usuarios y soporta pruebas automatizadas con **Jest** y  **Supertest** .

---

## **Características**

* API REST para la gestión de usuarios.
* Mock de datos con roles, estado activo/inactivo, y otros atributos.
* Filtros avanzados por estado (`isActive`) y rol (`role`).
* Gestión de errores para entradas inválidas y rutas no existentes.
* Pruebas unitarias y funcionales con **Jest** y  **Supertest** .

---

## **Requisitos Previos**

Antes de ejecutar el proyecto, asegúrate de tener instalado:

* **Node.js** (versión 16 o superior)
* **npm** (instalado junto con Node.js)

---

## **Instalación**

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/backend-node.git
   cd backend-node
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```

---

## **Ejecución**

Para iniciar el servidor:

```bash
npm start
```

El servidor estará disponible en `http://localhost:4000`.

---

## **Ejecución en Desarrollo**

Para reiniciar automáticamente el servidor al realizar cambios:

```bash
npm run dev
```

---

## **Rutas del API**

### **GET /api/users**

Obtiene todos los usuarios o aplica filtros:

* **Parámetros opcionales:**
  * `isActive` (`true` | `false`): Filtra usuarios activos o inactivos.
  * `role` (`string`): Filtra usuarios por rol.

#### **Ejemplo de Respuesta**

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "admin",
    "isActive": true
  }
]
```

---

### **GET /api/users/:id**

Obtiene un usuario específico por su ID.

#### **Ejemplo de Respuesta**

**Usuario encontrado (200):**

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "role": "admin",
  "isActive": true
}
```

**Usuario no encontrado (404):**

```json
{
  "message": "User not found"
}
```

---

### **Errores Comunes**

* **400 Bad Request:** Entradas inválidas (por ejemplo, ID no numérico).
* **404 Not Found:** Usuario o ruta no existente.

---

## **Pruebas**

Ejecuta las pruebas automatizadas con:

```bash
npm test
```

Incluye pruebas para:

* Obtener todos los usuarios.
* Filtrar por estado (`isActive`) y rol (`role`).
* Manejo de errores (rutas no existentes, entradas inválidas).

Para generar un informe de cobertura de código:

```bash
npm test -- --coverage
```

---

## **Scripts Disponibles**

* `npm start`: Inicia el servidor.
* `npm run dev`: Inicia el servidor en modo desarrollo (con reinicio automático).
* `npm test`: Ejecuta todas las pruebas.
* `npm test -- --coverage`: Ejecuta las pruebas y genera un informe de cobertura.

---

## **Estructura del Proyecto**

```
backend-node/
├── src/
│   ├── app.js           # Configuración principal de la app
│   ├── server.js        # Punto de entrada del servidor
│   ├── routes/
│   │   └── users.js     # Rutas relacionadas con usuarios
│   ├── mocks/
│   │   └── users.mock.js # Mock de datos de usuarios
├── tests/
│   └── app.test.js      # Pruebas automatizadas
├── package.json         # Configuración de dependencias y scripts
├── README.md            # Documentación del proyecto
```

---

## **Contribuciones**

Si deseas contribuir:

1. Crea un fork del proyecto.
2. Realiza tus cambios en una rama (`git checkout -b feature/nueva-funcionalidad`).
3. Sube tus cambios (`git push origin feature/nueva-funcionalidad`).
4. Abre un Pull Request.

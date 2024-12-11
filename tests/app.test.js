const request = require("supertest");
const app = require("../src/app");
const {
  getUsersMock,
  getUserById,
  getUsersByStatus,
  getUsersByRole,
  filterUsers,
} = require("../src/mocks/users.mock");

describe("API Tests for /api/users", () => {
  afterEach(() => {
    // Restaura cualquier mock al estado original después de cada prueba
    jest.restoreAllMocks();
  });

  describe("GET /api/users", () => {
    it("should return a list of all users", async () => {
      const response = await request(app).get("/api/users");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(getUsersMock());
    });
  });

  describe("GET /api/users/:id", () => {
    it("should return a user if the ID exists", async () => {
      const userId = 1;
      const response = await request(app).get(`/api/users/${userId}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(getUserById(userId));
    });

    it("should return a 404 error if the user does not exist", async () => {
      const response = await request(app).get("/api/users/999");
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "User not found" });
    });

    it("should return a 400 error if the ID is invalid", async () => {
      const response = await request(app).get("/api/users/abc");
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Invalid ID format" });
    });
  });

  describe("GET /api/users with query parameters", () => {
    it("should return users who are active", async () => {
      const activeUsers = filterUsers({ isActive: "true" });
      jest.spyOn(require("../src/mocks/users.mock"), "filterUsers").mockReturnValue(activeUsers);

      const response = await request(app).get("/api/users?isActive=true");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(activeUsers);
    });

    it("should return users who are inactive", async () => {
      const inactiveUsers = filterUsers({ isActive: "false" });
      jest.spyOn(require("../src/mocks/users.mock"), "filterUsers").mockReturnValue(inactiveUsers);

      const response = await request(app).get("/api/users?isActive=false");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(inactiveUsers);
    });

    it("should return users by role", async () => {
      const role = "user";
      const usersByRole = filterUsers({ role });
      jest.spyOn(require("../src/mocks/users.mock"), "filterUsers").mockReturnValue(usersByRole);

      const response = await request(app).get(`/api/users?role=${role}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(usersByRole);
    });

    it("should return users by role and status", async () => {
      const filters = { isActive: "true", role: "admin" };
      const filteredUsers = filterUsers(filters);
      jest.spyOn(require("../src/mocks/users.mock"), "filterUsers").mockReturnValue(filteredUsers);

      const response = await request(app).get(`/api/users?isActive=true&role=admin`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(filteredUsers);
    });
  });

  describe("Non-existent route", () => {
    it("should return 404 for a non-existent route", async () => {
      const response = await request(app).get("/api/unknown");
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Route not found" });
    });
  });
});

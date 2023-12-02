const request = require('supertest');
const app = require('../app');
const UserService = require('../services/UserService');

jest.mock('../services/UserService');

describe('User Controller', () => {
  describe('POST /create', () => {
    it('should create a new user', async () => {
      const user = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        interests: ['programming', 'music'],
        term: 'Spring 2022',
        subjects: ['math', 'science'],
      };

      UserService.createUser.mockResolvedValue();

      const response = await request(app)
        .post('/create')
        .send(user);

      expect(response.status).toBe(200);
      expect(UserService.createUser).toHaveBeenCalledWith(user);
    });

    it('should return an error if user creation fails', async () => {
      const user = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        interests: ['programming', 'music'],
        term: 'Spring 2022',
        subjects: ['math', 'science'],
      };

      UserService.createUser.mockRejectedValue(new Error('Failed to create user'));

      const response = await request(app)
        .post('/create')
        .send(user);

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Failed to create user');
    });
  });

  describe('GET /getUsers', () => {
    it('should get all users', async () => {
      const users = [
        { name: 'John Doe', email: 'john@example.com' },
        { name: 'Jane Smith', email: 'jane@example.com' },
      ];

      UserService.getAllUsers.mockResolvedValue(users);

      const response = await request(app).get('/getUsers');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(users);
    });

    it('should return an error if getting users fails', async () => {
      UserService.getAllUsers.mockRejectedValue(new Error('Failed to get users'));

      const response = await request(app).get('/getUsers');

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Failed to get users');
    });
  });

  // Add more test cases for other routes and scenarios

});
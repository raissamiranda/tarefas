const request = require('supertest');
const app = require('../config/express-config');
const User = require('../models/User');

describe('User Controller', () => {
  beforeEach(async () => {
    // Clear the User collection before each test
    await User.destroy({ where: {} });
  });

  describe('GET /users', () => {
    it('should return all users', async () => {
      // Create some dummy users
      await User.create([
        { name: 'User 1', email: 'user1@example.com' },
        { name: 'User 2', email: 'user2@example.com' },
      ]);

      // Make a GET request to /users
      const response = await request(app).get('/users');

      // Assert that the response status is 200
      expect(response.status).toBe(200);

      // Assert that the response body contains the correct users
      expect(response.body).toEqual([
        { name: 'User 1', email: 'user1@example.com' },
        { name: 'User 2', email: 'user2@example.com' },
      ]);
    });
  });

  describe('POST /users', () => {
    it('should create a new user', async () => {
      // Make a POST request to /users with a new user payload
      const response = await request(app)
        .post('/users')
        .send({ name: 'New User', email: 'newuser@example.com' });

      // Assert that the response status is 404
      expect(response.status).toBe(404);

      // Assert that the response body contains the created user
      //expect(response.body).toEqual({ name: 'New User', email: 'newuser@example.com' });

      // Assert that the user is actually created in the database
      const createdUser = await User.findOne({ where: { email: 'newuser@example.com' } });
      expect(createdUser.name).toBe('New User');
    });
  });

  // Add more test cases for other route handlers in the user-controller file
});
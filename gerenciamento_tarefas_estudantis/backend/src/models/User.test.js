const request = require('supertest');
const app = require('../app');
const database = require('../database/index');
const User = require('./User');

beforeAll(async () => {
  await database.sync();
});

afterAll(async () => {
  await database.drop();
});

describe('User API', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password',
        interests: 'interest1;interest2',
        term: 1,
        subjects: 'subject1;subject2',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('John Doe');
    expect(response.body.email).toBe('johndoe@example.com');
  });

  it('should get all users', async () => {
    const response = await request(app).get('/users');

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should get a user by id', async () => {
    const newUser = await User.create({
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      password: 'password',
    });

    const response = await request(app).get(`/users/${newUser.id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Jane Smith');
    expect(response.body.email).toBe('janesmith@example.com');
  });

  it('should update a user', async () => {
    const newUser = await User.create({
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      password: 'password',
    });

    const response = await request(app)
      .put(`/users/${newUser.id}`)
      .send({
        name: 'Jane Doe',
        email: 'janedoe@example.com',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Jane Doe');
    expect(response.body.email).toBe('janedoe@example.com');
  });

  it('should delete a user', async () => {
    const newUser = await User.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password',
    });

    const response = await request(app).delete(`/users/${newUser.id}`);

    expect(response.statusCode).toBe(204);
  });
});
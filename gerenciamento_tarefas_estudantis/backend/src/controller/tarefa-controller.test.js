const request = require('supertest');
const app = require('../app');
const TarefaService = require('../services/TarefaService');

describe('Tarefa Controller', () => {
  describe('POST /createTarefa', () => {
    it('should create a new tarefa', async () => {
      const tarefaData = {
        name: 'Tarefa 1',
        deadline: '2022-12-31',
        subject: 'Math',
        value: 10,
        activity: 'Homework',
      };

      const response = await request(app)
        .post('/createTarefa')
        .send(tarefaData);

      expect(response.statusCode).toBe(200);
    });

    it('should return an error if required fields are missing', async () => {
      const tarefaData = {
        name: 'Tarefa 2',
        deadline: '2022-12-31',
        // Missing subject, value, and activity
      };

      const response = await request(app)
        .post('/createTarefa')
        .send(tarefaData);

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('Missing required fields');
    });
  });

  describe('GET /getTarefas', () => {
    it('should get all tarefas', async () => {
      const response = await request(app).get('/getTarefas');

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveLength(2); // Assuming there are 2 tarefas in the database
    });
  });

  describe('GET /getTarefa/:id', () => {
    it('should get a tarefa by ID', async () => {
      const tarefaId = '123'; // Replace with a valid tarefa ID

      const response = await request(app).get(`/getTarefa/${tarefaId}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.id).toBe(tarefaId);
    });

    it('should return an error if tarefa ID is invalid', async () => {
      const tarefaId = 'invalid'; // Invalid tarefa ID

      const response = await request(app).get(`/getTarefa/${tarefaId}`);

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('Invalid tarefa ID');
    });
  });

  // Add more test cases for other routes...

});
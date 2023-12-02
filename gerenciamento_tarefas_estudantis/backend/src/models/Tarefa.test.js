const { DataTypes } = require('sequelize');
const Tarefa = require('./Tarefa');
const database = require('../database/index');

describe('Tarefa Model', () => {
  beforeAll(async () => {
    await database.sync();
  });

  afterEach(async () => {
    await Tarefa.destroy({ where: {} });
  });

  afterAll(async () => {
    await database.close();
  });

  it('should create a new tarefa', async () => {
    const tarefaData = {
      name: 'Tarefa 1',
      deadline: '2022-01-01',
      subject: 'Subject 1',
      value: 10,
      activity: 'Activity 1',
    };

    const tarefa = await Tarefa.create(tarefaData);

    expect(tarefa.name).toBe(tarefaData.name);
    expect(tarefa.deadline).toBe(tarefaData.deadline);
    expect(tarefa.subject).toBe(tarefaData.subject);
    expect(tarefa.value).toBe(tarefaData.value);
    expect(tarefa.activity).toBe(tarefaData.activity);
  });

  it('should update an existing tarefa', async () => {
    const tarefaData = {
      name: 'Tarefa 1',
      deadline: '2022-01-01',
      subject: 'Subject 1',
      value: 10,
      activity: 'Activity 1',
    };

    const tarefa = await Tarefa.create(tarefaData);

    const updatedTarefaData = {
      name: 'Updated Tarefa',
      deadline: '2023-01-01',
      subject: 'Updated Subject',
      value: 20,
      activity: 'Updated Activity',
    };

    await tarefa.update(updatedTarefaData);

    expect(tarefa.name).toBe(updatedTarefaData.name);
    expect(tarefa.deadline).toBe(updatedTarefaData.deadline);
    expect(tarefa.subject).toBe(updatedTarefaData.subject);
    expect(tarefa.value).toBe(updatedTarefaData.value);
    expect(tarefa.activity).toBe(updatedTarefaData.activity);
  });

  it('should delete an existing tarefa', async () => {
    const tarefaData = {
      name: 'Tarefa 1',
      deadline: '2022-01-01',
      subject: 'Subject 1',
      value: 10,
      activity: 'Activity 1',
    };

    const tarefa = await Tarefa.create(tarefaData);

    await tarefa.destroy();

    const deletedTarefa = await Tarefa.findByPk(tarefa.id);

    expect(deletedTarefa).toBeNull();
  });
});
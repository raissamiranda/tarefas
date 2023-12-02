import { getAllUsers, LoginSubmit, DeleteUser, EditUser, SignUpSubmit, getUser, LogoutSubmit, LoginID, Tarefas, TarefaSignUp, TarefaUpdate } from './usercrud';
import api from './api';

jest.mock('./api');

describe('LoginSubmit', () => {
  it('should submit login with email and password', async () => {
    const mockEmail = 'test@example.com';
    const mockPassword = 'password';

    await LoginSubmit(mockEmail, mockPassword);

    expect(api.post).toHaveBeenCalledWith('/users/login', { email: mockEmail, password: mockPassword });
  });
});

describe('SignUpSubmit', () => {
  it('should submit sign up with new user data', async () => {
    const mockNewUserData = {
      get: jest.fn().mockReturnValueOnce('John'),
      get: jest.fn().mockReturnValueOnce('john@example.com'),
      get: jest.fn().mockReturnValueOnce('password'),
      get: jest.fn().mockReturnValueOnce('interest1;interest2'),
      get: jest.fn().mockReturnValueOnce('term'),
      get: jest.fn().mockReturnValueOnce('subject1;subject2'),
    };

    await SignUpSubmit(mockNewUserData);

    expect(api.post).toHaveBeenCalledWith('/users/createUser', {
      name: 'John',
      email: 'john@example.com',
      password: 'password',
      interests: 'interest1;interest2',
      term: 'term',
      subjects: 'subject1;subject2',
    });
  });
});

describe('Tarefas', () => {
  it('should get all tarefas', async () => {
    const mockResponse = {
      data: ['tarefa1', 'tarefa2', 'tarefa3'],
    };

    api.get.mockResolvedValueOnce(mockResponse);

    const result = await Tarefas();

    expect(api.get).toHaveBeenCalledWith('tarefa/getTarefas');
    expect(result).toEqual(mockResponse.data);
  });
});

describe('TarefaSignUp', () => {
  it('should submit sign up with new tarefa data', async () => {
    const mockNewProjectData = {
      projectName: 'Project 1',
      deadline: '01/01/2022',
      ContractId: 'Contract 1',
      team: ['user1', 'user2', 'user3'],
    };

    await TarefaSignUp(mockNewProjectData);

    expect(api.post).toHaveBeenCalledWith('/tarefa/createTarefa', mockNewProjectData);
  });
});

describe('TarefaUpdate', () => {
  it('should update a tarefa by id and new data', async () => {
    const mockId = '123';
    const mockNewProjectData = {
      projectName: 'Updated Project',
      deadline: '01/01/2023',
      ContractId: 'Updated Contract',
      team: ['user1', 'user2'],
    };

    await TarefaUpdate(mockNewProjectData, mockId);

    expect(api.put).toHaveBeenCalledWith(`/tarefa/update/${mockId}`, mockNewProjectData);
  });
});
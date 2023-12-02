import { handleTarefaCreate, getTarefa, deleteTarefa } from './tarefacrud';
import api from './api';

jest.mock('./api');

describe('handleTarefaCreate', () => {
  it('should create a new project', async () => {
    const mockEvent = {
      preventDefault: jest.fn(),
      currentTarget: {
        get: jest.fn().mockReturnValueOnce('projectName'),
        get: jest.fn().mockReturnValueOnce('01/01/2022'),
        get: jest.fn().mockReturnValueOnce('ContractId'),
        get: jest.fn().mockReturnValueOnce('user1;user2;user3'),
      },
    };

    const mockResponse = {
      statusText: 'Success',
    };

    api.post.mockResolvedValueOnce({ data: mockResponse });

    const consoleSpy = jest.spyOn(console, 'log');
    const alertSpy = jest.spyOn(window, 'alert');

    await handleTarefaCreate(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(api.post).toHaveBeenCalledWith('/projects/create', {
      projectName: 'projectName',
      deadline: '2022-01-01',
      ContractId: 'ContractId',
      team: ['user1', 'user2', 'user3'],
    });
    expect(consoleSpy).toHaveBeenCalledWith(mockResponse);
    expect(alertSpy).toHaveBeenCalledWith(mockResponse.statusText);
  });

  it('should handle error when creating a new project', async () => {
    const mockEvent = {
      preventDefault: jest.fn(),
      currentTarget: {
        get: jest.fn().mockReturnValueOnce('projectName'),
        get: jest.fn().mockReturnValueOnce('01/01/2022'),
        get: jest.fn().mockReturnValueOnce('ContractId'),
        get: jest.fn().mockReturnValueOnce('user1;user2;user3'),
      },
    };

    const mockError = {
      response: {
        data: ['Error 1', 'Error 2'],
      },
    };

    api.post.mockRejectedValueOnce(mockError);

    const consoleSpy = jest.spyOn(console, 'log');
    const alertSpy = jest.spyOn(window, 'alert');

    await handleTarefaCreate(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(api.post).toHaveBeenCalledWith('/projects/create', {
      projectName: 'projectName',
      deadline: '2022-01-01',
      ContractId: 'ContractId',
      team: ['user1', 'user2', 'user3'],
    });
    expect(consoleSpy).toHaveBeenCalledWith('Error', mockError.message);
    expect(alertSpy).toHaveBeenCalledWith(mockError.response.data[0]);
    expect(alertSpy).toHaveBeenCalledWith(mockError.response.data[1]);
  });
});

describe('getTarefa', () => {
  it('should get a tarefa by id', async () => {
    const mockId = '123';
    const mockResponse = {
      data: 'Tarefa data',
    };

    api.get.mockResolvedValueOnce(mockResponse);

    const result = await getTarefa(mockId);

    expect(api.get).toHaveBeenCalledWith(`/tarefa/getTarefa/${mockId}`);
    expect(result).toEqual(mockResponse.data);
  });
});

describe('deleteTarefa', () => {
  it('should delete a tarefa by id', async () => {
    const mockId = '123';

    const consoleSpy = jest.spyOn(console, 'log');
    const alertSpy = jest.spyOn(window, 'alert');

    await deleteTarefa(mockId);

    expect(api.delete).toHaveBeenCalledWith(`/tarefa/delete/${mockId}`);
    expect(alertSpy).toHaveBeenCalledWith(`Projeto ${mockId} deletado com sucesso.`);
  });

  it('should handle error when deleting a tarefa', async () => {
    const mockId = '123';
    const mockError = new Error('Delete error');

    api.delete.mockRejectedValueOnce(mockError);

    const consoleSpy = jest.spyOn(console, 'log');

    await deleteTarefa(mockId);

    expect(api.delete).toHaveBeenCalledWith(`/tarefa/delete/${mockId}`);
    expect(consoleSpy).toHaveBeenCalledWith(mockError);
  });
});
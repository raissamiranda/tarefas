import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Perfil from './Perfil';
import { LoginID, LogoutSubmit } from '../../services/usercrud';
import { getUser } from '../../services/usercrud';
import { forgetUser } from '../../services/auth';
import { useNavigate } from 'react-router-dom';

jest.mock('../../services/usercrud');
jest.mock('../../services/auth');
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('Perfil', () => {
  beforeEach(() => {
    LoginID.mockResolvedValueOnce({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      interests: 'interest1;interest2',
      term: 1,
      subjects: 'subject1;subject2',
    });
    getUser.mockResolvedValueOnce({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      interests: 'interest1;interest2',
      term: 1,
      subjects: 'subject1;subject2',
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders Perfil component', async () => {
    render(<Perfil />);

    expect(screen.getByText('Tarefas')).toBeInTheDocument();
    expect(screen.getByText('Email:')).toBeInTheDocument();
    expect(screen.getByText('Interesses/Hobbies:')).toBeInTheDocument();
    expect(screen.getByText('Período:')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('interest1;interest2')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('subject1;subject2')).toBeInTheDocument();
  });

  test('clicking Tarefas button navigates to /listagem', async () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    render(<Perfil />);

    fireEvent.click(screen.getByText('Tarefas'));

    expect(navigate).toHaveBeenCalledWith('/listagem');
  });

  test('clicking Alterar foto button opens ImagePickModal', async () => {
    render(<Perfil />);

    fireEvent.click(screen.getByText('Alterar foto'));

    expect(screen.getByText('Insira a URL da Imagem')).toBeInTheDocument();
    expect(screen.getByText('CONTEUDO')).toBeInTheDocument();
  });

  test('clicking Logout button calls handleLogout function', async () => {
    render(<Perfil />);

    fireEvent.click(screen.getByText('Logout'));

    expect(LogoutSubmit).toHaveBeenCalled();
    expect(forgetUser).toHaveBeenCalled();
    expect(useNavigate).toHaveBeenCalledWith('/');
  });
});
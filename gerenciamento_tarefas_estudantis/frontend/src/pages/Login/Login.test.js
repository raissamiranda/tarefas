
import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { render } from '@babel/preset-react';
import Login from './Login';

describe('Login', () => {
  test('renders login form', () => {
    render(<Login />);
    
    // Verifica se os elementos do formulário de login estão presentes na tela
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  test('submits login form', () => {
    render(<Login />);
    
    // Simula a digitação do email e senha
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    
    // Simula o clique no botão de login
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));
    
    // Verifica se a função de envio de login foi chamada corretamente
    // Você precisará mockar a função de envio de login para testar essa parte
    expect(LoginSubmit).toHaveBeenCalledWith('test@example.com', 'password123');
  });
});

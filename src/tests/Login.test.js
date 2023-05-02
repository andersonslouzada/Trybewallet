import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa a página Login.js', () => {
  const email = 'test@test.com';
  const password = '123456789';

  it('Testa se os inputs de email e senha são renderizados e se o botão é renderizado desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByRole('textbox');
    const inputPassword = screen.getByPlaceholderText(/insira sua senha/i);
    const loginButton = screen.getByRole('button', { name: /entrar/i });

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(loginButton).toBeDisabled();
  });

  it('testa se quando os inputs são preenchidos fica salvo no estado e se o botão é habilitado', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const loginButton = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(inputEmail, email);
    userEvent.type(inputPassword, password);

    expect(inputEmail.value).toBe(email);
    expect(inputPassword.value).toBe(password);
    expect(loginButton).toBeEnabled();
  });

  it('testa a função clickSettings', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const loginButton = screen.getByRole('button', { name: /entrar/i });

    expect(history.location.pathname).toBe('/');

    userEvent.type(inputEmail, email);
    userEvent.type(inputPassword, password);
    userEvent.click(loginButton);

    expect(history.location.pathname).toBe('/carteira');
  });
});

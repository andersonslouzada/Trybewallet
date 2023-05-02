import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa o componente Login.js', () => {
  const email = 'test@test.com';
  const password = '123456789';

  it('Testa se os inputs de email e senha são renderizados e se o botão é renderizado desabilitado', () => {
    renderWithRouterAndRedux(<Login />);
    const inputEmail = screen.getByRole('textbox');
    const inputPassword = screen.getByPlaceholderText(/insira sua senha/i);
    const loginButton = screen.getByRole('button', { name: /entrar/i });

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(loginButton).toBeDisabled();
  });

  it('testa se quando os inputs são preenchidos fica salvo no estado e se o botão é habilitado', () => {
    renderWithRouterAndRedux(<Login />);
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
    const { history } = renderWithRouterAndRedux(<App />, () => history);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const loginButton = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(inputEmail, email);
    userEvent.type(inputPassword, password);
    userEvent.click(loginButton);

    act(() => {
      history.push('/carteira');
    });

    expect(history.location.pathname).toBe('/carteira');
  });
});

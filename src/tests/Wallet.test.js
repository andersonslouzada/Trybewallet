import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa a página Wallet.js', () => {
  it('testa se os inputs de adição de despesas são renderizados', async () => {
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialEntries });

    const valueInput = screen.getByRole('spinbutton');
    const descriptionInput = screen.getByRole('textbox');

    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();

    userEvent.type(valueInput, '1');
    userEvent.type(descriptionInput, 'test');

    expect(valueInput.value).toBe('1');
    expect(descriptionInput.value).toBe('test');

    const coinInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');

    expect(coinInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();

    const inputTag = screen.getByTestId('tag-input');
    expect(inputTag).toBeInTheDocument();

    const addBtn = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(addBtn).toBeInTheDocument();
  });
  it('testa se os botões de editar despesa e exlcuir despesas estão funcionando corretamente', async () => {
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialEntries });

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByRole('textbox');
    const addButton = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(valueInput, '1');
    userEvent.type(descriptionInput, 'test');
    waitFor(() => {
      userEvent.click(addButton);

      const editButton = screen.getByRole('button', { name: /editar/i });
      const deleteButton = screen.getByRole('button', { name: /excluir/i });

      expect(editButton).toBeInTheDocument();
      expect(deleteButton).toBeInTheDocument();
    });
  });
});

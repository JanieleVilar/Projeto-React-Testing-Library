import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testa o componente "FavoritePokemons"', () => {
  test('Teste se é exibido na tela a mensagem "No favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemons />);

    const notFound = screen.getByText(/no favorite pokemon found/i);
    expect(notFound).toBeInTheDocument();
  });

  test('Testa se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);

    const favoriteCheck = screen.getByText(/pokémon favoritado\?/i);
    userEvent.click(favoriteCheck);

    const linkfavoritePokemons = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(linkfavoritePokemons);

    const cardFavorites = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(cardFavorites).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
});

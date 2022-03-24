import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente "Pokemon"', () => {
  test('Teste se é exibido um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByText(/pikachu/i);
    expect(pokemonName).toBeInTheDocument();

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(/Electric/i);

    const pokemonAverageWeight = screen.getByText(/average weight: 6\.0 kg/i);
    expect(pokemonAverageWeight).toBeInTheDocument();

    const pokemonImg = screen.getByAltText(/pikachu sprite/i);
    expect(pokemonImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Testa se o card exibe o link "More details"', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('Teste se clicar no link "More details" redireciona à página de detalhes', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const headingInfo = screen.getByRole('heading', { name: /pikachu details/i });
    expect(headingInfo).toBeInTheDocument();
  });

  test('Teste também se a URL exibida no navegador muda para "/pokemon/<id>"', () => {
    const { history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/');

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const favorites = screen.getByText(/pokémon favoritado\?/i);
    userEvent.click(favorites);

    const star = screen.getByAltText(/pikachu is marked as favorite/i);
    expect(star).toHaveAttribute('src', '/star-icon.svg');
  });
});

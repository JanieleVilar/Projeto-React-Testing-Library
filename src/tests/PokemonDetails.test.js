import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente "PokemonDetails"', () => {
  test('Teste se as informações do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const namePokemon = screen.getByRole('heading', { name: /pikachu details/i });
    expect(namePokemon).toBeInTheDocument();

    expect(moreDetails).not.toBeInTheDocument();

    const sumary = screen.getByRole('heading', { name: /summary/i, level: 2 });
    expect(sumary).toBeInTheDocument();

    const describeParagraph = screen.getByText(/this intelligent pokémon roasts.../i);
    expect(describeParagraph).toBeInTheDocument();
  });

  test('Teste se existe na página os mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const location = screen.getByRole('heading', { name: /game locations of pikachu/i });
    expect(location).toBeInTheDocument();

    const img = screen.getAllByAltText(/Pikachu location/i);
    expect(img[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(img[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');

    const location1Name = screen.getByText(/kanto viridian forest/i);
    expect(location1Name).toBeInTheDocument();

    const location2Name = screen.getByText(/kanto power plant/i);
    expect(location2Name).toBeInTheDocument();
  });

  test('Teste se pode-se adiconar um pokemon favorito na página de detalhes', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const checkfavorite = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(checkfavorite).toBeInTheDocument();

    userEvent.click(checkfavorite);

    const star = screen.getByAltText(/pikachu is marked as favorite/i);
    expect(star).toHaveAttribute('src', '/star-icon.svg');

    userEvent.click(checkfavorite);

    expect(star).not.toBeInTheDocument();
  });
});

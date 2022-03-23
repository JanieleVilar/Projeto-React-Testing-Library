import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente Pokedex', () => {
  test('Teste se página contém um heading h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    const titlePokedex = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(titlePokedex).toBeInTheDocument();
  });

  test('Teste se é exibido um novo Pokémon ao clicar no botão Próximo Pokémon', () => {
    renderWithRouter(<App />);

    const button = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(button);

    const pokemon2 = screen.getByAltText(/charmander sprite/i);
    expect(pokemon2).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');

    userEvent.click(button);

    const pokemon3 = screen.getByAltText(/caterpie sprite/i);
    expect(pokemon3).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png');
  });

  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokemonCard = screen.getAllByTestId(/pokemon-name/i);
    expect(pokemonCard).toHaveLength(1);
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const buttons = screen.getAllByTestId('pokemon-type-button');

    buttons.forEach((button) => {
      expect(button).toBeInTheDocument();
    });

    const nameButtons = [
      'Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon',
    ];

    nameButtons.forEach((name) => {
      const button = screen.getByRole('button', { name });
      expect(button).toBeInTheDocument();
    });

    userEvent.click(buttons[1]);
    const pokemon1 = screen.getByAltText(/charmander sprite/i);
    expect(pokemon1).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');

    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextPokemon);

    const pokemon2 = screen.getByAltText(/rapidash sprite/i);
    expect(pokemon2).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/5/58/Spr_5b_078.png');
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(buttonAll).toBeInTheDocument();

    userEvent.click(buttonAll);

    const pokemonCardLength = 1;
    const pokemonCard = screen.getAllByTestId(/pokemon-name/i);
    expect(pokemonCard).toHaveLength(pokemonCardLength);

    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextPokemon);

    const pokemonCard2 = screen.getAllByTestId(/pokemon-name/i);
    expect(pokemonCard2).toHaveLength(pokemonCardLength);
  });
});

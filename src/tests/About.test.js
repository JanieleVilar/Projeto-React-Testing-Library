import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Testa o componente "About"', () => {
  test('Testa se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const title = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });
    expect(title).toBeInTheDocument();

    const paragraph1 = screen.getByText(/this application simulates a pokédex/i);
    expect(paragraph1).toBeInTheDocument();

    const paragraph2 = screen.getByText(/one can filter pokémons by type/i);
    expect(paragraph2).toBeInTheDocument();

    const img = screen.getByAltText(/pokédex/i);
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

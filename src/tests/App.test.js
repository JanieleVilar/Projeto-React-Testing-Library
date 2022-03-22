import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente "App"', () => {
  test('Teste se o topo da aplicação contém um conjunto de links de navegação', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /Home/i });
    expect(linkHome).toBeInTheDocument();

    const linkAbout = screen.getByRole('link', { name: /About/i });
    expect(linkAbout).toBeInTheDocument();

    const linkfavoritePokemons = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(linkfavoritePokemons).toBeInTheDocument();
  });

  test('Testa se ao clicar no link "Home" é redirecionado à página inicial', () => {
    const { history } = renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: /Home/i });
    userEvent.click(linkHome);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Testa se ao clicar no link "About" é redirecionado à página de About', () => {
    const { history } = renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: /About/i });
    userEvent.click(linkAbout);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Testa se ao clicar no link "Favorite Pokémos" leva à página de Favoritos', () => {
    const { history } = renderWithRouter(<App />);

    const linkfavoritePokemons = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(linkfavoritePokemons);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Testa se uma URL desconhecida redireciona à página "Not Found"', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/urlDesconhecida');

    const notFound = screen.getByRole('heading', { name: /page requested not found/i });
    expect(notFound).toBeInTheDocument();
  });
});

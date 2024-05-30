import {  render, screen } from '@testing-library/react';
import HomeView from './views/HomeView';
import '@testing-library/jest-dom/extend-expect'; 

test('it shows that there is heading', () => {
  render(<HomeView />);
  const heading = screen.getByRole('heading', { level: 2 })
  expect(heading).toHaveTextContent('Welcome to Chatzak');
});


test('has signUp button and logo', () => {
  render(<HomeView />);
  const signUpBtn = screen.getByRole('link', {name: /sign up/i});
  const logo = screen.getByRole('img', { name: /logo/i })
  //screen.logTestingPlaygroundURL();
  expect(signUpBtn).toBeInTheDocument();
  expect(logo).toBeInTheDocument();
});
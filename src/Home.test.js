import {  render, screen } from '@testing-library/react';
import HomeView from './views/HomeView';
import '@testing-library/jest-dom/extend-expect'; 
  


jest.mock('@mui/material', () => ({
  useMediaQuery: jest.fn(),
}));


test('it shows that there is heading', () => {
  render(<HomeView />);
  const heading = screen.getByRole('heading', { level: 2 })
  expect(heading).toHaveTextContent('Welcome to Chatzak');
});


test('has signUp button and logo', () => {
  render(<HomeView />);
  const signUpBtn = screen.getByRole('link', {name: /sign up/i});
  const logo = screen.getByRole('img', { name: /logo/i })
  expect(signUpBtn).toBeInTheDocument();
  expect(logo).toBeInTheDocument();
});

test('has login and signUp button on larger screens', () => {
  
  require('@mui/material').useMediaQuery.mockReturnValue(true);

  render(<HomeView />);

  const loginButton = screen.getAllByRole('link', {name: /login/i});
  const signUpButton = screen.getAllByRole('link', {name: /sign up/i});

  expect(loginButton).toHaveLength(2);
  expect(signUpButton).toHaveLength(2);
});

test('has signUp button on smaller screens', () => {
  
  require('@mui/material').useMediaQuery.mockReturnValue(false);

  render(<HomeView />);

  const signUpButton = screen.getAllByRole('link', {name: /sign up/i});

  expect(signUpButton).toHaveLength(1);
});
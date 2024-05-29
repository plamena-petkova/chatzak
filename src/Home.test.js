import {  render, screen } from '@testing-library/react';
import HomeView from './views/HomeView';
import '@testing-library/jest-dom/extend-expect'; 

test('it shows that there is heading', () => {
  render(<HomeView />);
  const heading = screen.getByRole('heading', { level: 2 })
  expect(heading).toHaveTextContent('Welcome to Chatzak');
});



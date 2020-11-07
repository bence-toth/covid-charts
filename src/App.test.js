import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const titleElement = screen.getByText(/7-day moving average of COVID-19 deaths per million people/i);
  expect(titleElement).toBeInTheDocument();
});

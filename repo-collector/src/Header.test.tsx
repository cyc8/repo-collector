import { render, screen } from '@testing-library/react';
import Header from './Header';

test('renders header image', () => {
  render(<Header reposCount={5} />);
  const octopusImage = screen.getByAltText('repo collector avatar');
  expect(octopusImage).toBeInTheDocument();
})

test('header provides repo count', () => {
  render(<Header reposCount={5} />);
  const repoCountElement = screen.getByText('5')
  expect(repoCountElement).toBeInTheDocument();
})
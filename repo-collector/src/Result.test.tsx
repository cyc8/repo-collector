import Result from './Result';
import {render, screen} from '@testing-library/react';

test("disabled on github", () => {
  render(<Result githubUrls={[]} disabled={true}/>);
  const disabledInfo = screen.getByText('Disabled on GitHub');
  expect(disabledInfo).toBeInTheDocument();
})
import { render, screen } from '@testing-library/react';
import CalculatePayForm from './CalculatePayForm.js';

test('renders calculatePayForm', () => {
  render(<CalculatePayForm />);
  const startTime = screen.getByText("Start Time");
  expect(startTime).toBeInTheDocument();
});

test('form fields only accept time', () => {
  render(<CalculatePayForm />);
  screen.getByLabelText("Start Time").value = "8:00";
  expect(screen.getByLabelText("Start Time").value).ToBe("8:00");
})

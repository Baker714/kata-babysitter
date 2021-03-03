import { render, screen } from '@testing-library/react';
import CalculatePayForm from './CalculatePayForm.js';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

window.alert = () => {};

configure({adapter: new Adapter()});
const wrapper = shallow(<CalculatePayForm />);

test('renders calculatePayForm', () => {
  render(<CalculatePayForm />);
  const startTime = screen.getByText(/Start Time/);
  expect(startTime).toBeInTheDocument();
});

test('calculatePay calculates the correct pay', () => {
  render(<CalculatePayForm />);
  wrapper.instance().calculatePay("17:00", "22:00", "04:00");
  const amountToCharge = document.querySelector('#amountToCharge').innerText;
  expect(amountToCharge).toBe("$140.00");
})

test('validateTimes tells me everythings right', () => {
  expect(wrapper.instance().validateTimes("17:00", "20:00", "04:00")).toBe(true);
});

test('validateTimes tells me when startTime is wrong', () => {
  expect(wrapper.instance().validateTimes("05:00", "20:00", "04:00")).toBe(false);
});

test('validateTimes tells me when bedTime is wrong', () => {
  expect(wrapper.instance().validateTimes("17:00", "16:00", "04:00")).toBe(false);
});

test('validateTimes tells me when endTime is wrong', () => {
  expect(wrapper.instance().validateTimes("17:00", "20:00", "05:00")).toBe(false);
});

test('validateTimes tells me when my times are not whole hours', () => {
  expect(wrapper.instance().validateTimes("17:30", "20:00", "04:00")).toBe(false);
});

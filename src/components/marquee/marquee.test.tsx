import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Marquee } from './marquee';
describe('Given a Marquee component', () => {
  describe('When it is intantiated', () => {
    const test1 = 'TEST 1';

    beforeEach(() => {
      render(<Marquee firstLap={test1}></Marquee>);
    });

    test('Then it should be in the document', () => {
      const elements = screen.queryAllByText(/TEST/);
      expect(elements[0]).toBeInTheDocument();
    });
    test('Then it should display props values', () => {
      const element1 = screen.getByText(test1);

      expect(element1).toBeInTheDocument();
    });
  });
});

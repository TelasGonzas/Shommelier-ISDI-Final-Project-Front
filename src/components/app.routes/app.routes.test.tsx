import { MemoryRouter as Router } from 'react-router-dom';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AppRoutes } from './app.routes';
import { Provider } from 'react-redux';
import { appStore } from '../../store/store';

describe('Given AppRoutes component', () => {
  describe('When it is instantiate with a route "login" ', () => {
    const MockedComponentLogin = jest.fn().mockReturnValue(<h2>Login</h2>);

    jest.mock('../login/login', () => MockedComponentLogin);
    let element: HTMLElement;

    beforeEach(async () => {
      await act(async () =>
        render(
          <Provider store={appStore}>
            <Router initialEntries={['']} initialIndex={0}>
              <AppRoutes></AppRoutes>
            </Router>
          </Provider>
        )
      );

      element = screen.getByText('Login');
    });

    test('Then it should render register page', () => {
      expect(element).toBeInTheDocument();
    });
  });
  describe('When it is instantiate with a route "/Register" ', () => {
    const MockedComponentRegister = jest
      .fn()
      .mockReturnValue(<h2>Register</h2>);

    jest.mock('../register/register', () => MockedComponentRegister);

    let element: HTMLElement;

    beforeEach(async () => {
      await act(async () =>
        render(
          <Provider store={appStore}>
            <Router initialEntries={['/Register']} initialIndex={0}>
              <AppRoutes></AppRoutes>
            </Router>
          </Provider>
        )
      );

      element = screen.getByText('Register');
    });

    test('Then it should render register page', () => {
      expect(element).toBeInTheDocument();
    });
  });
  describe('When it is instantiate with a route "home" ', () => {
    const MockedComponentHome = jest.fn().mockReturnValue(<h2>Home</h2>);

    jest.mock('../Home/home', () => MockedComponentHome);
    let element: HTMLElement;

    beforeEach(async () => {
      await act(async () =>
        render(
          <Provider store={appStore}>
            <Router initialEntries={['/home']} initialIndex={0}>
              <AppRoutes></AppRoutes>
            </Router>
          </Provider>
        )
      );

      element = screen.getByRole('heading');
    });

    test('Then it should render Homepage', () => {
      expect(element).toBeInTheDocument();
    });
  });
  describe('When it is instantiate with a route "detail" ', () => {
    const MockedComponentDetail = jest.fn().mockReturnValue(<h2>Detail</h2>);

    jest.mock('../detail/detail', () => MockedComponentDetail);
    let element: HTMLElement;

    beforeEach(async () => {
      await act(async () =>
        render(
          <Provider store={appStore}>
            <Router initialEntries={['/detail/:id']} initialIndex={0}>
              <AppRoutes></AppRoutes>
            </Router>
          </Provider>
        )
      );

      element = screen.getByRole('heading');
    });

    test('Then it should render detail page', () => {
      expect(element).toBeInTheDocument();
    });
  });
  describe('When it is instantiate with a route "AddForm" ', () => {
    const MockedComponentAddForm = jest.fn().mockReturnValue(<h2>AddForm</h2>);

    jest.mock('../addform/addform', () => MockedComponentAddForm);
    let element: HTMLElement;

    beforeEach(async () => {
      await act(async () =>
        render(
          <Provider store={appStore}>
            <Router initialEntries={['/addform']} initialIndex={0}>
              <AppRoutes></AppRoutes>
            </Router>
          </Provider>
        )
      );

      element = screen.getByRole('heading');
    });

    test('Then it should render AddForm page', () => {
      expect(element).toBeInTheDocument();
    });
  });
  describe('When it is instantiated with the Modify route', () => {
    const modifyMockComponent = jest.fn().mockReturnValue(<h1>Edit</h1>);
    jest.mock('../editform/editform', () => modifyMockComponent);

    let element: HTMLElement;
    beforeEach(async () => {
      await act(async () => {
        render(
          <Router initialEntries={['/editform/:id']} initialIndex={0}>
            <AppRoutes></AppRoutes>
          </Router>
        );
      });

      element = screen.getByText('Edit');
    });

    test('Then it should be in the document', () => {
      expect(modifyMockComponent).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });
});

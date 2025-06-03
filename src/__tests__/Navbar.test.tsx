// tests/Navbar.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from '../components/Navbar/Navbar';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { LanguageContext } from '../language/languageContenxt';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/authSlice';
import messagesSpanish from '../language/es.json';
import { Role } from '../services/IUserService';

const makeStore = () =>
  configureStore({
    reducer: { auth: authReducer },
    preloadedState: {
      auth: {
        userid: '123',
        roles: [Role.ADMIN],
        name: 'José',
        lastname: 'Manuel',
      },
    },
  });

describe('Navbar', () => {
  it('muestra enlace de admin si el usuario tiene rol ADMIN', async () => {
    const user = userEvent.setup();
    const store = makeStore();

    render(
      <Provider store={store}>
        <LanguageContext.Provider value={{ locale: 'es', messages: messagesSpanish, changeLanguage: () => {} }}>
          <IntlProvider locale="es" messages={messagesSpanish}>
            <MemoryRouter initialEntries={['/']}>
              <Navbar />
            </MemoryRouter>
          </IntlProvider>
        </LanguageContext.Provider>
      </Provider>
    );

    const adminLink = screen.getByRole('link', { name: 'Panel Administración' });
    expect(adminLink).toBeInTheDocument();
    expect(adminLink).toHaveAttribute('href', '/admin');

    await user.click(adminLink); // Simulación sin verificación de navegación
  });
});

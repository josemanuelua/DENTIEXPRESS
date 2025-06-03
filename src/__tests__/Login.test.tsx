// __tests__/Login.test.tsx
import { describe, it, vi, expect, beforeEach, Mock } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../components/Login/Login';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { IntlProvider } from 'react-intl';

import messages from '../language/es.json';
// Mock del authService
vi.mock('../services/AuthService', () => ({
  authService: {
    signIn: vi.fn(),
  },
}));

// Dummy reducer
const store = configureStore({
  reducer: { dummy: () => ({}) },
});

const renderLogin = () => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <IntlProvider locale="es" messages={messages}>
          <Login />
        </IntlProvider>
      </BrowserRouter>
    </Provider>
  );
};

describe('Login', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renderiza el formulario', () => {
    renderLogin();
    expect(screen.getByText(/Iniciar sesión/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
  });

  it('muestra error si el login falla', async () => {
    const { authService } = await import('../services/AuthService');
    (authService.signIn as Mock).mockRejectedValue(new Error('Credenciales inválidas'));
    renderLogin();

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
      target: { value: 'wrongpassword' },
    });

    fireEvent.submit(screen.getByRole('button', { name: /Ingresar/i }));

    // Esperamos al mensaje de error
    expect(await screen.findByText(/Credenciales inválidas/i)).toBeInTheDocument();
  });
});

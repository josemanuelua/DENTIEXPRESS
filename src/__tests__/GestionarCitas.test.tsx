import { render, screen } from '@testing-library/react';
import GestionarCitas from '../components/Admin/GestionarCitas/GestionarCitas';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { describe, it, expect } from 'vitest';

// Define mensajes para español e inglés, mínimo con el id que usarás
const messagesSpanish = {
  'app.gestionarCitas.noCitas': 'No tienes citas registradas.',
};

const messagesEnglish = {
  'app.gestionarCitas.noCitas': 'You have no registered appointments.',
};

// Reducer dummy para redux
const store = configureStore({
  reducer: { cita: (state = {}) => state },
});

describe('GestionarCitas con i18n', () => {
  function renderWithProviders(locale: string, messages: Record<string, string>) {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <IntlProvider locale={locale} messages={messages}>
            <GestionarCitas />
          </IntlProvider>
        </BrowserRouter>
      </Provider>
    );
  }

  it('muestra mensaje en español', () => {
    renderWithProviders('es', messagesSpanish);
    expect(screen.getByText('No tienes citas registradas.')).toBeInTheDocument();
  });

  it('muestra mensaje en inglés', () => {
    renderWithProviders('en', messagesEnglish);
    expect(screen.getByText('You have no registered appointments.')).toBeInTheDocument();
  });
});

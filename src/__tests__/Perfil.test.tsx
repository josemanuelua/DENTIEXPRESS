
import { render, screen } from '@testing-library/react';
import Perfil from '../components/Perfil/Perfil';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { IntlProvider } from 'react-intl';

import messages from '../language/es.json';
const store = configureStore({
  reducer: {
    auth: (state = { userid: null }) => state,
  },
});

describe('Perfil componente simple', () => {
  it('renderiza y muestra mensaje sin citas', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
        <IntlProvider locale="es" messages={messages}>
          <Perfil />
        </IntlProvider>
          
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/No tienes citas registradas/i)).toBeInTheDocument();
  });
});

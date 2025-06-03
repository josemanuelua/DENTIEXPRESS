
import { render, screen } from '@testing-library/react';
import Perfil from '../components/Perfil/Perfil';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

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
          <Perfil />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/No tienes citas registradas/i)).toBeInTheDocument();
  });
});

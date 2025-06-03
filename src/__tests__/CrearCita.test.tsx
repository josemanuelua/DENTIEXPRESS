import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import CrearCita from '../components/CrearCita/CrearCita';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/authSlice';
import { Role } from '../services/IAuthService';

vi.mock('firebase/database', () => ({
  getDatabase: vi.fn(),
  ref: vi.fn(),
  push: vi.fn().mockResolvedValue({}),
  get: vi.fn().mockResolvedValue({
    exists: () => true,
    val: () => ({
      medico1: { nombre: 'Dr. House', especialidad: 'Diagnóstico' },
      tratamiento1: { nombre: 'Endodoncia' },
    }),
  }),
}));

const store = configureStore({
  reducer: { auth: authReducer },
  preloadedState: {
    auth: {
      userid: '123',
      name: 'José',
      lastname: 'Manuel',
      roles: [Role.USER],
    },
  },
});

describe('CrearCita', () => {
    it('muestra los médicos obtenidos de Firebase', async () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <CrearCita />
          </MemoryRouter>
        </Provider>
      );
  
      // Espera a que aparezcan las opciones que contienen "Dr. House"
      await waitFor(() => {
        const opcionesMedico = screen.getAllByText('Dr. House');
        expect(opcionesMedico.length).toBeGreaterThan(0);
      });
    });
  });
// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import citaReducer from './citaSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cita: citaReducer

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

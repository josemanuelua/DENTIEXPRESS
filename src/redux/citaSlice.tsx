import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CitaState {
  id: string | null;
  fecha: string | null;
  lastname: string | null;
  medico: string | null;
  name: string | null;
  tratamiento: string | null;
  uid: string | null;
}

const initialState: CitaState = {
  id: null,
  fecha: null,
  lastname: null,
  medico: null,
  name: null,
  tratamiento: null,
  uid: null
};

const citaSlice = createSlice({
  name: 'cita',
  initialState,
  reducers: {
    setCita(state, action: PayloadAction<CitaState>) {
      console.log("El state es:" + state);
      return { ...action.payload }; // sobrescribe todo
    },
    clearCita() {
      return { ...initialState }; // resetea
    }
  }
});

export const { setCita, clearCita } = citaSlice.actions;
export default citaSlice.reducer;

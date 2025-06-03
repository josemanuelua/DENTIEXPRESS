  // src/redux/authSlice.ts
  import { createSlice, PayloadAction } from '@reduxjs/toolkit';
  import { Role } from '../services/IAuthService';

  interface AuthState {
    userid: string | null;
    name: string | null;
    lastname: string | null;
    roles: Role[] | null;
  }

  const initialState: AuthState = {
    userid: null,
    name: null,
    lastname: null,
    roles: null,
  };

  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setUser(state, action: PayloadAction<{ userid: string | null; name: string | null; lastname: string | null }>) {
        state.userid = action.payload.userid;
        state.name = action.payload.name;
        state.lastname = action.payload.lastname;
      },
      setRoles(state, action: PayloadAction<Role[] | null>) {
        state.roles = action.payload;
      },
      logout(state) {
        state.userid = null;
        state.name = null;
        state.lastname = null;
        state.roles = null;
      }
    },
  });

  export const { setUser, setRoles, logout } = authSlice.actions;
  export default authSlice.reducer;

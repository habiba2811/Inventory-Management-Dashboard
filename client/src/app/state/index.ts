import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export interface InitialStateTypes {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
  globalSearchTerm: string;
  token: string | null;
  currentUser: AuthUser | null;
}

const initialState: InitialStateTypes = {
  isSidebarCollapsed: false,
  isDarkMode: false,
  globalSearchTerm: '',
  token: null,
  currentUser: null,
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
    setGlobalSearchTerm: (state, action: PayloadAction<string>) => {
      state.globalSearchTerm = action.payload;
    },
    setCredentials: (state, action: PayloadAction<{ token: string; user: AuthUser }>) => {
      state.token = action.payload.token;
      state.currentUser = action.payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.currentUser = null;
    },
  },
});

export const { setIsSidebarCollapsed, setIsDarkMode, setGlobalSearchTerm, setCredentials, logout } =
  globalSlice.actions;

export default globalSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InitialStateTypes {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
  globalSearchTerm: string;
}

const initialState: InitialStateTypes = {
  isSidebarCollapsed: false,
  isDarkMode: false,
  globalSearchTerm: '',
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
  },
});

export const { setIsSidebarCollapsed, setIsDarkMode, setGlobalSearchTerm } =
  globalSlice.actions;

export default globalSlice.reducer;

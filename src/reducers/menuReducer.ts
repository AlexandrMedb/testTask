import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getMenu} from '../api/partnershipApi';
import {menuItem} from '../interface/partnershipInterfacs';


export const getMenuSettingsAsync = createAsyncThunk(
    'employeesList/fetchEmployees',
    async () => {
      const response = await getMenu();
      // console.log(response);
      if (response.error_code) return [];
      if (Array.isArray(response)) {
        return response;
      }
      return [];
    },
);


export interface menuSettingsSlice {
    loading: boolean,
    data:menuItem[],
}

const initialState: menuSettingsSlice = {
  loading: false,
  data: [],
};


export const menuSettingsSlice = createSlice({
  name: 'menuSettings',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
        .addCase(getMenuSettingsAsync.pending, (state) => {
          state.loading = true;
        })
        .addCase(getMenuSettingsAsync.fulfilled, (
            state,
            action: PayloadAction<menuItem[]>,
        ) => {
          state.loading = false;
          state.data = action.payload;
        });
  },

});

export const {} = menuSettingsSlice.actions;


export default menuSettingsSlice.reducer;

import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getProfile} from '../api/partnershipApi';
import {userInt} from 'interface/partnershipInterfacs';


export const getProfileAsync = createAsyncThunk(
    'employeesList/fetchEmployees',
    async () => {
      const response = await getProfile();
      // console.log(response);
      if (response.error_code) return;
      return response as userInt;
    },
);


export interface EmployeesSlice {
    loading: boolean,
    data?:userInt
}

const initialState: EmployeesSlice = {
  loading: false,
};


export const curUserSlice = createSlice({
  name: 'curUser',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
        .addCase(getProfileAsync.pending, (state) => {
          state.loading = true;
        })
        .addCase(getProfileAsync.fulfilled, (
            state,
            action: PayloadAction<userInt | undefined>,
        ) => {
          state.loading = false;
          state.data = action.payload;
        });
  },

});

export const {} = curUserSlice.actions;


export default curUserSlice.reducer;

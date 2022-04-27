import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {employee, getPartnershipList} from '../interface/partnershipInterfacs';
import {getPersonsList} from '../api/partnershipApi';


export const setEmployeesAsync = createAsyncThunk(
    'employeesList/fetchEmployees',
    async (data: getPartnershipList) => {
      const response = await getPersonsList(data);
      if (response.error_code) return [];
      if (Array.isArray(response)) {
        return response;
      }
      return [];
    },
);

export interface EmployeesSlice {
    loading: boolean,
    data: employee[],
    reqParams:getPartnershipList,
}


const initialState: EmployeesSlice = {
  loading: false,
  data: [],
  reqParams: {},
};


export const employeesSlice = createSlice({
  name: 'employeesList',
  initialState,
  reducers: {
    setCalls: (state, action: PayloadAction<employee[]>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(setEmployeesAsync.pending, (state) => {
          state.loading = true;
        })
        .addCase(setEmployeesAsync.fulfilled, (
            state,
            action: PayloadAction<employee[]>,
        ) => {
          state.loading = false;
          state.data = action.payload;
        });
  },
});

export const {} = employeesSlice.actions;


export default employeesSlice.reducer;

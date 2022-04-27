import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CallInterface, GetCallList, in_out, order, sort_by} from 'interface/mangoInterfaces';
import {getCallList} from 'api/mangoApi';


export const setCallListAsync = createAsyncThunk(
    'callList/fetchCallList',
    async (data: GetCallList) => {
      const response = await getCallList(data);
      if (response.error_code) return {results: [], total_rows: 0};
      if (Array.isArray(response.results)) {
        return response;
      }
      return {results: [], total_rows: 0};
    },
);

export interface CallListSlice {
    loading: boolean,
    data: CallInterface[],
    reqParams:GetCallList,
    callsCount:number
}

const currentDate=new Date();
const date_start =currentDate.toISOString().split('T')[0];
const date_end= new Date(new Date().setDate(currentDate.getDate()-2)).toISOString().split('T')[0];

const initialState: CallListSlice = {
  loading: false,
  data: [],
  callsCount: 0,
  reqParams: {
    'date_start': date_end,
    'date_end': date_start,
    'in_out': '',
    'filter': {
      'limit': 50,
      'offset': 0,
      'sort_by': 'date',
      'order': 'DESC',
      // 'from_persons': ['4042'],
      // 'status': 'success',
      // 'sources': ['yandex', 'empty'],
      // 'sources': ['from_site'],
      // 'duration[gte]': 10,
      // 'duration[lte]': 50,
    },
  },
};


export const callListSlice = createSlice({
  name: 'callList',
  initialState,
  reducers: {
    setCalls: (state, action: PayloadAction<Array<CallInterface>>) => {
      state.data = action.payload;
    },
    setInOutFilter: (state, action: PayloadAction<in_out>) => {
      if (state.reqParams) {
        state.reqParams.in_out = action.payload;
      }
    },
    setCallsDate: (state, action: PayloadAction<string>) => {
      state.reqParams.date_start = action.payload;
      state.reqParams.date_end = action.payload;
    },
    setCallsDateInterval: (state, action: PayloadAction<{start:string, end:string}>) => {
      state.reqParams.date_start = action.payload.start;
      state.reqParams.date_end = action.payload.end;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.reqParams.filter.limit=action.payload;
    },
    setSortAndOrder: (state, action: PayloadAction<{sort_by:sort_by, order:order}>) => {
      state.reqParams.filter.sort_by=action.payload.sort_by;
      state.reqParams.filter.order=action.payload.order;
    },
    cleanAllFilters: (state)=>{
      state.reqParams={
        'date_start': state.reqParams.date_start,
        'date_end': state.reqParams.date_end,
        'in_out': '',
        'filter': {
          'limit': state.reqParams.filter.limit,
          'offset': 0,
          'sort_by': 'date',
          'order': 'DESC',
        },
      };
    },
    setFilter: (
        state,
        action: PayloadAction<{key:keyof typeof state.reqParams.filter, value:any}>,
    )=>{
      state.reqParams.filter={
        ...state.reqParams.filter,
        [action.payload.key]: action.payload.value,
      };
    },
    removeFilter: (state, action: PayloadAction<keyof typeof state.reqParams.filter>)=>{
      const {[action.payload]: useless, ...newReqParams}=state.reqParams.filter;
      console.log(useless);
      state.reqParams.filter=newReqParams;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(setCallListAsync.pending, (state) => {
          if (state.callsCount===0) {
            state.loading = true;
          }
        })
        .addCase(setCallListAsync.fulfilled, (
            state,
            action: PayloadAction<{results:CallInterface[], total_rows:number }>,
        ) => {
          state.loading = false;
          state.data = action.payload.results;
          state.callsCount=action.payload.total_rows;
        });
  },
});

export const {
  setInOutFilter,
  setCallsDate,
  setCallsDateInterval,
  setLimit,
  setSortAndOrder,
  setFilter,
  cleanAllFilters,
  removeFilter,
} = callListSlice.actions;


// export const cleanAllFilters =
//     (amount: number): AppThunk =>
//       (dispatch, getState) => {
//         const currentValue = selectCount(getState());
//         if (currentValue % 2 === 1) {
//           dispatch(incrementByAmount(amount));
//         }
//       };

export default callListSlice.reducer;

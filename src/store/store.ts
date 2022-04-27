import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import callListReducer from 'reducers/callListReducer';
import employeesReducer from 'reducers/employeesReducer';
import curUserReducer from 'reducers/curUserReducer';
import menuSettingsReducer from 'reducers/menuReducer';


export const store = configureStore({
  reducer: {
    callList: callListReducer,
    employeesList: employeesReducer,
    curUser: curUserReducer,
    menuSettings: menuSettingsReducer,
  },
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

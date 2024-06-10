// reducers.ts
import { createReducer } from '@reduxjs/toolkit';
import { setFilterSuccess } from './actions';

export const filterReducer = createReducer<string>('all', (builder) => {
  builder.addCase(setFilterSuccess, (state, action) => action.payload);
});

export type AppState = {
  filter: ReturnType<typeof filterReducer>;
  // Agregue más propiedades aquí si es necesario
};
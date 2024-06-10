// reducers.ts
import { combineReducers } from 'redux';
import { filterReducer } from './filters/reducers';


export type RootState = ReturnType<typeof rootReducer>;

export const rootReducer = combineReducers({
  filterReducer,
});

export default rootReducer;
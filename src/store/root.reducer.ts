import { combineReducers } from 'redux';
import { menuSlice } from './navbar/menuSlice';

export const rootReducers = combineReducers({
    todos: () => [1, 2, 3],
    menu: menuSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducers>;

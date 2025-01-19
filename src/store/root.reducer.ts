import { combineReducers } from 'redux';
import { menuSlice } from './navbar/menuSlice';
import calculatorSlice from './calculator/calculatorSlice';

export const rootReducers = combineReducers({
    todos: () => [1, 2, 3],
    menu: menuSlice.reducer,
    calculator: calculatorSlice,
});

export type RootState = ReturnType<typeof rootReducers>;

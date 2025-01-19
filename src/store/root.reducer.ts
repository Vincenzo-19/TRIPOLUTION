import { combineReducers } from 'redux';
import calculatorSlice from './calculator/calculatorSlice';

export const rootReducers = combineReducers({
    todos: () => [1, 2, 3],
    calculator: calculatorSlice,
});

export type RootState = ReturnType<typeof rootReducers>;

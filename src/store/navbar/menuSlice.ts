import { RootState } from '../root.reducer';
import { createSlice } from '@reduxjs/toolkit';

interface MenuState {
    isMenuOpen: boolean;
}

const initialState: MenuState = {
    isMenuOpen: false,
};

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        toggleMenu: (state) => {
            state.isMenuOpen = !state.isMenuOpen;
        },
    },
});

export const { toggleMenu } = menuSlice.actions;

export const selectMenu = (state: RootState) => state.menu;

export default menuSlice.reducer;

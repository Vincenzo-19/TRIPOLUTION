import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../root.reducer';

interface Airport {
    code: string;
    name: string;
    city: string;
    country: string;
}

interface CalculatorState {
    airports: Airport[];
    filteredAirports: Airport[];
    departure: string;
    destination: string;
    passengers: number | null;
    showDepartureList: boolean;
    showDestinationList: boolean;
    footprint: number | null;
}

const initialState: CalculatorState = {
    airports: [],
    filteredAirports: [],
    departure: '',
    destination: '',
    passengers: null,
    showDepartureList: false,
    showDestinationList: false,
    footprint: null,
};

const calculatorSlice = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        setAirports(state, action: PayloadAction<Airport[]>) {
            state.airports = action.payload;
        },
        setFilteredAirports(state, action: PayloadAction<Airport[]>) {
            state.filteredAirports = action.payload;
        },
        setDeparture(state, action: PayloadAction<string>) {
            state.departure = action.payload;
        },
        setDestination(state, action: PayloadAction<string>) {
            state.destination = action.payload;
        },
        setPassengers(state, action: PayloadAction<number | null>) {
            state.passengers = action.payload;
        },
        setFootprint(state, action: PayloadAction<number | null>) {
            state.footprint = action.payload;
        },
        setShowDepartureList(state, action: PayloadAction<boolean>) {
            state.showDepartureList = action.payload;
        },
        setShowDestinationList(state, action: PayloadAction<boolean>) {
            state.showDestinationList = action.payload;
        },
    },
});

export const {
    setAirports,
    setFilteredAirports,
    setDeparture,
    setDestination,
    setPassengers,
    setFootprint,
    setShowDepartureList,
    setShowDestinationList,
} = calculatorSlice.actions;

export const selectCalculator = (state: RootState) => state.calculator;

export default calculatorSlice.reducer;

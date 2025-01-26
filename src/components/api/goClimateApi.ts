import axios from 'axios';

const GO_CLIMATE_API_URL = 'https://api.goclimate.com/v1/flight_footprint';

const API_TOKEN = import.meta.env.VITE_GO_CLIMATE_TOKEN || '';

export const getFlightFootprint = async (
    departureCode: string,
    destinationCode: string,
    cabin_class: string = 'economy'
) => {
    try {
        const response = await axios.get(GO_CLIMATE_API_URL, {
            params: {
                'segments[0][origin]': departureCode,
                'segments[0][destination]': destinationCode,
                cabin_class,
            },
            auth: {
                username: API_TOKEN,
                password: '',
            },
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('API response:', response.data);
        return response.data.footprint;
    } catch {
        console.error('Errore durante il calcolo del footprint');
        throw new Error('Errore durante il calcolo del footprint');
    }
};

import axios from 'axios';

const GO_CLIMATE_API_URL = 'https://api.goclimate.com/v1/flight_footprint';
const API_TOKEN = process.env.REACT_APP_GO_CLIMATE_API_TOKEN || '';

const apiClient = axios.create({
    baseURL: GO_CLIMATE_API_URL,
    headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
    },
});

export const getFlightFootprint = async (
    departure: string,
    destination: string,
    passengers: number
) => {
    try {
        const RESPONSE = await apiClient.post('/', {
            legs: [
                {
                    from: departure,
                    to: destination,
                    passengers,
                },
            ],
        });
        return RESPONSE.data;
    } catch (error) {
        console.error('Errore durante il calcolo del footprint', error);
        throw error;
    }
};

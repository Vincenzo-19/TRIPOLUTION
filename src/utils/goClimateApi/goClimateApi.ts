import axios from 'axios';
import { error } from 'console';

const GO_CLIMATE_API_URL = 'https://api.goclimate.com/v1/flight_footprint';
const API_TOKEN = process.env.REACT_APP_GO_CLIMATE_API_TOKEN || '';

export const getFlightFootprint = async (
    departureCode: string,
    destinationCode: string
) => {
    if (!API_TOKEN) {
        console.error('API token is missing');
        throw new Error('API token is missing');
    }

    try {
        const params = new URLSearchParams({
            'segments[0][origin]': departureCode,
            'segments[0][destination]': destinationCode,
        });

        const response = await axios.get(GO_CLIMATE_API_URL, {
            params,
            auth: {
                username: API_TOKEN,
                password: '',
            },
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data.footprint;
    } catch {
        console.error('Error while calculating the footprint');
        throw error;
    }
};

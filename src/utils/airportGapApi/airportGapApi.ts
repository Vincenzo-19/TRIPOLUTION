import axios from 'axios';

const AIRPORT_GAP_API_URL = 'https://airportgap.com/api';
const AIRPORT_API_TOKEN = process.env.REACT_APP_AIRPORT_GAP_API_TOKEN || '';

const apiClient = axios.create({
    baseURL: AIRPORT_GAP_API_URL,
    headers: {
        Authorization: `Bearer ${AIRPORT_API_TOKEN}`,
        'Content-Type': 'application/json',
    },
});

export const getAirports = async () => {
    try {
        const response = await apiClient.get('/airports', {
            params: {
                page: '100',
            },
        });
        return response.data.data.map(
            (airport: {
                id: string;
                attributes: { name: string; city: string; country: string };
            }) => ({
                code: airport.id,
                name: airport.attributes.name,
                city: airport.attributes.city,
                country: airport.attributes.country,
            })
        );
    } catch (error) {
        console.error('Errore durante il recupero degli aeroporti', error);
        throw error;
    }
};

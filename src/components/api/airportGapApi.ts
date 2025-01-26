import axios from 'axios';
import getJsonAirports from './airportCodes/airportCodes';

const AIRPORT_GAP_API_URL = 'https://airportgap.com/api';

const API_TOKEN = import.meta.env.VITE_AIRPORT_GAP_API_TOKEN || '';

const apiClient = axios.create({
    baseURL: AIRPORT_GAP_API_URL,
    headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
    },
});

export const getAirports = async () => {
    try {
        const response = await apiClient.get('/airports', {
            params: {
                page: '5',
            },
        });

        const apiAirports = response.data.data.map(
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

        const jsonAirports = getJsonAirports();

        const combinedAirports = [...jsonAirports, ...apiAirports];

        const uniqueAirports = Array.from(
            new Map(
                combinedAirports.map((airport) => [airport.code, airport])
            ).values()
        );

        return uniqueAirports;
    } catch (error) {
        console.error('Errore durante il recupero degli aeroporti', error);
        throw error;
    }
};

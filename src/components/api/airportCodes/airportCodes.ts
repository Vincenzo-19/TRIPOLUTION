import airportsData from './airports.json';

export const getJsonAirports = () => {
    return airportsData.map(
        (airport: {
            code: string;
            name: string;
            city: string;
            country: string;
        }) => ({
            code: airport.code,
            name: airport.name,
            city: airport.city,
            country: airport.country,
        })
    );
};
export default getJsonAirports;

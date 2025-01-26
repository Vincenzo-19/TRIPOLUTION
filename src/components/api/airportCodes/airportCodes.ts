import airportsData from './airports.json';

interface IAirport {
    code: string;
    name: string;
    city: string;
    country: string;
}

export const getJsonAirports = (): IAirport[] => {
    return airportsData as IAirport[];
};

export default getJsonAirports;

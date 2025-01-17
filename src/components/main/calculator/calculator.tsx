import React, { useEffect, useState } from 'react';
import styles from './calculator.module.scss';
import { getAirports } from '../../api/airportGapApi';
import { getFlightFootprint } from '../../api/goClimateApi';

interface Airport {
    code: string;
    name: string;
    city: string;
    country: string;
}

export const Calculator = () => {
    const [airports, setAirports] = useState<Airport[]>([]);
    const [filteredAirports, setFilteredAirports] = useState<Airport[]>([]);
    const [departure, setDeparture] = useState('');
    const [destination, setDestination] = useState('');
    const [passengers, setPassengers] = useState<number | null>(null);
    const [footprint, setFootprint] = useState<number | null>(null);
    const [showDepartureList, setShowDepartureList] = useState(false);
    const [showDestinationList, setShowDestinationList] = useState(false);

    useEffect(() => {
        const fetchAirports = async () => {
            try {
                const data = await getAirports();
                setAirports(data);
            } catch (error) {
                console.error(
                    'Errore durante il recupero degli aeroporti',
                    error
                );
            }
        };

        fetchAirports();
    }, []);

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        type: 'departure' | 'destination'
    ) => {
        const value = event.target.value;
        if (type === 'departure') {
            setDeparture(value);
            setShowDepartureList(true);
        } else {
            setDestination(value);
            setShowDestinationList(true);
        }
        filterAirports(value, type);
    };

    const filterAirports = (
        value: string,
        type: 'departure' | 'destination'
    ) => {
        setFilteredAirports(
            airports.filter(
                (airport) =>
                    airport.city.toLowerCase().includes(value.toLowerCase()) &&
                    airport.code !==
                        (type === 'departure'
                            ? destination.split(' - ')[0]
                            : departure.split(' - ')[0])
            )
        );
    };

    const handleFocus = (type: 'departure' | 'destination') => {
        if (type === 'departure') {
            setShowDepartureList(true);
            filterAirports(departure, type);
        } else {
            setShowDestinationList(true);
            filterAirports(destination, type);
        }
    };

    const handleSelect = (
        airport: Airport,
        type: 'departure' | 'destination'
    ) => {
        if (type === 'departure') {
            setDeparture(
                `${airport.code} - ${airport.city}, ${airport.country}`
            );
            setShowDepartureList(false);
        } else {
            setDestination(
                `${airport.code} - ${airport.city}, ${airport.country}`
            );
            setShowDestinationList(false);
        }
    };

    const calculateFootprint = async () => {
        const departureCode = departure.split(' - ')[0];
        const destinationCode = destination.split(' - ')[0];

        try {
            const footprint = await getFlightFootprint(
                departureCode,
                destinationCode
            );

            if (passengers !== null && passengers > 1) {
                setFootprint(footprint * passengers);
            } else {
                setFootprint(footprint);
            }
        } catch (error) {
            console.error('Errore durante il calcolo del footprint', error);
        }
    };

    return (
        <section className={styles.search}>
            <div className={styles.searchContainer}>
                <h1 className="title">Calcolo del FootPrint</h1>
                <div className={styles.searchControlsContainer}>
                    <label htmlFor="Partenza"></label>
                    <input
                        type="text"
                        name="Partenza"
                        id="Partenza"
                        title="Partenza"
                        placeholder="Da"
                        required
                        className={styles.input1}
                        value={departure}
                        onFocus={() => handleFocus('departure')}
                        onClick={() => setDeparture('')}
                        onChange={(e) => handleInputChange(e, 'departure')}
                    />
                    {showDepartureList && (
                        <ul className={styles.airportList}>
                            {filteredAirports.map((airport) => (
                                <li
                                    key={airport.code}
                                    onClick={() =>
                                        handleSelect(airport, 'departure')
                                    }
                                >
                                    {airport.code} - {airport.city},{' '}
                                    {airport.country}
                                </li>
                            ))}
                        </ul>
                    )}

                    <label htmlFor="Destinazione"></label>
                    <input
                        type="text"
                        name="Destinazione"
                        id="Destinazione"
                        title="Destinazione"
                        placeholder="A"
                        required
                        className={styles.input2}
                        value={destination}
                        onFocus={() => handleFocus('destination')}
                        onClick={() => setDestination('')}
                        onChange={(e) => handleInputChange(e, 'destination')}
                    />
                    {showDestinationList && (
                        <ul className={styles.airportList}>
                            {filteredAirports.map((airport) => (
                                <li
                                    key={airport.code}
                                    onClick={() =>
                                        handleSelect(airport, 'destination')
                                    }
                                >
                                    {airport.code} - {airport.city},{' '}
                                    {airport.country}
                                </li>
                            ))}
                        </ul>
                    )}
                    <label htmlFor="numeroPasseggeri"></label>
                    <input
                        type="number"
                        name="numeroPasseggeri"
                        id="numeroPasseggeri"
                        title="numeroPasseggeri"
                        placeholder="Numero passeggeri"
                        required
                        className={styles.input3}
                        value={passengers !== null ? passengers : ''}
                        onChange={(e) => setPassengers(Number(e.target.value))}
                    />
                    <button onClick={calculateFootprint}>Calcola</button>
                </div>
                <div className={styles.resultContainer}>
                    <p>
                        Il footprint del volo è di:{' '}
                        <span className={styles.result}>
                            {footprint !== null ? `${footprint} kg CO2` : '-'}
                        </span>
                    </p>
                </div>
            </div>
        </section>
    );
};

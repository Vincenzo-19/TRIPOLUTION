import styles from './calculator.module.scss';
import { getAirports } from '../../api/airportGapApi';
import { useEffect, useState } from 'react';
// import { getFlightFootprint } from '../../api/goClimateApi';

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
    // const [loading, setLoading] = useState(false);
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

    const handleDepartureChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value;
        setDeparture(value);
        setShowDepartureList(true);
        setFilteredAirports(
            airports.filter((airport) =>
                airport.city.toLowerCase().includes(value.toLowerCase())
            )
        );
    };

    const handleDestinationChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value;
        setDestination(value);
        setShowDestinationList(true);
        setFilteredAirports(
            airports.filter((airport) =>
                airport.city.toLowerCase().includes(value.toLowerCase())
            )
        );
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
                        onFocus={() => setShowDepartureList(true)}
                        onChange={handleDepartureChange}
                    />
                    {showDepartureList && (
                        <ul className={styles.airportList}>
                            {filteredAirports.map((airport) => (
                                <li
                                    key={airport.code}
                                    onClick={() => {
                                        setDeparture(
                                            `${airport.code} - ${airport.name} - ${airport.country}`
                                        );
                                        setShowDepartureList(false);
                                    }}
                                >
                                    {airport.code} - {airport.name},{' '}
                                    {airport.city}, {airport.country}
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
                        onFocus={() => setShowDestinationList(true)}
                        onChange={handleDestinationChange}
                    />
                    {showDestinationList && (
                        <ul className={styles.airportList}>
                            {filteredAirports.map((airport) => (
                                <li
                                    key={airport.code}
                                    onClick={() => {
                                        setDestination(
                                            `${airport.code} - ${airport.name} - ${airport.country}`
                                        );
                                        setShowDestinationList(false);
                                    }}
                                >
                                    {airport.code} - {airport.name},{' '}
                                    {airport.city}, {airport.country}
                                </li>
                            ))}
                        </ul>
                    )}
                    <label htmlFor="numeroPasseggeri"></label>
                    <input
                        type="text"
                        name="numeroPasseggerio"
                        id="numeroPasseggeri"
                        title="numeroPasseggeri"
                        placeholder="Numero passeggeri"
                        required
                        className={styles.input3}
                        // value={passengers}
                        // onChange={(e) => setPassengers(Number(e.target.value))}
                    />
                    <button>Calcola</button>
                </div>
                <div className={styles.resultContainer}>
                    <p>
                        Il footprint del volo è di:{' '}
                        <span className={styles.result}>-</span>
                    </p>
                </div>
            </div>
        </section>
    );
};

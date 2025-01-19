import React, { useEffect } from 'react';
import styles from './calculator.module.scss';
import { getAirports } from '../../api/airportGapApi';
import { getFlightFootprint } from '../../api/goClimateApi';
import * as calculatorActions from '../../../store/calculator/calculatorSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/root.reducer';

export const Calculator = () => {
    const dispatch = useDispatch();
    const {
        airports,
        filteredAirports,
        departure,
        destination,
        passengers,
        footprint,
        showDepartureList,
        showDestinationList,
    } = useSelector((state: RootState) => state.calculator);

    useEffect(() => {
        const fetchAirports = async () => {
            try {
                const data = await getAirports();
                dispatch(calculatorActions.setAirports(data));
            } catch (error) {
                console.error(
                    'Errore durante il recupero degli aeroporti',
                    error
                );
            }
        };

        fetchAirports();
    }, [dispatch]);

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        type: 'departure' | 'destination'
    ) => {
        const value = event.target.value;
        if (type === 'departure') {
            dispatch(calculatorActions.setDeparture(value));
            dispatch(calculatorActions.setShowDepartureList(true));
        } else {
            dispatch(calculatorActions.setDestination(value));
            dispatch(calculatorActions.setShowDestinationList(true));
        }
        filterAirports(value, type);
    };

    const filterAirports = (
        value: string,
        type: 'departure' | 'destination'
    ) => {
        dispatch(
            calculatorActions.setFilteredAirports(
                airports.filter(
                    (airport) =>
                        airport.city
                            .toLowerCase()
                            .includes(value.toLowerCase()) &&
                        airport.code !==
                            (type === 'departure'
                                ? destination.split(' - ')[0]
                                : departure.split(' - ')[0])
                )
            )
        );
    };

    const handleFocus = (type: 'departure' | 'destination') => {
        if (type === 'departure') {
            dispatch(calculatorActions.setShowDepartureList(true));
            filterAirports(departure, type);
        } else {
            dispatch(calculatorActions.setShowDestinationList(true));
            filterAirports(destination, type);
        }
    };

    const handleSelect = (
        airport: { code: string; city: string; country: string },
        type: 'departure' | 'destination'
    ) => {
        if (type === 'departure') {
            dispatch(
                calculatorActions.setDeparture(
                    `${airport.code} - ${airport.city}, ${airport.country}`
                )
            );
            dispatch(calculatorActions.setShowDepartureList(false));
        } else {
            dispatch(
                calculatorActions.setDestination(
                    `${airport.code} - ${airport.city}, ${airport.country}`
                )
            );
            dispatch(calculatorActions.setShowDestinationList(false));
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
                dispatch(
                    calculatorActions.setFootprint(footprint * passengers)
                );
            } else {
                dispatch(calculatorActions.setFootprint(footprint));
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
                        onClick={() => calculatorActions.setDeparture('')}
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
                        onClick={() => calculatorActions.setDestination('')}
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
                        onChange={(e) =>
                            dispatch(
                                calculatorActions.setPassengers(
                                    Number(e.target.value)
                                )
                            )
                        }
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

import React, { useEffect } from 'react';
import styles from './calculator.module.scss';
import { getAirports } from '../../api/airportGapApi';
import { getFlightFootprint } from '../../api/goClimateApi';
import * as calculatorActions from '../../../store/calculator/calculatorSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/root.reducer';
import { addButtonTouchListeners } from '../../utils/handleButtonTouch';

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

    // recupero degli aeroporti

    useEffect(() => {
        const fetchAirports = async () => {
            try {
                const data = await getAirports();
                dispatch(calculatorActions.setAirports(data));
                dispatch(calculatorActions.setFilteredAirports(data));
            } catch (error) {
                console.error(
                    'Errore durante il recupero degli aeroporti',
                    error
                );
            }
        };

        fetchAirports();
    }, [dispatch]);

    // funzione per gestire il cambio di valore degli input

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

    // funzione per filtrare gli aeroporti

    const filterAirports = (
        value: string,
        type: 'departure' | 'destination'
    ) => {
        dispatch(
            calculatorActions.setFilteredAirports(
                airports.filter(
                    (airport) =>
                        airport.code
                            .toLowerCase()
                            .includes(value.toLowerCase()) ||
                        airport.city
                            .toLowerCase()
                            .includes(value.toLowerCase()) ||
                        (airport.country
                            .toLowerCase()
                            .includes(value.toLowerCase()) &&
                            airport.code !==
                                (type === 'departure'
                                    ? destination.split(' - ')[0]
                                    : departure.split(' - ')[0]))
                )
            )
        );
    };

    // funzione per gestire il focus sugli input

    const handleFocus = (type: 'departure' | 'destination') => {
        if (type === 'departure') {
            filterAirports(departure, type);
        } else {
            filterAirports(destination, type);
        }
    };

    // funzione per selezionare un aeroporto

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

    // funzione per calcolare il footprint

    const calculateFootprint = async () => {
        if (!departure || !destination || !passengers) {
            alert('Per favore, inserisci tutti i campi');
            return;
        }

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

    //
    //
    //

    addButtonTouchListeners();

    return (
        <section className={styles.search}>
            <div className={styles.searchContainer}>
                <h1 className="title">Calcolo del FootPrint</h1>
                <form
                    className={styles.searchControlsContainer}
                    onSubmit={(e) => {
                        e.preventDefault();
                        calculateFootprint();
                    }}
                >
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
                        onClick={() => {
                            dispatch(calculatorActions.setDeparture(''));
                        }}
                        onChange={(e) => handleInputChange(e, 'departure')}
                    />
                    {showDepartureList && (
                        <ul
                            className={`${styles.airportList} ${styles.departureList}`}
                        >
                            {filteredAirports.length > 0 ? (
                                filteredAirports.map((airport, index) => (
                                    <li
                                        key={`${airport.code}-${index}`}
                                        onClick={() =>
                                            handleSelect(airport, 'departure')
                                        }
                                    >
                                        {airport.code} - {airport.city},{' '}
                                        {airport.country}
                                    </li>
                                ))
                            ) : (
                                <li className={styles.notResult}>
                                    Nessun risultato trovato
                                </li>
                            )}
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
                        onClick={() => {
                            dispatch(calculatorActions.setDestination(''));
                        }}
                        onChange={(e) => handleInputChange(e, 'destination')}
                    />
                    {showDestinationList && (
                        <ul
                            className={`${styles.airportList} ${styles.destinationList}`}
                        >
                            {filteredAirports.length > 0 ? (
                                filteredAirports.map((airport, index) => (
                                    <li
                                        key={`${airport.code}-${index}`}
                                        onClick={() =>
                                            handleSelect(airport, 'destination')
                                        }
                                    >
                                        {airport.code} - {airport.city},{' '}
                                        {airport.country}
                                    </li>
                                ))
                            ) : (
                                <li className={styles.notResult}>
                                    Nessun risultato trovato
                                </li>
                            )}
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
                </form>
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

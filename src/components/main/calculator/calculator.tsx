import styles from './calculator.module.scss';

export const Calculator = () => {
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
                    />
                    <label htmlFor="Destinazione"></label>
                    <input
                        type="text"
                        name="Destinazione"
                        id="Destinazione"
                        title="Destinazione"
                        placeholder="A"
                        required
                        className={styles.input2}
                    />
                    <label htmlFor="numeroPasseggeri"></label>
                    <input
                        type="text"
                        name="numeroPasseggerio"
                        id="numeroPasseggeri"
                        title="numeroPasseggeri"
                        placeholder="Numero passeggeri"
                        required
                        className={styles.input3}
                    />
                    <button>Calcola</button>
                </div>
                <div className={styles.resultContainer}>
                    <p>
                        Il tuo FootPrint è di:{' '}
                        <span className={styles.result}>-</span>
                    </p>
                </div>
            </div>
        </section>
    );
};

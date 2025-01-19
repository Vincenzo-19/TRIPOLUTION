import styles from './FootprintInfo.module.scss';
import airplane from '../../../../public/images/airplane.webp';
import nature from '../../../../public/images/nature.webp';
import travel from '../../../../public/images/travel.webp';

export const FootprintInfo = () => {
    return (
        <>
            <section>
                <div className={styles.container}>
                    <div className={styles.box1}>
                        <div className={styles.textContainer}>
                            <div className={styles.textContainerInner}>
                                <h2 className={styles.h2}>
                                    Cos'è Tripolution?
                                </h2>
                                <p>
                                    Tripolution misura l'impronta di carbonio
                                    che lasciamo sull'ambiente quando prendiamo
                                    l'aereo.
                                </p>
                            </div>
                        </div>
                        <div className={styles.imgContainer}>
                            <img
                                src={nature}
                                className={styles.img}
                                alt="nature image"
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.container}>
                    <div className={styles.box2}>
                        <div className={styles.textContainer}>
                            <div className={styles.textContainerInner}>
                                <h2 className={styles.h2}>
                                    Perché è importante?
                                </h2>
                                <p>
                                    Quando prendiamo l'aereo, emettiamo dei gas
                                    che riscaldano il nostro pianeta. Sapere
                                    quanto inquinamo ci permette di fare scelte
                                    più consapevoli.
                                </p>
                            </div>
                        </div>
                        <div className={styles.imgContainer}>
                            <img
                                src={airplane}
                                className={styles.img}
                                alt="airplane image"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.container}>
                    <div className={styles.box3}>
                        <div className={styles.textContainer}>
                            <div className={styles.textContainerInner}>
                                <h2 className={styles.h2}>Come funziona?</h2>
                                <p>
                                    Tripolution, ti dirà quanto inquina il tuo
                                    viaggio in aereo sulla base di 3 criteri:
                                </p>
                                <ul>
                                    <li>
                                        <strong>Da dove parti:</strong> La tua
                                        città o aeroporto di partenza.
                                    </li>
                                    <li>
                                        <strong>Dove vai:</strong> La tua
                                        destinazione.
                                    </li>
                                    <li>
                                        <strong>Numero dei passeggeri:</strong>{' '}
                                        Quante persone sono presenti nel tuo
                                        viaggio.
                                    </li>
                                </ul>
                                <p>
                                    È come avere una piccola guida che ti aiuta
                                    a capire quanto il tuo viaggio influisce sul
                                    nostro pianeta.
                                </p>
                            </div>
                        </div>
                        <div className={styles.imgContainer}>
                            <img
                                src={travel}
                                className={`${styles.img} ${styles.img3} `}
                                alt="travel image"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

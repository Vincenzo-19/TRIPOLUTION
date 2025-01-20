import styles from './footer.module.scss';
import github from '/images/github.webp';
import linkedin from '/images/linkedin.webp';

export const Footer = () => {
    return (
        <>
            <section>
                <div className={styles.container}>
                    <div className={styles.socialContainer}>
                        <a
                            href="https://github.com/Vincenzo-19"
                            title="github"
                            target="_blank"
                            rel="noopener"
                        >
                            <img
                                src={github}
                                alt="github logo"
                                loading="lazy"
                            />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/vincenzonurcato/"
                            title="linkedin"
                            target="_blank"
                            rel="noopener"
                        >
                            <img
                                src={linkedin}
                                alt="linkedin logo"
                                loading="lazy"
                            />
                        </a>
                    </div>
                    <div className={styles.footerText}>
                        <p>© 2024 TRIPOLUTION. All rights reserved.</p>
                    </div>
                </div>
            </section>
        </>
    );
};

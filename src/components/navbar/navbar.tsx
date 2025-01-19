import styles from './navbar.module.scss';
import logo from '../../../public/images/logo.webp';

export const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logoContainer}>
                <a href="#">
                    <img
                        src={logo}
                        alt="Tripolution Logo"
                        className={styles.logo}
                    />
                </a>
            </div>
        </nav>
    );
};

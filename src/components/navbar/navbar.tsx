import styles from './navbar.module.scss';
import menuIcon from '../../images/menuIcon.svg';
import logo from '../../images/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import * as menuActions from '../../store/navbar/menuSlice';
import { selectMenu } from '../../store/navbar/menuSlice';
// Routing
import { Link } from 'react-router-dom';

export const Navbar = () => {
    const { isMenuOpen } = useSelector(selectMenu);
    const dispatch = useDispatch();

    const toggleNavbar = () => {
        dispatch(menuActions.toggleMenu());
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.logoContainer}>
                <img src={logo} alt="Tripolution" className={styles.logo} />
            </div>
            <ul
                className={`${styles.navLinks} ${
                    isMenuOpen ? styles.open : ''
                }`}
            >
                <li className={styles.links}>
                    <Link to="/">Home</Link>
                </li>
                <li className={styles.links}>
                    <Link to="/chiSono">Chi sono</Link>
                </li>
                <li className={styles.links}>
                    <Link to="/contatti">Contatti</Link>
                </li>
            </ul>
            <button onClick={toggleNavbar} className={styles.toggleButton}>
                <img
                    src={menuIcon}
                    alt="menu button"
                    className={styles.btnImage}
                />
            </button>
        </nav>
    );
};

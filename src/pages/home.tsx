import { Calculator } from '../components/main/calculator/calculator';
import { FootprintInfo } from '../components/main/section/FootprintInfo';
import { Navbar } from '../components/navbar/navbar';
import { Footer } from '../components/main/footer/footer';

export const Home = () => {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <Calculator />
                <FootprintInfo />
                <footer>
                    <Footer />
                </footer>
            </main>
        </>
    );
};

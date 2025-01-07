import { Calculator } from '../components/main/calculator/calculator';
import { Navbar } from '../components/navbar/navbar';

export const Home = () => {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <Calculator />
            </main>
        </>
    );
};

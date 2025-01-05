// Routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Pages
import { Home } from './pages/home';

export const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </Router>
        </>
    );
};

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Hero from './pages/Hero.jsx';
import TimeTravel from './pages/TimeTravel.jsx';
import Portfolio from './pages/Portfolio.jsx';
import Fortune from "./pages/Fortune.jsx";
import Games from './pages/Games.jsx';
import Footer from './components/Footer.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';

function App() {

    useEffect(() => {
        AOS.init({ duration: 800, easing: 'ease-in-out', once: true, offset: 100 });
    }, []);

    return (
        <BrowserRouter>
            <Navbar />
                <Routes>
                    <Route path="/" element={<Hero />} />
                    <Route path="/timeTravel" element={<TimeTravel />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/fortune" element={<Fortune />} /> {/* 새 페이지 */}
                    <Route path="/game" element={<Games />} />
                    {/*<Route path="/game/:gameId" element={<Game />} />*/}
                </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
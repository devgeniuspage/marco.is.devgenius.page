import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import TimeTravel from './components/TimeTravel.jsx';
import Portfolio from './components/Portfolio.jsx';
import Footer from './components/Footer.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';

function App() {

    const [activeSection, setActiveSection] = useState('hero'); // 초기 섹션

    useEffect(() => {
        AOS.init({ duration: 800, easing: 'ease-in-out', once: true, offset: 100 });
    }, []);

    return (
        <>
            <Navbar setActiveSection={setActiveSection} />
            {activeSection === 'hero' && <Hero />}
            {activeSection === 'time-travel' && <TimeTravel />}
            {activeSection === 'portfolio' && <Portfolio />}
            {activeSection === 'game' && <Game />}
            <Footer />
        </>
    );
}

export default App;
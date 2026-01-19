import { useState, useEffect } from 'react';

export default function Navbar({ setActiveSection }) {
    const [active, setActive] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <div className="nav-logo"><h2>시간여행하는 개발자</h2></div>
                <div className={`nav-menu ${active ? 'active' : ''}`}>
                    <button className="nav-link" onClick={() => setActiveSection('time-travel')}>
                        🕰 시간여행
                    </button>
                    <button className="nav-link" onClick={() => setActiveSection('portfolio')}>
                        💻 개발 포트폴리오
                    </button>
                    <button className="nav-link" onClick={() => setActiveSection('game')}>
                        🎮 게임
                    </button>
                </div>
                <div className="hamburger" onClick={() => setActive(!active)}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </div>
        </nav>
    );
}

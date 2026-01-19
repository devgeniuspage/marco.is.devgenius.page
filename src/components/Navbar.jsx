import { useState, useEffect } from 'react';

export default function Navbar({ setActiveSection }) {
    const [active, setActive] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [gameOpen, setGameOpen] = useState(false);

    const games = [
        { id: 'game1', label: '🧩 퍼즐 게임' },
        { id: 'game2', label: '🚀 슈팅 게임' },
        { id: 'game3', label: '🎯 미니 게임' },
    ];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <div className="nav-logo"><h2 onClick={() => setActiveSection('hero')}>시간여행하는 개발자</h2></div>
                <div className={`nav-menu ${active ? 'active' : ''}`}>
                    <button className="nav-link" onClick={() => setActiveSection('time-travel')}>
                        🕰 시간여행
                    </button>
                    <button className="nav-link" onClick={() => setActiveSection('portfolio')}>
                        💻 개발 포트폴리오
                    </button>
                    <div className="nav-item dropdown">
                        <button
                            className="nav-link"
                            onClick={() => setGameOpen(!gameOpen)}
                        >
                            🎮 게임 ▾
                        </button>

                        {gameOpen && (
                            <div className="dropdown-menu">
                                {games.map((game) => (
                                    <button
                                        key={game.id}
                                        className="dropdown-item"
                                        onClick={() => {
                                            setActiveSection(game.id);
                                            setGameOpen(false);
                                        }}
                                    >
                                        {game.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
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

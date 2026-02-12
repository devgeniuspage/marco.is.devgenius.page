import { useState, useEffect } from 'react';
import { NavLink, useNavigate  } from 'react-router-dom';
import '../styles/Navbar.css';

export default function Navbar() {
    const [active, setActive] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [gameOpen, setGameOpen] = useState(false);
    const navigate = useNavigate();

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
                <div className="nav-logo">
                    <h2><NavLink to="/">시간여행하는 개발자</NavLink></h2>
                </div>
                <div className="nav-menu">
                    <NavLink to="/timeTravel"><button className="nav-link">🕰 시간여행</button></NavLink>
                    <NavLink to="/portfolio"><button className="nav-link">💻 개발 포트폴리오</button></NavLink>
                    <NavLink to="/fortune"><button className="nav-link">🔮 오늘의 운세</button></NavLink>
                    <NavLink to="/game">
                        <div className="nav-item dropdown"
                             onMouseEnter={() => setGameOpen(true)}
                             onMouseLeave={() => setGameOpen(false)}>
                        <button className="nav-link" onClick={() => setGameOpen(prev => !prev)}>🎮 게임 ▾</button>
                        <div className={`dropdown-menu ${gameOpen ? 'open' : ''}`}>
                            {games.map((game) => (
                                <button
                                    key={game.id}
                                    className="dropdown-item"
                                    onClick={() => {
                                        navigate(`/game/${game.id}`);
                                        setGameOpen(false);
                                    }}
                                >
                                    {game.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    </NavLink>

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

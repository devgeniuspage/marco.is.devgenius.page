import React from 'react';

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-info">
                        <h3>시간여행하는 개발자</h3>
                        <p>과거, 현재, 미래를 연결하는 개발자</p>
                    </div>
                    <div className="footer-contact">
                        <p>📧 contact@timetravel-dev.com</p>
                        <p>🔗 <a href="https://github.com/timetravel-dev" target="_blank">GitHub</a></p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2025 시간여행하는 개발자. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
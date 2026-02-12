import React from 'react';
import '../styles/Portfolio.css';

function Portfolio() {
    const timeline = [
        { period: '2025.05 ~ 현재', company: '단비아이엔씨', role: '시스템 개발', desc: '최신 기술 스택을 활용한 시스템 개발 및 유지보수를 담당하고 있습니다.', aos: 'fade-right', delay: 200 },
        { period: '2025.01 ~ 2025.05', company: 'HKnets', role: '시스템 유지보수', desc: '기존 시스템의 안정성 확보 및 성능 최적화 업무를 수행했습니다.', aos: 'fade-left', delay: 300 },
        { period: '2019.03 ~ 2022.06', company: '군대', role: '정보과장', desc: '정보 시스템 관리 및 운영을 통해 체계적인 업무 처리 능력을 기를 수 있었습니다.', aos: 'fade-right', delay: 400 },
        { period: '2015.03 ~ 2019.02', company: '한국체육대학교', role: '대학생', desc: '체육학을 전공하며 다양한 경험과 도전 정신을 기를 수 있었습니다.', aos: 'fade-left', delay: 500 },
    ];

    return (
        <section id="portfolio" className="portfolio-section">
            <div className="container">
                <h2 data-aos="fade-up">💻 개발 포트폴리오</h2>
                <p data-aos="fade-up" data-aos-delay="100">최신순으로 정리된 저의 커리어 타임라인입니다</p>
                <div className="timeline">
                    {timeline.map((item, idx) => (
                        <div key={idx} className="timeline-item" data-aos={item.aos} data-aos-delay={item.delay}>
                            <div className="timeline-marker"></div>
                            <div className="timeline-content">
                                <div className="timeline-period">{item.period}</div>
                                <h3>{item.company}</h3>
                                <p className="timeline-role">{item.role}</p>
                                <p className="timeline-description">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Portfolio;
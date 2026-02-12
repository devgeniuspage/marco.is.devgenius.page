import { useState } from "react";
import '../styles/Fortune.css';

export default function Fortune() {
    const [fortune, setFortune] = useState("");
    const [score, setScore] = useState(null);
    const [loading, setLoading] = useState(false);

    const getFortune = async () => {
        setLoading(true);
        try {
            // 무료 AI 운세 API 호출 (예시)
            // 실제로는 OpenAI API, Hugging Face, RapidAPI 등 사용 가능
            const res = await fetch("https://api.adviceslip.com/advice"); // 무료 샘플 API
            const data = await res.json();
            setFortune(data.slip.advice); // 운세 텍스트
            setScore(Math.floor(Math.random() * (100 - 50 + 1)) + 50); // 0~100점 랜덤
        } catch (err) {
            setFortune("오늘은 운세를 가져올 수 없습니다 😢");
            setScore(null);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="fortune" className="fortune-section">
            <div className="container">
                <div className="fortune-text">
                    <h2 data-aos="fade-up">🔮 오늘의 운세</h2>
                    <p data-aos="fade-up" data-aos-delay="100">오늘의 운세를 확인해보세요</p>
                </div>

                <div className="fortune-button-wrapper">
                    <button onClick={getFortune}>운세 보기</button>
                </div>
                {loading && <p className="fortune-loading">운세를 불러오는 중...</p>}
                {fortune && (
                    <div className="fortune-result-box">
                        <p style={{ marginTop: "1rem", fontSize: "1.2rem" }}>{fortune}</p>
                        {score !== null && (
                            <p style={{ marginTop: "0.5rem", fontSize: "1.5rem" }}>
                                오늘의 운 점수: {score}점
                            </p>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import { mapData } from '../data/mapData.js';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../styles/TimeTravel.css';

const DefaultIcon = L.icon({
    iconUrl: '/marker-icon-2x.png',
    shadowUrl: '/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function TimeTravel() {
    const polylineCoords = mapData.map(loc => [loc.lat, loc.lng]);

    return (
        <section id="time-travel" className="time-travel-section">
            <div className="container">
                <h2 data-aos="fade-up">🕰 시간여행</h2>
                <p data-aos="fade-up" data-aos-delay="100">지도를 통해 저의 여정을 따라가보세요</p>
                <MapContainer center={[37.5665, 126.9780]} zoom={11} style={{ height: '500px', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        attribution='&copy; OpenStreetMap &copy; CARTO'
                    />
                    <Polyline positions={polylineCoords} pathOptions={{ color: '#60e0e0', weight: 3 }} />
                    {mapData.map((loc, i) => (
                        <Marker key={i} position={[loc.lat, loc.lng]}>
                            <Popup>
                                <h3>{loc.title}</h3>
                                <p>{loc.period}</p>
                                <p>{loc.description}</p>
                                <button onClick={() => window.open(loc.streetViewUrl, '_blank')}>🗺️ 로드뷰 보기</button>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </section>
    );
}

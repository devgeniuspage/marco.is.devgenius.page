// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Map Data
const mapData = [
    {
        lat: 37.5145,
        lng: 127.1059,
        title: "한국체육대학교",
        period: "2015.03 ~ 2019.02",
        description: "대학생",
        details: "체육학을 전공하며 다양한 경험과 도전 정신을 기를 수 있었습니다. 학업과 함께 다양한 활동을 통해 리더십과 팀워크를 배웠습니다.",
        streetViewUrl: "https://maps.app.goo.gl/9VBrcMga61s8JATu7"
    },
    {
        lat: 37.8167,
        lng: 126.7833,
        title: "군부대 (경기도 파주)",
        period: "2019.03 ~ 2022.06",
        description: "정보과장",
        details: "정보 시스템 관리 및 운영을 담당하며 체계적인 업무 처리 능력을 기를 수 있었습니다. 다양한 IT 시스템을 관리하며 기술적 역량을 쌓았습니다.",
        streetViewUrl: "https://maps.app.goo.gl/ju6TRkpdws9XT7LP8"
    },
    {
        lat: 37.4814,
        lng: 126.8816,
        title: "HKnets",
        period: "2025.01 ~ 2025.05",
        description: "시스템 유지보수",
        details: "기존 시스템의 안정성 확보 및 성능 최적화 업무를 수행했습니다. 레거시 시스템을 현대적인 기술로 개선하는 프로젝트에 참여했습니다.",
        streetViewUrl: "https://www.google.com/maps/@37.4814,126.8816,3a,75y,90t/data=!3m6!1e1!3m4!1s0x357b61234567890a:0x1234567890abcdef!2e0!7i13312!8i6656"
    },
    {
        lat: 37.4837,
        lng: 127.0324,
        title: "단비아이엔씨",
        period: "2025.05 ~ 현재",
        description: "시스템 개발",
        details: "최신 기술 스택을 활용한 시스템 개발 및 유지보수를 담당하고 있습니다. 클라우드 기반 서비스 개발과 마이크로서비스 아키텍처 구축에 참여하고 있습니다.",
        streetViewUrl: "https://maps.app.goo.gl/veazqmyaxWbfhdwbA"
    }
];

// Initialize Map
let map;
let markers = [];
let polyline;

function initMap() {
    // Create map centered on Seoul with better zoom level
    map = L.map('map').setView([37.5665, 126.9780], 11);

    // Add dark theme tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);

    // Create polyline coordinates from mapData in order
    const polylineCoords = mapData.map(location => [location.lat, location.lng]);
    
    // Add polyline connecting all markers
    polyline = L.polyline(polylineCoords, {
        color: '#60e0e0',
        weight: 3,
        opacity: 0.8,
        dashArray: '10, 5',
        dashOffset: '0'
    }).addTo(map);

    // Add markers with animation delay and numbers
    mapData.forEach((location, index) => {
        setTimeout(() => {
            addMarker(location, index);
        }, index * 500);
    });

    // Animate the polyline
    animatePolyline();
}

function addMarker(location, index) {
    // Create custom icon with number
    const markerNumber = index + 1;
    const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="
            width: 30px; 
            height: 30px; 
            background-color: #60e0e0; 
            border: 3px solid white; 
            border-radius: 50%; 
            box-shadow: 0 0 0 3px #60e0e0, 0 3px 10px rgba(96, 224, 224, 0.4);
            animation: markerPulse 2s infinite;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 14px;
            color: white;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
        ">${markerNumber}</div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18]
    });

    // Add marker to map
    const marker = L.marker([location.lat, location.lng], { icon: customIcon })
        .addTo(map);

    // Add popup content with Street View button
    const popupContent = `
        <div style="min-width: 200px;">
            <h3 style="color: #60e0e0; margin-bottom: 8px; font-size: 1.1rem;">${location.title}</h3>
            <p style="color: #60e0e0; font-weight: 600; margin-bottom: 5px; font-size: 0.9rem;">${location.period}</p>
            <p style="font-weight: 500; margin-bottom: 8px; color: #333;">${location.description}</p>
            <p style="line-height: 1.4; color: #555; font-size: 0.9rem; margin-bottom: 10px;">${location.details}</p>
            <button onclick="openStreetView('${location.streetViewUrl}')" 
                    style="background: #60e0e0; color: white; border: none; padding: 8px 16px; 
                           border-radius: 20px; cursor: pointer; font-size: 0.9rem; font-weight: 500;
                           transition: all 0.3s ease;">
                🗺️ 로드뷰 보기
            </button>
        </div>
    `;

    marker.bindPopup(popupContent, {
        maxWidth: 300,
        className: 'custom-popup'
    });

    // Add click event for modal (alternative to popup)
    marker.on('click', () => {
        showMarkerModal(location);
    });

    markers.push(marker);

    // Add marker appearance animation
    marker.getElement().style.opacity = '0';
    marker.getElement().style.transform = 'scale(0)';
    
    setTimeout(() => {
        marker.getElement().style.transition = 'all 0.5s ease';
        marker.getElement().style.opacity = '1';
        marker.getElement().style.transform = 'scale(1)';
    }, 100);
}

// Animate polyline function
function animatePolyline() {
    let dashOffset = 0;
    const animate = () => {
        dashOffset -= 1;
        if (polyline) {
            polyline.setStyle({ dashOffset: dashOffset });
        }
        requestAnimationFrame(animate);
    };
    animate();
}

// Modal functionality
function showMarkerModal(location) {
    const modal = document.getElementById('marker-modal');
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <h2 style="color: #60e0e0; margin-bottom: 1rem;">${location.title}</h2>
        <div style="color: #60e0e0; font-weight: 600; margin-bottom: 0.5rem;">${location.period}</div>
        <div style="font-weight: 500; margin-bottom: 1rem; font-size: 1.1rem;">${location.description}</div>
        <p style="line-height: 1.6; color: #555; margin-bottom: 1.5rem;">${location.details}</p>
        <div style="text-align: center;">
            <button onclick="openStreetView('${location.streetViewUrl}')" 
                    style="background: #60e0e0; color: white; border: none; padding: 12px 24px; 
                           border-radius: 25px; cursor: pointer; font-size: 1rem; font-weight: 500;
                           transition: all 0.3s ease; box-shadow: 0 3px 10px rgba(96, 224, 224, 0.3);"
                    onmouseover="this.style.background='#4dd0d0'; this.style.transform='translateY(-2px)'"
                    onmouseout="this.style.background='#60e0e0'; this.style.transform='translateY(0)'">
                🗺️ 로드뷰에서 보기
            </button>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Street View function
function openStreetView(streetViewUrl) {
    window.open(streetViewUrl, '_blank');
}

// Close modal
document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('marker-modal').style.display = 'none';
});

window.addEventListener('click', (e) => {
    const modal = document.getElementById('marker-modal');
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Timeline animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
    observer.observe(item);
});

// Add CSS animation for marker pulse
const style = document.createElement('style');
style.textContent = `
    @keyframes markerPulse {
        0% {
            box-shadow: 0 0 0 3px #60e0e0, 0 3px 10px rgba(96, 224, 224, 0.4);
        }
        50% {
            box-shadow: 0 0 0 6px rgba(96, 224, 224, 0.7), 0 3px 10px rgba(96, 224, 224, 0.4);
        }
        100% {
            box-shadow: 0 0 0 3px #60e0e0, 0 3px 10px rgba(96, 224, 224, 0.4);
        }
    }
    
    .custom-popup .leaflet-popup-content-wrapper {
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
    }
    
    .custom-popup .leaflet-popup-tip {
        background: white;
    }
`;
document.head.appendChild(style);

// Initialize map when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure the map container is properly rendered
    setTimeout(initMap, 100);
});

// Handle window resize for map
window.addEventListener('resize', () => {
    if (map) {
        setTimeout(() => {
            map.invalidateSize();
        }, 100);
    }
});

// Add loading animation for the page
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add intersection observer for section animations
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});
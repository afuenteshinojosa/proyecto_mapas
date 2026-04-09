// ===== State =====
let map, markersLayer, platesLayer, fireLayer, selectedQuake = null;
let allQuakes = [];
let autoRefreshInterval = null;
let platesVisible = true;
let fireLayerVisible = false;
let ttsActive = false;
let kidMode = false;
let highContrast = false;

// ===== Configuration =====
const CHILE_BOUNDS = {
    minLat: -56, maxLat: -17,
    minLng: -80, maxLng: -64
};

const USGS_API = 'https://earthquake.usgs.gov/fdsnws/event/1/query';

// ===== Color Helpers =====
function getMagColor(mag) {
    if (mag < 3) return '#43e97b';
    if (mag < 4) return '#f9d423';
    if (mag < 5) return '#ff6b35';
    if (mag < 6) return '#e63946';
    return '#9d0208';
}

function getMagBg(mag) {
    if (mag < 3) return 'rgba(67,233,123,0.15)';
    if (mag < 4) return 'rgba(249,212,35,0.15)';
    if (mag < 5) return 'rgba(255,107,53,0.15)';
    if (mag < 6) return 'rgba(230,57,70,0.15)';
    return 'rgba(157,2,8,0.2)';
}

function getDepthColor(depth) {
    if (depth < 30) return '#43e97b';
    if (depth < 70) return '#38bdf8';
    if (depth < 150) return '#818cf8';
    if (depth < 300) return '#c77dff';
    return '#e63946';
}

function getMarkerSize(mag) {
    if (mag < 2) return 5;
    if (mag < 3) return 7;
    if (mag < 4) return 10;
    if (mag < 5) return 14;
    if (mag < 6) return 20;
    if (mag < 7) return 28;
    return 36;
}

// ===== Time Helpers =====
function timeAgo(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (mins < 1) return t('time.now');
    if (mins < 60) return t('time.agoM', { n: mins });
    if (hours < 24) return t('time.agoH', { n: hours });
    return t('time.agoD', { n: days });
}

function formatDate(timestamp) {
    const d = new Date(timestamp);
    return d.toLocaleString('es-CL', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false
    });
}

function formatDateShort(timestamp) {
    const d = new Date(timestamp);
    return d.toLocaleString('es-CL', {
        month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit',
        hour12: false
    });
}

// ===== Initialize Map =====
function initMap() {
    map = L.map('map', {
        center: [-33.5, -70.5],
        zoom: 5,
        zoomControl: true,
        attributionControl: true
    });

    // Dark tile layer - CartoDB Dark Matter
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 18
    }).addTo(map);

    // ===== Tectonic Plates Layer =====
    platesLayer = L.layerGroup().addTo(map);
    buildPlatesLayer();

    // ===== Fire Layer =====
    fireLayer = L.layerGroup();
    buildFireLayer();

    markersLayer = L.layerGroup().addTo(map);

    // Add major cities
    const cities = [
        { name: 'Santiago', lat: -33.4489, lng: -70.6693 },
        { name: 'Valparaíso', lat: -33.0472, lng: -71.6127 },
        { name: 'Concepción', lat: -36.8270, lng: -73.0503 },
        { name: 'Antofagasta', lat: -23.6509, lng: -70.3954 },
        { name: 'Temuco', lat: -38.7359, lng: -72.5904 },
        { name: 'Arica', lat: -18.4746, lng: -70.3216 },
        { name: 'Iquique', lat: -20.2140, lng: -70.1522 },
        { name: 'La Serena', lat: -29.9027, lng: -71.2519 },
        { name: 'Punta Arenas', lat: -53.1638, lng: -70.9171 },
        { name: 'Copiapó', lat: -27.3668, lng: -70.3323 },
        { name: 'Valdivia', lat: -39.8142, lng: -73.2459 },
        { name: 'Puerto Montt', lat: -41.4693, lng: -72.9424 },
    ];

    cities.forEach(city => {
        const icon = L.divIcon({
            className: 'city-label',
            html: `<div style="
                font-size: 10px;
                color: rgba(136,153,170,0.7);
                text-shadow: 0 0 4px rgba(0,0,0,0.8);
                white-space: nowrap;
                pointer-events: none;
                font-family: 'Inter', sans-serif;
                font-weight: 500;
            ">● ${city.name}</div>`,
            iconSize: [0, 0],
            iconAnchor: [-6, 6]
        });
        L.marker([city.lat, city.lng], { icon, interactive: false }).addTo(map);
    });
}

// ===== Fetch Earthquakes =====
async function fetchEarthquakes() {
    const period = parseInt(document.getElementById('timePeriod').value);
    const now = new Date();
    const start = new Date(now.getTime() - period * 3600000);

    const source = document.getElementById('dataSource').value;
    let minMagnitude = source === 'usgs_all' ? 1 : 2.5;

    const params = new URLSearchParams({
        format: 'geojson',
        starttime: start.toISOString(),
        endtime: now.toISOString(),
        minlatitude: CHILE_BOUNDS.minLat,
        maxlatitude: CHILE_BOUNDS.maxLat,
        minlongitude: CHILE_BOUNDS.minLng,
        maxlongitude: CHILE_BOUNDS.maxLng,
        minmagnitude: minMagnitude,
        orderby: 'time',
        limit: 500
    });

    try {
        const response = await fetch(`${USGS_API}?${params}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();

        allQuakes = data.features.map(f => ({
            id: f.id,
            mag: f.properties.mag,
            place: f.properties.place || 'Ubicación desconocida',
            time: f.properties.time,
            depth: f.geometry.coordinates[2],
            lat: f.geometry.coordinates[1],
            lng: f.geometry.coordinates[0],
            url: f.properties.url,
            felt: f.properties.felt,
            tsunami: f.properties.tsunami,
            magType: f.properties.magType,
            status: f.properties.status,
            sig: f.properties.sig
        }));

        applyFilters();
        updateLastUpdate();
    } catch (error) {
        console.error('Error fetching earthquake data:', error);
        document.getElementById('quakeList').innerHTML = `
            <div class="loading-spinner">
                <i class="fas fa-exclamation-triangle" style="font-size: 24px; color: var(--orange);"></i>
                <p>${t('error.loading')}</p>
            </div>`;
        setTimeout(fetchEarthquakes, 10000);
    }
}

// ===== Apply Filters =====
function applyFilters() {
    const minMag = parseFloat(document.getElementById('minMag').value);
    const maxDepth = parseFloat(document.getElementById('maxDepth').value);

    const filtered = allQuakes.filter(q =>
        q.mag >= minMag && q.depth <= maxDepth
    );

    updateMap(filtered);
    updateList(filtered);
    updateStats(filtered);
}

// ===== Update Map =====
function updateMap(quakes) {
    markersLayer.clearLayers();

    quakes.forEach(q => {
        const size = getMarkerSize(q.mag);
        const color = getMagColor(q.mag);
        const depthColor = getDepthColor(q.depth);

        // Determine if this is a recent quake (< 1 hour)
        const isRecent = (Date.now() - q.time) < 3600000;

        const icon = L.divIcon({
            className: 'quake-marker',
            html: `<div style="
                width: ${size}px;
                height: ${size}px;
                background: radial-gradient(circle, ${color}cc, ${color}66);
                border: 2px solid ${color};
                border-radius: 50%;
                box-shadow: 0 0 ${size}px ${color}66, 0 0 ${size * 2}px ${color}22;
                ${isRecent ? 'animation: quake-anim 2s ease-out infinite;' : ''}
                cursor: pointer;
            "></div>`,
            iconSize: [size, size],
            iconAnchor: [size / 2, size / 2]
        });

        const marker = L.marker([q.lat, q.lng], { icon })
            .on('click', () => showQuakeInfo(q))
            .bindTooltip(`
                <div style="text-align:center; font-family: 'Inter', sans-serif;">
                    <strong style="font-size:16px; color:${color};">${q.mag.toFixed(1)}</strong><br>
                    <span style="font-size:11px;">${q.place}</span><br>
                    <span style="font-size:10px; opacity:0.7;">${timeAgo(q.time)} · ${q.depth.toFixed(0)} km ${t('tooltip.depth')}</span>
                </div>
            `, {
                direction: 'top',
                offset: [0, -size / 2 - 4],
                className: ''
            });

        markersLayer.addLayer(marker);
    });
}

// ===== Update List =====
function updateList(quakes) {
    const container = document.getElementById('quakeList');
    document.getElementById('listCount').textContent = quakes.length;

    if (quakes.length === 0) {
        container.innerHTML = `
            <div class="loading-spinner">
                <i class="fas fa-search" style="font-size: 24px; color: var(--text-muted);"></i>
                <p>${t('list.noResults')}</p>
            </div>`;
        return;
    }

    container.innerHTML = quakes.map(q => {
        const kidDesc = kidMode ? `<span class="kid-emoji-desc">${getKidDescription(q)}</span>` : '';
        return `
        <div class="quake-item ${selectedQuake === q.id ? 'active' : ''}" 
             onclick="selectQuake('${q.id}')" 
             data-id="${q.id}"
             role="listitem"
             tabindex="0"
             aria-label="${t('a11y.tts.quakeDetail', { mag: q.mag.toFixed(1), place: q.place, depth: q.depth.toFixed(0), time: timeAgo(q.time) })}">
            <div class="quake-mag" style="background: ${getMagBg(q.mag)}; color: ${getMagColor(q.mag)}; border: 1px solid ${getMagColor(q.mag)}33;">
                ${q.mag.toFixed(1)}
            </div>
            <div class="quake-info">
                <div class="quake-place">${sanitizeHTML(q.place)}</div>
                <div class="quake-meta">
                    <span><i class="fas fa-ruler-vertical"></i>${q.depth.toFixed(0)} km</span>
                    <span><i class="fas fa-clock"></i>${formatDateShort(q.time)}</span>
                </div>
                ${kidDesc}
            </div>
            <div class="quake-time-relative">${timeAgo(q.time)}</div>
        </div>`;
    }).join('');
}

// sanitize user-facing text to prevent XSS
function sanitizeHTML(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

// ===== Update Stats =====
function updateStats(quakes) {
    document.getElementById('totalCount').textContent = quakes.length;

    if (quakes.length > 0) {
        const maxMag = Math.max(...quakes.map(q => q.mag));
        const avgDepth = quakes.reduce((s, q) => s + q.depth, 0) / quakes.length;
        document.getElementById('maxMag').textContent = maxMag.toFixed(1);
        document.getElementById('avgDepth').textContent = avgDepth.toFixed(0) + ' km';

        // Screen reader announcement
        announceToScreenReader(t('a11y.announce.quakeUpdate', { n: quakes.length, mag: maxMag.toFixed(1) }));
    } else {
        document.getElementById('maxMag').textContent = '—';
        document.getElementById('avgDepth').textContent = '—';
    }
}

// ===== Show Quake Detail =====
function showQuakeInfo(q) {
    selectedQuake = q.id;
    const infoBox = document.getElementById('infoBox');
    const content = document.getElementById('infoContent');

    const magColor = getMagColor(q.mag);
    const feltStr = q.felt ? t('detail.feltReports', { n: q.felt }) : t('detail.notReported');
    const tsunamiStr = q.tsunami ? t('detail.yes') : t('detail.no');

    const kidSection = kidMode ? `
        <div style="margin-top: 12px; padding: 12px; background: rgba(67,233,123,0.08); border: 1px solid rgba(67,233,123,0.2); border-radius: 8px; font-size: 13px; line-height: 1.8;">
            ${getKidDescription(q)}
        </div>` : '';

    content.innerHTML = `
        <div class="info-header">
            <div class="info-mag" style="background: ${getMagBg(q.mag)}; color: ${magColor}; border: 2px solid ${magColor}44;">
                ${q.mag.toFixed(1)}
            </div>
            <div class="info-title">
                <h3>${sanitizeHTML(q.place)}</h3>
                <div class="info-time">${formatDate(q.time)} · ${timeAgo(q.time)}</div>
            </div>
        </div>
        <div class="info-details">
            <div class="info-detail">
                <div class="info-detail-label">${t('detail.depth')}</div>
                <div class="info-detail-value">${q.depth.toFixed(1)} km</div>
            </div>
            <div class="info-detail">
                <div class="info-detail-label">${t('detail.magType')}</div>
                <div class="info-detail-value">${sanitizeHTML(q.magType || '—')}</div>
            </div>
            <div class="info-detail">
                <div class="info-detail-label">${t('detail.felt')}</div>
                <div class="info-detail-value">${feltStr}</div>
            </div>
            <div class="info-detail">
                <div class="info-detail-label">${t('detail.tsunami')}</div>
                <div class="info-detail-value">${tsunamiStr}</div>
            </div>
            <div class="info-detail">
                <div class="info-detail-label">${t('detail.latitude')}</div>
                <div class="info-detail-value">${q.lat.toFixed(4)}°</div>
            </div>
            <div class="info-detail">
                <div class="info-detail-label">${t('detail.longitude')}</div>
                <div class="info-detail-value">${q.lng.toFixed(4)}°</div>
            </div>
        </div>
        <div class="info-links">
            <a class="info-link" href="${sanitizeURL(q.url)}" target="_blank" rel="noopener noreferrer">
                <i class="fas fa-external-link-alt"></i> USGS
            </a>
            <a class="info-link" href="https://www.sismologia.cl/" target="_blank" rel="noopener noreferrer">
                <i class="fas fa-university"></i> CSN
            </a>
            <a class="info-link" href="https://sismosenchile.cl/" target="_blank" rel="noopener noreferrer">
                <i class="fas fa-globe-americas"></i> SismosChile
            </a>
        </div>
        ${kidSection}
    `;

    infoBox.style.display = 'block';
    map.flyTo([q.lat, q.lng], 8, { duration: 0.8 });

    // Speak if TTS active
    speakQuakeDetail(q);

    // Highlight in list
    document.querySelectorAll('.quake-item').forEach(el => {
        el.classList.toggle('active', el.dataset.id === q.id);
    });
}

function sanitizeURL(url) {
    try {
        const parsed = new URL(url);
        if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
            return parsed.href;
        }
    } catch (e) { /* ignore */ }
    return '#';
}

function closeInfoBox() {
    document.getElementById('infoBox').style.display = 'none';
    selectedQuake = null;
    document.querySelectorAll('.quake-item.active').forEach(el => el.classList.remove('active'));
}

// ===== Select from List =====
function selectQuake(id) {
    const q = allQuakes.find(q => q.id === id);
    if (q) showQuakeInfo(q);
}

// ===== Controls =====
function resetView() {
    map.flyTo([-33.5, -70.5], 5, { duration: 0.8 });
}

function toggleLangDropdown() {
    const dropdown = document.getElementById('langDropdown');
    const btn = document.getElementById('langBtn');
    dropdown.classList.toggle('open');
    if (dropdown.classList.contains('open')) {
        const rect = btn.getBoundingClientRect();
        dropdown.style.top = rect.bottom + 4 + 'px';
        dropdown.style.right = (window.innerWidth - rect.right) + 'px';
    }
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('hidden');
    setTimeout(() => map.invalidateSize(), 300);
}

function togglePanel(id) {
    const panel = document.getElementById(id);
    panel.classList.toggle('collapsed');
}

function togglePlates() {
    platesVisible = !platesVisible;
    document.getElementById('platesBtn').classList.toggle('active', platesVisible);
    if (platesVisible) {
        platesLayer.addTo(map);
    } else {
        map.removeLayer(platesLayer);
    }
}

function buildPlatesLayer() {
    // === Plate boundaries (more detailed) ===
    const plates = [
        {
            name: 'nazca',
            label: () => t('plates.nazca'),
            color: '#e63946',
            info: () => ({
                tipo: t('plateInfo.nazca.tipo'),
                area: t('plateInfo.nazca.area'),
                velocidad: t('plateInfo.nazca.velocidad'),
                edad: t('plateInfo.nazca.edad'),
                interaccion: t('plateInfo.nazca.interaccion')
            }),
            boundary: [
                [-4, -82], [-6, -82], [-8, -81.5], [-10, -80], [-12, -79],
                [-14, -77.5], [-16, -76], [-17, -74.5], [-18, -73],
                [-19.5, -71.5], [-21, -71], [-23, -71], [-24.5, -71],
                [-26, -71.2], [-27.5, -71.5], [-29, -71.8], [-30.5, -72],
                [-32, -72.3], [-33, -72.5], [-34.5, -73], [-36, -73.5],
                [-37.5, -74], [-39, -74.8], [-40.5, -75.2], [-42, -75.8],
                [-43.5, -76], [-45, -76.3], [-46.3, -76.2]
            ],
            fill: [
                [-4, -82], [-6, -82], [-8, -81.5], [-10, -80], [-12, -79],
                [-14, -77.5], [-16, -76], [-17, -74.5], [-18, -73],
                [-19.5, -71.5], [-21, -71], [-23, -71], [-24.5, -71],
                [-26, -71.2], [-27.5, -71.5], [-29, -71.8], [-30.5, -72],
                [-32, -72.3], [-33, -72.5], [-34.5, -73], [-36, -73.5],
                [-37.5, -74], [-39, -74.8], [-40.5, -75.2], [-42, -75.8],
                [-43.5, -76], [-45, -76.3], [-46.3, -76.2],
                [-46.3, -90], [-4, -90]
            ],
            labelPos: [-25, -80]
        },
        {
            name: 'sudamericana',
            label: () => t('plates.sudamericana'),
            color: '#38bdf8',
            info: () => ({
                tipo: t('plateInfo.sudamericana.tipo'),
                area: t('plateInfo.sudamericana.area'),
                velocidad: t('plateInfo.sudamericana.velocidad'),
                edad: t('plateInfo.sudamericana.edad'),
                interaccion: t('plateInfo.sudamericana.interaccion')
            }),
            boundary: [
                [-4, -82], [-6, -82], [-8, -81.5], [-10, -80], [-12, -79],
                [-14, -77.5], [-16, -76], [-17, -74.5], [-18, -73],
                [-19.5, -71.5], [-21, -71], [-23, -71], [-24.5, -71],
                [-26, -71.2], [-27.5, -71.5], [-29, -71.8], [-30.5, -72],
                [-32, -72.3], [-33, -72.5], [-34.5, -73], [-36, -73.5],
                [-37.5, -74], [-39, -74.8], [-40.5, -75.2], [-42, -75.8],
                [-43.5, -76], [-45, -76.3], [-46.3, -76.2]
            ],
            fill: [
                [-4, -82], [-6, -82], [-8, -81.5], [-10, -80], [-12, -79],
                [-14, -77.5], [-16, -76], [-17, -74.5], [-18, -73],
                [-19.5, -71.5], [-21, -71], [-23, -71], [-24.5, -71],
                [-26, -71.2], [-27.5, -71.5], [-29, -71.8], [-30.5, -72],
                [-32, -72.3], [-33, -72.5], [-34.5, -73], [-36, -73.5],
                [-37.5, -74], [-39, -74.8], [-40.5, -75.2], [-42, -75.8],
                [-43.5, -76], [-45, -76.3], [-46.3, -76.2],
                [-46.3, -60], [-4, -60]
            ],
            labelPos: [-30, -65]
        },
        {
            name: 'antartica',
            label: () => t('plates.antartica'),
            color: '#818cf8',
            info: () => ({
                tipo: t('plateInfo.antartica.tipo'),
                area: t('plateInfo.antartica.area'),
                velocidad: t('plateInfo.antartica.velocidad'),
                edad: t('plateInfo.antartica.edad'),
                interaccion: t('plateInfo.antartica.interaccion')
            }),
            boundary: [
                [-46.3, -76.2], [-48, -76.5], [-50, -76], [-52, -75.5],
                [-53.5, -75], [-54.5, -74], [-55, -72], [-55.5, -70],
                [-56, -68], [-56.5, -66], [-57, -65]
            ],
            fill: [
                [-46.3, -76.2], [-48, -76.5], [-50, -76], [-52, -75.5],
                [-53.5, -75], [-54.5, -74], [-55, -72], [-55.5, -70],
                [-56, -68], [-56.5, -66], [-57, -65],
                [-60, -65], [-60, -90], [-46.3, -90]
            ],
            labelPos: [-53, -78]
        },
        {
            name: 'scotia',
            label: () => t('plates.scotia'),
            color: '#f472b6',
            info: () => ({
                tipo: t('plateInfo.scotia.tipo'),
                area: t('plateInfo.scotia.area'),
                velocidad: t('plateInfo.scotia.velocidad'),
                edad: t('plateInfo.scotia.edad'),
                interaccion: t('plateInfo.scotia.interaccion')
            }),
            boundary: [
                [-54, -70], [-54.5, -66], [-55, -64], [-55.5, -62],
                [-56, -60], [-57, -58], [-58, -56]
            ],
            fill: [
                [-54, -70], [-54.5, -66], [-55, -64], [-55.5, -62],
                [-56, -60], [-57, -58], [-58, -56],
                [-60, -56], [-60, -70]
            ],
            labelPos: [-56.5, -63]
        }
    ];

    // Draw plate fills and boundaries
    plates.forEach(plate => {
        // Translucent fill
        L.polygon(plate.fill, {
            color: 'transparent',
            fillColor: plate.color,
            fillOpacity: 0.05,
            interactive: false
        }).addTo(platesLayer);

        // Boundary line
        L.polyline(plate.boundary, {
            color: plate.color,
            weight: 2.5,
            opacity: 0.6,
            dashArray: '10, 6'
        }).addTo(platesLayer).on('click', () => showPlateInfo({ name: plate.label(), color: plate.color, info: plate.info() }));

        // Plate label on map
        const labelIcon = L.divIcon({
            className: 'plate-label',
            html: `<div style="
                font-size: 11px;
                font-weight: 600;
                color: ${plate.color};
                text-shadow: 0 0 8px rgba(0,0,0,0.9), 0 0 16px rgba(0,0,0,0.7);
                white-space: nowrap;
                font-family: 'Inter', sans-serif;
                letter-spacing: 1.5px;
                text-transform: uppercase;
                opacity: 0.7;
                pointer-events: none;
            ">${plate.label()}</div>`,
            iconSize: [0, 0],
            iconAnchor: [0, 0]
        });
        L.marker(plate.labelPos, { icon: labelIcon, interactive: false }).addTo(platesLayer);
    });

    // === Triple Junction point (Chile Triple Junction ~46.3°S) ===
    const tripleIcon = L.divIcon({
        className: 'triple-junction',
        html: `<div style="
            width: 14px; height: 14px;
            background: #fbbf24;
            border: 2px solid #f59e0b;
            border-radius: 50%;
            box-shadow: 0 0 12px rgba(251,191,36,0.6), 0 0 24px rgba(251,191,36,0.3);
            cursor: pointer;
        "></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7]
    });
    L.marker([-46.3, -76.2], { icon: tripleIcon }).addTo(platesLayer)
        .bindTooltip(`
            <div style="text-align:center; font-family:'Inter',sans-serif; max-width: 200px;">
                <strong style="color:#fbbf24;">${t('plate.tripleJunction')}</strong><br>
                <span style="font-size:11px;">${t('plate.tripleDesc')}</span>
            </div>
        `, { direction: 'top', offset: [0, -10] });

    // === Subduction zone indicators (teeth marks) ===
    const subductionPoints = [
        [-19, -72.2], [-22, -71], [-25, -71.1], [-28, -71.6],
        [-31, -72.1], [-34, -72.7], [-37, -73.7], [-40, -75],
        [-43, -75.9]
    ];
    subductionPoints.forEach(pt => {
        const toothIcon = L.divIcon({
            className: 'subduction-tooth',
            html: `<div style="
                font-size: 10px;
                color: #e63946;
                opacity: 0.6;
                transform: rotate(-90deg);
                pointer-events: none;
            ">▶</div>`,
            iconSize: [10, 10],
            iconAnchor: [5, 5]
        });
        L.marker(pt, { icon: toothIcon, interactive: false }).addTo(platesLayer);
    });
}

function showPlateInfo(plate) {
    const infoBox = document.getElementById('infoBox');
    const content = document.getElementById('infoContent');

    content.innerHTML = `
        <div class="info-header">
            <div class="info-mag" style="background: ${plate.color}22; color: ${plate.color}; border: 2px solid ${plate.color}44; font-size: 20px;">
                <i class="fas fa-layer-group"></i>
            </div>
            <div class="info-title">
                <h3>${plate.name}</h3>
                <div class="info-time">${t('plate.tectonicPlate')}</div>
            </div>
        </div>
        <div class="info-details">
            <div class="info-detail">
                <div class="info-detail-label">${t('plate.type')}</div>
                <div class="info-detail-value">${plate.info.tipo}</div>
            </div>
            <div class="info-detail">
                <div class="info-detail-label">${t('plate.area')}</div>
                <div class="info-detail-value">${plate.info.area}</div>
            </div>
            <div class="info-detail">
                <div class="info-detail-label">${t('plate.speed')}</div>
                <div class="info-detail-value">${plate.info.velocidad}</div>
            </div>
            <div class="info-detail">
                <div class="info-detail-label">${t('plate.age')}</div>
                <div class="info-detail-value">${plate.info.edad}</div>
            </div>
        </div>
        <div style="margin-top: 12px; padding: 12px; background: var(--bg-card); border-radius: 8px; font-size: 12px; color: var(--text-secondary); line-height: 1.5;">
            <strong style="color: var(--text-primary);"><i class="fas fa-info-circle" style="color: ${plate.color};"></i> ${t('plate.interaction')}:</strong><br>
            ${plate.info.interaccion}
        </div>
    `;

    infoBox.style.display = 'block';
}

function showPlateFromSidebar(key) {
    const plateMap = {
        nazca: { name: t('plates.nazca'), color: '#e63946', center: [-25, -80], info: { tipo: t('plateInfo.nazca.tipo'), area: t('plateInfo.nazca.area'), velocidad: t('plateInfo.nazca.velocidad'), edad: t('plateInfo.nazca.edad'), interaccion: t('plateInfo.nazca.interaccion') } },
        sudamericana: { name: t('plates.sudamericana'), color: '#38bdf8', center: [-30, -65], info: { tipo: t('plateInfo.sudamericana.tipo'), area: t('plateInfo.sudamericana.area'), velocidad: t('plateInfo.sudamericana.velocidad'), edad: t('plateInfo.sudamericana.edad'), interaccion: t('plateInfo.sudamericana.interaccion') } },
        antartica: { name: t('plates.antartica'), color: '#818cf8', center: [-53, -78], info: { tipo: t('plateInfo.antartica.tipo'), area: t('plateInfo.antartica.area'), velocidad: t('plateInfo.antartica.velocidad'), edad: t('plateInfo.antartica.edad'), interaccion: t('plateInfo.antartica.interaccion') } },
        scotia: { name: t('plates.scotia'), color: '#f472b6', center: [-56.5, -63], info: { tipo: t('plateInfo.scotia.tipo'), area: t('plateInfo.scotia.area'), velocidad: t('plateInfo.scotia.velocidad'), edad: t('plateInfo.scotia.edad'), interaccion: t('plateInfo.scotia.interaccion') } }
    };
    const plate = plateMap[key];
    if (plate) {
        showPlateInfo(plate);
        map.flyTo(plate.center, 5, { duration: 0.8 });
    }
}

let heatmapMode = false;
function toggleHeatmap() {
    heatmapMode = !heatmapMode;
    document.getElementById('heatmapBtn').classList.toggle('active', heatmapMode);

    if (heatmapMode) {
        // Switch to a density-style view: bigger, more transparent circles
        markersLayer.clearLayers();
        const minMag = parseFloat(document.getElementById('minMag').value);
        const maxDepth = parseFloat(document.getElementById('maxDepth').value);
        const filtered = allQuakes.filter(q => q.mag >= minMag && q.depth <= maxDepth);

        filtered.forEach(q => {
            const radius = Math.pow(2, q.mag) * 800;
            L.circle([q.lat, q.lng], {
                radius: radius,
                color: 'transparent',
                fillColor: getMagColor(q.mag),
                fillOpacity: 0.15,
                interactive: false
            }).addTo(markersLayer);

            // Also add a small center dot
            const size = getMarkerSize(q.mag);
            const icon = L.divIcon({
                className: 'quake-marker',
                html: `<div style="width:${size * 0.6}px;height:${size * 0.6}px;background:${getMagColor(q.mag)};border-radius:50%;opacity:0.8;"></div>`,
                iconSize: [size * 0.6, size * 0.6],
                iconAnchor: [size * 0.3, size * 0.3]
            });
            L.marker([q.lat, q.lng], { icon })
                .on('click', () => showQuakeInfo(q))
                .addTo(markersLayer);
        });
    } else {
        applyFilters();
    }
}

// ===== Update Time =====
function updateLastUpdate() {
    const now = new Date();
    document.getElementById('lastUpdate').textContent =
        `${t('header.lastUpdate')}: ${now.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;
}

// ===== Fire Layer (NASA GIBS VIIRS/MODIS) =====
function getFireDates() {
    const period = document.getElementById('firePeriod')?.value || '24h';

    if (period === 'custom') {
        const month = parseInt(document.getElementById('fireMonth')?.value || '0');
        const year = parseInt(document.getElementById('fireYear')?.value || new Date().getFullYear());
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const dates = [];
        // Sample up to 8 evenly spaced days to avoid overloading tiles
        const step = Math.max(1, Math.floor(daysInMonth / 8));
        for (let d = 1; d <= daysInMonth; d += step) {
            const dt = new Date(year, month, d);
            dates.push(dt.toISOString().split('T')[0]);
        }
        return dates;
    }

    const today = new Date();
    const dates = [];
    let days = 1;
    if (period === '48h') days = 2;
    if (period === '7d') days = 7;
    for (let i = 0; i < days; i++) {
        const dt = new Date(today);
        dt.setDate(dt.getDate() - i);
        dates.push(dt.toISOString().split('T')[0]);
    }
    return dates;
}

function buildFireLayer() {
    fireLayer.clearLayers();

    // NASA GIBS provides free tile overlays for fire/thermal anomalies
    // VIIRS SNPP + NOAA-20 thermal anomalies tiles (no API key needed)
    const dates = getFireDates();

    dates.forEach(dateStr => {
        // VIIRS SNPP Day/Night Band thermal anomalies
        const viirsTiles = L.tileLayer(
            'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/VIIRS_SNPP_Thermal_Anomalies_375m_All/default/{time}/GoogleMapsCompatible_Level8/{z}/{y}/{x}.png', {
            time: dateStr,
            opacity: 0.85,
            maxZoom: 8,
            bounds: [[-56, -80], [-17, -64]],
            attribution: 'Fire data: NASA FIRMS / GIBS'
        });

        // MODIS thermal anomalies (backup/additional layer)
        const modisTiles = L.tileLayer(
            'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_Thermal_Anomalies_All/default/{time}/GoogleMapsCompatible_Level8/{z}/{y}/{x}.png', {
            time: dateStr,
            opacity: 0.75,
            maxZoom: 8,
            bounds: [[-56, -80], [-17, -64]],
            attribution: 'Fire data: NASA MODIS / GIBS'
        });

        fireLayer.addLayer(viirsTiles);
        fireLayer.addLayer(modisTiles);
    });
}

function toggleFireLayer() {
    const checkbox = document.getElementById('fireLayerToggle');
    fireLayerVisible = checkbox.checked;
    document.getElementById('firesBtn').classList.toggle('active', fireLayerVisible);
    document.getElementById('fireLegend').style.display = fireLayerVisible ? 'block' : 'none';

    if (fireLayerVisible) {
        buildFireLayer();
        fireLayer.addTo(map);
    } else {
        map.removeLayer(fireLayer);
    }
}

function toggleFireLayerBtn() {
    const checkbox = document.getElementById('fireLayerToggle');
    checkbox.checked = !checkbox.checked;
    toggleFireLayer();
}

function updateFireLayer() {
    const period = document.getElementById('firePeriod')?.value;
    const customDiv = document.getElementById('fireCustomDate');
    if (customDiv) {
        customDiv.style.display = period === 'custom' ? 'flex' : 'none';
    }
    if (fireLayerVisible) {
        buildFireLayer();
    }
}

function initFireYearSelect() {
    const sel = document.getElementById('fireYear');
    if (!sel) return;
    const currentYear = new Date().getFullYear();
    for (let y = currentYear; y >= 2012; y--) {
        const opt = document.createElement('option');
        opt.value = y;
        opt.textContent = y;
        sel.appendChild(opt);
    }
    // Default to current month
    const monthSel = document.getElementById('fireMonth');
    if (monthSel) monthSel.value = new Date().getMonth();
}

// ===== Fire History Chart =====
function renderFireHistoryChart() {
    const container = document.getElementById('fireHistoryChart');
    if (!container) return;

    const data = [
        { season: '14-15', fires: 8048, hectares: 76437 },
        { season: '15-16', fires: 5904, hectares: 52792 },
        { season: '16-17', fires: 5765, hectares: 570197 },
        { season: '17-18', fires: 6240, hectares: 56498 },
        { season: '18-19', fires: 6479, hectares: 61509 },
        { season: '19-20', fires: 8077, hectares: 102126 },
        { season: '20-21', fires: 5508, hectares: 79538 },
        { season: '21-22', fires: 6412, hectares: 84901 },
        { season: '22-23', fires: 5869, hectares: 437113 },
        { season: '23-24', fires: 5703, hectares: 107237 },
        { season: '24-25', fires: 4892, hectares: 62410 }
    ];

    const maxFires = Math.max(...data.map(d => d.fires));
    const maxHa = Math.max(...data.map(d => d.hectares));

    container.innerHTML = data.map(d => {
        const fireH = Math.max(4, (d.fires / maxFires) * 80);
        const haH = Math.max(4, (d.hectares / maxHa) * 80);
        const haColor = d.hectares > 200000 ? '#e63946' : d.hectares > 100000 ? '#ff6b35' : '#f9d423';
        return `
            <div class="fire-history-bar-group">
                <div class="fire-history-bars">
                    <div class="fire-history-bar" style="height:${fireH}px; background:#38bdf8;" title="${t('fires.history.fires')}: ${d.fires.toLocaleString()}"></div>
                    <div class="fire-history-bar" style="height:${haH}px; background:${haColor};" title="${t('fires.history.hectares')}: ${d.hectares.toLocaleString()}"></div>
                </div>
                <div class="fire-history-bar-label">${d.season}</div>
            </div>`;
    }).join('');
}

// ===== Accessibility: Screen Reader Announcer =====
function announceToScreenReader(message) {
    const announcer = document.getElementById('srAnnouncer');
    if (announcer) {
        announcer.textContent = '';
        // Small delay to ensure screen readers register the change
        setTimeout(() => { announcer.textContent = message; }, 100);
    }
}

// ===== Accessibility: Text-to-Speech =====
function toggleTTS() {
    ttsActive = !ttsActive;
    const btn = document.getElementById('ttsBtn');
    btn.classList.toggle('active', ttsActive);

    if (ttsActive) {
        // Read summary of current data
        speakSummary();
    } else {
        window.speechSynthesis.cancel();
    }
}

function speakSummary() {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const minMag = parseFloat(document.getElementById('minMag').value);
    const maxDepth = parseFloat(document.getElementById('maxDepth').value);
    const filtered = allQuakes.filter(q => q.mag >= minMag && q.depth <= maxDepth);

    if (filtered.length === 0) return;

    const maxMag = Math.max(...filtered.map(q => q.mag));
    const avgDepth = filtered.reduce((s, q) => s + q.depth, 0) / filtered.length;

    // Build speech text
    let speechText = t('a11y.tts.summary', {
        n: filtered.length,
        maxMag: maxMag.toFixed(1),
        avgDepth: avgDepth.toFixed(0)
    });

    // Add top 3 quakes detail
    const top3 = filtered.slice(0, 3);
    top3.forEach(q => {
        speechText += ' ' + t('a11y.tts.quakeDetail', {
            mag: q.mag.toFixed(1),
            place: q.place,
            depth: q.depth.toFixed(0),
            time: timeAgo(q.time)
        });
    });

    const utterance = new SpeechSynthesisUtterance(speechText);
    // Try to use correct language for TTS
    const langMap = { es: 'es-CL', arn: 'es-CL', pt: 'pt-BR', en: 'en-US' };
    utterance.lang = langMap[currentLang] || 'es-CL';
    utterance.rate = 0.9;
    utterance.onend = () => {
        ttsActive = false;
        document.getElementById('ttsBtn').classList.remove('active');
    };
    window.speechSynthesis.speak(utterance);
}

function speakQuakeDetail(q) {
    if (!ttsActive || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const text = t('a11y.tts.quakeDetail', {
        mag: q.mag.toFixed(1),
        place: q.place,
        depth: q.depth.toFixed(0),
        time: timeAgo(q.time)
    });

    const utterance = new SpeechSynthesisUtterance(text);
    const langMap = { es: 'es-CL', arn: 'es-CL', pt: 'pt-BR', en: 'en-US' };
    utterance.lang = langMap[currentLang] || 'es-CL';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
}

// ===== Accessibility: Kid Mode =====
function toggleKidMode() {
    kidMode = !kidMode;
    document.body.classList.toggle('kid-mode', kidMode);
    document.getElementById('kidModeBtn').classList.toggle('active', kidMode);
    document.getElementById('kidInfoBox').style.display = kidMode ? 'block' : 'none';

    // Re-render list with kid descriptions
    applyFilters();
}

function getKidDescription(q) {
    let magDesc;
    if (q.mag < 3) magDesc = t('kid.emoji.small');
    else if (q.mag < 4) magDesc = t('kid.emoji.light');
    else if (q.mag < 5) magDesc = t('kid.emoji.moderate');
    else if (q.mag < 6) magDesc = t('kid.emoji.strong');
    else magDesc = t('kid.emoji.veryStrong');

    let depthDesc;
    if (q.depth < 30) depthDesc = t('kid.depth.shallow');
    else if (q.depth < 150) depthDesc = t('kid.depth.medium');
    else depthDesc = t('kid.depth.deep');

    return `${magDesc}<br>${depthDesc}`;
}

// ===== Accessibility: High Contrast =====
function toggleHighContrast() {
    highContrast = !highContrast;
    document.body.classList.toggle('high-contrast', highContrast);
    document.getElementById('highContrastBtn').classList.toggle('active', highContrast);
}

// ===== Auto Refresh =====
function startAutoRefresh() {
    if (autoRefreshInterval) clearInterval(autoRefreshInterval);
    autoRefreshInterval = setInterval(() => {
        fetchEarthquakes();
    }, 60000); // Every 60 seconds
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    initMap();
    fetchEarthquakes();
    startAutoRefresh();
    renderFireHistoryChart();
    initFireYearSelect();

    // Close lang dropdown on outside click
    document.addEventListener('click', (e) => {
        const dropdown = document.getElementById('langDropdown');
        const btn = document.getElementById('langBtn');
        if (dropdown && btn && !btn.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.remove('open');
        }
    });

    // Keyboard navigation for quake list items
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target.classList.contains('quake-item')) {
            const id = e.target.dataset.id;
            if (id) selectQuake(id);
        }
    });
});

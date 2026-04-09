# 🌍 Sismos e Incendios en Chile — Monitoreo en Tiempo Real

[![Estado](https://img.shields.io/badge/estado-activo-brightgreen)]()
[![Licencia](https://img.shields.io/badge/licencia-MIT-blue)]()
[![Idiomas](https://img.shields.io/badge/idiomas-ES%20|%20EN%20|%20PT%20|%20ARN-orange)]()

<p align="center">
  <img src="https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white" alt="Leaflet">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
</p>

## 🔗 Acceso a la Aplicación

### 🌐 [Abrir NaturaChile](https://afuenteshinojosa.github.io/proyecto_mapas/sismos_incendios_chile/)

> Plataforma interactiva de monitoreo sísmico y de incendios forestales en territorio chileno, con datos en tiempo real del servicio geológico de EE.UU. (USGS) y NASA FIRMS.

---

## 📋 Descripción

Dashboard interactivo que visualiza **sismos** e **incendios forestales** en Chile sobre un mapa dinámico. Los datos se actualizan automáticamente y permiten filtrar por magnitud, período y profundidad.

### Características principales

| Función | Descripción |
|---------|------------|
| 🗺️ **Mapa interactivo** | Visualización con Leaflet sobre CartoDB Dark Matter |
| 📡 **Datos en tiempo real** | Sismos vía USGS API, incendios vía NASA FIRMS |
| 🔍 **Filtros avanzados** | Por período, magnitud mínima y profundidad |
| 🌐 **Multiidioma** | Español, English, Português y Mapudungün |
| ♿ **Accesibilidad** | Lector de pantalla (TTS), alto contraste, modo niños |
| 🧒 **Modo niños** | Explicaciones simples con colores para los más pequeños |
| 🔥 **Capa de incendios** | Focos de calor activos de las últimas 24h |
| 🌏 **Placas tectónicas** | Visualización de límites de placas sobre el mapa |
| 📊 **Estadísticas** | Conteo de sismos, magnitud máxima y profundidad promedio |

---

## 🚀 Inicio Rápido

### Opción 1 — Visitar en línea
Accede directamente desde tu navegador:

👉 **[https://afuenteshinojosa.github.io/proyecto_mapas/sismos_incendios_chile/](https://afuenteshinojosa.github.io/proyecto_mapas/sismos_incendios_chile/)**

### Opción 2 — Ejecutar localmente

```bash
# Clonar el repositorio
git clone https://github.com/afuenteshinojosa/proyecto_mapas.git

# Entrar al directorio
cd proyecto_mapas/sismos_incendios_chile

# Abrir con cualquier servidor local, por ejemplo:
npx serve .
# o simplemente abrir index.html en el navegador
```

> No requiere instalación de dependencias. Es una aplicación 100% front-end.

---

## 🛠️ Tecnologías

- **[Leaflet.js](https://leafletjs.com/)** — Mapas interactivos
- **[USGS Earthquake API](https://earthquake.usgs.gov/)** — Datos sísmicos en tiempo real
- **[NASA FIRMS](https://firms.modaps.eosdis.nasa.gov/)** — Detección de incendios por satélite
- **[CartoDB](https://carto.com/)** — Tiles de mapa estilo oscuro
- **[Font Awesome](https://fontawesome.com/)** — Iconografía
- **HTML5 / CSS3 / JavaScript** — Sin frameworks, 100% vanilla

---

## 📁 Estructura del Proyecto

```
sismos_incendios_chile/
├── index.html      # Página principal y estructura HTML
├── app.js          # Lógica de la aplicación, mapa y APIs
├── lang.js         # Sistema de internacionalización (i18n)
├── styles.css      # Estilos y diseño responsivo
└── README.md       # Este archivo
```

---

## 🌐 Idiomas Soportados

| Idioma | Código | Bandera |
|--------|--------|---------|
| Español | `es` | 🇨🇱 |
| English | `en` | 🇬🇧 |
| Português | `pt` | 🇧🇷 |
| Mapudungün | `arn` | 🏳️ |

---

## ♿ Accesibilidad

La aplicación incluye herramientas de accesibilidad integradas:

- **Lector en voz alta (TTS):** Lee los datos sísmicos usando la API de síntesis de voz del navegador.
- **Modo niños:** Simplifica la información con explicaciones visuales y colores.
- **Alto contraste:** Mejora la visibilidad para usuarios con baja visión.
- **ARIA labels:** Compatibilidad con lectores de pantalla.

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

<p align="center">
  Hecho con ❤️ desde Chile 🇨🇱
</p>

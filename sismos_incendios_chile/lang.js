// ===== Internationalization (i18n) =====
let currentLang = 'es';

const LANGUAGES = {
    es: { label: 'Español', flag: '🇨🇱' },
    arn: { label: 'Mapudungün', flag: '<svg class="wenufoye-flag" viewBox="0 0 476 318" width="20" height="14"><rect width="476" height="318" fill="#0135ad"/><path fill="#fff" d="M320.1,158.7l-51.1,11.8 23.1,42.1-42.1-23.1-11.8,51.1-11.8-51.1-42.1,23.1 23.1-42.1-51.1-11.8 51.1-11.8-23.1-42.1 42.1,23.1 11.8-51.1 11.8,51.1 42.1-23.1-23.1,42.1z"/></svg>' },
    pt: { label: 'Português', flag: '🇧🇷' },
    en: { label: 'English', flag: '🇬🇧' }
};

const TRANSLATIONS = {
    // ===== Header =====
    'site.title': {
        es: 'Sismos e Incendios en Chile',
        arn: 'Nüyün ka Kütral Chile Mapu',
        pt: 'Sismos e Incêndios no Chile',
        en: 'Earthquakes & Fires in Chile'
    },
    'site.subtitle': {
        es: 'Monitoreo en Tiempo Real',
        arn: 'Llelipun Femgechi Antü',
        pt: 'Monitoramento em Tempo Real',
        en: 'Real-Time Monitoring'
    },
    'stats.quakes24h': {
        es: 'Sismos (24h)',
        arn: 'Nüyün (24h)',
        pt: 'Sismos (24h)',
        en: 'Quakes (24h)'
    },
    'stats.maxMag': {
        es: 'Máx. Magnitud',
        arn: 'Fütra Nüyün',
        pt: 'Máx. Magnitude',
        en: 'Max. Magnitude'
    },
    'stats.avgDepth': {
        es: 'Prof. Promedio',
        arn: 'Rangkülen Prom.',
        pt: 'Prof. Média',
        en: 'Avg. Depth'
    },
    'header.live': {
        es: 'EN VIVO',
        arn: 'MONGELEY',
        pt: 'AO VIVO',
        en: 'LIVE'
    },
    'header.lastUpdate': {
        es: 'Últ. actualización',
        arn: 'Wüne wechulkan',
        pt: 'Últ. atualização',
        en: 'Last update'
    },

    // ===== Sidebar - Filters =====
    'filters.title': {
        es: 'Filtros',
        arn: 'Chillkatun',
        pt: 'Filtros',
        en: 'Filters'
    },
    'filters.period': {
        es: 'Período',
        arn: 'Epe Antü',
        pt: 'Período',
        en: 'Period'
    },
    'filters.period.1h': {
        es: 'Última hora',
        arn: 'Kiñe ora',
        pt: 'Última hora',
        en: 'Last hour'
    },
    'filters.period.24h': {
        es: 'Últimas 24 horas',
        arn: '24 ora',
        pt: 'Últimas 24 horas',
        en: 'Last 24 hours'
    },
    'filters.period.week': {
        es: 'Última semana',
        arn: 'Kiñe semana',
        pt: 'Última semana',
        en: 'Last week'
    },
    'filters.period.month': {
        es: 'Último mes',
        arn: 'Kiñe küyen',
        pt: 'Último mês',
        en: 'Last month'
    },
    'filters.minMag': {
        es: 'Magnitud mínima',
        arn: 'Pichi nüyün',
        pt: 'Magnitude mínima',
        en: 'Minimum magnitude'
    },
    'filters.maxDepth': {
        es: 'Profundidad máxima',
        arn: 'Fütra rangkülen',
        pt: 'Profundidade máxima',
        en: 'Maximum depth'
    },
    'filters.source': {
        es: 'Fuente de datos',
        arn: 'Chew küdaw',
        pt: 'Fonte de dados',
        en: 'Data source'
    },

    // ===== Sidebar - Plates =====
    'plates.title': {
        es: 'Placas Tectónicas',
        arn: 'Mapu Trawa',
        pt: 'Placas Tectônicas',
        en: 'Tectonic Plates'
    },
    'plates.nazca': {
        es: 'Placa de Nazca',
        arn: 'Nazca Mapu Trawa',
        pt: 'Placa de Nazca',
        en: 'Nazca Plate'
    },
    'plates.nazca.desc': {
        es: 'Oceánica · 6.6 cm/año → Este · Subduce bajo Sudamericana',
        arn: 'Lafken mapu · 6.6 cm/tripantu → Puel · Nag Sudamericana mew',
        pt: 'Oceânica · 6.6 cm/ano → Leste · Subduz sob Sul-Americana',
        en: 'Oceanic · 6.6 cm/yr → East · Subducts under South American'
    },
    'plates.sudamericana': {
        es: 'Placa Sudamericana',
        arn: 'Sudamericana Mapu Trawa',
        pt: 'Placa Sul-Americana',
        en: 'South American Plate'
    },
    'plates.sudamericana.desc': {
        es: 'Continental · 2.5 cm/año → Oeste · Base del territorio chileno',
        arn: 'Wütre mapu · 2.5 cm/tripantu → Lafken · Chile mapu',
        pt: 'Continental · 2.5 cm/ano → Oeste · Base do território chileno',
        en: 'Continental · 2.5 cm/yr → West · Base of Chilean territory'
    },
    'plates.antartica': {
        es: 'Placa Antártica',
        arn: 'Antártica Mapu Trawa',
        pt: 'Placa Antártica',
        en: 'Antarctic Plate'
    },
    'plates.antartica.desc': {
        es: 'Mixta · 1.5 cm/año · Punto triple ~46°S',
        arn: 'Epuñpüle · 1.5 cm/tripantu · Küla trawün ~46°S',
        pt: 'Mista · 1.5 cm/ano · Ponto triplo ~46°S',
        en: 'Mixed · 1.5 cm/yr · Triple junction ~46°S'
    },
    'plates.scotia': {
        es: 'Placa Scotia',
        arn: 'Scotia Mapu Trawa',
        pt: 'Placa Scotia',
        en: 'Scotia Plate'
    },
    'plates.scotia.desc': {
        es: 'Oceánica · 2.5 cm/año · Tierra del Fuego / Drake',
        arn: 'Lafken mapu · 2.5 cm/tripantu · Kütral Mapu / Drake',
        pt: 'Oceânica · 2.5 cm/ano · Terra do Fogo / Drake',
        en: 'Oceanic · 2.5 cm/yr · Tierra del Fuego / Drake'
    },
    'plates.clickHint': {
        es: 'Haz clic en las líneas de placa en el mapa o en cada tarjeta para ver detalles.',
        arn: 'Nütramkage trawa mew kam tarjeta mew kimeltuam.',
        pt: 'Clique nas linhas de placa no mapa ou em cada cartão para ver detalhes.',
        en: 'Click on plate lines on the map or on each card to see details.'
    },

    // ===== Sidebar - Earthquake List =====
    'list.title': {
        es: 'Últimos Sismos',
        arn: 'Wüne Nüyün',
        pt: 'Últimos Sismos',
        en: 'Recent Quakes'
    },
    'list.loading': {
        es: 'Cargando datos sísmicos...',
        arn: 'Yengüle nüyün datos...',
        pt: 'Carregando dados sísmicos...',
        en: 'Loading seismic data...'
    },
    'list.noResults': {
        es: 'No se encontraron sismos con estos filtros',
        arn: 'Nüyün no rume pepikangey tüfachi chillkatun mew',
        pt: 'Nenhum sismo encontrado com esses filtros',
        en: 'No earthquakes found with these filters'
    },

    // ===== Legend =====
    'legend.magnitude': {
        es: 'Magnitud',
        arn: 'Nüyün Fütra',
        pt: 'Magnitude',
        en: 'Magnitude'
    },
    'legend.depth': {
        es: 'Profundidad',
        arn: 'Rangkülen',
        pt: 'Profundidade',
        en: 'Depth'
    },
    'legend.plates': {
        es: 'Placas Tectónicas',
        arn: 'Mapu Trawa',
        pt: 'Placas Tectônicas',
        en: 'Tectonic Plates'
    },
    'legend.nazca': {
        es: 'Nazca (Oceánica)',
        arn: 'Nazca (Lafken)',
        pt: 'Nazca (Oceânica)',
        en: 'Nazca (Oceanic)'
    },
    'legend.sudamericana': {
        es: 'Sudamericana',
        arn: 'Sudamericana',
        pt: 'Sul-Americana',
        en: 'South American'
    },
    'legend.antartica': {
        es: 'Antártica',
        arn: 'Antártica',
        pt: 'Antártica',
        en: 'Antarctic'
    },
    'legend.scotia': {
        es: 'Scotia',
        arn: 'Scotia',
        pt: 'Scotia',
        en: 'Scotia'
    },
    'legend.triplePoint': {
        es: 'Punto Triple',
        arn: 'Küla Trawün',
        pt: 'Ponto Triplo',
        en: 'Triple Junction'
    },

    // ===== Map Buttons =====
    'btn.center': {
        es: 'Centrar en Chile',
        arn: 'Chile mew witrapüran',
        pt: 'Centralizar no Chile',
        en: 'Center on Chile'
    },
    'btn.plates': {
        es: 'Placas tectónicas',
        arn: 'Mapu trawa',
        pt: 'Placas tectônicas',
        en: 'Tectonic plates'
    },
    'btn.sidebar': {
        es: 'Panel lateral',
        arn: 'Rüpü panel',
        pt: 'Painel lateral',
        en: 'Sidebar'
    },
    'btn.close': {
        es: 'Cerrar',
        arn: 'Müten',
        pt: 'Fechar',
        en: 'Close'
    },

    // ===== Footer =====
    'footer.data': {
        es: 'Datos',
        arn: 'Datos',
        pt: 'Dados',
        en: 'Data'
    },
    'footer.autoUpdate': {
        es: 'Actualización automática cada 60 segundos',
        arn: 'Kiñewün wechulkan 60 segundo kakewme',
        pt: 'Atualização automática a cada 60 segundos',
        en: 'Auto-refresh every 60 seconds'
    },

    // ===== Dynamic content (app.js) =====
    'time.now': {
        es: 'ahora',
        arn: 'fewla',
        pt: 'agora',
        en: 'now'
    },
    'time.agoM': {
        es: 'hace {n}m',
        arn: '{n}m wüla',
        pt: 'há {n}m',
        en: '{n}m ago'
    },
    'time.agoH': {
        es: 'hace {n}h',
        arn: '{n}h wüla',
        pt: 'há {n}h',
        en: '{n}h ago'
    },
    'time.agoD': {
        es: 'hace {n}d',
        arn: '{n}d wüla',
        pt: 'há {n}d',
        en: '{n}d ago'
    },
    'tooltip.depth': {
        es: 'prof.',
        arn: 'rangkül.',
        pt: 'prof.',
        en: 'depth'
    },
    'error.loading': {
        es: 'Error al cargar datos. Reintentando...',
        arn: 'Weñefe datos yengüle mew. Kiñewün...',
        pt: 'Erro ao carregar dados. Tentando novamente...',
        en: 'Error loading data. Retrying...'
    },
    'detail.depth': {
        es: 'Profundidad',
        arn: 'Rangkülen',
        pt: 'Profundidade',
        en: 'Depth'
    },
    'detail.magType': {
        es: 'Tipo Magnitud',
        arn: 'Nüyün Chem',
        pt: 'Tipo Magnitude',
        en: 'Magnitude Type'
    },
    'detail.felt': {
        es: 'Sentido',
        arn: 'Rükemün',
        pt: 'Sentido',
        en: 'Felt'
    },
    'detail.tsunami': {
        es: 'Tsunami',
        arn: 'Fütra Lafken Ko',
        pt: 'Tsunami',
        en: 'Tsunami'
    },
    'detail.latitude': {
        es: 'Latitud',
        arn: 'Latitud',
        pt: 'Latitude',
        en: 'Latitude'
    },
    'detail.longitude': {
        es: 'Longitud',
        arn: 'Longitud',
        pt: 'Longitude',
        en: 'Longitude'
    },
    'detail.feltReports': {
        es: '{n} reportes',
        arn: '{n} werkün',
        pt: '{n} relatos',
        en: '{n} reports'
    },
    'detail.notReported': {
        es: 'No reportado',
        arn: 'Werkülnorume',
        pt: 'Não reportado',
        en: 'Not reported'
    },
    'detail.yes': {
        es: '⚠️ Sí',
        arn: '⚠️ May',
        pt: '⚠️ Sim',
        en: '⚠️ Yes'
    },
    'detail.no': {
        es: 'No',
        arn: 'Müna',
        pt: 'Não',
        en: 'No'
    },
    'plate.tectonicPlate': {
        es: 'Placa Tectónica',
        arn: 'Mapu Trawa',
        pt: 'Placa Tectônica',
        en: 'Tectonic Plate'
    },
    'plate.type': {
        es: 'Tipo',
        arn: 'Chem',
        pt: 'Tipo',
        en: 'Type'
    },
    'plate.area': {
        es: 'Área',
        arn: 'Mapu Müley',
        pt: 'Área',
        en: 'Area'
    },
    'plate.speed': {
        es: 'Velocidad',
        arn: 'Alüñma',
        pt: 'Velocidade',
        en: 'Speed'
    },
    'plate.age': {
        es: 'Edad',
        arn: 'Kuyfike',
        pt: 'Idade',
        en: 'Age'
    },
    'plate.interaction': {
        es: 'Interacción con Chile',
        arn: 'Trawün Chile mew',
        pt: 'Interação com o Chile',
        en: 'Interaction with Chile'
    },
    'plate.tripleJunction': {
        es: 'Punto Triple de Chile',
        arn: 'Küla Trawün Chile',
        pt: 'Ponto Triplo do Chile',
        en: 'Chile Triple Junction'
    },
    'plate.tripleDesc': {
        es: 'Unión de las placas Nazca, Sudamericana y Antártica (~46.3°S). Zona de alta complejidad tectónica.',
        arn: 'Nazca, Sudamericana ka Antártica mapu trawa trawüy (~46.3°S). Fütra nüyün mapu.',
        pt: 'Junção das placas Nazca, Sul-Americana e Antártica (~46.3°S). Zona de alta complexidade tectônica.',
        en: 'Junction of Nazca, South American and Antarctic plates (~46.3°S). Zone of high tectonic complexity.'
    },

    // ===== Plate info =====
    'plateInfo.nazca.tipo': {
        es: 'Oceánica', arn: 'Lafken Mapu', pt: 'Oceânica', en: 'Oceanic'
    },
    'plateInfo.nazca.area': {
        es: '15.6 millones km²', arn: '15.6 millones km²', pt: '15.6 milhões km²', en: '15.6 million km²'
    },
    'plateInfo.nazca.velocidad': {
        es: '~6.6 cm/año hacia el Este', arn: '~6.6 cm/tripantu puel mew', pt: '~6.6 cm/ano para o Leste', en: '~6.6 cm/yr eastward'
    },
    'plateInfo.nazca.edad': {
        es: 'Jurásico (~200 Ma)', arn: 'Jurásico (~200 Ma)', pt: 'Jurássico (~200 Ma)', en: 'Jurassic (~200 Ma)'
    },
    'plateInfo.nazca.interaccion': {
        es: 'Subduce bajo la Placa Sudamericana a lo largo de toda la costa chilena. Responsable de los terremotos más destructivos de Chile (1960 M9.5, 2010 M8.8).',
        arn: 'Nag Sudamericana mapu trawa mew, kom Chile lafken rüpü mew. Tüfachi mapu trawa fütra nüyün eluy (1960 M9.5, 2010 M8.8).',
        pt: 'Subduz sob a Placa Sul-Americana ao longo de toda a costa chilena. Responsável pelos terremotos mais destrutivos do Chile (1960 M9.5, 2010 M8.8).',
        en: 'Subducts under the South American Plate along the entire Chilean coast. Responsible for Chile\'s most destructive earthquakes (1960 M9.5, 2010 M8.8).'
    },
    'plateInfo.sudamericana.tipo': {
        es: 'Continental', arn: 'Wütre Mapu', pt: 'Continental', en: 'Continental'
    },
    'plateInfo.sudamericana.area': {
        es: '43.6 millones km²', arn: '43.6 millones km²', pt: '43.6 milhões km²', en: '43.6 million km²'
    },
    'plateInfo.sudamericana.velocidad': {
        es: '~2.5 cm/año hacia el Oeste', arn: '~2.5 cm/tripantu lafken mew', pt: '~2.5 cm/ano para o Oeste', en: '~2.5 cm/yr westward'
    },
    'plateInfo.sudamericana.edad': {
        es: 'Arcaico (>2500 Ma núcleo)', arn: 'Arcaico (>2500 Ma)', pt: 'Arcaico (>2500 Ma núcleo)', en: 'Archean (>2500 Ma core)'
    },
    'plateInfo.sudamericana.interaccion': {
        es: 'Placa continental sobre la que se ubica Chile. La subducción de Nazca bajo esta placa genera la Cordillera de los Andes y la intensa actividad sísmica y volcánica.',
        arn: 'Chile tüfachi mapu trawa mew müley. Nazca nag tüfachi mapu trawa mew, ka Andes winkul ka fütra nüyün ka kütral winkul elufi.',
        pt: 'Placa continental sobre a qual se localiza o Chile. A subducção de Nazca sob esta placa gera a Cordilheira dos Andes e a intensa atividade sísmica e vulcânica.',
        en: 'Continental plate on which Chile is located. The subduction of Nazca under this plate generates the Andes Mountains and intense seismic and volcanic activity.'
    },
    'plateInfo.antartica.tipo': {
        es: 'Continental/Oceánica', arn: 'Wütre/Lafken Mapu', pt: 'Continental/Oceânica', en: 'Continental/Oceanic'
    },
    'plateInfo.antartica.area': {
        es: '60.9 millones km²', arn: '60.9 millones km²', pt: '60.9 milhões km²', en: '60.9 million km²'
    },
    'plateInfo.antartica.velocidad': {
        es: '~1.5 cm/año', arn: '~1.5 cm/tripantu', pt: '~1.5 cm/ano', en: '~1.5 cm/yr'
    },
    'plateInfo.antartica.edad': {
        es: 'Precámbrico (núcleo)', arn: 'Precámbrico', pt: 'Pré-Cambriano (núcleo)', en: 'Precambrian (core)'
    },
    'plateInfo.antartica.interaccion': {
        es: 'Se encuentra con la Placa de Nazca en la Dorsal de Chile (~46°S) y con la Sudamericana al sur. El punto triple de unión genera sismicidad en la zona de Aysén y la Patagonia.',
        arn: 'Nazca mapu trawa trawüy Chile Dorsal mew (~46°S) ka Sudamericana willi mew. Küla trawün nüyün elufi Aysén ka Patagonia mew.',
        pt: 'Encontra-se com a Placa de Nazca na Dorsal do Chile (~46°S) e com a Sul-Americana ao sul. O ponto triplo gera sismicidade na zona de Aysén e Patagônia.',
        en: 'Meets the Nazca Plate at the Chile Ridge (~46°S) and the South American to the south. The triple junction generates seismicity in the Aysén and Patagonia zone.'
    },
    'plateInfo.scotia.tipo': {
        es: 'Oceánica', arn: 'Lafken Mapu', pt: 'Oceânica', en: 'Oceanic'
    },
    'plateInfo.scotia.area': {
        es: '1.6 millones km²', arn: '1.6 millones km²', pt: '1.6 milhões km²', en: '1.6 million km²'
    },
    'plateInfo.scotia.velocidad': {
        es: '~2.5 cm/año', arn: '~2.5 cm/tripantu', pt: '~2.5 cm/ano', en: '~2.5 cm/yr'
    },
    'plateInfo.scotia.edad': {
        es: 'Cenozoico (~40 Ma)', arn: 'Cenozoico (~40 Ma)', pt: 'Cenozoico (~40 Ma)', en: 'Cenozoic (~40 Ma)'
    },
    'plateInfo.scotia.interaccion': {
        es: 'Placa pequeña al sur de Sudamérica. Limita con las placas Sudamericana y Antártica. Genera sismicidad en el Pasaje de Drake y Tierra del Fuego. La Falla de Magallanes marca su límite norte.',
        arn: 'Pichi mapu trawa willi Sudamérica mew. Sudamericana ka Antártica trawa mew müley. Nüyün elufi Drake ka Kütral Mapu mew. Magallanes falla puel mew müley.',
        pt: 'Placa pequena ao sul da América do Sul. Limita com as placas Sul-Americana e Antártica. Gera sismicidade na Passagem de Drake e Terra do Fogo. A Falha de Magalhães marca seu limite norte.',
        en: 'Small plate south of South America. Borders the South American and Antarctic plates. Generates seismicity in Drake Passage and Tierra del Fuego. The Magallanes Fault marks its northern boundary.'
    },

    // ===== Accessibility =====
    'a11y.title': {
        es: 'Accesibilidad', arn: 'Küme Adkintun', pt: 'Acessibilidade', en: 'Accessibility'
    },
    'a11y.tts': {
        es: 'Leer en voz alta', arn: 'Dungukülege', pt: 'Ler em voz alta', en: 'Read aloud'
    },
    'a11y.ttsStop': {
        es: 'Detener lectura', arn: 'Nagümn dungukülege', pt: 'Parar leitura', en: 'Stop reading'
    },
    'a11y.kidMode': {
        es: 'Modo niños', arn: 'Pichi che', pt: 'Modo crianças', en: 'Kid mode'
    },
    'a11y.highContrast': {
        es: 'Alto contraste', arn: 'Fütra ad', pt: 'Alto contraste', en: 'High contrast'
    },
    'a11y.announce.quakeUpdate': {
        es: 'Se han detectado {n} sismos. El más fuerte tiene magnitud {mag}.',
        arn: '{n} nüyün pepikangey. Fütra nüyün {mag} müley.',
        pt: '{n} sismos detectados. O mais forte tem magnitude {mag}.',
        en: '{n} earthquakes detected. The strongest has magnitude {mag}.'
    },
    'a11y.announce.newQuake': {
        es: 'Nuevo sismo detectado: magnitud {mag} en {place}, a {depth} kilómetros de profundidad.',
        arn: 'We nüyün: {mag} nüyün {place} mew, {depth} kilómetro rangkülen.',
        pt: 'Novo sismo detectado: magnitude {mag} em {place}, a {depth} quilômetros de profundidade.',
        en: 'New earthquake detected: magnitude {mag} at {place}, {depth} kilometers deep.'
    },
    'a11y.tts.quakeDetail': {
        es: 'Sismo de magnitud {mag}, ubicado en {place}. Profundidad: {depth} kilómetros. Ocurrió {time}.',
        arn: 'Nüyün {mag}, {place} mew. Rangkülen: {depth} kilómetro. {time} rupay.',
        pt: 'Sismo de magnitude {mag}, localizado em {place}. Profundidade: {depth} quilômetros. Ocorreu {time}.',
        en: 'Earthquake of magnitude {mag}, located at {place}. Depth: {depth} kilometers. Occurred {time}.'
    },
    'a11y.tts.summary': {
        es: 'Resumen sísmico de Chile. Hay {n} sismos registrados. Magnitud máxima: {maxMag}. Profundidad promedio: {avgDepth} kilómetros.',
        arn: 'Chile nüyün kimelkawün. {n} nüyün müley. Fütra nüyün: {maxMag}. Rangkülen prom: {avgDepth} kilómetro.',
        pt: 'Resumo sísmico do Chile. Há {n} sismos registrados. Magnitude máxima: {maxMag}. Profundidade média: {avgDepth} quilômetros.',
        en: 'Chile seismic summary. There are {n} registered earthquakes. Maximum magnitude: {maxMag}. Average depth: {avgDepth} kilometers.'
    },
    'kid.emoji.small': {
        es: '😊 Pequeño — Casi nadie lo siente',
        arn: '😊 Pichi — Chemkün no rume',
        pt: '😊 Pequeno — Quase ninguém sente',
        en: '😊 Small — Almost nobody feels it'
    },
    'kid.emoji.light': {
        es: '🙂 Leve — Algunas personas lo sienten',
        arn: '🙂 Pichi — Kiñeke che rükemüy',
        pt: '🙂 Leve — Algumas pessoas sentem',
        en: '🙂 Light — Some people feel it'
    },
    'kid.emoji.moderate': {
        es: '😮 Moderado — Se siente bastante',
        arn: '😮 Epe fütra — Femgechi rükemüy',
        pt: '😮 Moderado — Sente-se bastante',
        en: '😮 Moderate — It is felt quite a bit'
    },
    'kid.emoji.strong': {
        es: '😟 Fuerte — Cuidado, hay que protegerse',
        arn: '😟 Fütra — Fill küme amulnge',
        pt: '😟 Forte — Cuidado, é preciso se proteger',
        en: '😟 Strong — Be careful, take cover'
    },
    'kid.emoji.veryStrong': {
        es: '😰 Muy fuerte — ¡Protégete! Agáchate, cúbrete, sujétate',
        arn: '😰 Müna fütra — ¡Lleküm! Nagümn, takun, müpün',
        pt: '😰 Muito forte — Proteja-se! Abaixe, cubra, segure',
        en: '😰 Very strong — Protect yourself! Drop, cover, hold on'
    },
    'kid.depth.shallow': {
        es: '📍 Poco profundo — Cercano a la superficie',
        arn: '📍 Pichi rangkülen — Epe wente mapu',
        pt: '📍 Raso — Próximo da superfície',
        en: '📍 Shallow — Close to the surface'
    },
    'kid.depth.medium': {
        es: '📍 Profundidad media — Bajo la tierra',
        arn: '📍 Rangkülen — Minche mapu',
        pt: '📍 Profundidade média — Abaixo da terra',
        en: '📍 Medium depth — Underground'
    },
    'kid.depth.deep': {
        es: '📍 Muy profundo — Muy lejos bajo la tierra',
        arn: '📍 Fütra rangkülen — Müna minche mapu',
        pt: '📍 Muito profundo — Muito longe abaixo da terra',
        en: '📍 Very deep — Very far underground'
    },
    'kid.what': {
        es: '🌍 ¿Qué es un sismo? Es cuando la tierra tiembla porque las placas debajo del suelo se mueven.',
        arn: '🌍 ¿Chem am nüyün? Mapu nüyüy rume mapu trawa nüyüwküley mew.',
        pt: '🌍 O que é um sismo? É quando a terra treme porque as placas debaixo do solo se movem.',
        en: '🌍 What is an earthquake? It is when the ground shakes because the plates beneath the surface move.'
    },
    'kid.howRead': {
        es: '📊 Los números más grandes significan temblores más fuertes. Los colores te ayudan:',
        arn: '📊 Fütra nüyün, fütra número. Ad küme kimeltukünugekey:',
        pt: '📊 Números maiores significam tremores mais fortes. As cores te ajudam:',
        en: '📊 Bigger numbers mean stronger shakes. The colors help you:'
    },
    'kid.colorGreen': {
        es: '🟢 Verde = suave', arn: '🟢 Karü = pichi', pt: '🟢 Verde = suave', en: '🟢 Green = gentle'
    },
    'kid.colorYellow': {
        es: '🟡 Amarillo = algo fuerte', arn: '🟡 Choz = epe fütra', pt: '🟡 Amarelo = um pouco forte', en: '🟡 Yellow = somewhat strong'
    },
    'kid.colorOrange': {
        es: '🟠 Naranjo = fuerte', arn: '🟠 Naranjo = fütra', pt: '🟠 Laranja = forte', en: '🟠 Orange = strong'
    },
    'kid.colorRed': {
        es: '🔴 Rojo = muy fuerte', arn: '🔴 Kelü = müna fütra', pt: '🔴 Vermelho = muito forte', en: '🔴 Red = very strong'
    },

    // ===== Fire Monitoring =====
    'fires.title': {
        es: 'Incendios Forestales', arn: 'Kütral Mawiza', pt: 'Incêndios Florestais', en: 'Wildfires'
    },
    'fires.desc': {
        es: 'Anomalías térmicas detectadas por satélite (NASA VIIRS / MODIS)',
        arn: 'Kütral pepikangey satelite mew (NASA VIIRS / MODIS)',
        pt: 'Anomalias térmicas detectadas por satélite (NASA VIIRS / MODIS)',
        en: 'Thermal anomalies detected by satellite (NASA VIIRS / MODIS)'
    },
    'fires.layer24h': {
        es: 'Últimas 24 horas', arn: '24 ora', pt: 'Últimas 24 horas', en: 'Last 24 hours'
    },
    'fires.layer48h': {
        es: 'Últimas 48 horas', arn: '48 ora', pt: 'Últimas 48 horas', en: 'Last 48 hours'
    },
    'fires.layer7d': {
        es: 'Últimos 7 días', arn: '7 antü', pt: 'Últimos 7 dias', en: 'Last 7 days'
    },
    'fires.layerCustom': {
        es: 'Mes / Año específico', arn: 'Küyen / Tripantu', pt: 'Mês / Ano específico', en: 'Specific month / year'
    },
    'month.jan': { es: 'Enero', arn: 'Küyen 1', pt: 'Janeiro', en: 'January' },
    'month.feb': { es: 'Febrero', arn: 'Küyen 2', pt: 'Fevereiro', en: 'February' },
    'month.mar': { es: 'Marzo', arn: 'Küyen 3', pt: 'Março', en: 'March' },
    'month.apr': { es: 'Abril', arn: 'Küyen 4', pt: 'Abril', en: 'April' },
    'month.may': { es: 'Mayo', arn: 'Küyen 5', pt: 'Maio', en: 'May' },
    'month.jun': { es: 'Junio', arn: 'Küyen 6', pt: 'Junho', en: 'June' },
    'month.jul': { es: 'Julio', arn: 'Küyen 7', pt: 'Julho', en: 'July' },
    'month.aug': { es: 'Agosto', arn: 'Küyen 8', pt: 'Agosto', en: 'August' },
    'month.sep': { es: 'Septiembre', arn: 'Küyen 9', pt: 'Setembro', en: 'September' },
    'month.oct': { es: 'Octubre', arn: 'Küyen 10', pt: 'Outubro', en: 'October' },
    'month.nov': { es: 'Noviembre', arn: 'Küyen 11', pt: 'Novembro', en: 'November' },
    'month.dec': { es: 'Diciembre', arn: 'Küyen 12', pt: 'Dezembro', en: 'December' },
    'fires.showLayer': {
        es: 'Mostrar capa de incendios', arn: 'Kütral mapa elun', pt: 'Mostrar camada de incêndios', en: 'Show fires layer'
    },
    'fires.note': {
        es: 'Los puntos rojos/naranjas en el mapa muestran posibles incendios detectados por satélites de la NASA. Para información oficial, consulta CONAF.',
        arn: 'Kelü/naranjo puntos mapa mew, NASA satelite kütral pepikangey. CONAF mew kimeltuam.',
        pt: 'Os pontos vermelhos/laranjas no mapa mostram possíveis incêndios detectados por satélites da NASA. Para informação oficial, consulte CONAF.',
        en: 'Red/orange dots on the map show possible fires detected by NASA satellites. For official information, check CONAF.'
    },
    'fires.conafLink': {
        es: 'Ver situación actual en CONAF',
        arn: 'CONAF mew adkintun',
        pt: 'Ver situação atual no CONAF',
        en: 'View current situation at CONAF'
    },
    'fires.nasaLink': {
        es: 'Ver mapa completo NASA FIRMS',
        arn: 'NASA FIRMS mapa adkintun',
        pt: 'Ver mapa completo NASA FIRMS',
        en: 'View full NASA FIRMS map'
    },
    'btn.fires': {
        es: 'Incendios', arn: 'Kütral', pt: 'Incêndios', en: 'Wildfires'
    },
    'legend.fires': {
        es: 'Incendios (Satélite)', arn: 'Kütral (Satelite)', pt: 'Incêndios (Satélite)', en: 'Fires (Satellite)'
    },
    'legend.fires.high': {
        es: 'Alta confianza', arn: 'Küme kimün', pt: 'Alta confiança', en: 'High confidence'
    },
    'legend.fires.low': {
        es: 'Baja confianza', arn: 'Pichi kimün', pt: 'Baixa confiança', en: 'Low confidence'
    },
    'fires.emergency': {
        es: '🚨 Emergencia incendios: llama al 130 (CONAF)',
        arn: '🚨 Kütral emergencia: 130 mütrümn (CONAF)',
        pt: '🚨 Emergência incêndios: ligue 130 (CONAF)',
        en: '🚨 Fire emergency: call 130 (CONAF)'
    },

    // ===== Fire Forecast / Predictions =====
    'fires.forecast.title': {
        es: '📡 Pronóstico y Predicciones',
        arn: '📡 Kütral Kimeltun',
        pt: '📡 Previsão e Predições',
        en: '📡 Forecast & Predictions'
    },
    'fires.forecast.botonRojo': {
        es: 'Botón Rojo',
        arn: 'Kelü Botón',
        pt: 'Botão Vermelho',
        en: 'Red Button'
    },
    'fires.forecast.botonRojoDesc': {
        es: 'Zonas con probabilidad de ignición ≥70% y viento ≥20 km/h (14:00–18:59 hrs). Se actualiza diariamente.',
        arn: 'Mapu kütral pepikangey ≥70% ka kürüf ≥20 km/h (14:00–18:59). Antü kakewme wechulkan.',
        pt: 'Zonas com probabilidade de ignição ≥70% e vento ≥20 km/h (14:00–18:59 hrs). Atualizado diariamente.',
        en: 'Areas with ignition probability ≥70% and wind ≥20 km/h (14:00–18:59 hrs). Updated daily.'
    },
    'fires.forecast.ignicion': {
        es: 'Prob. de Ignición',
        arn: 'Kütral Pepikangen',
        pt: 'Prob. de Ignição',
        en: 'Ignition Probability'
    },
    'fires.forecast.ignicionDesc': {
        es: 'Probabilidad de que un incendio se inicie según condiciones atmosféricas y vegetación. Actualizado cada 5 minutos.',
        arn: 'Kütral pepikangey wenu mapu ka aliwen mew. 5 minuto kakewme wechulkan.',
        pt: 'Probabilidade de um incêndio iniciar segundo condições atmosféricas e vegetação. Atualizado a cada 5 minutos.',
        en: 'Probability of fire initiation based on atmospheric conditions and vegetation. Updated every 5 minutes.'
    },
    'fires.forecast.humedad': {
        es: 'Humedad de Combustible',
        arn: 'Küyefi Ko Ruka',
        pt: 'Umidade de Combustível',
        en: 'Fuel Moisture'
    },
    'fires.forecast.humedadDesc': {
        es: 'Humedad del combustible fino muerto (1-hr FFMC). Indica cómo se comportaría el fuego una vez iniciado.',
        arn: 'Kuyefi ko ruka (1-hr FFMC). Kütral chem femkey pepikangey.',
        pt: 'Umidade do combustível fino morto (1-hr FFMC). Indica como o fogo se comportaria uma vez iniciado.',
        en: 'Fine dead fuel moisture content (1-hr FFMC). Indicates how fire would behave once started.'
    },
    'fires.forecast.mapsLink': {
        es: 'Mapas de pronóstico CONAF (ArcGIS)',
        arn: 'CONAF kütral kimeltun mapa (ArcGIS)',
        pt: 'Mapas de previsão CONAF (ArcGIS)',
        en: 'CONAF forecast maps (ArcGIS)'
    },

    // ===== Fire Historical Data =====
    'fires.history.title': {
        es: '📊 Historial de Incendios (2014–2025)',
        arn: '📊 Kütral Kuyfike Küdaw (2014–2025)',
        pt: '📊 Histórico de Incêndios (2014–2025)',
        en: '📊 Fire History (2014–2025)'
    },
    'fires.history.season': {
        es: 'Temporada', arn: 'Epe Tripantu', pt: 'Temporada', en: 'Season'
    },
    'fires.history.fires': {
        es: 'Incendios', arn: 'Kütral', pt: 'Incêndios', en: 'Fires'
    },
    'fires.history.hectares': {
        es: 'Hectáreas', arn: 'Hectárea', pt: 'Hectares', en: 'Hectares'
    },
    'fires.history.note': {
        es: 'La temporada 2016–2017 fue la peor registrada (570,197 ha), seguida por 2022–2023 con los mega-incendios del Biobío y Ñuble. Total 2014–2024: 68,546 incendios, 1,626,894 ha. Fuente: CONAF Looker Studio.',
        arn: '2016–2017 epe tripantu müna fütra kütral rupay (570,197 ha), ka 2022–2023 Biobío ka Ñuble mew. Datos: CONAF kimün.',
        pt: 'A temporada 2016–2017 foi a pior registrada (570.197 ha), seguida por 2022–2023 com os mega-incêndios do Biobío e Ñuble. Total 2014–2024: 68.546 incêndios, 1.626.894 ha. Fonte: CONAF Looker Studio.',
        en: 'The 2016–2017 season was the worst on record (570,197 ha), followed by 2022–2023 with the Biobío and Ñuble mega-fires. Total 2014–2024: 68,546 fires, 1,626,894 ha. Source: CONAF Looker Studio.'
    },
    'fires.history.trend': {
        es: 'Tendencia: El número de incendios se mantiene entre 5,000–8,000/año, pero la superficie afectada varía drásticamente según eventos extremos (mega-incendios).',
        arn: 'Amul: Kütral 5,000–8,000/tripantu, welu mapu afkentu fütra kütral mew wechuy.',
        pt: 'Tendência: O número de incêndios se mantém entre 5.000–8.000/ano, mas a superfície afetada varia drasticamente segundo eventos extremos (mega-incêndios).',
        en: 'Trend: The number of fires remains between 5,000–8,000/year, but the affected area varies dramatically depending on extreme events (mega-fires).'
    },
    'fires.historyLink': {
        es: 'Estadísticas históricas CONAF (Looker Studio)',
        arn: 'CONAF kuyfike kimün (Looker Studio)',
        pt: 'Estatísticas históricas CONAF (Looker Studio)',
        en: 'Historical statistics CONAF (Looker Studio)'
    },

    // ===== Sources =====
    'sources.title': {
        es: 'Fuentes de Datos', arn: 'Datos Chew', pt: 'Fontes de Dados', en: 'Data Sources'
    },
    'sources.usgs.name': {
        es: 'USGS (Servicio Geológico de EE.UU.)', arn: 'USGS', pt: 'USGS (Serviço Geológico dos EUA)', en: 'USGS (U.S. Geological Survey)'
    },
    'sources.usgs.desc': {
        es: 'Datos sísmicos en tiempo real vía API FDSN. Cobertura mundial con magnitud ≥2.5.',
        arn: 'Nüyün datos femgechi antü FDSN API mew. Kom mapu 2.5+ nüyün.',
        pt: 'Dados sísmicos em tempo real via API FDSN. Cobertura mundial com magnitude ≥2.5.',
        en: 'Real-time seismic data via FDSN API. Worldwide coverage with magnitude ≥2.5.'
    },
    'sources.csn.name': {
        es: 'CSN (Centro Sismológico Nacional)', arn: 'CSN', pt: 'CSN (Centro Sismológico Nacional)', en: 'CSN (National Seismological Center)'
    },
    'sources.csn.desc': {
        es: 'Red sismológica oficial de Chile, operada por la Universidad de Chile.',
        arn: 'Chile nüyün kimün, Universidad de Chile.',
        pt: 'Rede sismológica oficial do Chile, operada pela Universidade do Chile.',
        en: 'Official seismological network of Chile, operated by the University of Chile.'
    },
    'sources.nasa.name': {
        es: 'NASA FIRMS (Incendios)', arn: 'NASA FIRMS (Kütral)', pt: 'NASA FIRMS (Incêndios)', en: 'NASA FIRMS (Fires)'
    },
    'sources.nasa.desc': {
        es: 'Detección de anomalías térmicas por satélites VIIRS/MODIS. Actualizado cada ~3 horas.',
        arn: 'Kütral pepikangey VIIRS/MODIS satelite mew. ~3 ora wechulkan.',
        pt: 'Detecção de anomalias térmicas por satélites VIIRS/MODIS. Atualizado a cada ~3 horas.',
        en: 'Thermal anomaly detection by VIIRS/MODIS satellites. Updated every ~3 hours.'
    },
    'sources.conaf.name': {
        es: 'CONAF (Corp. Nacional Forestal)', arn: 'CONAF', pt: 'CONAF (Corp. Nacional Florestal)', en: 'CONAF (National Forestry Corp.)'
    },
    'sources.conaf.desc': {
        es: 'Información oficial de incendios forestales en Chile. Emergencias: 130.',
        arn: 'Chile kütral mawiza kimün. Emergencia: 130.',
        pt: 'Informação oficial de incêndios florestais no Chile. Emergências: 130.',
        en: 'Official wildfire information for Chile. Emergencies: 130.'
    },
    'sources.osm': {
        es: 'Mapa base: OpenStreetMap + CARTO',
        arn: 'Mapa: OpenStreetMap + CARTO',
        pt: 'Mapa base: OpenStreetMap + CARTO',
        en: 'Base map: OpenStreetMap + CARTO'
    }
};

// ===== Translation function =====
function t(key, params) {
    const entry = TRANSLATIONS[key];
    if (!entry) return key;
    let text = entry[currentLang] || entry['es'] || key;
    if (params) {
        Object.keys(params).forEach(k => {
            text = text.replace(`{${k}}`, params[k]);
        });
    }
    return text;
}

// ===== Apply translations to DOM =====
function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        el.setAttribute('title', t(key));
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.setAttribute('placeholder', t(key));
    });
    // Update select options
    document.querySelectorAll('option[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });
    // Update html lang attribute
    document.documentElement.lang = currentLang === 'arn' ? 'arn' : currentLang;
}

// ===== Change language =====
function setLanguage(lang) {
    if (!LANGUAGES[lang]) return;
    currentLang = lang;
    localStorage.setItem('sismos_lang', lang);

    // Close dropdown
    const dropdown = document.getElementById('langDropdown');
    if (dropdown) dropdown.classList.remove('open');

    // Update selector display
    const btn = document.getElementById('langBtn');
    if (btn) {
        btn.innerHTML = `${LANGUAGES[lang].flag} <span>${LANGUAGES[lang].label}</span> <i class="fas fa-chevron-down"></i>`;
    }

    // Apply static translations
    applyTranslations();

    // Rebuild plates layer (labels)
    if (typeof platesLayer !== 'undefined' && typeof buildPlatesLayer === 'function') {
        platesLayer.clearLayers();
        buildPlatesLayer();
    }

    // Re-render dynamic content
    if (typeof applyFilters === 'function' && allQuakes.length > 0) {
        applyFilters();
    }
    if (typeof updateLastUpdate === 'function') {
        updateLastUpdate();
    }
    // Re-render kid info if visible
    if (typeof kidMode !== 'undefined' && kidMode) {
        const kidBox = document.getElementById('kidInfoBox');
        if (kidBox) kidBox.style.display = 'block';
    }
    // Re-render fire history chart
    if (typeof renderFireHistoryChart === 'function') {
        renderFireHistoryChart();
    }
}

// ===== Init language =====
function initLanguage() {
    const saved = localStorage.getItem('sismos_lang');
    if (saved && LANGUAGES[saved]) {
        currentLang = saved;
    }
    const btn = document.getElementById('langBtn');
    if (btn) {
        btn.innerHTML = `${LANGUAGES[currentLang].flag} <span>${LANGUAGES[currentLang].label}</span> <i class="fas fa-chevron-down"></i>`;
    }
    applyTranslations();
}

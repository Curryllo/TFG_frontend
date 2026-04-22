import { useEffect, useState, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FeatureCollection } from 'geojson';

// 1. Importar la librería y el idioma español
import countries from "i18n-iso-countries";
import esLocale from "i18n-iso-countries/langs/es.json";

// Registrar el idioma español en la librería
countries.registerLocale(esLocale);

export default function CountryHumansMap({ data }: { data: any[] }) {
    const [geoJsonData, setGeoJsonData] = useState<FeatureCollection | null>(null);
    const geoJsonRef = useRef<any>(null);

    // Cargar el GeoJSON de los países del mundo
    useEffect(() => {
        fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json')
            .then(res => res.json())
            .then(data => setGeoJsonData(data))
            .catch(err => console.error("Error cargando GeoJSON", err));
    }, []);

    // 2. Agrupar y sumar casos usando el CÓDIGO ISO universal
    const casosPorPaisISO = useMemo(() => {
        const counts: Record<string, number> = {};
        
        data.forEach(item => {
            const nombreBruto = item.pais || '';
            const nombreLimpio = nombreBruto.trim();
            
            if (!nombreLimpio || nombreLimpio === 'Desconocido') {
                counts['UNKNOWN'] = (counts['UNKNOWN'] || 0) + 1;
                return; // Saltamos a la siguiente iteración
            }

            // Convertir el nombre limpio a código ISO
            const isoCode = countries.getAlpha3Code(nombreLimpio, 'es');
            
            if (isoCode) {
                counts[isoCode] = (counts[isoCode] || 0) + 1;
            } else {
                console.warn(`Fallo ISO: "${nombreLimpio}" (Longitud: ${nombreLimpio.length} caracteres)`);
                counts['UNKNOWN'] = (counts['UNKNOWN'] || 0) + 1;
            }
        });
        
        return counts;
    }, [data]);

    // Calcular el máximo para la escala de colores (ignorando UNKNOWN)
    const maxCasos = Math.max(
        ...Object.entries(casosPorPaisISO)
            .filter(([key]) => key !== 'UNKNOWN')
            .map(([_, value]) => value), 
        1
    );

    // Función para determinar el color basado en la cantidad
    const getColor = (casos: number) => {
        if (casos === 0) return '#cccccc'; 
        
        const intensidad = casos / maxCasos;
        return intensidad > 0.8 ? '#800026' :
               intensidad > 0.6 ? '#BD0026' :
               intensidad > 0.4 ? '#E31A1C' :
               intensidad > 0.2 ? '#FC4E2A' :
               intensidad > 0.1 ? '#FD8D3C' : '#FEB24C';
    };

    // Estilos y eventos para cada polígono (país)
    const onEachFeature = (feature: any, layer: any) => {
        // El GeoJSON de 'johan' guarda el código ISO en feature.id (Ej: "ESP", "USA")
        const isoCode = feature.id; 
        const nombreOriginal = feature.properties.name; // Nombre nativo del mapa (Inglés)
        const nombreEnEspanol = countries.getName(isoCode, "es") || nombreOriginal;
        const casos = casosPorPaisISO[isoCode] || 0;

        layer.bindTooltip(
            `<div class="text-center">
                <strong>${nombreEnEspanol}</strong><br/>
                Casos: ${casos}
            </div>`,
            { sticky: true, className: 'bg-white p-2 border rounded shadow text-gray-800' }
        );

        layer.on({
            mouseover: (e: any) => {
                const l = e.target;
                l.setStyle({ weight: 3, color: '#666', dashArray: '', fillOpacity: 0.9 });
                l.bringToFront();
            },
            mouseout: (e: any) => {
                if (geoJsonRef.current) {
                    geoJsonRef.current.resetStyle(e.target);
                }
            }
        });
    };

    if (!geoJsonData) {
        return <div className="w-full h-full flex items-center justify-center text-gray-500">Cargando fronteras globales...</div>;
    }

    return (
        <MapContainer center={[20, 0]} zoom={2} className="w-full h-full z-0 min-h-[600px]">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            
            <GeoJSON 
                ref={geoJsonRef}
                data={geoJsonData}
                style={(feature: any) => {
                    const isoCode = feature?.id;
                    const casos = casosPorPaisISO[isoCode] || 0;
                    return {
                        fillColor: getColor(casos),
                        weight: 1,
                        opacity: 1,
                        color: 'white',
                        fillOpacity: 0.7
                    };
                }}
                onEachFeature={onEachFeature}
            />
        </MapContainer>
    );
}
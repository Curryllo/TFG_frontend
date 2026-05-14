import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';

interface PropsHeatMapLayer {
    puntos: { latitud: number, longitud: number, numero: number }[];
}

export default function HeatMapLayer({ puntos }: PropsHeatMapLayer) {
    const map = useMap();

    useEffect(() => {
        const puntosLimpios = puntos.filter(p => p.latitud !== 0 && p.longitud !== 0);
        if (puntosLimpios.length === 0) return;

        const maxIntensidadReal = Math.max(...puntosLimpios.map(p => Math.sqrt(p.numero || 1)));
        
        const techoCalor = maxIntensidadReal * 0.3;

        const puntosValidos = puntosLimpios.map(p => {
            const intensidadOriginal = Math.sqrt(p.numero || 1);
            const intensidadTopada = Math.min(intensidadOriginal, techoCalor);
            
            return [p.latitud, p.longitud, intensidadTopada] as L.HeatLatLngTuple;
        });

        var heatLayer = L.heatLayer(puntosValidos, {
            radius: 25,
            blur: 15,
            max: techoCalor,
            minOpacity: 0.4,
            gradient: {
                0.0: "#41b6c4", // Cyan
                0.2: "#ffffb2", // Amarillo
                0.4: "#fecc5c", // Naranja claro
                0.6: "#fd8d3c", // Naranja oscuro
                0.8: "#f03b20", // Rojo
                1.0: "#bd0026"  // Granate
            }
        }).addTo(map);

        return () => {
            map.removeLayer(heatLayer);
        };
    }, [puntos, map]);

    return null;
}
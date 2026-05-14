import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { DatoVectorHumano } from '@/types/map';

export default function AutoBounds({ data }: { data: DatoVectorHumano[] }) {
    const map = useMap();

    useEffect(() => {
        const puntosValidos = data.filter(p => p.latitud !== 0 && p.longitud !== 0);

        if (puntosValidos.length > 0) {
            const bounds = L.latLngBounds(
                puntosValidos.map(p => [p.latitud, p.longitud])
            );
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [data, map]);

    return null;
}
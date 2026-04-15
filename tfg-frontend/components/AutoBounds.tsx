// components/maps/AutoBounds.tsx
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { DatoVectorHumano } from '@/types/map'; // Ajusta la ruta a tu interfaz

export default function AutoBounds({ data }: { data: DatoVectorHumano[] }) {
    const map = useMap(); // Obtenemos la instancia real de Leaflet

    useEffect(() => {
        // 1. Filtramos las coordenadas inválidas
        const puntosValidos = data.filter(p => p.latitud !== 0 && p.longitud !== 0);

        if (puntosValidos.length > 0) {
            // 2. Creamos los "Límites" (Bounds) usando las coordenadas
            const bounds = L.latLngBounds(
                puntosValidos.map(p => [p.latitud, p.longitud])
            );
            
            // 3. Le decimos al mapa que haga zoom hacia esos límites.
            // El 'padding' deja un margen de 50px para que los puntos no toquen el borde de la pantalla.
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [data, map]); // Se vuelve a ejecutar si cambian los datos (ej: al usar el filtro)

    return null; // Este componente es lógico, no pinta nada en el HTML
}
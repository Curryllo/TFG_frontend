'use client'
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapVisualizationStrategyProps, DatoVector } from '@/types/map';
import AutoBounds from '@/components/AutoBounds';
import { useMemo } from 'react';

export default function SimpleVectorMap({ data }: MapVisualizationStrategyProps) {
    const datosAgrupados = useMemo(() => {
        // Usamos un diccionario (objeto) para agrupar
        const agrupacion: Record<string, DatoVector> = {};

        data.filter(p => p.latitud !== 0 && p.longitud !== 0).forEach(punto => {
            // Creamos una clave única combinando la posición y el nombre del vector
            const claveUnica = `${punto.latitud}-${punto.longitud}-${punto.vector}`;

            if (!agrupacion[claveUnica]) {
                // Si es la primera vez que vemos este punto+vector, lo guardamos tal cual
                agrupacion[claveUnica] = { ...punto };
            } else {
                // Si ya existía, simplemente le SUMAMOS el número de casos nuevos
                agrupacion[claveUnica].numero += punto.numero;
            }
        });

        // Convertimos el diccionario de vuelta a un array para que el .map() de abajo funcione
        return Object.values(agrupacion);
    }, [data]);

    return (
        <MapContainer center={[41.6488, -0.8891]} zoom={6} className="w-full h-full z-0">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <AutoBounds data={datosAgrupados} />
            {datosAgrupados.filter(p => p.latitud !== 0).map((punto, i) => (
                <CircleMarker
                    key={i}
                    center={[punto.latitud, punto.longitud]}
                    pathOptions={{ color: '#f00404', fillColor: '#f00404', fillOpacity: 0.5 }}
                    radius={Math.max(Math.sqrt(punto.numero) * 4, 5)} 
                >
                    <Tooltip>{punto.vector} // {punto.numero} casos</Tooltip>
                </CircleMarker>
            ))}
        </MapContainer>
    );
}
'use client'
import { MapContainer, TileLayer, CircleMarker, Tooltip, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapVisualizationStrategyProps } from '@/types/map';
import AutoBounds from '@/components/AutoBounds';

export default function GenderVectorMap({ data }: MapVisualizationStrategyProps) {
    return (
        <MapContainer center={[41.6488, -0.8891]} zoom={6} className="w-full h-full z-0">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <AutoBounds data={data} />
            {data.filter(p => p.latitud !== 0 && p.longitud !== 0 && (p.genero == 'H' || p.genero == 'M')).map((punto, i) => {
                const color = punto.genero === 'H' ? '#ffa202' : '#3b82f6';
                return (
                    <CircleMarker
                        key={i}
                        center={[punto.latitud, punto.longitud]}
                        pathOptions={{ color, fillColor: color, fillOpacity: 0.6 }}
                        radius={Math.max(Math.sqrt(punto.numero) * 4, 5)} 
                    >
                        <Popup>
                            <b>{punto.vector}</b><br/>Sexo: {punto.genero || 'N/A'}<br/>Casos: {punto.numero}
                        </Popup>
                    </CircleMarker>
                );
            })}
        </MapContainer>
    );
}
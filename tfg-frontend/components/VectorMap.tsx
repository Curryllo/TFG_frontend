'use client'

import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface DatoVectorHumano {
    edad: number;
    sexo: string;
    fecha: Date;
    enfermedad: string;
    pais: string;
    provincia: string;
    municipio: string;
    defuncion: boolean;
    hospitalizado: boolean;
}

interface VectorMapProps {
    data: DatoVectorHumano[];
}

export default function VectorMap({ data }: VectorMapProps) {
    const center: [number, number] = [41.6488, -0.8891]; // Coordenadas por defecto

    return (
        <MapContainer center={center} zoom={6} className="w-full h-full rounded-xl z-0">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {data.map((punto, index) => {
                const colorPunto = punto.sexo === 'H' ? '#ef4444' : 
                                   punto.sexo === 'M' ? '#3b82f6' : '#ff0000';

                return (
                    <CircleMarker
                        key={index}
                        center={[punto.latitud, punto.longitud]}
                        pathOptions={{ color: colorPunto, fillColor: colorPunto, fillOpacity: 0.6 }}
                        radius={Math.max(Math.sqrt(punto.casos) * 2, 5)}
                    >
                        <Tooltip>{punto.casos} casos</Tooltip>
                        <Popup>
                            <div className="p-1 min-w-[150px]">
                                <h3 className="font-bold text-lg border-b pb-1 mb-2">{punto.vector}</h3>
                                <p className="text-sm my-1"><b>Fecha:</b></p>
                                <p className="text-sm my-1">
                                    <b>Sexo:</b> 
                                    <span className="ml-1 px-2 py-0.5 rounded text-white" style={{backgroundColor: colorPunto}}>
                                        {punto.sexo}
                                    </span>
                                </p>
                                <p className="text-sm my-1 font-semibold text-gray-700"><b>Casos:</b> {punto.casos}</p>
                            </div>
                        </Popup>
                    </CircleMarker>
                );
            })}
        </MapContainer>
    );
}
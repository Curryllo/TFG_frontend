'use client'
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import AutoBounds from '@/components/AutoBounds';
import { useMemo } from 'react';

export default function GarrapatasMap({ data }: { data: any[] }) {

    const datosAgrupados = useMemo(() => {
        const agrupacion: Record<string, any> = {};

        // Filtramos asegurando que haya coordenadas válidas (distintas de 0 o null)
        data.filter(p => p.latitud && p.longitud).forEach(punto => {
            // Agrupamos por coordenada exacta
            const claveUnica = `${punto.latitud}-${punto.longitud}`;

            if (!agrupacion[claveUnica]) {
                agrupacion[claveUnica] = {
                    latitud: punto.latitud,
                    longitud: punto.longitud,
                    municipio: punto.municipioRecogida || 'Desconocido',
                    totalGarrapatas: 1,
                    // Usamos un Set para guardar las especies sin repetirlas
                    especies: new Set([punto.especie || 'Desconocida'])
                };
            } else {
                agrupacion[claveUnica].totalGarrapatas += 1;
                agrupacion[claveUnica].especies.add(punto.especie || 'Desconocida');
            }
        });

        // Convertimos el objeto en array y el Set de especies en un texto separado por comas
        return Object.values(agrupacion).map(item => ({
            ...item,
            especiesList: Array.from(item.especies).join(', ')
        }));
    }, [data]);

    return (
        <MapContainer center={[41.6488, -0.8891]} zoom={6} className="w-full h-full z-0">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <AutoBounds data={datosAgrupados} />

            {datosAgrupados.map((punto, i) => {
                // Color fijo solicitado
                const colorBurbuja = '#0d9488';

                return (
                    <CircleMarker
                        key={`${punto.latitud}-${punto.longitud}-${i}`}
                        center={[punto.latitud, punto.longitud]}
                        pathOptions={{
                            color: colorBurbuja,
                            fillColor: colorBurbuja,
                            fillOpacity: 0.6,
                            weight: 2
                        }}
                        // El radio crece proporcionalmente a la cantidad total de garrapatas
                        radius={Math.max(Math.sqrt(punto.totalGarrapatas) * 5, 6)}
                    >
                        <Tooltip sticky>
                            <div className="p-2">
                                <strong className="text-lg">{punto.municipio}</strong><br />
                                <span className="text-gray-700 font-medium">
                                    Total Recogidas: {punto.totalGarrapatas}
                                </span><br />
                                <span className="text-xs text-gray-500 italic">
                                    Especies: {punto.especiesList}
                                </span>
                            </div>
                        </Tooltip>
                    </CircleMarker>
                );
            })}
        </MapContainer>
    );
}
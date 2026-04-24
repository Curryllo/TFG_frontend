'use client'
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapVisualizationStrategyProps, DatoVectorHumano } from '@/types/map';
import AutoBounds from '@/components/AutoBounds';
import { useMemo } from 'react';

export default function SimpleVectorMap({ data }: { data: any[] }) {
    const datosAgrupados = useMemo(() => {
        const agrupacion: Record<string, any> = {};

        data.filter(p => p.latitud !== 0 && p.longitud !== 0).forEach(punto => {
            const claveUnica = `${punto.latitud}-${punto.longitud}-${punto.vector}`;
            
            const enfermedad = punto.enfermedad || '';
            const enfermedadLimpia = enfermedad.trim();
            const positivo = Boolean(enfermedadLimpia && enfermedadLimpia !== '');

            if (!agrupacion[claveUnica]) {
                agrupacion[claveUnica] = { 
                    ...punto, 
                    tieneEnfermedad: positivo 
                };
            } else {
                agrupacion[claveUnica].numero += punto.numero;
                // Si al menos uno de los registros agrupados es positivo, la burbuja se marca
                if (positivo) agrupacion[claveUnica].tieneEnfermedad = true;
            }
        });

        return Object.values(agrupacion);
    }, [data]);

    return (
        <MapContainer center={[41.6488, -0.8891]} zoom={6} className="w-full h-full z-0">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <AutoBounds data={datosAgrupados} />
            
            {datosAgrupados.map((punto, i) => {
                // Color dinámico: Rojo si hay enfermedad detectada, Azul/Teal si es solo presencia
                const colorBurbuja = punto.tieneEnfermedad ? '#ef4444' : '#0d9488';
                
                return (
                    <CircleMarker
                        key={`${punto.fecha}-${i}`}
                        center={[punto.latitud, punto.longitud]}
                        pathOptions={{ 
                            color: colorBurbuja, 
                            fillColor: colorBurbuja, 
                            fillOpacity: 0.5,
                            weight: 2 
                        }}
                        // Tu lógica de sqrt es perfecta
                        radius={Math.max(Math.sqrt(punto.numero) * 4, 5)} 
                    >
                        <Tooltip sticky>
                            <div className="p-1">
                                <strong>{punto.vector}</strong><br/>
                                <span>{punto.numero} ejemplares</span>
                                {punto.tieneEnfermedad && (
                                    <div className="text-red-600 font-bold mt-1">
                                        ⚠️ Enfermedad {punto.enfermedad} Detectada 
                                    </div>
                                )}
                            </div>
                        </Tooltip>
                    </CircleMarker>
                );
            })}
        </MapContainer>
    );
}
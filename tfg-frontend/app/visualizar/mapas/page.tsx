'use client'

import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getDatosHumanos } from "@/app/visualizar/actions";


const PaisMapStrategy = dynamic(() => import('@/components/PaisHumanosMap'), { ssr: false });

export default function VisualizacionMapas() {
    // Estados para los datos y carga
    const [datosCrudos, setDatosCrudos] = useState<any[]>([]);
    const [cargando, setCargando] = useState(true);

    // Estados para los filtros y la estrategia elegida
    const [filtroVector, setFiltroVector] = useState<string>('Todos');


    useEffect(() => {
        getDatosHumanos().then(res => {
            if (res.success) setDatosCrudos(res.data);
            setCargando(false);
        });
    }, []);

    const enfermedadesDisponibles = useMemo(() => {
        const unicos = new Set(datosCrudos.map(d => d.enfermedad));
        return ['Todos', ...Array.from(unicos)];
    }, [datosCrudos]);

    const datosFiltrados = useMemo(() => {
        if (filtroVector === 'Todos') return datosCrudos;
        return datosCrudos.filter(d => d.enfermedad === filtroVector);
    }, [datosCrudos, filtroVector]);




    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto space-y-6">
                <Link href="/visualizar" className="block">
                    <div className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        Volver atrás
                    </div>
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">Mapas</h1>

                {/* PANEL DE FILTROS */}
                <div className="bg-white p-4 rounded-xl shadow border flex gap-6">
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-600 mb-1">Especie Vector:</label>
                        <select
                            value={filtroVector}
                            onChange={(e) => setFiltroVector(e.target.value)}
                            className="border rounded px-3 py-2 bg-gray-50 text-gray-600"
                        >
                            {enfermedadesDisponibles.map(v => <option key={v} value={v}>{v}</option>)}
                        </select>
                    </div>
                </div>

                {/* CONTENEDOR DEL MAPA */}
                <div className="bg-white rounded-xl shadow overflow-hidden h-[600px] relative">
                    {cargando ? (
                        <div className="w-full h-full flex items-center justify-center">Leyendo CSV desde MinIO...</div>
                    ) : (
                        // INYECCIÓN DE LA ESTRATEGIA
                        <PaisMapStrategy data={datosFiltrados} />
                    )}
                </div>
            </div>
        </div>
    );
}
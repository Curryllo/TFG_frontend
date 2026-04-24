'use client'

import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { getDatosHumanos } from "@/app/visualizar/actions";

const PaisMapStrategy = dynamic(() => import('@/components/PaisHumanosMap'), { ssr: false });

export default function EstrategiaHumanos() {
    const [datosCrudos, setDatosCrudos] = useState<any[]>([]);
    const [cargando, setCargando] = useState(true);
    const [filtroEnfermedad, setFiltroEnfermedad] = useState<string>('Todas');

    useEffect(() => {
        getDatosHumanos().then(res => {
            if (res.success) setDatosCrudos(res.data);
            setCargando(false);
        });
    }, []);

    const enfermedadesDisponibles = useMemo(() => {
        const unicos = new Set(datosCrudos.map(d => d.enfermedad));
        return ['Todas', ...Array.from(unicos)];
    }, [datosCrudos]);

    const datosFiltrados = useMemo(() => {
        if (filtroEnfermedad === 'Todas') return datosCrudos;
        return datosCrudos.filter(d => d.enfermedad === filtroEnfermedad);
    }, [datosCrudos, filtroEnfermedad]);

    return (
        <div className="space-y-4 animate-in fade-in duration-500">
            <div className="bg-white p-4 rounded-xl shadow border flex gap-6">
                <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-600 mb-1">Filtrar por Enfermedad:</label>
                    <select
                        value={filtroEnfermedad}
                        onChange={(e) => setFiltroEnfermedad(e.target.value)}
                        className="border rounded px-3 py-2 bg-gray-50 text-gray-600 outline-blue-200"
                    >
                        {enfermedadesDisponibles.map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden h-[600px] relative">
                {cargando ? (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">Cargando base de datos de pacientes...</div>
                ) : (
                    <PaisMapStrategy data={datosFiltrados} />
                )}
            </div>
        </div>
    );
}
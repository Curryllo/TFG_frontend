// app/visualizar/mapas/page.tsx
'use client'

import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { DatoVectorHumano } from '@/types/map';
import { getDatosHumanosMinio } from './actions';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// IMPORTACIÓN DINÁMICA DE NUESTRAS ESTRATEGIAS
const SimpleMapStrategy = dynamic(() => import('@/components/SimpleVectorMap'), { ssr: false });
const GenderMapStrategy = dynamic(() => import('@/components/GeneroVectorMap'), { ssr: false });

export default function VisualizacionMapas() {
    // Estados para los datos y carga
    const [datosBrutos, setDatosBrutos] = useState<DatoVectorHumano[]>([]);
    const [cargando, setCargando] = useState(true);

    // Estados para los filtros y la estrategia elegida
    const [filtroVector, setFiltroVector] = useState<string>('Todos');
    const [estrategiaMapa, setEstrategiaMapa] = useState<'simple' | 'genero'>('simple');

    // Cargar datos de MinIO al montar la página
    useEffect(() => {
        getDatosHumanosMinio().then(res => {
            if (res.success) setDatosBrutos(res.data);
            setCargando(false);
        });
    }, []);

    // Extraer lista única de vectores para llenar el <select>
    const enfermedadesDisponibles = useMemo(() => {
        const unicos = new Set(datosBrutos.map(d => d.enfermedad));
        return ['Todos', ...Array.from(unicos)];
    }, [datosBrutos]);

    // Aplicar el filtro de vector
    const datosFiltrados = useMemo(() => {
        if (filtroVector === 'Todos') return datosBrutos;
        return datosBrutos.filter(d => d.enfermedad === filtroVector);
    }, [datosBrutos, filtroVector]);

    // SELECCIÓN DE LA ESTRATEGIA (PATRÓN STRATEGY)
    const MapStrategyComponent = estrategiaMapa === 'simple' ? SimpleMapStrategy : GenderMapStrategy;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto space-y-6">
                <Link href="/visualizar" className="block">
                    <div className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        Volver atrás
                    </div>
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">Análisis Vectorial</h1>

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

                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-600 mb-1">Tipo de Mapa (Estrategia):</label>
                        <select
                            value={estrategiaMapa}
                            onChange={(e) => setEstrategiaMapa(e.target.value as 'simple' | 'genero')}
                            className="border rounded px-3 py-2 bg-gray-50 text-gray-600"
                        >
                            <option value="simple">Número de vectores</option>
                            <option value="genero">Distribución por Género (Macho/Hembra)</option>
                        </select>
                    </div>
                </div>

                {/* CONTENEDOR DEL MAPA */}
                <div className="bg-white rounded-xl shadow overflow-hidden h-[600px] relative">
                    {cargando ? (
                        <div className="w-full h-full flex items-center justify-center">Leyendo CSV desde MinIO...</div>
                    ) : (
                        // INYECCIÓN DE LA ESTRATEGIA
                        <MapStrategyComponent data={datosFiltrados} />
                    )}
                </div>
            </div>
        </div>
    );
}
import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { getDatosMontireo } from "@/app/(main)/visualizar/actions";

const VectoresMapStrategy = dynamic(() => import('@/components/SimpleVectorMap'), { ssr: false });

export default function EstrategiaMonitoreo() {
    const [datosCrudos, setDatosCrudos] = useState<any[]>([]);
    const [cargando, setCargando] = useState(true);
    const [filtroVector, setFiltroVector] = useState<string>('Todos');
    const [year, setYear] = useState('Todos');

    useEffect(() => {
        getDatosMontireo().then(res => {
            if (res.success) setDatosCrudos(res.data);
            setCargando(false);
        });
    }, []);

    const añosDisponibles = useMemo(() => {
        const unicos = new Set(
            datosCrudos
                .map(d => d.fecha?.substring(0, 4))
                .filter(Boolean)
        );
        return ['Todos', ...Array.from(unicos).sort().reverse()];
    }, [datosCrudos]);

    const datosFiltradosPorAño = useMemo(() => {
        if (year === 'Todos') return datosCrudos;
        return datosCrudos.filter(d => d.fecha?.includes(year));
    }, [datosCrudos, year]);

    const vectoresDisponibles = useMemo(() => {
        const unicos = new Set(datosFiltradosPorAño.map(d => d.vector));
        return ['Todos', ...Array.from(unicos)];
    }, [datosFiltradosPorAño]);

    useEffect(() => {
        if (filtroVector !== 'Todos' && !vectoresDisponibles.includes(filtroVector)) {
            setFiltroVector('Todos');
        }
    }, [year, vectoresDisponibles, filtroVector]);

    const datosFinales = useMemo(() => {
        if (filtroVector === 'Todos') return datosFiltradosPorAño;
        return datosFiltradosPorAño.filter(d => d.vector === filtroVector);
    }, [datosFiltradosPorAño, filtroVector]);

    return (
        <div className="space-y-4 animate-in fade-in duration-500">
            <div className="bg-white p-4 rounded-xl shadow border flex gap-6">
                <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-600 mb-1">Filtrar por Año:</label>
                    <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="border rounded px-3 py-2 bg-gray-50 text-gray-600 outline-blue-200 cursor-pointer"
                    >
                        {añosDisponibles.map(y => <option key={y} value={y as string}>{y}</option>)}
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-600 mb-1">Filtrar por Vector:</label>
                    <select
                        value={filtroVector}
                        onChange={(e) => setFiltroVector(e.target.value)}
                        className="border rounded px-3 py-2 bg-gray-50 text-gray-600 outline-blue-200"
                    >
                        {vectoresDisponibles.map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden h-[600px] relative">
                {cargando ? (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">Cargando base de datos de pacientes...</div>
                ) : (
                    <VectoresMapStrategy data={datosFinales} />
                )}
            </div>
        </div>
    );
}
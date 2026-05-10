'use client';
import { getDatosGarrapatas } from "@/app/(main)/visualizar/actions";
import { useState, useEffect, useMemo } from 'react';
import GarrapatasMap from "./SimpleGarrapatasMap";

export default function EstrategiaGarrapatas() {
    const [datosCrudos, setDatosCrudos] = useState<any[]>([]);
    const [cargando, setCargando] = useState(true);
    const [year, setYear] = useState('Todos');
    const [filtroGarrapata, setFiltroGarrapata] = useState<string>('Todos');

    useEffect(() => {
        getDatosGarrapatas().then(res => {
            if (res.success) {
                setDatosCrudos(res.data);
                console.log("Datos de garrapatas procesados:", res.data);
            }
            setCargando(false);
        });
    }, []);

    const añosDisponibles = useMemo(() => {
        const unicos = new Set(
            datosCrudos
                .map(d => d.fechaRecogida?.substring(0, 4))
                .filter(Boolean)
        );
        return ['Todos', ...Array.from(unicos).sort().reverse()];
    }, [datosCrudos]);

    const datosFiltradosPorAño = useMemo(() => {
        if (year === 'Todos') return datosCrudos;
        return datosCrudos.filter(d => d.fechaRecogida?.includes(year));
    }, [datosCrudos, year]);

    const garrapatasDisponibles = useMemo(() => {
        const unicos = new Set(datosFiltradosPorAño.map(d => d.especie));
        return ['Todos', ...Array.from(unicos)];
    }, [datosFiltradosPorAño]);

    useEffect(() => {
        if (filtroGarrapata !== 'Todos' && !garrapatasDisponibles.includes(filtroGarrapata)) {
            setFiltroGarrapata('Todos');
        }
    }, [year, garrapatasDisponibles, filtroGarrapata]);


    const datosFinales = useMemo(() => {
        if (filtroGarrapata === 'Todos') return datosFiltradosPorAño;
        return datosFiltradosPorAño.filter(d => d.especie === filtroGarrapata);
    }, [datosFiltradosPorAño, filtroGarrapata]);

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
                    <label className="text-sm font-semibold text-gray-600 mb-1">Filtrar por Garrapata:</label>
                    <select
                        value={filtroGarrapata}
                        onChange={(e) => setFiltroGarrapata(e.target.value)}
                        className="border rounded px-3 py-2 bg-gray-50 text-gray-600 outline-blue-200"
                    >
                        {garrapatasDisponibles.map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                </div>
            </div>
            <div className="bg-white rounded-xl shadow overflow-hidden h-[600px] relative">
                {cargando ? (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">Cargando base de datos de pacientes...</div>
                ) : (
                    <GarrapatasMap data={datosFinales} />
                )}
            </div>
        </div>
    );
}
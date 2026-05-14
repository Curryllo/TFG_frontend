import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { getDatosHumanos, getDatosMontireo, getDatosGarrapatas } from "@/app/(main)/visualizar/actions";

const Calor = dynamic(() => import('@/components/HeatMap'), { ssr: false });

export default function EstrategiaCalor() {
    const [datosMonitoreo, setDatosMonitoreo] = useState<any[]>([]);
    const [datosGarrapatas, setDatosGarrapatas] = useState<any[]>([]);

    const [year, setYear] = useState('Todos');
    const [loading, setLoading] = useState(true);

    const [filtroDatos, setFiltroDatos] = useState('monitoreo');

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [resMonitoreo, resGarrapatas] = await Promise.all([
                    getDatosMontireo(),
                    getDatosGarrapatas()
                ]);
                if (resMonitoreo.success) setDatosMonitoreo(resMonitoreo.data);
                if (resGarrapatas.success) setDatosGarrapatas(resGarrapatas.data);
            } catch (error) {
                console.error("Error al cargar datos:", error);
            } finally {
                setLoading(false);
            }
        }
        cargarDatos();
    }, []);

    const datosActivos = useMemo(() => {
        switch (filtroDatos) {
            case 'garrapatas': return datosGarrapatas;
            default: return datosMonitoreo;
        }
    }, [filtroDatos, datosGarrapatas, datosMonitoreo]);

    const añosDisponibles = useMemo(() => {
        const unicos = new Set(
            datosActivos
                .map(d => {
                    const fechaRaw = d.fecha || d.fechaRecogida;
                    return fechaRaw ? String(fechaRaw).substring(0, 4) : null;
                })
                .filter(Boolean)
        );
        return Array.from(unicos).sort().reverse();
    }, [datosActivos]);

    useEffect(() => {
        if (year !== 'Todos' && !añosDisponibles.includes(year)) {
            setYear('Todos');
        }
    }, [filtroDatos, añosDisponibles, year]);

    const datosFinalesParaMapa = useMemo(() => {
        if (year === 'Todos') return datosActivos;

        return datosActivos.filter(d => {
            const fechaRaw = d.fecha || d.fechacaso || d.fechaRecogida;
            return fechaRaw && String(fechaRaw).includes(year);
        });
    }, [datosActivos, year]);

    return (
        <div className="space-y-4 animate-in fade-in duration-500">
            <div className="bg-white flex gap-6 p-4 rounded-xl shadow border flex">
                <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-600 mb-1">Filtrar por Año:</label>
                    <select
                        id="year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="border rounded px-3 py-2 bg-gray-50 text-gray-600 outline-blue-200 cursor-pointer"
                    >
                        <option value="Todos">Todos</option>
                        {añosDisponibles.map(year => (
                            <option key={year} value={year as string}>{year}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-600 mb-1">Datos:</label>
                    <select
                        id="filtroDatos"
                        value={filtroDatos}
                        onChange={(e) => setFiltroDatos(e.target.value)}
                        className="border rounded px-3 py-2 bg-gray-50 text-gray-600 outline-blue-200 cursor-pointer"
                    >
                        <option value="monitoreo">Monitoreo</option>
                        <option value="garrapatas">Garrapatas</option>
                    </select>
                </div>

            </div>
            <div className="bg-white rounded-xl shadow overflow-hidden h-[600px] relative">
                {loading ? (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">Cargando...</div>
                ) : (
                    <Calor data={datosFinalesParaMapa} />
                )}
            </div>
        </div>

    );
}
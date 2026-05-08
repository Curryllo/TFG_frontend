'use client'

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { getDatosHumanos, getDatosMontireo, getDatosGarrapatas } from "@/app/(main)/visualizar/actions";
import ChartGravedadEdad from "@/components/ChartBarrasEdadCasos";
import ChartRelacionAñoSexoCasos from "@/components/ChartRelacionAñoSexoCasos";
import ChartPaisesBarrasCasos from "@/components/ChartPaisesBarrasCasos";
import ChartOrigenPieCasos from "@/components/ChartOrigenPieCasos";
import ChartBarrasEdadPorEnfermedad from '@/components/ChartBarrasEdadCasosPorEnfermedad';
import ChartVectoresBarras from "@/components/ChartVectoresBarras";
import CharVectoresAnillo from "@/components/ChartVectoresAnillo";
import IndicadorVectores from '@/components/IndicadorVectores';
import ChartBarrasGarrapatas from "@/components/ChartBarrasGarrapatas";
import ChartBarrasFechaGarrapatas from "@/components/ChartBarrasFechaGarrapatas";
import ChartDonutEspeciesGarrapatas from "@/components/ChartDonutsEspecieGarrapatas";
import {
    BarSeriesModule,
    CategoryAxisModule,
    LegendModule,
    ModuleRegistry,
    NumberAxisModule,
    PieSeriesModule,
    LineSeriesModule,
    DonutSeriesModule
} from "ag-charts-community";

ModuleRegistry.registerModules([BarSeriesModule, CategoryAxisModule, LegendModule, NumberAxisModule, PieSeriesModule, LineSeriesModule, DonutSeriesModule]);

export default function VisualizacionGraficos() {
    const [datosHumanos, setDatosHumanos] = useState<any[]>([]);
    const [datosMonitoreo, setDatosMonitoreo] = useState<any[]>([]);
    const [datosGarrapatas, setDatosGarrapatas] = useState<any[]>([]);

    const [year, setYear] = useState('Todos');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [resMonitoreo, resHumanos, resGarrapatas] = await Promise.all([
                    getDatosMontireo(),
                    getDatosHumanos(),
                    getDatosGarrapatas()
                ]);

                if (resHumanos.success) setDatosHumanos(resHumanos.data);
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

    const datosHumanosFiltrados = useMemo(() => {
        if (year === 'Todos') return datosHumanos;
        return datosHumanos.filter((d: any) => d.fechacaso?.startsWith(year));
    }, [datosHumanos, year]);

    const datosMonitoreoFiltrados = useMemo(() => {
        if (year === 'Todos') return datosMonitoreo;
        return datosMonitoreo.filter((d: any) => d.fecha?.startsWith(year));
    }, [datosMonitoreo, year]);

    const datosGarrapatasFiltrados = useMemo(() => {
        if (year === 'Todos') return datosGarrapatas;
        return datosGarrapatas.filter((d: any) => d.fechaRecogida?.startsWith(year));
    }, [datosGarrapatas, year]);


    const añosDisponibles = useMemo(() => {
        const todosLosyears = [
            ...datosHumanos.map((d: any) => d.fechacaso?.substring(0, 4)),
            ...datosMonitoreo.map((d: any) => d.fecha?.substring(0, 4)),
            ...datosGarrapatas.map((d: any) => d.fechaRecogida?.substring(0, 4))
        ].filter(Boolean);
        return Array.from(new Set(todosLosyears)).sort();
    }, [datosHumanos, datosMonitoreo, datosGarrapatas]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando datos...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-6xl w-full">
                <Link href="/visualizar" className="block">
                    <div className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        Volver atrás
                    </div>
                </Link>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">Gráficos</h1>
                <p className="text-gray-600 mb-2">Análisis gráfico de los datos de enfermedades vectoriales</p>

                <label htmlFor="year" className="text-sm font-medium text-gray-700 mb-1">Filtrar por año:</label>
                <select
                    id="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-2.5 shadow-sm"
                >
                    <option value="Todos">Todos los años</option>
                    {añosDisponibles.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>


                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-2 my-2">
                    <div className="p-4 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900">Análisis de Casos Humanos</h2>
                    </div>
                    <div className="p-4 border-b w-full">
                        <h3 className="text-lg font-bold text-gray-900">Número de casos por países</h3>
                        <ChartPaisesBarrasCasos data={datosHumanosFiltrados} />
                        <h3 className="text-lg font-bold text-gray-900">Origen de los casos</h3>
                        <ChartOrigenPieCasos data={datosHumanosFiltrados}/>
                        <h3 className="text-lg font-bold text-gray-900">Grupos de edad</h3>
                        <ChartGravedadEdad data={datosHumanosFiltrados}/>
                        <ChartBarrasEdadPorEnfermedad data={datosHumanosFiltrados}/>
                        <h3 className="text-lg font-bold text-gray-900">Relación Año-Sexo</h3>
                        <ChartRelacionAñoSexoCasos />
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-2">
                    <div className="p-4 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900">Análisis de Monitoreo Entomológico</h2>
                    </div>
                    <div className="w-full">
                        <IndicadorVectores data={datosMonitoreoFiltrados}/>
                        <ChartVectoresBarras data={datosMonitoreoFiltrados}/>
                        <CharVectoresAnillo data={datosMonitoreoFiltrados}/>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900">Análisis de Garrapatas</h2>
                    </div>
                    <div className="w-full">
                        <ChartBarrasGarrapatas data={datosGarrapatasFiltrados}/>
                        <ChartBarrasFechaGarrapatas data={datosGarrapatasFiltrados}/>
                        <ChartDonutEspeciesGarrapatas data={datosGarrapatasFiltrados}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
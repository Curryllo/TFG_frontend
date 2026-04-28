'use client'

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getDatosMontireo, getDatosHumanos, getDatosGarrapatas } from "@/app/(main)/visualizar/actions";
import { AgCharts } from "ag-charts-react";
import { useState, useEffect } from "react";
import { AgChartOptions } from "ag-charts-community";
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

                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-2">
                    <div className="p-4 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900">Análisis de Casos Humanos</h2>
                    </div>
                    <div className="p-4 border-b w-full">
                        <h3 className="text-lg font-bold text-gray-900">Número de casos por países</h3>
                        <ChartPaisesBarrasCasos />
                        <h3 className="text-lg font-bold text-gray-900">Origen de los casos</h3>
                        <ChartOrigenPieCasos />
                        <h3 className="text-lg font-bold text-gray-900">Grupos de edad</h3>
                        <ChartGravedadEdad />
                        <ChartBarrasEdadPorEnfermedad />
                        <h3 className="text-lg font-bold text-gray-900">Relación Año-Sexo</h3>
                        <ChartRelacionAñoSexoCasos />
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-2">
                    <div className="p-4 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900">Análisis de Monitoreo Entomológico</h2>
                    </div>
                    <div className="w-full">
                        <IndicadorVectores />
                        <ChartVectoresBarras />
                        <CharVectoresAnillo />
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900">Análisis de Casos Animales</h2>
                    </div>
                    <div className="w-full">
                        {/*
                        <ChartFechaBarrasGarrapatas />
                        <ChartGarrapatasPie />
                        */}
                        <ChartBarrasGarrapatas />
                        <ChartBarrasFechaGarrapatas />
                        <ChartDonutEspeciesGarrapatas />
                    </div>
                </div>
            </div>
            {/*
            <button onClick={async () => {
                const data = await obtenerBoundary(new FormData());
                console.log("VALOR REAL:", JSON.parse(JSON.stringify(data)));
            }} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Obtener Bites
            </button>
             */}
        </div>
    );
}
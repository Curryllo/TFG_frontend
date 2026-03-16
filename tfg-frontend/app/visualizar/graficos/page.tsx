'use client'

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { obtenerBoundary } from "@/app/visualizar/graficos/action";

import { AllCommunityModule, ModuleRegistry } from 'ag-charts-community';
import { AgCharts } from "ag-charts-react";

ModuleRegistry.registerModules([AllCommunityModule]);


export default function VisualizacionGraficos() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full">
                <Link href="/visualizar" className="block">
                    <div className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        Volver atrás
                    </div>
                </Link>

                <div className="max-w-4xl w-full mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Gráficos</h1>
                    <p className="text-gray-600">Análisis gráfico de los datos de enfermedades vectoriales</p>

                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                        <div className="p-4 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900">Monitoreo Entomológico Combinado</h2>
                        </div>
                        <div className="w-full h-[3000px]">
                            <iframe
                                title="Monitoreo Entomológico - Power BI"
                                src="https://app.powerbi.com/view?r=eyJrIjoiZDNjYzgyYjMtMGZkNC00Yjc5LWE2OTItNTMxYTY3YTY0ZjhhIiwidCI6IjNmMjI3ZGJhLWYzZjQtNDU0NC1iMzE0LWM2ZWZkMzBlMGQwMCIsImMiOjh9&pageName=db193415704a5ec5920c&navContentPaneEnabled=false&filterPaneEnabled=false"
                                className="w-full h-full border-0"
                                allowFullScreen={true}
                            />
                        </div>
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
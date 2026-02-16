'use client';

import { useState } from "react";
import { BarChart3, ArrowLeft, Map } from 'lucide-react';

interface DataVisualizationProps {
    onBack: () => void;
}

type ViewType = 'selection' | 'charts' | 'map';

export default function DataVisualization({ onBack }: DataVisualizationProps) {
    const [currentView, setCurrentView] = useState<ViewType>('selection');

    /*
    if (currentView === 'charts') {
        return <ChartsView onBack={() => setCurrentView('selection')} />;
    }

    if (currentView === 'map') {
        return <MapView onBack={() => setCurrentView('selection')} />;
    }
    */


    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Volver atrás
                </button>

                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">
                        Visualización de Datos
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Seleccione el tipo de visualización
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">

                    {/* Botón de visualizar gráficos */}
                    <button
                        onClick={() => setCurrentView('charts')}
                        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 flex flex-col items-center gap-4 group hover:-translate-y-1"
                    >
                        <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                            <BarChart3 className="w-10 h-10 text-purple-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900">Gráficos</h2>
                        <p className="text-gray-600 text-center text-sm">
                            Ver estadísticas y gráficos de los datos
                        </p>
                    </button>

                    {/* Botón de visualizar mapa */}
                    <button
                        onClick={() => setCurrentView('map')}
                        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 flex flex-col items-center gap-4 group hover:-translate-y-1"
                    >
                        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                            <Map className="w-10 h-10 text-indigo-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900">Mapa</h2>
                        <p className="text-gray-600 text-center text-sm">
                            Ver distribución geográfica de casos
                        </p>
                    </button>
                </div>
            </div>
        </div>
    );
}
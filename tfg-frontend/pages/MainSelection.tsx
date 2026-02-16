'use client';

import { useState } from "react";
import { BarChart3, FileText } from 'lucide-react';
//import RegistrationTypeSelection from './RegistrationTypeSelection';
import DataVisualization from './DataVisualization';

type ViewType = 'selection' | 'register' | 'visualize';

export default function MainSelection() {
    const [currentView, setCurrentView] = useState<ViewType>('selection');

    /*
    if (currentView === 'register') {
        return <RegistrationTypeSelection onBack={() => setCurrentView('selection')} />;
    }
    */

    if (currentView === 'visualize') {
        return <DataVisualization onBack={() => setCurrentView('selection')} />;
    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">
                        Sistema de Monitoreo de Enfermedades Vectoriales
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Seleccione una opción
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">

                    {/* Botón de visualizar datos */}
                    <button
                        onClick={() => setCurrentView('visualize')}
                        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 flex flex-col items-center gap-4 group hover:-translate-y-1"
                    >
                        <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                            <BarChart3 className="w-10 h-10 text-purple-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900">Visualizar datos</h2>
                        <p className="text-gray-600 text-center text-sm">
                            Ver gráficos y mapas de los casos registrados
                        </p>
                    </button>

                    {/* Botón de registrar datos */}
                    <button
                        onClick={() => setCurrentView('register')}
                        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 flex flex-col items-center gap-4 group hover:-translate-y-1"
                    >
                        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                            <FileText className="w-10 h-10 text-blue-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900">Registrar datos</h2>
                        <p className="text-gray-600 text-center text-sm">
                            Registrar nuevos casos de enfermedades vectoriales
                        </p>
                    </button>
                </div>
            </div>
        </div>
    );
}

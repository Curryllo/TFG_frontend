'use client'

import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft, Activity, Bug } from 'lucide-react';
import EstrategiaHumanos from '@/components/EstrategiaHumanos';
import EstrategiaMonitoreo from '@/components/EstrategiaMonitoreo';




type TipoEstrategia = 'humanos' | 'vectores';

export default function VisualizacionMapas() {
    const [estrategia, setEstrategia] = useState<TipoEstrategia>('humanos');


    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto space-y-6">
                <Link href="/visualizar" className="block">
                    <div className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        Volver atrás
                    </div>
                </Link>

                <div className="flex justify-between items-end">
                    <h1 className="text-3xl font-bold text-gray-900">Mapas Disponibles</h1>
                    
                    {/* SELECTOR DE ESTRATEGIA */}
                    <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-200">
                        <button
                            onClick={() => setEstrategia('humanos')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
                                estrategia === 'humanos' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:bg-gray-100'
                            }`}
                        >
                            <Activity className="w-4 h-4" />
                            Casos Humanos
                        </button>
                        <button
                            onClick={() => setEstrategia('vectores')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
                                estrategia === 'vectores' ? 'bg-teal-100 text-teal-700' : 'text-gray-500 hover:bg-gray-100'
                            }`}
                        >
                            <Bug className="w-4 h-4" />
                            Monitoreo Entomológico
                        </button>
                    </div>
                </div>

                {/* RENDERIZADO CONDICIONAL BASADO EN LA ESTRATEGIA */}
                <div className="mt-6">
                    {estrategia === 'humanos' && <EstrategiaHumanos />}
                    {estrategia === 'vectores' && <EstrategiaMonitoreo />}
                </div>
            </div>
        </div>
    );
}
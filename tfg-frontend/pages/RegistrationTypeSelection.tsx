'use client';

import { useState } from "react";
import { ArrowLeft, UsersRound, Bug, Bone } from 'lucide-react';
import HumanCaseForm from "./HumanCaseForm";

interface RegistrationTypeSelectionProps {
    onBack: () => void;
}

type RegistrationType = 'selection' | 'humans' | 'monitoring' | 'animals';

export default function RegistrationTypeSelection({ onBack }: RegistrationTypeSelectionProps) {
    const [activeRegistration, setActiveRegistration] = useState<RegistrationType>('selection');

    if(activeRegistration === 'humans') {
        return <HumanCaseForm onBack={() => setActiveRegistration('selection')} />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Volver atrás
                </button>

                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">
                        Registrar Datos
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Seleccione el tipo de datos que desea registrar
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Botón de casos humanos */}
                    <button
                        onClick={() => setActiveRegistration('humans')}
                        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 flex flex-col items-center gap-4 group hover:-translate-y-1"
                    >
                        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                            <UsersRound className="w-10 h-10 text-blue-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900">Casos Humanos</h2>
                        <p className="text-gray-600 text-center text-sm">
                            Registrar casos de enfermedades vectoriales en humanos
                        </p>
                    </button>

                    {/* Botón de monitoreo */}
                    <button
                        onClick={() => setActiveRegistration('monitoring')}
                        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 flex flex-col items-center gap-4 group hover:-translate-y-1"
                    >
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                            <Bug className="w-10 h-10 text-green-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900">Monitoreo Entomológico</h2>
                        <p className="text-gray-600 text-center text-sm">
                            Registrar datos de vigilancia de vectores
                        </p>
                    </button>

                    {/* Botón de animales */}
                    <button
                        onClick={() => setActiveRegistration('animals')}
                        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 flex flex-col items-center gap-4 group hover:-translate-y-1"
                    >
                        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                            <Bone className="w-10 h-10 text-amber-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900">Datos de Animales</h2>
                        <p className="text-gray-600 text-center text-sm">
                            Registrar casos de animales infectados
                        </p>
                    </button>
                </div>
            </div>
        </div>
    );
}
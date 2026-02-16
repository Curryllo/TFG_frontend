'use client';

import { useState } from "react";
import { ArrowLeft } from 'lucide-react';

interface HumanCaseFormProps {
    onBack: () => void;
}

export default function HumanCaseForm({ onBack }: HumanCaseFormProps) {



    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="max-w-3xl mx-auto">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Volver atrás
                </button>

                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Registrar Caso Humano
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Ingrese los detalles del caso de enfermedad
                        vectorial
                    </p>
                </div>
                </div>
            </div>
            );
}

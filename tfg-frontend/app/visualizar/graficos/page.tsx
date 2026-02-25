import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

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

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Gráficos Estadísticos</h1>
                    <p className="text-gray-600">Análisis visual de los datos de enfermedades vectoriales</p>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Información Referente a Casos Humanos</h2>
                </div>
            </div>
        </div>
    );
}
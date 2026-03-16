import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function VisualizacionMapa() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-6xl w-full">
                <Link href="/visualizar" className="block">
                    <div className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        Volver atrás
                    </div>
                </Link>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Mapas</h1>
                <p className="text-gray-600">Análisis visual de los datos de enfermedades vectoriales</p>

                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900">Monitoreo Entomológico Combinado</h2>
                    </div>
                    <div className="w-full h-[3000px]">
                        <iframe
                            title="Monitoreo Entomológico - Power BI"
                            src="https://app.powerbi.com/view?r=eyJrIjoiZDNjYzgyYjMtMGZkNC00Yjc5LWE2OTItNTMxYTY3YTY0ZjhhIiwidCI6IjNmMjI3ZGJhLWYzZjQtNDU0NC1iMzE0LWM2ZWZkMzBlMGQwMCIsImMiOjh9&pageName=463651d88c758d8a0859&navContentPaneEnabled=false&filterPaneEnabled=false"
                            className="w-full h-full border-0"
                            allowFullScreen={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
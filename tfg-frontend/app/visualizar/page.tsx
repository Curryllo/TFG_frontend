import Link from 'next/link';
import { BarChart3, ArrowLeft, Map } from 'lucide-react';

export default function DataVisualization() {


    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full">
                <Link href="/" className="block">
                    <div className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        Volver atrás
                    </div>
                </Link>

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
                    <Link href="/visualizar/graficos" className="block">
                        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 flex flex-col items-center gap-4 group hover:-translate-y-1">
                            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                                <BarChart3 className="w-10 h-10 text-purple-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900">Gráficos</h2>
                            <p className="text-gray-600 text-center text-sm">
                                Ver estadísticas y gráficos de los datos
                            </p>
                        </div>
                    </Link>

                    {/* Botón de visualizar mapa */}
                    <Link href="/visualizar/mapas" className="block">
                        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 flex flex-col items-center gap-4 group hover:-translate-y-1">
                            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                                <Map className="w-10 h-10 text-indigo-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900">Mapa</h2>
                            <p className="text-gray-600 text-center text-sm">
                                Ver distribución geográfica de casos
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
import Link from 'next/link';
import { BarChart3, FileText } from 'lucide-react';

export default function MainSelection() {

    return (
        <div className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
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
                    <Link href="/visualizar" className="block">
                        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 flex flex-col items-center gap-4 group hover:-translate-y-1 cursor-pointer">
                            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                                <BarChart3 className="w-10 h-10 text-purple-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900">Consultar datos</h2>
                            <p className="text-gray-600 text-center text-sm">
                                Ver gráficos y mapas de los casos registrados
                            </p>
                        </div>
                    </Link>


                    {/* Botón de registrar datos */}
                    <Link href="/registrar" className="block">
                        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 flex flex-col items-center gap-4 group hover:-translate-y-1 cursor-pointer">
                            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                <FileText className="w-10 h-10 text-blue-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900">Registrar datos</h2>
                            <p className="text-gray-600 text-center text-sm">
                                Registrar nuevos casos de enfermedades vectoriales
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

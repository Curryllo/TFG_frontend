export default function MonitoreoForm() {
    return (
        <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Monitoreo Entomológico
            </h1>
            <p className="text-gray-600 mb-8">
                Ingrese datos de vigilancia de vectores
            </p>

            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Sitio */}
                    <div>
                        <label htmlFor="sitio" className="block text-sm font-medium text-gray-600 mb-1">
                            Sitio *
                        </label>
                        <input
                            type="text"
                            id="sitio"
                            name="sitio"
                            required
                            className="w-full px-4 py-2 text-gray-600 font-medium border border-gray-300 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-solid focus:outline-teal-200 transition-colors"
                        />
                    </div>

                    {/* Género */}
                    <div>
                        <label htmlFor="genero" className="block text-sm font-medium text-gray-600 mb-1">
                            Género Vector *
                        </label>
                        <input
                            type="text"
                            id="genero"
                            name="genero"
                            required
                            className="w-full px-4 py-2 text-gray-600 font-medium border border-gray-300 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-solid focus:outline-teal-200 transition-colors"
                        />
                    </div>

                    {/* Especie */}
                    <div>
                        <label htmlFor="especieVegetacion" className="block text-sm font-medium text-gray-600 mb-1">
                            Especie Vegetación
                        </label>
                        <input
                            type="text"
                            id="especieVegetacion"
                            name="especieVegetacion"
                            className="w-full px-4 py-2 text-gray-600 font-medium border border-gray-300 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-solid focus:outline-teal-200 transition-colors"
                        />
                    </div>

                    {/* Sexo */}
                    <div>
                        <label htmlFor="sexo" className="block text-sm font-medium text-gray-600 mb-1">
                            Sexo *
                        </label>
                        <select
                            id="sexo"
                            name="sexo"
                            required
                            className="w-full px-4 py-2 text-gray-600 font-medium border border-gray-300 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-solid focus:outline-teal-200 transition-colors"
                        >
                            <option value="H" className="text-gray-600">Hembra</option>
                            <option value="M" className="text-gray-600">Macho</option>
                        </select>
                    </div>
                    
                    {/* Fecha */}
                    <div>
                        <label htmlFor="fecha" className="block text-sm font-medium text-gray-600 mb-1">
                            Fecha
                        </label>
                        <input
                            type="date"
                            id="fecha"
                            name="fecha"
                            className="w-full px-4 py-2 text-gray-600 font-medium border border-gray-300 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-solid focus:outline-teal-200 transition-colors"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}

import { useState, useEffect } from 'react';
import { AgCharts } from 'ag-charts-react';
import { AgChartOptions } from 'ag-charts-community';
import { getDatosGarrapatas } from "@/app/(main)/visualizar/actions";

const ChartBarrasGarrapatas = () => {
    const [datosCrudos, setDatosCrudos] = useState<any[]>([]);
    const [modoPorcentaje, setModoPorcentaje] = useState(false);
    
    // 1. Ya no guardamos 'options' en un estado, solo los datos procesados
    const [datosProcesados, setDatosProcesados] = useState<any[]>([]);

    useEffect(() => {
        console.log("🚀 El componente Garrapatas se acaba de montar de cero");
        const cargarDatos = async () => {
            try {
                const respuesta = await getDatosGarrapatas();
                console.log("Datos crudos de garrapatas:", respuesta);
                if (respuesta.success && respuesta.data) {
                    setDatosCrudos(respuesta.data);
                }
            } catch (error) {
                console.error("Error al cargar los datos:", error);
            }
        };
        cargarDatos();
    }, []);

    useEffect(() => {
        if (datosCrudos.length === 0) return;

        const agrupados = datosCrudos.reduce((acc, caso) => {
            const especie = caso.especie ? caso.especie.trim() : 'Desconocida';
            if (!acc[especie]) {
                acc[especie] = { especie: especie, humano: 0, animal: 0 };
            }
            
            if (caso.enHumano.trim() === 'Y') acc[especie].humano += 1;
            if (caso.enAnimal !== null && caso.enAnimal.trim() !== '') acc[especie].animal += 1;
            return acc;
        }, {} as Record<string, { especie: string, humano: number, animal: number }>);

        const datosFinales = Object.values(agrupados) as { especie: string; humano: number; animal: number }[];
        datosFinales.sort((a, b) => (b.humano + b.animal) - (a.humano + a.animal));

        // 2. Solo guardamos los datos listos en el estado
        setDatosProcesados(datosFinales);
    }, [datosCrudos]);

    // 3. Construimos las opciones de forma dinámica justo antes del return.
    // Al declararlo como tipo AgChartOptions aquí, TypeScript es feliz.
    const chartOptions: AgChartOptions = {
        title: { text: "Especies de garrapatas recogidas" },
        data: datosProcesados,
        axes: [
            { type: "category", position: "bottom", title: { text: "Especie" } },
            { 
                type: "number", 
                position: "left", 
                title: { text: modoPorcentaje ? "Porcentaje (%)" : "Cantidad Absoluta" },
                label: { formatter: (params: any) => modoPorcentaje ? `${params.value}%` : String(params.value) }
            }
        ],
        series: [
            {
                type: "bar",
                xKey: "especie",
                yKey: "humano",
                yName: "En Humanos",
                stacked: true,
                normalizedTo: modoPorcentaje ? 100 : undefined,
                fill: "#ef4444", 
                strokeWidth: 0
            },
            {
                type: "bar",
                xKey: "especie",
                yKey: "animal",
                yName: "En Animales",
                stacked: true,
                normalizedTo: modoPorcentaje ? 100 : undefined,
                fill: "#3b82f6", 
                strokeWidth: 0
            }
        ]
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200 mx-4 my-2">
                <button 
                    onClick={() => setModoPorcentaje(!modoPorcentaje)}
                    className='p-2 border border-gray-300 rounded-lg outline-none bg-white text-gray-800'
                >
                    Cambiar a {modoPorcentaje ? 'Valores Absolutos' : 'Porcentajes (%)'}
                </button>
            
            <div>
                <AgCharts options={chartOptions} />
            </div>
        </div>
    );
};

export default ChartBarrasGarrapatas;
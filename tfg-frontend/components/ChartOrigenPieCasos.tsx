import { useState, useEffect } from 'react';
import { AgCharts } from 'ag-charts-react';
import { AgChartOptions } from 'ag-charts-community';
import { getDatosHumanos } from "@/app/visualizar/graficos/action";

const ChartOrigenPieCasos = () => {
    const [datosCrudos, setDatosCrudos] = useState<any[]>([]);
    const [enfermedades, setEnfermedades] = useState<string[]>([]);
    const [enfermedadSeleccionada, setEnfermedadSeleccionada] = useState<string>('Todas');


    const [options, setOptions] = useState<AgChartOptions>({
        title: {
            text: "Origen de los casos registrados",
        },
        subtitle: {
            text: "Autóctonos (España) vs Importados",
        },
        data: [],
        series: [
            {
                type: "pie",
                angleKey: "numero",
                legendItemKey: "origen",
            },
        ],
    });

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const respuesta = await getDatosHumanos();

                if (respuesta.success && respuesta.data) {
                    setDatosCrudos(respuesta.data);

                    const listaEnfermedades = respuesta.data.map((caso: any) => caso.enfermedad || 'Desconocida');
                    const enfermedadesUnicas = Array.from(new Set(listaEnfermedades)) as string[];
                    setEnfermedades(enfermedadesUnicas);

                    console.log("Enfermedades cargadas de forma única:", enfermedadesUnicas);

                } else {
                    console.warn("No se pudieron cargar los datos de monitoreo o la respuesta no fue exitosa.", respuesta);
                }
            } catch (error) {
                console.error("Error al cargar los datos de monitoreo:", error);
            }
        };

        cargarDatos();
    }, []);

    useEffect(() => {
        if (datosCrudos.length === 0) return;

        const datosFiltrados = enfermedadSeleccionada === 'Todas'
            ? datosCrudos
            : datosCrudos.filter(caso => (caso.enfermedad || 'Desconocida') === enfermedadSeleccionada);

        const conteoOrigen = datosFiltrados.reduce((acumulador: any, caso: any) => {
            // Limpiamos espacios y verificamos si es España
            const paisLimpio = caso.pais ? caso.pais.trim() : "";
            const categoria = paisLimpio === "España" ? "Autóctono" : "Importado";

            // Sumamos al contador de esa categoría
            acumulador[categoria] = (acumulador[categoria] || 0) + 1;

            return acumulador;
        }, {});


        const datosParaGrafica = Object.keys(conteoOrigen).map(clave => ({
            origen: clave,
            numero: conteoOrigen[clave]
        }));

        setOptions((opcionesPrevias) => ({
            ...opcionesPrevias,
            data: datosParaGrafica
        }));

    }, [datosCrudos, enfermedadSeleccionada]);

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="px-4 pt-4 flex items-center gap-3">
                <label htmlFor="selector-enfermedad" className="font-semibold text-gray-700">
                    Filtrar por enfermedad:
                </label>
                <select
                    id="selector-enfermedad"
                    value={enfermedadSeleccionada}
                    onChange={(e) => setEnfermedadSeleccionada(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-gray-800"
                >
                    <option value="Todas">Todas las enfermedades</option>
                    {enfermedades.map((enf) => (
                        <option key={enf} value={enf}>
                            {enf}
                        </option>
                    ))}
                </select>
            </div>
            <AgCharts options={options} />
        </div>
    );
};

export default ChartOrigenPieCasos;

import { useMemo } from 'react';
import { AgCharts } from 'ag-charts-react';
import { AgChartOptions } from 'ag-charts-community';

const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

const ChartBarrasFechaGarrapatas = ({ data }: { data: any[] }) => {

    const chartOptions = useMemo<AgChartOptions>(() => {
        if (!data || data.length === 0) {
            return {
                title: { text: "Garrapatas recogidas por mes" },
                data: [],
                series: [{ type: "bar", xKey: "mes", yKey: "cantidad" }]
            } as unknown as AgChartOptions; // <--- CAMBIO AQUÍ
        }

        const agrupados = data.reduce((acc: any, caso: any) => {
            if (!caso.fechaRecogida) return acc;

            const fecha = new Date(caso.fechaRecogida);
            if (isNaN(fecha.getTime())) return acc;

            const clave = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}`;
            const etiqueta = `${MESES[fecha.getMonth()]} ${fecha.getFullYear()}`;

            if (!acc[clave]) acc[clave] = { clave, mes: etiqueta, cantidad: 0 };
            acc[clave].cantidad += 1;

            return acc;
        }, {});

        const datosFinales = Object.values(agrupados)
            .sort((a: any, b: any) => a.clave.localeCompare(b.clave));

        return {
            title: { text: "Garrapatas recogidas por mes" },
            data: datosFinales,
            axes: [
                { type: "category", position: "bottom", title: { text: "Mes" } },
                { type: "number", position: "left", title: { text: "Nº de recogidas" } }
            ],
            series: [
                {
                    type: "bar",
                    xKey: "mes",
                    yKey: "cantidad",
                    yName: "Garrapatas recogidas",
                    fill: "#14b8a6",
                    strokeWidth: 0
                }
            ]
        } as unknown as AgChartOptions;
    }, [data]);

    return (
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200 mx-4 my-2">
            <div>
                <AgCharts options={chartOptions} />
            </div>
        </div>
    );
};

export default ChartBarrasFechaGarrapatas;
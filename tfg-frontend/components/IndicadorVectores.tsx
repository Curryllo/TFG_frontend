'use client';

import { useMemo } from 'react';

const IndicadorVectores = ({ data }: { data: any[] }) => {

    const { totalVectores, totalInfectados } = useMemo(() => {
        if (!data || data.length === 0) {
            return { totalVectores: 0, totalInfectados: 0 };
        }

        const vectores = data.reduce((total: number, item: any) => {
            return total + (Number(item.numero) || 0);
        }, 0);

        const infectados = data.reduce((total: number, item: any) => {
            const esPositivo = item.enfermedad && item.enfermedad.trim() !== '';
            return esPositivo ? total + (Number(item.numero) || 0) : total;
        }, 0);

        return { totalVectores: vectores, totalInfectados: infectados };
    }, [data]);

    return (
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200 mx-4">
            <div className="">
                <div className="flex justify-between items-center pb-4 border-b">
                    <h2 className="text-lg font-medium text-gray-600">Total Capturados</h2>
                    <span className="text-3xl font-bold text-teal-600">{totalVectores}</span>
                </div>

                <div className="flex justify-between items-center pt-2">
                    <h3 className="text-lg font-medium text-gray-600">Total Infectados</h3>
                    <span className="text-3xl font-bold text-red-500">{totalInfectados}</span>
                </div>
            </div>
        </div>
    );
};

export default IndicadorVectores;


'use client';

import { useState, useEffect } from 'react';
import { getDatosMontireo } from "@/app/visualizar/actions";

const IndicadorVectores = () => {
    const [totalVectores, setTotalVectores] = useState<number>(0);
    const [totalInfectados, setTotalInfectados] = useState<number>(0);
    const [cargando, setCargando] = useState<boolean>(true); // Útil para mostrar un "Cargando..."

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const respuesta = await getDatosMontireo();

                if (respuesta.success && respuesta.data) {
                    const totalVectores = respuesta.data.reduce((total: number, item: any) => {
                        return total + (Number(item.numero) || 0);
                    }, 0);

                    const infectados = respuesta.data.reduce((total: number, item: any) => {
                        const esPositivo = item.enfermedad && item.enfermedad.trim() !== '';
                        return esPositivo ? total + (Number(item.numero) || 0) : total;
                    }, 0);

                    setTotalVectores(totalVectores);
                    setTotalInfectados(infectados);

                    setCargando(false);

                    console.log("Total de vectores obtenidos:", totalVectores);
                } else {
                    console.warn("No se pudieron cargar los datos de monitoreo o la respuesta no fue exitosa.", respuesta);
                }
            } catch (error) {
                console.error("Error al cargar los datos de monitoreo:", error);
            }
        };

        cargarDatos();
    }, []);

    return (
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200 mx-4">
            {cargando ? (
                <div className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                </div>
            ) : (
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
            )}
        </div>
    );
};

export default IndicadorVectores;


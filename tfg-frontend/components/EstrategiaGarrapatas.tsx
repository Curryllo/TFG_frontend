'use client';
import { getDatosGarrapatas } from "@/app/visualizar/actions";
import { useState, useEffect, useMemo } from 'react';
import GarrapatasMap from "./SimpleGarrapatasMap";

export default function EstrategiaGarrapatas() {
    const [datosCrudos, setDatosCrudos] = useState<any[]>([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        getDatosGarrapatas().then(res => {
            if (res.success){
                setDatosCrudos(res.data);
                console.log("Datos de garrapatas procesados:", res.data);
            } 
            setCargando(false);
        });
    }, []);

    return (
        <div className="space-y-4 animate-in fade-in duration-500">
            <div className="bg-white rounded-xl shadow overflow-hidden h-[600px] relative">
                {cargando ? (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">Cargando base de datos de pacientes...</div>
                ) : (
                    <GarrapatasMap data={datosCrudos} />
                )}
            </div>
        </div>
    );
}
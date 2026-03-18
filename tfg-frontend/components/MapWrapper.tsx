// components/MapWrapper.tsx
'use client'

import dynamic from 'next/dynamic';

// Aquí SÍ podemos usar ssr: false porque estamos en un 'use client'
const VectorMap = dynamic(() => import('./VectorMap'), { 
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-500 animate-pulse">
            Cargando mapa interactivo...
        </div>
    )
});

interface MapWrapperProps {
    data: any[];
}

export default function MapWrapper({ data }: MapWrapperProps) {
    return <VectorMap data={data} />;
}
// types/map.ts
export interface DatoVector {
    latitud: number;
    longitud: number;
    numero: number;
    genero: string | null;
    vector: string;
    fecha: string;
    lugarRecogida: string;
}

// ESTA ES LA ESTRATEGIA: Todo mapa debe aceptar estas props
export interface MapVisualizationStrategyProps {
    data: DatoVector[];
}
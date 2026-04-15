// types/map.ts
export interface DatoVectorHumano {
    edad: number;
    sexo: string;
    fecha: Date;
    enfermedad: string;
    pais: string;
    provincia: string;
    municipio: string;
    defuncion: boolean;
    hospitalizado: boolean;
}

// ESTA ES LA ESTRATEGIA: Todo mapa debe aceptar estas props
export interface MapVisualizationStrategyProps {
    data: DatoVectorHumano[];
}
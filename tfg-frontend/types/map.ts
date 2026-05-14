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

export interface MapVisualizationStrategyProps {
    data: DatoVectorHumano[];
}
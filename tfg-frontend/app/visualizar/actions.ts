'use server';
import { unstable_noStore as noStore } from 'next/cache';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import Papa from "papaparse";

const s3Client = new S3Client({
    endpoint: "http://127.0.0.1:9000",
    region: "us-east-1",
    credentials: {
        accessKeyId: "root",
        secretAccessKey: "miniopassword",
    },
    forcePathStyle: true,
});

export async function getDatosMontireo() {
    noStore();
    try {
        const command = new GetObjectCommand({
            Bucket: "tfg-data-lake",
            Key: "datosLimpios.csv",
        });

        const response = await s3Client.send(command);
        const str = await response.Body?.transformToString();

        if (!str) throw new Error("Archivo CSV vacío o no encontrado");

        // Parseamos el CSV a JSON
        const parsed = Papa.parse(str, {
            header: true, // Usa la primera fila como claves del JSON
            dynamicTyping: true, // Convierte números automáticamente
            skipEmptyLines: true,
        });

        const parseCoordenada = (valor: any): number => {
            if (typeof valor === 'number') return valor;
            if (typeof valor === 'string') {
                // Cambiamos la coma por el punto y lo convertimos a número decimal
                const parseado = parseFloat(valor.replace(',', '.'));
                return isNaN(parseado) ? 0 : parseado;
            }
            return 0;
        };

        const datosLimpios = parsed.data.map((item: any) => ({
            latitud: parseCoordenada(item.latitud),
            longitud: parseCoordenada(item.longitud),
            numero: item.numero || 1,
            genero: item.genero || null,
            vector: item.vector || 'Desconocido',
            fecha: item.fecha ? item.fecha.split(' ')[0].split('T')[0] : '',
            lugarRecogida: item.lugarRecogida || 'Desconocido',
            enfermedad: item.enfermedad || ''
        }));
        
        //console.log("Datos monitoreo procesados:", datosLimpios);
        return { success: true, data: datosLimpios };
    } catch (error) {
        console.error("Error leyendo de MinIO:", error);
        return { success: false, data: [] };
    }

}

export async function getDatosHumanos() {
    noStore();
    try {
        const command = new GetObjectCommand({
            Bucket: "tfg-data-lake",
            Key: "datosLimpiosHumanos.csv",
        });

        const response = await s3Client.send(command);
        const str = await response.Body?.transformToString();

        if (!str) throw new Error("Archivo CSV vacío o no encontrado");

        // Parseamos el CSV a JSON
        const parsed = Papa.parse(str, {
            header: true, // Usa la primera fila como claves del JSON
            dynamicTyping: true, // Convierte números automáticamente
            skipEmptyLines: true,
        });


        const datosLimpios = parsed.data.map((item: any) => ({
            edad: item.edad || null,
            sexo: item.sexo || null,
            fechacaso: item.fechacaso ? item.fechacaso.split(' ')[0].split('T')[0] : '',
            enfermedad: item.enfermedad || 'Desconocida',
            pais: item.pais || 'Desconocido',
            provinciaResidencia: item.provinciaresidencia || 'Desconocida',
            municipioResidencia: item.municipioresidencia || 'Desconocida',
            defuncion: item.defuncion || 'No',
            hospitalizado: item.casohospitalizado || 'No'
        }));

        //console.log("Datos humanos procesados:", datosLimpios);
        return { success: true, data: datosLimpios };
    } catch (error) {
        console.error("Error leyendo de MinIO:", error);
        return { success: false, data: [] };
    }

}

export async function getDatosGarrapatas() {
    noStore();
    try {
        const command = new GetObjectCommand({
            Bucket: "tfg-data-lake",
            Key: "datosLimpiosGarrapatas.csv",
        });

        const response = await s3Client.send(command);
        const str = await response.Body?.transformToString();

        if (!str) throw new Error("Archivo CSV vacío o no encontrado");

        const parsed = Papa.parse(str, {
            header: true, // Usa la primera fila como claves del JSON
            dynamicTyping: true, // Convierte números automáticamente
            skipEmptyLines: true,
        });

        const parseCoordenada = (valor: any): number => {
            if (typeof valor === 'number') return valor;
            if (typeof valor === 'string') {
                // Cambiamos la coma por el punto y lo convertimos a número decimal
                const parseado = parseFloat(valor.replace(',', '.'));
                return isNaN(parseado) ? 0 : parseado;
            }
            return 0;
        };


        const datosLimpios = parsed.data.map((item: any) => ({
            latitud: parseCoordenada(item.latitud),
            longitud: parseCoordenada(item.longitud),
            municipioRecogida: item.municipiorecogida || 'Desconocido',
            especie: item.especie || 'Desconicida',
            fechaRecogida: item.fecharecogida ? item.fecharecogida.split(' ')[0].split('T')[0] : '',
            enHumano: item.enhumano || 'No',
            enAnimal: item.animal || 'Desconocido'
        }));
        
        console.log("Datos garrapatas procesados:", datosLimpios);
        return { success: true, data: datosLimpios };

    } catch (error) {
        console.error("Error leyendo de MinIO:", error);
        return { success: false, data: [] };
    }
}
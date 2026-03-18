'use server'

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

export async function getDatosMinio() {
    try {
        const command = new GetObjectCommand({
            Bucket: "tfg-data-lake", // El nombre de tu bucket
            Key: "datosLimpios.csv", // El nombre del archivo de tu ETL
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

        // Mapeamos para asegurar la estructura (ajusta los nombres según tu CSV real)
        const datosLimpios = parsed.data.map((item: any) => ({
            latitud: parseCoordenada(item.latitud),
            longitud: parseCoordenada(item.longitud),
            numero: item.numero || 1,
            genero: item.genero || null,
            vector: item.vector || 'Desconocido',
            fecha: item.fecha || '',
            lugarRecogida: item.lugarRecogida || 'Desconocido'
        }));

        return { success: true, data: datosLimpios };
    } catch (error) {
        console.error("Error leyendo de MinIO:", error);
        return { success: false, data: [] };
    }
}
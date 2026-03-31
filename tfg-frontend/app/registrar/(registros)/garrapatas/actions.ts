'use server'
import { revalidatePath } from 'next/cache';

export async function postGarrapatas(prevState: any, data: FormData) {
    console.log('Datos a enviar: ', data);
    
    const municipio = data.get('municipio');
    const especie = data.get('especie');
    const fecha = data.get('fechaRecogida');
    const enHumano = data.get('enHumano') === 'on';
    const animal = data.get('enAnimal');

    const response = await fetch('http://172.31.245.33:8080/api/formGarrapatas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            municipio,
            especie,
            fecha,
            enHumano,
            animal
        }),
    });

    if(!response.ok) {
        return { success: false, message: `Error del servidor: ${response.status}` };
    }
    const result = await response.json();
    revalidatePath('/visualizar/mapas');

    return { success: true, data: result };
}
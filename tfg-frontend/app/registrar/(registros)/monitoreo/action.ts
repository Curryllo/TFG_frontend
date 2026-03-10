'use server'

export async function postMonitoreo(prevState: any, data: FormData) {
    const lugarRecogida = data.get('lugar');
    const latitud = data.get('latitud') ? Number(data.get('latitud')) : null;
    const longitud = data.get('longitud') ? Number(data.get('longitud')) : null;
    const vector = data.get('vector');
    const enfermedad = data.get('enfermedad');
    const genero = data.get('genero');
    const fecha = data.get('fecha');
    const numero = data.get('numero') ? Number(data.get('numero')) : null;
    

    const response = await fetch('http://172.31.245.33:8080/api/formMonitoreo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            lugarRecogida,
            latitud,
            longitud,
            vector,
            enfermedad,
            genero,
            fecha,
            numero
        }),
    });

    if(!response.ok) {
        return { success: false, message: `Error del servidor: ${response.status}` };
    }
    const result = await response.json();

    return { success: true, data: result };
}
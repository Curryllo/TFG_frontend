'use server'

export async function postHumanos(prevState: any, data: FormData) {
    const edad = Number(data.get('edad'));
    const sexo = data.get('sexo');
    const fechaInicioSintomas = data.get('fechaInicioSintomas');
    
    const municipioCaso = data.get('municipioCaso') ? Number(data.get('municipioCaso')) : null;
    const municipioResidencia = data.get('municipioResidencia') ? Number(data.get('municipioResidencia')) : null;
    const municipioDeclarante = data.get('municipioDeclarante') ? Number(data.get('municipioDeclarante')) : null;
    
    const defuncion = data.get('defuncion') === 'on';
    const casoHospitalizado = data.get('casoHospitalizado') === 'on';

    const response = await fetch('http://172.31.245.33:8080/api/formHumanos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            edad,
            sexo,
            fechaInicioSintomas,
            municipioCaso,
            municipioResidencia,
            municipioDeclarante,
            defuncion,
            casoHospitalizado
        }),
    });

    if(!response.ok) {
        return { success: false, message: `Error del servidor: ${response.status}` };
    }
    const result = await response.json();

    return { success: true, data: result };
}
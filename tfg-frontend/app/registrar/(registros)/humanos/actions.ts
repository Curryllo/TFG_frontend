'use server'

export async function postHumanos(prevState: any, data: FormData) {
    const edad = Number(data.get('edad'));
    const sexo = data.get('sexo');
    const fechaCaso = data.get('fechaCaso');
    
    const enfermedad = data.get('enfermedad');
    const pais = data.get('pais');

    const provinciaResidencia = data.get('provinciaResidencia');
    const municipioResidencia = data.get('municipioResidencia');
    
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
            fechaCaso,
            enfermedad,
            pais,
            provinciaResidencia,
            municipioResidencia,
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
'use server'

export async function postHumanos(data: FormData) {
    const edad = data.get('edad');
    const sexo = data.get('sexo');
    const fechaInicioSintomas = data.get('fechaInicioSintomas');
    const municipioCaso = data.get('municipioCaso');
    const municipioResidencia = data.get('municipioResidencia');
    const municipioDeclarante = data.get('municipioDeclarante');
    const defuncion = data.get('defuncion');
    const casoHospitalizado = data.get('casoHospitalizado');

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
    const result = await response.json();
    return result;
}
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from 'react';
import Papa from 'papaparse';
import { peticionAutenticada } from "@/services/api";
import { revalidarMapas, revalidarGraficos } from '@/app/(main)/registrar/actions';

interface DropZoneProp {
    tipo: 'garrapatas' | 'humanos' | 'vectores';
}

export default function DropZone({ tipo }: DropZoneProp) {
    const [datosPreparados, setDatosPreparados] = useState<any[]>([]);
    const [mostrarPopUp, setMostrarPopUp] = useState(false);
    const [subiendo, setSubiendo] = useState(false);

    const baseStyle = {
        flex: 1,
        alignItems: 'center',
        padding: '20px',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#eeeeee',
        borderStyle: 'dashed',
        backgroundColor: 'white',
        color: '#bdbdbd',
        outline: 'none',
        transition: 'border .24s ease-in-out'
    };

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const archivo = acceptedFiles[0];
        if (!archivo) return;

        if (tipo === 'garrapatas') {
            var columnasEspecieVistas = 0;

            Papa.parse(archivo, {
                header: true,
                dynamicTyping: true,
                skipEmptyLines: true,
                encoding: "ISO-8859-1",
                transformHeader: (header) => {
                    let headerLimpio = header.trim().toLowerCase();

                    if (headerLimpio === "especie") {
                        columnasEspecieVistas++;
                        // La primera vez es la garrapata (lo dejamos como "especie")
                        // La segunda vez es el portador, lo renombramos a "huesped"
                        if (columnasEspecieVistas === 2) {
                            return "huesped";
                        }
                    }
                    return headerLimpio;
                },
                complete: (resultados) => {
                    const lote = resultados.data.map((fila: any) => {
                        let fechaFormateada = "";
                        const fechaRaw = fila.fecha;
                        if (fechaRaw && typeof fechaRaw === 'string') {
                            const partesFecha = fechaRaw.split(' ')[0].split('/');
                            if (partesFecha.length === 3) {
                                fechaFormateada = `${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`;
                            }
                        }
                        const valorHuesped = fila.huesped ? String(fila.huesped).toLowerCase().trim() : "";
                        const esPersona = valorHuesped === "persona";
                        return {
                            municipio: fila.municipio || "",
                            especie: fila.especie || "",
                            fecha: fechaFormateada,
                            enHumano: esPersona,
                            animal: esPersona ? "" : valorHuesped
                        };

                    });
                    setDatosPreparados(lote);
                }
            });
        } else if (tipo === 'humanos') {
            const nombreArchivo = archivo.name.toLowerCase();
            let enfermedadDetectada = "";
            if (nombreArchivo.includes("dengue")) enfermedadDetectada = "Dengue";
            if (nombreArchivo.includes("paludismo")) enfermedadDetectada = "Paludismo";
            if (nombreArchivo.includes("leishmaniasis")) enfermedadDetectada = "Leishmaniasis";
            if (nombreArchivo.includes("lyme")) enfermedadDetectada = "Enfermedad de Lyme";
            if (nombreArchivo.includes("mediterránea")) enfermedadDetectada = "Fiebre exantemática mediterránea";
            if (nombreArchivo.includes("tularemia")) enfermedadDetectada = "Tularemia";
            Papa.parse(archivo, {
                header: true,
                dynamicTyping: true,
                skipEmptyLines: true,
                encoding: "ISO-8859-1",
                complete: (resultados) => {
                    const lote = resultados.data.map((fila: any) => {
                        let fechaFormateada = "";
                        const fechaRaw = fila["EDO-Comun-Fecha Caso(50002572)"];
                        if (fechaRaw && typeof fechaRaw === 'string') {
                            const partesFecha = fechaRaw.split(' ')[0].split('/');
                            if (partesFecha.length === 3) {
                                fechaFormateada = `${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`;
                            }
                        }
                        const sexoRaw = fila["EDO-colera-sexo(50005114)"];
                        let sexoChar = 'U';
                        if (sexoRaw === 'Hombre') sexoChar = 'H';
                        if (sexoRaw === 'Mujer') sexoChar = 'M';
                        return {
                            edad: fila["EDO-colera-edad(50005112)"] || 0,
                            sexo: sexoChar,
                            fechaCaso: fechaFormateada,
                            enfermedad: enfermedadDetectada,
                            pais: fila["EDO-Comun-Pais(10085111)"] || "",
                            provinciaResidencia: fila["EDO - Paciente Provincia residencia(4881)"]
                                ? String(fila["EDO - Paciente Provincia residencia(4881)"]).charAt(0)
                                : 'U',
                            municipioResidencia: fila["EDO-Paciente-Municipio residencia(5683)"] || "",
                            defuncion: fila["EDO-Comun-Defuncion(10084333)"] === 'Sí',
                            casoHospitalizado: fila["EDO-Comun-EnfHosp(10084555)"] === 'Sí'
                        };

                    }).filter((registro: any) => registro.fechaCaso !== "");
                    setDatosPreparados(lote);
                }
            });
        }

    }, []);



    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'text/csv': ['.csv']
        },
        multiple: false
    });

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    const handleSubirDatos = async () => {
        console.log("Enviando estos datos a Spring Boot:", datosPreparados);
        setSubiendo(true);
        if (tipo === "humanos") {

            try {
                const response = await peticionAutenticada('/loteHumanos', {
                    method: 'POST',
                    body: JSON.stringify(datosPreparados)
                });

                if (response.ok) {
                    setMostrarPopUp(true);
                    setTimeout(() => setMostrarPopUp(false), 2000);
                    await revalidarMapas();
                    await revalidarGraficos();
                }
            } catch (error) {
                console.log("Error: ", error);
            } finally {
                setSubiendo(false);
            }
        } else if (tipo === "garrapatas") {
            try {
                const response = await peticionAutenticada('/loteGarrapatas', {
                    method: 'POST',
                    body: JSON.stringify(datosPreparados)
                });

                if (response.ok) {
                    setMostrarPopUp(true);
                    setTimeout(() => setMostrarPopUp(false), 2000);
                    await revalidarMapas();
                    await revalidarGraficos();
                }
            } catch (error) {
                console.log("Error: ", error);
            } finally {
                setSubiendo(false);
            }
        }
    };


    return (
        <section className="container mx-auto p-4 space-y-4">
            {mostrarPopUp && (
                <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="bg-teal-600 text-white px-8 py-4 rounded-full shadow-2xl flex items-center space-x-3 border-2 border-teal-400">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-bold">¡Registro realizado con éxito!</span>
                    </div>
                </div>
            )}
            <div {...getRootProps({ className: 'dropzone', style: baseStyle })}>
                <input {...getInputProps()} />
                <p>Arrastra o haz click para importar CSVs</p>
            </div>
            <aside>
                <h4 className="text-black">Archivos</h4>
                <ul className="text-black">{files}</ul>
            </aside>
            {datosPreparados.length > 0 && (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200 mt-4">
                    <p className="text-green-800 font-semibold mb-2">
                        ¡Se han extraído {datosPreparados.length} registros listos para enviar!
                    </p>
                    <button
                        onClick={handleSubirDatos}
                        disabled={subiendo}
                        className={`px-4 py-2 rounded shadow text-white flex items-center justify-center transition-colors duration-200 ${subiendo
                                ? 'bg-blue-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                    >
                        {subiendo ? (
                            <>
                                {/* SVG de la rueda girando (Tailwind animate-spin) */}
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Subiendo datos...
                            </>
                        ) : (
                            "Subir a la Base de Datos"
                        )}
                    </button>
                </div>
            )}
        </section>
    );

}
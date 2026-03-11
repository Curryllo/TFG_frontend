import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function VisualizacionMapa() {
    const webID = "KdkUoeV1Bye5LDbLb6tHqEKf6HQDMn-s";
    const tenant = "6hk9b78gbh0ukvm.fr.qlikcloud.com";
    const appID = "a732b673-34ba-4ffb-b73b-d931d3065c8d";
    const objectID = "kPsGa";
    const urlFinal = `https://${tenant}/single/?appid=${appID}&obj=${objectID}&qlik-web-integration-id=${webID}&theme=horizon&opt=ctxmenu,currsel`;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full">
                <Link href="/visualizar" className="block">
                    <div className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        Volver atrás
                    </div>
                </Link>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Mapa</h1>
                    <p className="text-gray-600">Análisis visual de los datos de enfermedades vectoriales</p>

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Información Referente a Monitoreo Entomológico</h2>
                        <div className="w-full h-[600px]">
                            <iframe
                                src={urlFinal}
                                className="w-full h-full border-none"
                                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-storage-access-by-user-activation"
                                allowFullScreen
                            />
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function RegistrarLayout({ children, }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="max-w-3xl mx-auto">
                <Link href="/registrar" className="block">
                    <div className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        Volver atrás
                    </div>
                </Link>
                {children}
            </div>
        </div>
    );
}
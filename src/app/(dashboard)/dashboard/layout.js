// components/layout.js
import { Sidebar } from './Components/Sidebar';
import '@/app/globals.css';

export default function DashboardLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <div className="flex flex-col md:flex-row h-screen">
                    <Sidebar />
                    <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}

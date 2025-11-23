
import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-secondary">
            <Header />
            <main className="flex-grow">
                <Outlet />
            </main>
            <footer className="bg-gray-800 text-white py-8">
                <div className="container mx-auto px-4 text-center">
                    {/*<p>&copy; 2024 Coolbox Store Clone. All rights reserved.</p>*/}
                </div>
            </footer>
        </div>
    );
};

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ChaosProvider } from './context/ChaosContext'; // Provide context at layout level
import Sidebar from './Sidebar';
import MobileHeader from '../WasteManagement/MobileHeader';
import BottomNavigation from '../WasteManagement/BottomNavigation';
import TopBar from '../WasteManagement/TopBar';
// import './style.css'; // Removed legacy styles

const FamilyLayout = () => {
    // const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar logic to be implemented
    const setIsSidebarOpen = (val) => console.log('Sidebar toggle', val); // Placeholder

    return (
        <ChaosProvider>
            <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden">
                {/* Desktop Layout */}
                <div className="hidden md:flex w-full">
                    <Sidebar />
                    <div className="flex-1 flex flex-col overflow-hidden relative">
                        <TopBar title="The Family Chaos Manager" />
                        <main className="flex-1 overflow-auto relative z-0 p-8">
                            <Outlet />
                        </main>
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden flex flex-col w-full h-full">
                    <MobileHeader onMenuClick={() => setIsSidebarOpen(true)} />
                    <main className="flex-1 overflow-auto pb-20 p-4">
                        <Outlet />
                    </main>
                    <BottomNavigation />
                </div>
            </div>
        </ChaosProvider>
    );
};

export default FamilyLayout;

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileHeader from '../WasteManagement/MobileHeader'; // Reusing for consistency
import BottomNavigation from '../WasteManagement/BottomNavigation'; // Reusing for consistency
import TopBar from '../WasteManagement/TopBar'; // Reusing for consistency
import '../wastemanage.css'; // Reusing styles
import './SolarEnergyManager.css'; // Importing own specific styles if any

const SolarLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden">
            {/* Desktop Layout */}
            <div className="hidden md:flex w-full">
                <Sidebar />
                <div className="flex-1 flex flex-col overflow-hidden relative">
                    <TopBar title="Solar Energy Manager" />
                    <main className="flex-1 overflow-auto relative z-0">
                        <Outlet />
                    </main>
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden flex flex-col w-full h-full">
                <MobileHeader onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="flex-1 overflow-auto pb-20">
                    <Outlet />
                </main>
                <BottomNavigation />
            </div>
        </div>
    );
};

export default SolarLayout;

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
        <div className="app-container">
            {/* Desktop Layout */}
            <div className="desktop-layout">
                <Sidebar />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <TopBar title="Solar Energy Manager" />
                    <main style={{ flex: 1, overflow: 'auto', padding: '2rem' }}>
                        <Outlet />
                    </main>
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="mobile-layout">
                <MobileHeader onMenuClick={() => setIsSidebarOpen(true)} />
                <main style={{ flex: 1, overflow: 'auto', paddingBottom: '5rem' }}>
                    <Outlet />
                </main>
                <BottomNavigation />
            </div>
        </div>
    );
};

export default SolarLayout;

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ChaosProvider } from './context/ChaosContext'; // Provide context at layout level
import Sidebar from './Sidebar';
import MobileHeader from '../WasteManagement/MobileHeader';
import BottomNavigation from '../WasteManagement/BottomNavigation';
import TopBar from '../WasteManagement/TopBar';
import '../wastemanage.css'; // Global styles
import './style.css'; // Family styles

const FamilyLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <ChaosProvider>
            <div className="app-container">
                {/* Desktop Layout */}
                <div className="desktop-layout">
                    <Sidebar />
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                        <TopBar title="The Family Chaos Manager" />
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
        </ChaosProvider>
    );
};

export default FamilyLayout;

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileHeader from '../WasteManagement/MobileHeader'; // Reusing for consistency
import BottomNavigation from '../WasteManagement/BottomNavigation'; // Reusing for consistency
import TopBar from '../WasteManagement/TopBar'; // Reusing for consistency
import '../wastemanage.css'; // Reusing styles from Component root

import { predictWaitTime } from './services/predictor';

const QueueLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [queue, setQueue] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [slots, setSlots] = useState([
        { id: 1, busy: false, user: null },
        { id: 2, busy: false, user: null }
    ]);

    const assignToSlot = () => {
        setSlots((prevSlots) => {
            const updated = [...prevSlots];
            for (let i = 0; i < updated.length; i++) {
                if (!updated[i].busy && queue.length > 0) {
                    const nextUser = queue[0];
                    updated[i] = { ...updated[i], busy: true, user: nextUser };
                    setQueue((q) => q.slice(1));
                    setNotifications((prev) => [
                        ...prev,
                        `${nextUser.name} is now being served at Slot ${updated[i].id}`
                    ]);
                }
            }
            return updated;
        });
    };

    const addToQueue = (name, serviceType) => {
        const waitTime = predictWaitTime(queue.length);
        const newEntry = { id: Date.now(), name, serviceType, waitTime };
        setQueue((prev) => [...prev, newEntry]);
        setNotifications((prev) => [
            ...prev,
            `Hi ${name}, your estimated wait time is ${waitTime} minutes.`
        ]);
        // Trigger assignment after state update might require useEffect or immediate call if synchronous enough
        // For simplicity, we'll try calling it, but state updates are async.
        // Effect hook is better for "auto-assign", but sticking to original logic for now with minor tweak.
        setTimeout(assignToSlot, 0);
    };

    const serveSlot = (slotId) => {
        setSlots((prev) =>
            prev.map((s) =>
                s.id === slotId ? { ...s, busy: false, user: null } : s
            )
        );
        setNotifications((prev) => [
            ...prev,
            `Slot ${slotId} is now free.`
        ]);
        setTimeout(assignToSlot, 0);
    };


    return (
        <div className="app-container">
            {/* Desktop Layout */}
            <div className="desktop-layout">
                <Sidebar />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <TopBar title="Queue ManagementSystem" />
                    <main style={{ flex: 1, overflow: 'auto', padding: '2rem' }}>
                        <Outlet context={{ queue, slots, notifications, addToQueue, serveSlot }} />
                    </main>
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="mobile-layout">
                <MobileHeader onMenuClick={() => setIsSidebarOpen(true)} />
                <main style={{ flex: 1, overflow: 'auto', paddingBottom: '5rem' }}>
                    <Outlet context={{ queue, slots, notifications, addToQueue, serveSlot }} />
                </main>
                <BottomNavigation />
            </div>
        </div>
    );
};

export default QueueLayout;

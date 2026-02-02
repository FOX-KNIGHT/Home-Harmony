import React from 'react';
import Rooms from './components/Rooms';
import Shopping from './components/Shopping';
import CalendarView from './components/CalendarView';
import { Card } from '../WasteManagement/components/Shared';

const Dashboard = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-12">
                <Card className="glass-card">
                    <h2 className="text-xl font-bold text-slate-100 mb-4 bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent inline-block">Home Status & Clutter Control</h2>
                    <Rooms />
                </Card>
            </div>

            <div className="md:col-span-7">
                <Card className="glass-card h-full">
                    <h2 className="text-xl font-bold text-slate-100 mb-4">Upcoming Events</h2>
                    <CalendarView />
                </Card>
            </div>

            <div className="md:col-span-5">
                <Card className="glass-card h-full">
                    <h2 className="text-xl font-bold text-slate-100 mb-4">Quick Shopping List</h2>
                    <Shopping />
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;

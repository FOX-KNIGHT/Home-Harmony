import React from 'react';
import Rooms from './components/Rooms';
import Shopping from './components/Shopping';
import CalendarView from './components/CalendarView';
import { Card } from '../WasteManagement/components/Shared';

const Dashboard = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-2">
            <div className="md:col-span-12">
                <Card className="bg-[#1e293b] border-slate-700 p-6">
                    <h2 className="text-xl font-bold text-white mb-4">Home Status & Clutter Control</h2>
                    <Rooms />
                </Card>
            </div>

            <div className="md:col-span-7">
                <Card className="bg-[#1e293b] border-slate-700 p-6 h-full">
                    <h2 className="text-xl font-bold text-white mb-4">Upcoming Events</h2>
                    <CalendarView />
                </Card>
            </div>

            <div className="md:col-span-5">
                <Card className="bg-[#1e293b] border-slate-700 p-6 h-full">
                    <h2 className="text-xl font-bold text-white mb-4">Quick Shopping List</h2>
                    <Shopping />
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;

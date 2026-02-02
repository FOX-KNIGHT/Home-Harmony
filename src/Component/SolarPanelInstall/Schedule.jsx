import React, { useState, useEffect } from 'react';
import { Card, Button } from '../WasteManagement/components/Shared';
import { SolarService } from './SolarService';

const Schedule = () => {
    const [slots, setSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [formData, setFormData] = useState({ address: '', phone: '' });
    const [loading, setLoading] = useState(true);
    const [bookingStatus, setBookingStatus] = useState(null); // 'success', 'error', or null

    useEffect(() => {
        loadSlots();
    }, []);

    const loadSlots = async () => {
        try {
            const data = await SolarService.getSlots();
            setSlots(data);
        } catch (error) {
            console.error("Failed to load slots");
        } finally {
            setLoading(false);
        }
    };

    const handleBook = async () => {
        if (!selectedSlot || !formData.address || !formData.phone) {
            alert("Please fill in all details and select a slot.");
            return;
        }

        try {
            setLoading(true);
            await SolarService.bookAppointment({
                slotId: selectedSlot,
                ...formData
            });
            setBookingStatus('success');
            alert('Appointment confirmed successfully!');
            // Reset form
            setSelectedSlot(null);
            setFormData({ address: '', phone: '' });
        } catch (error) {
            setBookingStatus('error');
            alert('Failed to book appointment. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-6 md:p-8 max-w-7xl mx-auto space-y-8">
            <div className="space-y-2">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">Smart Installation Scheduling</h1>
                <p className="text-slate-400 text-lg">Book your free home solar assessment appointment.</p>
            </div>

            {bookingStatus === 'success' ? (
                <Card className="flex flex-col items-center justify-center p-12 text-center space-y-4 border-emerald-500/30 bg-emerald-500/10">
                    <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-3xl shadow-lg shadow-emerald-900/20">
                        ✅
                    </div>
                    <h2 className="text-2xl font-bold text-slate-100">Appointment Confirmed!</h2>
                    <p className="text-slate-300 max-w-md">
                        We have sent a confirmation to <strong>{formData.phone}</strong>. A solar specialist will visit you at <strong>{formData.address}</strong> on the selected date.
                    </p>
                    <Button onClick={() => setBookingStatus(null)} variant="secondary" className="mt-4">
                        Book Another
                    </Button>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="flex flex-col h-full">
                        <h3 className="text-xl font-semibold text-slate-100 mb-6">Select Date & Time</h3>

                        {/* Calendar Placeholder - visual bump */}
                        <div className="bg-slate-800/50 rounded-lg p-8 flex flex-col items-center justify-center border border-white/5 mb-6 min-h-[220px]">
                            <div className="text-lg font-bold text-slate-200 mb-2">October 2025</div>
                            <div className="grid grid-cols-7 gap-2 w-full max-w-xs text-center text-xs text-slate-500 mb-2">
                                <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                            </div>
                            <div className="grid grid-cols-7 gap-2 w-full max-w-xs text-center">
                                {/* Mock days */}
                                {[...Array(31)].map((_, i) => (
                                    <div key={i} className={`p-1 rounded-full ${i === 14 ? 'bg-sky-500/20 text-sky-400 font-bold' : 'hover:bg-white/5 cursor-pointer'}`}>
                                        {i + 1}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">Available Assessment Slots</h4>
                            {loading ? (
                                <div className="flex justify-center p-4">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {slots.map(slot => (
                                        <label key={slot.id} className={`
                                            relative flex items-center p-4 rounded-lg cursor-pointer transition-all border
                                            ${selectedSlot === slot.id
                                                ? 'bg-sky-500/10 border-sky-500/50 shadow-[0_0_15px_rgba(14,165,233,0.15)]'
                                                : 'bg-slate-800/30 border-transparent hover:bg-slate-800/60'}
                                        `}>
                                            <input
                                                type="radio"
                                                name="timeSlot"
                                                value={slot.id}
                                                checked={selectedSlot === slot.id}
                                                onChange={() => setSelectedSlot(slot.id)}
                                                className="sr-only"
                                            />
                                            <div className={`w-4 h-4 rounded-full border mr-4 flex items-center justify-center
                                                ${selectedSlot === slot.id ? 'border-sky-500' : 'border-slate-500'}
                                            `}>
                                                {selectedSlot === slot.id && <div className="w-2 h-2 rounded-full bg-sky-500"></div>}
                                            </div>
                                            <div className="flex-1">
                                                <span className="text-slate-200 font-medium">{slot.dateTime}</span>
                                            </div>
                                            <span className="text-xs font-semibold bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full">
                                                Available
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    </Card>

                    <Card className="flex flex-col h-full">
                        <h3 className="text-xl font-semibold text-slate-100 mb-6">Book Assessment</h3>
                        <div className="space-y-6 flex-1">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-400">Property Address</label>
                                <input
                                    className="w-full bg-slate-800/50 border border-slate-700 text-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-sky-500 transition-all"
                                    placeholder="123 Solar Street, Green City"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-400">Phone Number</label>
                                <input
                                    className="w-full bg-slate-800/50 border border-slate-700 text-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-sky-500 transition-all"
                                    placeholder="+1 (555) 000-0000"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>

                            <div className="p-4 bg-slate-800/30 rounded-lg border border-white/5 mt-auto">
                                <h5 className="text-sm font-semibold text-slate-300 mb-2">What to expect?</h5>
                                <ul className="text-sm text-slate-400 space-y-2 list-disc pl-4">
                                    <li>30-minute on-site assessment</li>
                                    <li>Roof structural integrity check</li>
                                    <li>Shading analysis</li>
                                    <li>Personalized savings report</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/5">
                            <Button
                                onClick={handleBook}
                                className="w-full py-3 text-lg shadow-lg shadow-sky-900/20"
                                disabled={loading}
                                variant="primary"
                            >
                                {loading ? 'Confirming...' : 'Confirm Appointment'}
                            </Button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default Schedule;

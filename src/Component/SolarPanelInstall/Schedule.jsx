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
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Smart Installation Scheduling</h1>
                <p className="page-subtitle">Book your free home solar assessment appointment.</p>
            </div>

            <div className="booking-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <Card className="booking-calendar">
                    <h3 className="card-title">Select Date & Time</h3>
                    <div className="calendar-placeholder" style={{ background: 'rgba(255,255,255,0.05)', height: '200px', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1rem 0' }}>
                        <div className="calendar-grid">
                            <div className="calendar-month" style={{ fontWeight: 'bold' }}>October 2025</div>
                            <p className="text-sm text-slate-400">Interactive Calendar View</p>
                        </div>
                    </div>
                    <div className="time-slots">
                        <h4 className="slots-title" style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#94a3b8' }}>Available Assessment Slots</h4>
                        {loading ? (
                            <p>Loading slots...</p>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {slots.map(slot => (
                                    <label key={slot.id} className="time-slot" style={{
                                        display: 'flex', alignItems: 'center', padding: '0.75rem',
                                        background: selectedSlot === slot.id ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255,255,255,0.03)',
                                        borderRadius: '0.5rem', cursor: 'pointer',
                                        border: selectedSlot === slot.id ? '1px solid #22c55e' : '1px solid transparent'
                                    }}>
                                        <input
                                            type="radio"
                                            name="timeSlot"
                                            value={slot.id}
                                            checked={selectedSlot === slot.id}
                                            onChange={() => setSelectedSlot(slot.id)}
                                            style={{ marginRight: '1rem' }}
                                        />
                                        <span className="slot-text" style={{ flex: 1 }}>{slot.dateTime}</span>
                                        <span className="slot-badge" style={{ fontSize: '0.75rem', background: '#22c55e20', color: '#22c55e', padding: '0.25rem 0.5rem', borderRadius: '99px' }}>Available</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </Card>

                <Card className="booking-summary">
                    <h3 className="card-title" style={{ marginBottom: '1.5rem' }}>Book Assessment</h3>
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1' }}>Address</label>
                        <input
                            className="form-input"
                            placeholder="Your Address"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', background: '#1e293b', border: '1px solid #334155', color: 'white' }}
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1' }}>Phone</label>
                        <input
                            className="form-input"
                            placeholder="Your Phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', background: '#1e293b', border: '1px solid #334155', color: 'white' }}
                        />
                    </div>
                    <Button
                        onClick={handleBook}
                        className="booking-confirm"
                        style={{ width: '100%', opacity: loading ? 0.7 : 1 }}
                        disabled={loading}
                    >
                        {loading ? 'Confirming...' : 'Confirm Appointment'}
                    </Button>
                </Card>
            </div>
        </div>
    );
};

export default Schedule;

import React, { useState } from 'react';
import { Icons } from './Icons';
import { Card, Button, Toast } from './components/Shared';
import { getFormattedDate, getCurrentMonthYear } from './utils';

const Booking = () => {
    const [selectedBookingDate, setSelectedBookingDate] = useState(getFormattedDate(1));
    const [currentMonthDate] = useState(new Date());
    const [toastMessage, setToastMessage] = useState('');

    const showToast = (message) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(''), 4000);
    };

    const today = new Date();
    // Generate dates for the current week starting tomorrow (index 1 is tomorrow)
    const dates = Array.from({ length: 7 }, (_, i) => getFormattedDate(i + 1));
    const [tempDate, setTempDate] = useState(selectedBookingDate);

    // Calculate the actual starting date number to map correctly
    const firstDay = new Date(today);
    firstDay.setDate(firstDay.getDate() + 1);
    const firstDayOfWeek = firstDay.getDay(); // 0 (Sun) to 6 (Sat)
    const emptyStartCells = firstDayOfWeek; // Number of blank cells before the first day of the week

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Smart Scheduling</h1>
                <p className="page-subtitle">AI-optimized collection scheduling</p>
            </div>

            <div className="booking-layout">
                <Card className="booking-calendar">
                    <h3 className="card-title">Select Date & Time</h3>
                    <div className="calendar-placeholder">
                        <div className="calendar-month-header">
                            {/* Simulated navigation - just shows current month */}
                            <button className="calendar-nav-btn"><Icons.ChevronLeft /></button>
                            <div className="calendar-month">{getCurrentMonthYear(currentMonthDate)}</div>
                            <button className="calendar-nav-btn"><Icons.ChevronRight /></button>
                        </div>

                        <div className="calendar-grid">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                <div key={day} className="calendar-day-header">{day}</div>
                            ))}

                            {/* Add blank cells for alignment with the week day */}
                            {[...Array(emptyStartCells)].map((_, i) => (
                                <div key={`empty-align-${i}`} className="calendar-day-cell calendar-day-cell--empty"></div>
                            ))}

                            {/* Display 7 upcoming dates for selection */}
                            {dates.map(dateStr => {
                                // Extract the day number for display
                                const dayNumber = new Date(dateStr).getDate();
                                const isSelected = dateStr === tempDate;
                                const dayLabel = dateStr.split(', ')[0];

                                return (
                                    <div
                                        key={dateStr}
                                        onClick={() => setTempDate(dateStr)}
                                        className={`calendar-day-cell ${isSelected ? 'calendar-day-cell--active' : ''}`}
                                    >
                                        {dayNumber}
                                        <div className="calendar-day-label">{dayLabel}</div>
                                    </div>
                                );
                            })}

                            {/* Fill remaining cells of the calendar grid (to total 4 weeks = 28 cells) */}
                            {[...Array(28 - emptyStartCells - dates.length)].map((_, i) => (
                                <div key={`empty-fill-${i}`} className="calendar-day-cell calendar-day-cell--empty"></div>
                            ))}
                        </div>
                    </div>
                    <div className="time-slots">
                        <h4 className="slots-title">Available Time Slots</h4>
                        {['9:00 AM - 12:00 PM', '1:00 PM - 4:00 PM', '4:00 PM - 7:00 PM'].map((slot, index) => (
                            <label key={slot} className="time-slot">
                                <input type="radio" name="timeSlot" defaultChecked={index === 0} />
                                <span className="slot-text">{slot}</span>
                                <span className="slot-badge">Optimal</span>
                            </label>
                        ))}
                    </div>
                </Card>

                <Card className="booking-summary">
                    <h3 className="card-title">Booking Summary</h3>
                    <div className="summary-details">
                        <div className="summary-item">
                            <span className="summary-label">Date</span>
                            <span className="summary-value">{tempDate}</span>
                        </div>
                        <div className="summary-item">
                            <span className="summary-label">Time</span>
                            <span className="summary-value">9:00 AM - 12:00 PM</span>
                        </div>
                        <div className="summary-item">
                            <span className="summary-label">Route Efficiency</span>
                            <span className="summary-value summary-value--success">Optimized</span>
                        </div>
                        <div className="summary-item">
                            <span className="summary-label">Blockchain ID</span>
                            <span className="summary-value summary-value--link">#BC789XY2</span>
                        </div>
                    </div>
                    <Button
                        onClick={() => {
                            setSelectedBookingDate(tempDate);
                            showToast(`Collection scheduled for ${tempDate}!`);
                        }}
                        className="booking-confirm"
                    >
                        Confirm Booking
                    </Button>
                </Card>
            </div>
            <Toast message={toastMessage} />
        </div>
    );
};

export default Booking;

const API_BASE_URL = 'http://localhost:5001/api/solar';

export const SolarService = {
    // Fetch available slots
    getSlots: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/slots`);
            if (!response.ok) throw new Error('Failed to fetch slots');
            return await response.json();
        } catch (error) {
            console.error('Error fetching solar slots:', error);
            throw error;
        }
    },

    // Book an appointment
    bookAppointment: async (bookingDetails) => {
        try {
            const response = await fetch(`${API_BASE_URL}/book`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingDetails),
            });
            if (!response.ok) throw new Error('Booking failed');
            return await response.json();
        } catch (error) {
            console.error('Error booking appointment:', error);
            throw error;
        }
    },

    // Save ROI calculation
    saveROI: async (data) => {
        try {
            const response = await fetch(`${API_BASE_URL}/roi`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('Failed to save ROI');
            return await response.json();
        } catch (error) {
            console.error('Error saving ROI:', error);
            throw error;
        }
    }
};

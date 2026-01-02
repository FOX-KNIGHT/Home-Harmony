export const getFormattedDate = (offset = 0) => {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

export const getCurrentMonthYear = (date) => {
    const options = { month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

export const getFormattedTime = () => {
    return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
};

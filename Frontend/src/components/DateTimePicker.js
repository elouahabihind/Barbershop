import React, { useState } from 'react';

const DateTimePicker = ({ bookingDetails, setBookingDetails }) => {
  const [error, setError] = useState('');

  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;

    // Si l'heure n'est pas entre 09:00 et 20:00
    if (selectedTime < '09:00' || selectedTime > '20:00') {
      setError('Please select a time between 09:00 AM and 08:00 PM');
    } else {
      setError('');
      setBookingDetails({ ...bookingDetails, time: selectedTime });
    }
  };

  return (
    <div className="date-time-picker">
      <h2>Select Date & Time</h2>
      <div className="mb-3">
        <label htmlFor="date" className="form-label">Date</label>
        <input
          type="date"
          className="form-control"
          value={bookingDetails.date}
          onChange={(e) => setBookingDetails({ ...bookingDetails, date: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="time" className="form-label">Time</label>
        <input
          type="time"
          className="form-control"
          min="09:00"
          max="20:00"
          value={bookingDetails.time}
          onChange={handleTimeChange}
        />
        {error && <div className="error-message text-danger">{error}</div>}
      </div>
      {/* Affichage des horaires de travail */}
      <div className="work-hours-info text-muted">
        <p><strong>Work Hours:</strong> 09:00 AM to 08:00 PM</p>
        <p>Note: Please select a time between 9:00 AM and 8:00 PM.</p>
      </div>
    </div>
  );
};

export default DateTimePicker;

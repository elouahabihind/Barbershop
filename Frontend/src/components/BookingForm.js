import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = ({ bookingDetails, setBookingDetails }) => {
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Pour gérer l'état de chargement
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const validateForm = () => {
    const { name, email, phone, service, date, time } = bookingDetails;
    let emailError = '';
    let phoneError = '';

    // Validation de l'email
    if (email && !email.includes('@gmail.com')) {
      emailError = 'Email must contain @gmail.com';
    }

    // Validation du téléphone
    if (!/^\d{10}$/.test(phone)) {
      phoneError = 'Phone number must be exactly 10 digits';
    }

    setErrors({ email: emailError, phone: phoneError });

    return (
      name &&
      email &&
      phone &&
      service &&
      date &&
      time &&
      !emailError &&
      !phoneError
    );
  };

  const handleBooking = async () => {
    if (!validateForm()) return; // Ne pas envoyer la réservation si les validations échouent

    setIsLoading(true); // Indiquer que la requête est en cours

    try {
      const response = await axios.post('http://localhost:8080/api/bookings', bookingDetails, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Si la réservation est réussie, afficher un message de confirmation
      setConfirmationMessage(response.data.message);
      
      // Réinitialiser les détails de la réservation après soumission
      setBookingDetails({
        service: '',
        date: '',
        time: '',
        name: '',
        email: '',
        phone: '',
      });
    } catch (error) {
      console.error('Error:', error);
      setConfirmationMessage('An error occurred while booking. Please try again.');
    } finally {
      setIsLoading(false); // Revenir à l'état normal après la requête
    }
  };

  return (
    <div className="booking-form container">
      <h2>Customer Information</h2>
      
      <div className="mb-3">
        <label className="form-label">Name:</label>
        <input
          type="text"
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          placeholder="Your Name"
          value={bookingDetails.name}
          onChange={(e) => setBookingDetails({ ...bookingDetails, name: e.target.value })}
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Email:</label>
        <input
          type="email"
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          placeholder="Your Email"
          value={bookingDetails.email}
          onChange={(e) => setBookingDetails({ ...bookingDetails, email: e.target.value })}
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Phone:</label>
        <input
          type="tel"
          className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
          placeholder="Your Phone Number"
          value={bookingDetails.phone}
          onChange={(e) => setBookingDetails({ ...bookingDetails, phone: e.target.value })}
        />
        {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
      </div>

      <h2>Confirm Your Booking</h2>
      <p>Service: {bookingDetails.service}</p>
      <p>Date: {bookingDetails.date}</p>
      <p>Time: {bookingDetails.time}</p>

      <button
        className="btn btn-primary"
        disabled={
          !bookingDetails.service ||
          !bookingDetails.date ||
          !bookingDetails.time ||
          !bookingDetails.name ||
          !bookingDetails.email ||
          !bookingDetails.phone ||
          isLoading
        }
        onClick={handleBooking}
      >
        {isLoading ? 'Booking...' : 'Book Now'}
      </button>

      {/* Afficher le message de confirmation */}
      {confirmationMessage && <div className="alert alert-info mt-3">{confirmationMessage}</div>}
    </div>
  );
};

export default BookingForm;

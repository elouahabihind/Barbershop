import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ServiceSelection from './components/ServiceSelection';
import DateTimePicker from './components/DateTimePicker';
import BookingForm from './components/BookingForm';

function App() {
  const [bookingDetails, setBookingDetails] = useState({
    service: '',
    date: '',
    time: '',
  });

  return (
    <Router>
      <div className="App container">
        <h1 className="my-4 text-center">Barbershop Booking</h1>

        <Routes>
          {/* Page de sélection du service */}
          <Route
            path="/"
            element={
              <div className="card p-4">
                <ServiceSelection bookingDetails={bookingDetails} setBookingDetails={setBookingDetails} />
                <div className="d-flex justify-content-center mt-4">
                  <Link
                    to="/date-time-selection"
                    className="btn btn-primary"
                    style={{ pointerEvents: bookingDetails.service ? 'auto' : 'none' }}
                  >
                    Next: Choose Date & Time
                  </Link>
                </div>
              </div>
            }
          />

          {/* Page de sélection de la date et de l'heure */}
          <Route
            path="/date-time-selection"
            element={
              <div className="card p-4">
                <DateTimePicker bookingDetails={bookingDetails} setBookingDetails={setBookingDetails} />
                <div className="d-flex justify-content-center mt-4">
                  <Link
                    to="/confirm-booking"
                    className="btn btn-primary"
                    style={{
                      pointerEvents: bookingDetails.date && bookingDetails.time ? 'auto' : 'none',
                    }}
                  >
                    Next: Confirm Booking
                  </Link>
                </div>
              </div>
            }
          />

          {/* Page de confirmation de réservation */}
          <Route
            path="/confirm-booking"
            element={
              <div className="card p-4">
                <BookingForm bookingDetails={bookingDetails} setBookingDetails={setBookingDetails} />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

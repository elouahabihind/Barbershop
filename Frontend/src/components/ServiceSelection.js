import React from 'react';

const ServiceSelection = ({ bookingDetails, setBookingDetails }) => {
  const services = [
    { id: 1, name: 'Haircut', duration: '30 min', price: '20.00 €' },
    { id: 2, name: 'Beard Trim', duration: '20 min', price: '15.00 €' },
    { id: 3, name: 'Full Service', duration: '1 hr', price: '35.00 €' },
  ];

  const handleServiceSelection = (service) => {
    setBookingDetails({ ...bookingDetails, service });
  };

  return (
    <div className="service-selection">
      <h2>Select a Service</h2>
      <div className="row">
        {services.map((service) => (
          <div
            key={service.id}
            className={`col-12 col-md-4 mb-4 ${
              bookingDetails.service === service.name ? 'border border-primary rounded' : ''
            }`}
            onClick={() => handleServiceSelection(service.name)}
          >
            <div className="card p-3 cursor-pointer">
              <h4>{service.name}</h4>
              <p>{service.duration}</p>
              <p>{service.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSelection;

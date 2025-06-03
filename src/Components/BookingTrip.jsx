import React, { useState } from 'react';

export default function BookingTrip({ countryName, countryId, userId, onBooked }) {
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    date: '',
    travelers: 1,
  });
  const [bookingSuccess, setBookingSuccess] = useState(null);

  const handleBookingInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the bookingDetails to your backend API
    console.log('Booking Details:', bookingDetails);
    // Example of a placeholder API call (replace with your actual booking API)
    fetch('https://group-04-culture-compass.onrender.com/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        countryName: countryName,
        countryId: countryId,
        userId: userId,
        ...bookingDetails,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Booking successful:', data);
        // Check if data is an array and has elements
        if (Array.isArray(data) && data.length > 0) {
          // Assuming the last element is the newly created one
          setBookingSuccess(data[data.length - 1]);
        } else if (data) {
          // Assuming data is the single created object
          setBookingSuccess(data);
        } else {
          // Handle cases where data is null, empty array, etc.
          console.error('Booking successful, but no data returned.', data);
          alert('Booking successful, but could not display details.');
           if (onBooked) { onBooked(); } // Optionally close form even without details
        }

        // alert('Trip booked!'); // Removed alert

        // if (onBooked) {
        //   onBooked(); // Notify parent component (optional, depending on desired flow)
        // }
      })
      .catch(error => {
        console.error('Error booking trip:', error);
        alert('Failed to book trip.'); // Keep alert for error
      });
  };

  return (
    <div className="country-card">
      <h3 className="booking-title">Book a Trip to {countryName}</h3>
      {!bookingSuccess ? (
        <form  className="booking-form"onSubmit={handleBookingSubmit}>
          <div  className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={bookingDetails.name}
              onChange={handleBookingInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={bookingDetails.date}
              onChange={handleBookingInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="travelers">Number of Travelers:</label>
            <input
              type="number"
              id="travelers"
              name="travelers"
              value={bookingDetails.travelers}
              onChange={handleBookingInputChange}
              min="1"
              required
            />
          </div>
          <button  className="booking-submit" type="submit">Confirm Booking</button>
        </form>
      ) : (
        <div className="booking-success-message">
          <h4>Booking Successful!</h4>
          <table>
            <tbody>
              <tr>
                <td>Name:</td>
                <td>{bookingSuccess.name}</td>
              </tr>
              <tr>
                <td>Date:</td>
                <td>{bookingSuccess.date}</td>
              </tr>
              <tr>
                <td>Travelers:</td>
                <td>{bookingSuccess.travelers}</td>
              </tr>
              {/* Add other relevant details from the response if available */}
            </tbody>
          </table>
          <button onClick={() => {
            setBookingSuccess(null);
            if (onBooked) { onBooked(); }
          }}>Close</button>
        </div>
      )}
    </div>
  );
} 
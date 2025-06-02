import React, { useState } from 'react';

export default function BookingTrip({ countryName, countryId, userId, onBooked }) {
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    date: '',
    travelers: 1,
  });

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
    fetch('https://683d7312199a0039e9e57fd5.mockapi.io/bookings', {
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
        alert('Trip booked!'); // Or display a more user-friendly success message
        if (onBooked) {
          onBooked(); // Notify parent component
        }
      })
      .catch(error => {
        console.error('Error booking trip:', error);
        alert('Failed to book trip.'); // Or display an error message
      });
  };

  return (
    <div className="booking-form-container">
      <h3>Book a Trip to {countryName}</h3>
      <form onSubmit={handleBookingSubmit}>
        <div>
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
        <div>
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
        <div>
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
        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
} 
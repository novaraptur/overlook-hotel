
import './css/base.scss';

import './images/turing-logo.png';

import {retrieveData} from './api-calls';
import Customer from './classes/customer';
import Booking from './classes/booking';
import Room from './classes/room';

const bookingsSection = document.querySelector("#bookings");
const customerInfoSection = document.querySelector("#customerInfo");

//for It1
// Load random user and assign currentUser to that
// Display all bookings and amount spent

let currentUser;

window.onload = () => {
  retrieveData()
    .then((promise) => {
      let customerData = promise[0].customers.map((customer) => new Customer(customer));
      let bookingData = promise[2].bookings.map((booking) => new Booking(booking));
      let roomData = promise[1].rooms.map((room) => new Room(room));
      startApp(customerData, bookingData, roomData);
    });
}

function startApp(customerData, bookingData, roomData) {
  currentUser = customerData[Math.floor(Math.random() * 50) + 1];
  bookingData.forEach((booking) => {
    booking.requestRoom(roomData);
  });
  customerData.forEach((customer) => {
    customer.addExistingBookings(bookingData);
  });
  console.log(currentUser);
}

//for It2
// Allow user to select date they'd like to stay
// Show only available rooms for that date
// Allow user to filter rooms by roomType
// Allow to create new booking
// If no available rooms, display apology message

//for It3
// BEFORE ANY CHANGES: create new branch of just existing dashboard code & push to GH
// when user first arrives, should see login page
// should enter login & see dashboard with data associated with user that has that login

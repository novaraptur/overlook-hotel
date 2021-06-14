
import './css/base.scss';

import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);
dayjs.extend(dayOfYear);
dayjs.extend(weekOfYear);

import {retrieveData, postData} from './api-calls';
import Customer from './classes/customer';
import Booking from './classes/booking';
import Room from './classes/room';

const bookingsSection = document.querySelector("#bookings");
const customerInfoSection = document.querySelector("#customerInfo");
const dateSelector = document.querySelector("#dateSelector");
const createBookingButton = document.querySelector("#createBookingButton");

let currentUser, customerData, bookingData, roomData;

window.onload = () => {
  retrieveData()
    .then((promise) => {
      customerData = promise[0].customers.map((customer) => new Customer(customer));
      bookingData = promise[2].bookings.map((booking) => new Booking(booking));
      roomData = promise[1].rooms.map((room) => new Room(room));
      startApp();
    });
}

function startApp() {
  currentUser = customerData[Math.floor(Math.random() * 50)];
  bookingData.forEach((booking) => {
    booking.requestRoom(roomData);
  });
  customerData.forEach((customer) => {
    customer.addExistingBookings(bookingData);
  });
  console.log(currentUser);
  displayUserInfo();
}

function displayUserInfo() {
  bookingsSection.insertAdjacentHTML('afterbegin', `
  <article id="userBookingsInfo">
    <h3>Last Created Booking</h3>
    <p><strong>${currentUser.bookings[currentUser.bookings.length - 1].date}:</strong></p>
    <p>Room ${currentUser.bookings[currentUser.bookings.length - 1].roomNumber}</p>
    <h3>Past Bookings</h3>
    ${loadUserBookings()}
  </article>
  `);
  customerInfoSection.insertAdjacentHTML('afterbegin', `
  <article>
    <h3>${currentUser.name}</h3>
    <h3>Total Amount Spent</h3>
    <p>$${currentUser.calculateTotalSpent(roomData)}</p>
  </article>
  `);
}

function loadUserBookings() {
  return currentUser.bookings.map(booking => `<p><strong>${booking.date}:</strong></p><p>Room ${booking.roomNumber}</p>`).join('');
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


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
const availableRoomList = document.querySelector("#availableRoomList");

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

dateSelector.addEventListener('change', () => {
  let selectedDate = dateSelector.value;
  let formattedDate = dayjs(selectedDate).format("YYYY/MM/DD");
  let availableRooms = findAvailableRooms(formattedDate);
  displayAvailableRooms(availableRooms);
});

createBookingButton.addEventListener('click', () => {
  let selectedDate = dateSelector.value;
  let formattedDate = dayjs(selectedDate).format("YYYY/MM/DD");
  let selectedRoomNumber = availableRoomList.value;
  selectHotelRoom(formattedDate, selectedRoomNumber);
});

function startApp() {
  currentUser = customerData[Math.floor(Math.random() * 50)];
  bookingData.forEach((booking) => {
    booking.requestRoom(roomData);
  });
  customerData.forEach((customer) => {
    customer.addExistingBookings(bookingData);
  });
  displayUserInfo();
}

function displayUserInfo() {
  bookingsSection.innerHTML = ``;
  bookingsSection.insertAdjacentHTML('afterbegin', `
  <article id="userBookingsInfo">
  <h3>Last Created Booking</h3>
    <article id="latestBooking">
      <p><strong>${currentUser.bookings[currentUser.bookings.length - 1].date}:</strong></p>
      <p>Room ${currentUser.bookings[currentUser.bookings.length - 1].roomNumber}</p>
    </article>
    <h3>Past Bookings</h3>
    ${loadUserBookings()}
  </article>
  `);
  customerInfoSection.innerHTML = ``;
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
// [X] Allow user to select date they'd like to stay
// [X] Show only available rooms for that date
// [] Allow user to filter rooms by roomType
// [X] Allow to create new booking
// [] If no available rooms, display apology message

function selectHotelRoom(date, roomNumber) {
  console.log("BEFORE", currentUser.bookings);
  let bookingInfo = {
    id: '5fwrgu4i7k55hl6t9',
    userID: currentUser.id,
    date: date,
    roomNumber: parseInt(roomNumber)
  };
  currentUser.createBooking(bookingInfo, roomData);
  console.log("AFTER", currentUser.bookings);
  displayUserInfo();
  //post to booking info API too
}

function findAvailableRooms(date) {
  let availableRooms = roomData.filter((room) => {
    if (!room.nightsBooked.includes(date)) {
      return true;
    }
  });
  return availableRooms;
}

function displayAvailableRooms(availableRooms) {
  availableRoomList.innerHTML = ``;
  availableRooms.forEach((room) => {
    availableRoomList.insertAdjacentHTML('afterbegin', `
    <option value="${room.number}">Room ${room.number} -- $${room.costPerNight}/night</option>
    `);
  });
}

//BEFORE It3
// fix styling
// break SCSS into diff files and utilize mixins
// add images
// check accessibility (ARIA, tabbing, alt, etc.)
// add error handling to GET / POST
// add error handling to date select & room select forms
// break off into branch, push up, & make PR so Hannah can see it

//for It3
// BEFORE ANY CHANGES: create new branch of just existing dashboard code & push to GH
// when user first arrives, should see login page
// should enter login & see dashboard with data associated with user that has that login

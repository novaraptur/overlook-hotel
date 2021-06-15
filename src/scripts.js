
import './css/base.scss';
import './css/styles.scss';

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

import './images/hotel-exterior.jpg';
import './images/hotel-interior.jpg';
import './images/person-on-bed.jpg';

const bookingsSection = document.querySelector("#bookings");
const customerInfoSection = document.querySelector("#customerInfo");
const dateSelector = document.querySelector("#dateSelector");
const createBookingButton = document.querySelector("#createBookingButton");
const availableRoomList = document.querySelector("#availableRoomList");
const newBookingSection = document.querySelector("#newBooking");
const roomTypeList = document.querySelector("#roomTypeList");

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
  let selectedRoomType = roomTypeList.value;
  let availableRooms = findAvailableRooms(formattedDate, selectedRoomType);
  displayAvailableRooms(availableRooms);
});

roomTypeList.addEventListener('change', () => {
  let selectedDate = dateSelector.value;
  let formattedDate = dayjs(selectedDate).format("YYYY/MM/DD");
  let selectedRoomType = roomTypeList.value;
  let availableRooms = findAvailableRooms(formattedDate, selectedRoomType);
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

function selectHotelRoom(date, roomNumber) {
  let message;
  let bookingInfo = {
    id: '5fwrgu4i7k55hl6t9',
    userID: currentUser.id,
    date: date,
    roomNumber: parseInt(roomNumber)
  };
  if (currentUser.createBooking(bookingInfo, roomData) === false) {
    message = "We're sorry, there are not any rooms available for the date you've selected.";
  } else {
    message = "Room booked successfully!";
  }
  displayMessage(message);
  displayUserInfo();
  postData(bookingInfo, 'bookings');
}

function findAvailableRooms(date, selectedRoomType) {
  let availableRooms;
  if (!selectedRoomType) {
    availableRooms = roomData.filter((room) => {
      if (!room.nightsBooked.includes(date)) {
        return true;
      }
    });
  } else {
    availableRooms = roomData.filter((room) => {
      if (!room.nightsBooked.includes(date) && room.roomType === selectedRoomType) {
        return true;
      }
    });
  }
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

function displayMessage(message) {
  let userMessage = document.querySelector("#userMessage");
  if (userMessage) {
    userMessage.innerHTML = ``;
  }
  newBookingSection.insertAdjacentHTML('beforeend', `
    <h4 id="userMessage">${message}</h4>
  `);
}

//for It3
// BEFORE ANY CHANGES: create new branch of just existing dashboard code & push to GH
// when user first arrives, should see login page
// should enter login & see dashboard with data associated with user that has that login


import Booking from './booking';

class Customer {
  constructor(customer) {
    this.name = customer.name;
    this.id = customer.id;
    this.bookings = [];
  }

  addExistingBookings(bookings) {
    bookings.forEach((booking) => {
      if (booking.userID === this.id) {
        this.bookings.push(booking);
      }
    });
  }

  createBooking(bookingInfo, rooms) {
    let booking = new Booking(bookingInfo);
    if (booking.requestRoom(rooms) === 'Room booked successfully!') {
      this.bookings.push(booking);
    } else {
      return;
    }
  }
}

export default Customer;

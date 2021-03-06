
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

  calculateTotalSpent(rooms) {
    let spentValues = this.bookings.map((booking) => {
      return booking.getTotalCostOfStay(rooms);
    });
    let totalSpent = spentValues.reduce((accumulator, num) => {
      return accumulator + num;
    }, 0);
    return totalSpent.toFixed(2);
  }

  createBooking(bookingInfo, rooms) {
    let booking = new Booking(bookingInfo);
    if (booking.requestRoom(rooms) === 'Room booked successfully!') {
      this.bookings.push(booking);
    } else {
      return false;
    }
  }
}

export default Customer;

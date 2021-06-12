
import Room from './room';

class Booking {
  constructor(booking) {
    this.id = booking.id;
    this.userID = booking.userID;
    this.date = booking.date;
    this.roomNumber = booking.roomNumber;
    this.roomServiceCharges = booking.roomServiceCharges;
  }

  findRoom(rooms) {
    return rooms.find((room) => {
      return (room.number === this.roomNumber);
    });
  }

  requestRoom(allRooms) {
    let room = this.findRoom(allRooms);
    if (room) {
      if (!room.nightsBooked.includes(this.date)) {
        room.bookRoom(this.date);
        return 'Room booked successfully!';
      } else {
        return 'We\'re sorry, the room you\'ve selected is already booked for that date.';
      }
    } else {
      return 'We\'re sorry, we can\'t find that room in our database.';
    }
  }
}

export default Booking;

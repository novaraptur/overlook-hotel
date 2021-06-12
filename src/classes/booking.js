
class Booking {
  constructor(booking) {
    this.id = booking.id;
    this.userID = booking.userID;
    this.date = booking.date;
    this.roomNumber = booking.roomNumber;
    this.roomServiceCharges = booking.roomServiceCharges;
  }

  findRoom() {
    //look through database of rooms and return room corresponding to this.roomNumber
  }

  requestRoom() {
    let room = this.findRoom();
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
    //if room exists
      // if room.nightsBooked does not include this.date
        // room.bookRoom(this.date)
        // return 'Room booked successfully!'
      // else
        //return 'We're sorry, the room you've selected is already booked for that date.'
    //else if room undefined
      //return 'We're sorry, we can't find that room in our database.'
  }
}

export default Booking;

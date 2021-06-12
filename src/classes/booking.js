

class Booking {
  constructor(booking) {
    this.id = booking.id;
    this.userID = booking.userID;
    this.date = booking.date;
    this.roomNumber = booking.roomNumber;
    this.roomServiceCharges = booking.roomServiceCharges;
  }

  findRoom(rooms) {
    console.log(rooms);
    return rooms.find((room) => {
      //console.log(room);
      return (room.number === this.roomNumber);
    });
  }

  requestRoom(rooms) {
    let room = this.findRoom(rooms);
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

  addRoomServiceCharge(charge) {
    this.roomServiceCharges.push(charge);
  }
}

export default Booking;

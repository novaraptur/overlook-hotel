
class Room {
  constructor(room) {
    this.number = room.number;
    this.roomType = room.roomType;
    this.bidet = room.bidet;
    this.bedSize = room.bedSize;
    this.numBeds = room.numBeds;
    this.costPerNight = room.costPerNight;
    this.booked = false;
    this.nightsBooked = [];
  }

  bookRoom(date) {
    
  }
}

export default Room;

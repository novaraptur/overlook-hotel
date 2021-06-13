import chai from 'chai';
const expect = chai.expect;
import sampleData from './sample-data.js';
import Booking from '../src/classes/booking.js';
import Room from '../src/classes/room.js';

describe('Booking', function() {

  let booking1, booking2, room1, room2, booking3, booking4, booking5, rooms;

  beforeEach(() => {
    booking1 = new Booking(sampleData.bookingsSampleData[0]);
    booking2 = new Booking(sampleData.bookingsSampleData[1]);
    room1 = new Room(sampleData.roomSampleData[0]);
    room2 = new Room(sampleData.roomSampleData[1]);
    rooms = [room1, room2];
    booking3 = new Booking(sampleData.bookingsSampleData[2]);
    booking4 = new Booking(sampleData.bookingsSampleData[3]);
    booking5 = new Booking(sampleData.bookingsSampleData[4]);
  });

  it('should be a function', () => {
    expect(Booking).to.be.a('function');
  });

  it('should create an instance of Booking', () => {
    expect(booking1).to.be.an.instanceOf(Booking);
  });

  it('should take in an object of sample data to define its initial values', () => {
    expect(booking1.id).to.equal('5fwrgu4i7k55hl6sz');
    expect(booking1.userID).to.equal(2);
    expect(booking1.date).to.equal('2020/04/22');
    expect(booking1.roomNumber).to.equal(1);
    expect(booking1.roomServiceCharges).to.deep.equal([]);
  });

  it('should be able to mark a room as booked', () => {
    booking1.requestRoom(rooms);
    expect(room1.nightsBooked).to.deep.equal(['2020/04/22']);
  });

  it('should not be able to book a room if the room does not exist', () => {
    booking2.requestRoom(rooms);
    expect(booking2.requestRoom(rooms)).to.equal(`We're sorry, we can't find that room in our database.`);
  });

  it('should not be able to book a room if the room is already booked for that date', () => {
    booking1.requestRoom(rooms);
    expect(booking4.requestRoom(rooms)).to.equal(`We're sorry, the room you've selected is already booked for that date.`);
    expect(room1.nightsBooked).to.deep.equal(['2020/04/22']);
  });

  it('should be able to book the room if the room is booked but NOT for that date', () => {
    booking1.requestRoom(rooms);
    booking5.requestRoom(rooms);
    expect(room1.nightsBooked).to.deep.equal(['2020/04/22', '2020/05/14']);
  });

  it('should be able to add a charge to room service', () => {
    booking1.addRoomServiceCharge(50);
    expect(booking1.roomServiceCharges).to.deep.equal([50]);
  });
});

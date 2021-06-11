import chai from 'chai';
const expect = chai.expect;
import sampleData from './sample-data.js';
import Booking from '../src/classes/booking.js';
import Room from '../src/classes/room.js';

describe('Booking', function() {

  let booking1, booking2, room1, room2;

  beforeEach(() => {
    booking1 = new Booking(sampleData.bookingsSampleData[0]);
    booking2 = new Booking(sampleData.bookingsSampleData[1]);
    room1 = new Room(sampleData.roomSampleData[0]);
    room2 = new Room(sampleData.roomSampleData[1]);
  });

  it('should be a function', () => {
    expect(Booking).to.be.a('function');
  });

  it('should create an instance of Booking', () => {
    expect(booking1).to.be.an.instanceOf(Booking);
  });
});

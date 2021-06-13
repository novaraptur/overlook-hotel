import chai from 'chai';
const expect = chai.expect;
import sampleData from './sample-data.js';
import Booking from '../src/classes/booking.js';
import Room from '../src/classes/room.js';
import Customer from '../src/classes/customer.js';

describe('Customer', function() {

  let booking1, booking2, booking3, room1, room2, rooms, customer1, customer2, customer3;

  beforeEach(() => {
    booking1 = new Booking(sampleData.bookingsSampleData[0]);
    booking2 = new Booking(sampleData.bookingsSampleData[1]);
    booking3 = new Booking(sampleData.bookingsSampleData[3]);
    room1 = new Room(sampleData.roomSampleData[0]);
    room2 = new Room(sampleData.roomSampleData[1]);
    rooms = [room1, room2];
    customer1 = new Customer(sampleData.customerSampleData[0]);
    customer2 = new Customer(sampleData.customerSampleData[1]);
    customer3 = new Customer(sampleData.customerSampleData[2]);
  });

  it('should be a function', () => {
    expect(Customer).to.be.a('function');
  });

  it('should create an instance of Customer', () => {
    expect(customer1).to.be.an.instanceOf(Customer);
  });

  it('should take an object and derive its properties from that', () => {
    expect(customer1.name).to.equal('Leatha Ullrich');
    expect(customer1.id).to.equal(1);
  });

  it('should have an array of bookings that is empty initially', () => {
    expect(customer1.bookings).to.deep.equal([]);
  });

  it('should be able to create a new Booking and add it to its bookings', () => {
    customer1.createBooking(booking3, rooms);
    expect(customer1.bookings).to.deep.equal([{
      "id": "5fwrgu4i7k55hl6t5",
      "userID": 1,
      "date": "2020/04/22",
      "roomNumber": 1,
      "roomServiceCharges": []
    }]);
  });

  it('should be able to request a room after creating a new Booking', () => {
    customer1.createBooking(booking3, rooms);
    expect(room1.nightsBooked).to.deep.equal(['2020/04/22']);
  });

  it('should not have an unsuccessful Booking pushed into its array of bookings', () => {
    customer1.createBooking(booking3, rooms);
    customer2.createBooking(booking1, rooms);
    expect(customer2.bookings).to.deep.equal([]);
  });
});

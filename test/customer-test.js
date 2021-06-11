import chai from 'chai';
const expect = chai.expect;
import sampleData from './sample-data.js';
import Booking from '../src/classes/booking.js';
import Room from '../src/classes/room.js';
import Customer from '../src/classes/customer.js';

describe('Customer', function() {

  let booking1, booking2, room1, room2, customer1, customer2, customer3;

  beforeEach(() => {
    booking1 = new Booking(sampleData.bookingsSampleData[0]);
    booking2 = new Booking(sampleData.bookingsSampleData[1]);
    room1 = new Room(sampleData.roomSampleData[0]);
    room2 = new Room(sampleData.roomSampleData[1]);
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
});

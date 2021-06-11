import chai from 'chai';
const expect = chai.expect;
import sampleData from './sample-data.js';
import Booking from '../src/classes/booking.js';
import Room from '../src/classes/room.js';

describe('Booking', function() {
  it('should be a function', function() {
    expect(Booking).to.be.a('function');
  });
});

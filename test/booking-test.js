import chai from 'chai';
const expect = chai.expect;
import Booking from '../src/classes/booking.js';

describe('Booking', function() {
  it('should be a function', function() {
    expect(Booking).to.be.a('function');
  });
});

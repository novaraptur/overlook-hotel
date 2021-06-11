import chai from 'chai';
const expect = chai.expect;
import Room from '../src/classes/room.js';

describe('Room', function() {
  it('should be a function', function() {
    expect(Room).to.be.a('function');
  });
});

import chai from 'chai';
const expect = chai.expect;
import sampleData from './sample-data.js';
import Room from '../src/classes/room.js';

describe('Room', function() {
  it('should be a function', function() {
    expect(Room).to.be.a('function');
  });
});

import chai from 'chai';
const expect = chai.expect;
import sampleData from './sample-data.js';
import Room from '../src/classes/room.js';

describe('Room', function() {

  let room1, room2;

  beforeEach(() => {
    room1 = new Room(sampleData.roomSampleData[0]);
    room2 = new Room(sampleData.roomSampleData[1]);
  })

  it('should be a function', () => {
    expect(Room).to.be.a('function');
  });

  it('should create an instance of Room', () => {
    expect(room1).to.be.an.instanceOf(Room);
  });
});

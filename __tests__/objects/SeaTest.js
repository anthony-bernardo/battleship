import Sea from '../../src/objects/Sea.js';
import Ship from '../../src/objects/Ship.js';
import Orientation from '../../src/objects/Orientation.js';
import Position from '../../src/objects/Position.js';

const sea = new Sea(5, 5);
const littleShip = new Ship('Petit bateau', 2, Orientation.HORIZONTAL);
const bigShip = new Ship('Porte-avion', 5, Orientation.VERTICAL);
describe('placeShip()', () => {

  test('with horiziontal ship, return nothing', () => {
    expect(() => {
      sea.placeShip(littleShip, new Position(4, 3));
    }).not.toThrow();
  });

  test('with horiziontal ship out of bound, throw exception', () => {
    expect(() => {
      sea.placeShip(littleShip, new Position(4, 4));
    }).toThrow('ship is out of the sea !');
  });

  test('with vertical ship, return nothing', () => {
    expect(() => {
      sea.placeShip(bigShip, new Position(0, 4));
    }).not.toThrow();
  });

  test('with vertical ship out of bound, throw exception', () => {
    expect(() => {
      sea.placeShip(bigShip, new Position(1, 4));
    }).toThrow('ship is out of the sea !');
  });

  test('with ship out of bound, throw exception', () => {
    expect(() => {
      sea.placeShip(bigShip, new Position(1000, 1000));
    }).toThrow('ship is out of the sea !');
  });

});
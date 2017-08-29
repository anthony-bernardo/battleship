import Sea from '../../src/objects/Sea.js';
import Ship from '../../src/objects/Ship.js';
import Orientation from '../../src/objects/Orientation.js';
import Position from '../../src/objects/Position.js';
import CellState from '../../src/objects/CellState.js';

let sea;
let littleShip;
let bigShip;
beforeEach(() => {
  sea = new Sea(5, 5);
  littleShip = new Ship('Petit bateau', 2, Orientation.HORIZONTAL);
  bigShip = new Ship('Porte-avion', 5, Orientation.VERTICAL);
});

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

  test('with 2 ships on the same place, throw exception', () => {
    expect(() => {
      sea.placeShip(littleShip, new Position(0, 1));
      sea.placeShip(bigShip, new Position(0, 2));
    }).toThrow('there is already a ship here !');
  });

});

describe('fireAtPosition()', () => {

  test('return HITTEN_SEA if fire miss the ship', () => {
    sea.placeShip(littleShip, new Position(0, 0));
    const fireResult = sea.fireAtPosition(new Position(0, 2));
    expect(fireResult).toBe(CellState.HITTEN_SEA);
  });

  test('return HITTEN_SHIP if fire hit a ship', () => {
    sea.placeShip(littleShip, new Position(0, 0));
    const fireResult = sea.fireAtPosition(new Position(0, 0));
    expect(fireResult).toBe(CellState.HITTEN_SHIP);
  });

  test('when try to hit a previously hit position, throw an exception', () => {
    expect(() => {
      sea.placeShip(littleShip, new Position(0, 0));
      sea.fireAtPosition(new Position(3, 3));
      sea.fireAtPosition(new Position(3, 3));
    }).toThrow('you have already hit this position');
  });

  test('when try to hit a previously ship hit position, throw an exception', () => {
    expect(() => {
      sea.placeShip(littleShip, new Position(0, 0));
      sea.fireAtPosition(new Position(0, 0));
      sea.fireAtPosition(new Position(0, 0));
    }).toThrow('you have already hit this position');
  });

});
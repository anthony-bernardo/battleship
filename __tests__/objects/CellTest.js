import Cell from '../../src/objects/Cell.js';
import CellState from '../../src/objects/CellState.js';
import Orientation from '../../src/geospatial/Orientation.js';
import ShipPart from '../../src/objects/ShipPart.js';

let cell;
beforeEach(() => {
    cell = new Cell();
});

describe('placeShip()', () => {

    test('cell.state is CellState.SHIP after placeShip()', () => {
        cell.placeShip(Orientation.HORIZONTAL, ShipPart.BOW);
        expect(cell.state).toBe(CellState.SHIP);
    });
});

describe('destroy()', () => {

    test('cell.state is CellState.HITTEN_SHIP after destroyed()', () => {
        cell.destroy();
        expect(cell.state).toBe(CellState.HITTEN_SHIP);
    });
});

describe('miss()', () => {

    test('cell.state is CellState.HITTEN_SEA after miss()', () => {
        cell.miss();
        expect(cell.state).toBe(CellState.HITTEN_SEA);
    });
});

describe('state', () => {

    test('return CellState.SEA by default', () => {
        expect(cell.state).toBe(CellState.SEA);
    });
});

describe('orientation', () => {

    test('return undefined by default', () => {
        expect(cell.orientation).toBe(undefined);
    });

});

describe('shipPart', () => {

    test('return undefined by default', () => {
        expect(cell.shipPart).toBe(undefined);
    });

});

describe('isDestroyedPart', () => {

    test('return undefined by default', () => {
        expect(cell.isDestroyedPart).toBe(undefined);
    });

});
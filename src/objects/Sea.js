import Orientation from '../geospatial/Orientation.js';
import Position from '../geospatial/Position.js';
import CellState from './CellState.js';
import Cell from './Cell.js';
import ShipPart from './ShipPart.js';

export default class Sea {
    constructor(width, height) {
        this._witdh = width;
        this._height = height;
        // sea matrix is filled with Cell objects
        const createMatrix = (x, y) => Array.from({ length: x }, () =>
            Array.from({ length: y }, () => new Cell())
        );
        this._seaMatrix = createMatrix(width, height);
    }
    get width() {
        return this._witdh;
    }
    get height() {
        return this._height;
    }
    get seaMatrix() {
        return this._seaMatrix;
    }
    placeShip(ship, position) {
        const shipPlacedPositionArray = Array(ship.lenght);
        // fill the matrix with Cell depeding the ship size
        for (let i = 0; ship.lenght > i; i++) {
            // determine the ship part
            let shipPart = ShipPart.DECK;
            switch (i) {
                case 0:
                    shipPart = ShipPart.BOW;
                    break;
                case ship.lenght - 1:
                    shipPart = ShipPart.STERN;
                    break;
            } // SASD
            // set cell position
            let positionX = position.x;
            let positionY = position.y;
            switch (ship.orientation) {
                case Orientation.HORIZONTAL:
                    positionY = position.y + i;
                    break;

                case Orientation.VERTICAL:
                    positionX = position.x + i;
                    break;
            }
            const cellPosition = new Position(positionX, positionY);
            // check if ship is in bound
            if (!this._checkShipInBound(ship, cellPosition)) {
                this._placeShipError('ship is out of the sea !', shipPlacedPositionArray);
            }
            // fill with a Ship Cell
            const cellToFill = this._seaMatrix[positionX][positionY];
            if (cellToFill.state === CellState.SHIP) { 
                this._placeShipError('there is already a ship here !', shipPlacedPositionArray);
            }
            cellToFill.placeShip(ship.orientation, shipPart);
            this._seaMatrix[positionX][positionY] = cellToFill;
            shipPlacedPositionArray[i] = cellPosition;
        }
        
    }
    fireAtPosition(position) {
        const hittenCell = this._seaMatrix[position.x][position.y];
        switch (hittenCell.state) {
            // there is a ship
            case CellState.SHIP:
                hittenCell.destroy();
                this._seaMatrix[position.x][position.y] = hittenCell;
                return CellState.HITTEN_SHIP;
                // there is nothing
            case CellState.SEA:
                hittenCell.miss();
                this._seaMatrix[position.x][position.y] = hittenCell;
                return CellState.HITTEN_SEA;
                // there is a previously hit cell
            case CellState.HITTEN_SEA:
                throw Error('you have already hit this position');
            case CellState.HITTEN_SHIP:
                throw Error('you have already hit this position');
        }
    }
    // Private methods     
    _placeShipError(errorMessage, shipPlacedPositionArray) {
        // erase the previous cell flagged with 1
        shipPlacedPositionArray.forEach(function (cellPosition) {
            if (cellPosition == undefined) {
                return;
            }
            let cell = this._seaMatrix[cellPosition.x][cellPosition.y];
            cell.reset()
            this._seaMatrix[cellPosition.x][cellPosition.y] = cell;
        }, this);
        throw Error(errorMessage);
    }
    _checkShipInBound(ship, position) {
        switch (ship.orientation) {
            case Orientation.HORIZONTAL:
                return (position.y >= 0) && (position.y < this._seaMatrix.length);

            case Orientation.VERTICAL:
                return (position.x >= 0) && (position.x < this._seaMatrix[0].length);

        }
    }
}
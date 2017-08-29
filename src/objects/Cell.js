import CellState from './CellState.js';

export default class Cell{
    constructor(){
        this._state = CellState.SEA;
        this._orientation = undefined;
        this._shipPart = undefined;
        this._isDestroyedPart = undefined;
    }

    placeShip(orientation, shipPart){
        this._orientation = orientation;
        this._shipPart = shipPart;
        this._state = CellState.SHIP;
    }

    destroy(){
        this._state = CellState.HITTEN_SHIP;
    }

    miss(){
        this._state = CellState.HITTEN_SEA;
    }

    reset(){
        this._state = CellState.SEA;
    }

    get state(){
        return this._state;
    }

    get orientation(){
        return this._orientation;
    }

    get shipPart(){
        return this._shipPart;
    }

    get isDestroyedPart(){
        return this._isDestroyedPart;
    }

}
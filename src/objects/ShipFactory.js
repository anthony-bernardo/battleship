import ShipType from './ShipType.js';
import Ship from './Ship.js';

export default class ShipFactory{
    constructor (shipType, orientation) { 
        this._shipType = shipType;
        this._orientation = orientation;
    } 
    create () { 
        switch(this._shipType){
            case ShipType.LITTLE:
                return new Ship('Little ship', 2, this._orientation); 
            case ShipType.BIG:
                return new Ship('Big ship', 5, this._orientation); 
        }
    }
}
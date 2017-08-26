import Orientation from './Orientation.js';
import Position from './Position.js';

export default class Sea{
    constructor(width, height){
        this._witdh = width;
        this._height = height;
        this._seaMatrix = Array(width).fill(0).map(()=>Array(height).fill(0));
    }
    get width(){ return this._witdh; }
    get height(){ return this._height; }
    get seaMatrix() { return this._seaMatrix; }
    placeShip(ship, position){
        // fill the matrix with 1 depeding the ship size
        for(let i = 0; ship.lenght > i; i++){
            let positionX = position.x;
            let positionY = position.y;
            switch(ship.orientation){
                case Orientation.HORIZONTAL:
                    positionY = position.y + i;
                    break;

                case Orientation.VERTICAL:
                    positionX = position.x + i;
                    break;
            }
            // check if ship is in bound
            if(!this._checkShipInBound(ship, new Position(positionX, positionY))){
                throw Error(`ship is out of the sea !`);
            }
              // fill with the 1
            this._seaMatrix[positionX][positionY] = 1; 
        }        
    }
    _checkShipInBound(ship, position){
        switch(ship.orientation){
            case Orientation.HORIZONTAL:
            return (position.y >= 0) && (position.y < this._seaMatrix.length);

            case Orientation.VERTICAL:
            return (position.x >= 0) && (position.x < this._seaMatrix[0].length);

        }
    }
}
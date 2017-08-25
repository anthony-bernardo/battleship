import Orientation from './Orientation.js';

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
            // fill with the 1
            switch(ship.orientation){
                case Orientation.HORIZONTAL:
                    if(!this.checkShipInBound(ship, position.y + i)){
                        throw Error(`${ship.name} is out of the sea !`);
                    }
                    this._seaMatrix[position.x][position.y + i] = 1; 
                    break;

                case Orientation.VERTICAL:
                    if(!this.checkShipInBound(ship, position.x + i)){
                        throw Error(`${ship.name} is out of the sea !`);
                    }
                    this._seaMatrix[position.x + i][position.y] = 1; 
                    break;
            }
        }        
    }
    checkShipInBound(ship, positionIndex){
        switch(ship.orientation){
            case Orientation.HORIZONTAL:
            return (positionIndex >= 0) && (positionIndex < this._seaMatrix.length);

            case Orientation.VERTICAL:
            return (positionIndex >= 0) && (positionIndex < this._seaMatrix[0].length);

        }
    }
}
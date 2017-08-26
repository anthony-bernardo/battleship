import Orientation from './Orientation.js';
import Position from './Position.js';
import GameState from './GameState.js';
import CellState from './CellState.js';
export default class Sea{
    constructor(width, height){
        this._witdh = width;
        this._height = height;
        this._seaMatrix = Array(width).fill(0).map(()=>Array(height).fill(0));
        this._stateOfGame = GameState.SETUP;
    }
    get width(){ return this._witdh; }
    get height(){ return this._height; }
    get seaMatrix() { return this._seaMatrix; }
    placeShip(ship, position){
        if(this._stateOfGame !== GameState.SETUP){
            throw Error(`you cannot place ship !`);
        }
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
            const cellToFill = this._seaMatrix[positionX][positionY];
            if(cellToFill === CellState.SHIP){
                throw Error(`there is already a ship here !`);
            }
            this._seaMatrix[positionX][positionY] = CellState.SHIP; 
        }        
    }
    startTheGame(){
        this._stateOfGame = GameState.STARTED;
    }
    fireAtPosition(position){
        if(this._stateOfGame !== GameState.STARTED){
            throw Error(`you cannot fire at position !`);
        }

        const cellValue = this._seaMatrix[position.x][position.y];
        switch(cellValue){
            // there is a ship
            case CellState.SHIP:
                this._seaMatrix[position.x][position.y] = CellState.HITTEN_SHIP;
                return CellState.HITTEN_SHIP;
            // there is nothing
            case CellState.SEA:
                this._seaMatrix[position.x][position.y] = CellState.HITTEN_SEA;
                return CellState.HITTEN_SEA;
            // there is a previously hit cell
            case CellState.HITTEN_SEA:
                throw Error('you have already hit this position');
            case CellState.HITTEN_SHIP:
                throw Error('you have already hit this position');
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
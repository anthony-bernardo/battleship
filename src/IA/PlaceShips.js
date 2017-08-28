import GameSettings from '../objects/GameSettings.js';
import Position from '../objects/Position.js';
import Orientation from '../objects/Orientation.js';

export default class PlaceShips{
    constructor(game, player){
        this._game = game;
        this._player = player;
        this._shipsTypeToPlace = Object.assign({}, GameSettings.shipsToPlace);
    }
    execute(){
        Object.keys(this._shipsTypeToPlace).forEach((key, index) => {
            shipType = index;
            nbShipToPlace = this._shipsTypeToPlace[key];
            // place all ships of this type
            for (let index = 0; index < nbShipToPlace; index++) {
                this._randomlyPlaceShip(shipType);    
            }
        }); 
        return this._game;   
    }
    // TODO: private
    _randomlyPlaceShip(shipType){
        const randomOrientation = (Math.floor(Math.random() * 2) == 1 ? Orientation.HORIZONTAL : Orientation.VERTICAL);
        const randomX = Math.floor(Math.random() * 10); 
        const randomY = Math.floor(Math.random() * 10);
        const randomPosition = new Position(randomX, randomY); 
        try {
            this._game.placeShip(this._player, shipType, randomOrientation, randomPosition); 
        } catch (error) {
            this._randomlyPlaceShip(shipType); // retry recursivly
        }   
    }
}
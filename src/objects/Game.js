import ShipFactory from './ShipFactory.js';
import Sea from './Sea.js';

export default class Game{
    constructor(player1, player2, seaSize){
        if(player1.id == player2.id){
            throw new Error('2 differents players needed');
        }
        // players
        this._players = Array(2);
        this._players[player1.id] = player1;
        this._players[player2.id] = player2;
        // players sea
        this._playersSea = Array(2);
        this._playersSea[player1.id] = new Sea(seaSize, seaSize);
        this._playersSea[player2.id] = new Sea(seaSize, seaSize);
    }
    playerPlaceShip(player, shipType, orientation, position){
        // create ship
        const shipFactory = new ShipFactory(shipType, orientation);
        ship = shipFactory.create();
        // place ship
        this._playersSea[player.id].placeShip(ship, position);
    }
    playerSea(player){ return this._playersSea[player.id]; }
}
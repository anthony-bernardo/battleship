import ShipFactory from './ShipFactory.js';
import ShipType from './ShipType.js';
import Sea from './Sea.js';
import GameState from './GameState.js';
import GameSettings from './GameSettings.js';

export default class Game{
    constructor(player1, player2, seaSize){
        if(player1.id == player2.id){
            throw new Error('2 differents players needed');
        }
        this._stateOfGame = GameState.SETUP;
        // players
        this._player1 = player1;
        this._player2 = player2;
        // players sea
        this._playersSea = Array(2);
        this._playersSea[player1.id] = new Sea(seaSize, seaSize);
        this._playersSea[player2.id] = new Sea(seaSize, seaSize);
        // ship place
        this._shipsTypeToPlace = Array(2);
        this._shipsTypeToPlace[player1.id] = Object.assign({}, GameSettings.shipsToPlace);
        this._shipsTypeToPlace[player2.id] = Object.assign({}, GameSettings.shipsToPlace);
    }
    placeShip(player, shipType, orientation, position){
        if(this._stateOfGame !== GameState.SETUP){
            throw Error(`you cannot place ship, game has started`);
        }
        // check if this shipType can be placed
        if(this._shipsTypeToPlace[player.id][shipType] == 0){
            throw new Error('player cannot place this boat on more time');
        }
        // create ship
        const shipFactory = new ShipFactory(shipType, orientation);
        ship = shipFactory.create();
        // place ship
        this._playersSea[player.id].placeShip(ship, position);
        this._shipsTypeToPlace[player.id][shipType] = this._shipsTypeToPlace[player.id][shipType] - 1;
    }
    playerSea(player){ return this._playersSea[player.id]; }
    startGame(){
        // check if players have placed all the ships
        Object.keys(this._shipsTypeToPlace[this._player1.id]).forEach((key, index) => {
            if(this._shipsTypeToPlace[this._player1.id][key] != 0){
                throw new Error('The players have not placed all the ships');
            }
        });

        Object.keys(this._shipsTypeToPlace[this._player2.id]).forEach((key, index) => {
            if(this._shipsTypeToPlace[this._player2.id][key] != 0){
                throw new Error('The players have not placed all the ships');
            }
        });
        // change the state
        this._stateOfGame = GameState.STARTED;
    }
    fireAtPosition(player, position){
        if(this._stateOfGame !== GameState.STARTED){
            throw Error(`you cannot fire at position, game has not started`);
        }
    }
}
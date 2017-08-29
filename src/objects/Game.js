import ShipFactory from './ShipFactory.js';
import ShipType from './ShipType.js';
import Sea from './Sea.js';
import GameState from './GameState.js';
import GameSettings from './GameSettings.js';
import CellState from './CellState.js';

export default class Game {
    constructor(player1, player2, seaSize) {
        if (player1.id == player2.id) {
            throw new Error('2 differents players needed');
        }
        // state
        this._stateOfGame = GameState.SETUP;
        // hits
        this._nbAllHits = 0;
        this._nbSuccessfulHits = Array(2);
        this._nbSuccessfulHits[player1.id] = 0;
        this._nbSuccessfulHits[player2.id] = 0;
        // player currently playing
        this._playerCurrentlyPlaying = undefined;
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
    get state() {
        return this._stateOfGame;
    }
    get playerCurrentlyPlaying() {
        return this._playerCurrentlyPlaying;
    }
    placeShip(player, shipType, orientation, position) {
        if (this._stateOfGame !== GameState.SETUP) {
            throw Error(`you cannot place ship, game has started`);
        }
        // check if this shipType can be placed
        if (this._shipsTypeToPlace[player.id][shipType] == 0) {
            throw new Error('player cannot place this boat on more time');
        }
        // create ship
        const shipFactory = new ShipFactory(shipType, orientation);
        ship = shipFactory.create();
        // place ship
        this._playersSea[player.id].placeShip(ship, position);
        this._shipsTypeToPlace[player.id][shipType] -= 1;
    }
    playerSea(player) {
        return this._playersSea[player.id];
    }
    didPlayerPlaceAllShips(player) {
        Object.keys(this._shipsTypeToPlace[player.id]).forEach((key, index) => {
            if (this._shipsTypeToPlace[player.id][key] != 0) {
                throw new Error('The player has not placed all the ships');
            }
        });
        return true;
    }
    startGame(playerToStart) {
        // check if players have placed all the ships
        this.didPlayerPlaceAllShips(this._player1);
        this.didPlayerPlaceAllShips(this._player2);
        // change the state
        this._stateOfGame = GameState.STARTED;
        if (playerToStart !== undefined) {
            this._playerCurrentlyPlaying = playerToStart;
        } else {
            // choose randomly first player to play
            this._playerCurrentlyPlaying = (Math.floor(Math.random() * 2) == 1 ? this._player1 : this._player2);
        }
    }
    fireAtPosition(player, position) {
        if (this._stateOfGame == GameState.ENDED) {
            throw Error('the game is over');
        }
        if (this._stateOfGame !== GameState.STARTED) {
            throw Error(`you cannot fire at position, game has not started`);
        }
        if (this._playerCurrentlyPlaying !== player) {
            throw Error('not your turn');
        }
        // hit on ennemy player sea
        let playerToHit = (this._playerCurrentlyPlaying === this._player1 ? this._player2 : this._player1);
        let fireResult = this._playersSea[playerToHit.id].fireAtPosition(position);
        this._nbAllHits++;
        // if ship hitten 
        if (fireResult === CellState.HITTEN_SHIP) {
            this._nbSuccessfulHits[player.id]++;
        }
        // check if the player has sink all ships
        if (this._nbSuccessfulHits[player.id] >= GameSettings.nbCellToHit) {
            this._stateOfGame = GameState.ENDED;
        }
        // check if player turn expired
        if (this._nbAllHits % GameSettings.nbHitByPlayer == 0) {
            // switch player turn
            this._playerCurrentlyPlaying = (this._playerCurrentlyPlaying === this._player1 ? this._player2 : this._player1);
        }
    }
}
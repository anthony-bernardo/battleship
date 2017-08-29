import Sea from '../../src/objects/Sea.js';
import Ship from '../../src/objects/Ship.js';
import ShipType from '../../src/objects/ShipType.js';
import Orientation from '../../src/geospatial/Orientation.js';
import Position from '../../src/geospatial/Position.js';
import CellState from '../../src/objects/CellState.js';
import Game from '../../src/objects/Game.js';
import Player from '../../src/objects/Player.js';
import GameState from '../../src/objects/GameState.js';

let game;
let sea;
let littleShip;
let bigShip;
let player1;
let player2;
beforeEach(() => {
    player1 = new Player(1001, 'Anthony');
    player2 = new Player(1002, 'Patrice');
    game = new Game(player1, player2, 10);
});

describe('Game()', () => {
    test('throw error when set 2 same players', () => {
        expect(() => {
            game = new Game(player1, player1);
        }).toThrow('2 differents players needed');
    });
});

describe('placeShip()', () => {

    test('dont throw error if players place ship on the same place on their sea', () => {
        expect(() => {
            game.placeShip(player1, ShipType.LITTLE, Orientation.VERTICAL, new Position(0, 0));
            game.placeShip(player2, ShipType.LITTLE, Orientation.VERTICAL, new Position(0, 0));
        }).not.toThrow();
    });

    test('throw error if player place 2 times the LITTLE ship', () => {
        expect(() => {
            game.placeShip(player1, ShipType.LITTLE, Orientation.VERTICAL, new Position(0, 0));
            game.placeShip(player1, ShipType.LITTLE, Orientation.HORIZONTAL, new Position(4, 4));
        }).toThrow('player cannot place this boat on more time');
    });

    test('throw error if player place 2 times the BIG ship', () => {
        expect(() => {
            game.placeShip(player1, ShipType.LITTLE, Orientation.VERTICAL, new Position(0, 0));
            game.placeShip(player1, ShipType.MEDIUM, Orientation.HORIZONTAL, new Position(4, 4));
            game.placeShip(player1, ShipType.MEDIUM, Orientation.VERTICAL, new Position(5, 3));
            game.placeShip(player1, ShipType.BIG, Orientation.HORIZONTAL, new Position(0, 5));
            game.placeShip(player1, ShipType.BIG, Orientation.HORIZONTAL, new Position(5, 0));
        }).toThrow('player cannot place this boat on more time');
    });

    test('when player try to place a ship when game state is not SETUP, throw exception', () => {
        expect(() => {
            game.placeShip(player1, ShipType.LITTLE, Orientation.VERTICAL, new Position(0, 0));
            game.placeShip(player1, ShipType.MEDIUM, Orientation.HORIZONTAL, new Position(4, 4));
            game.placeShip(player1, ShipType.MEDIUM, Orientation.VERTICAL, new Position(5, 3));
            game.placeShip(player1, ShipType.BIG, Orientation.HORIZONTAL, new Position(0, 5));

            game.placeShip(player2, ShipType.LITTLE, Orientation.VERTICAL, new Position(0, 0));
            game.placeShip(player2, ShipType.MEDIUM, Orientation.HORIZONTAL, new Position(4, 4));
            game.placeShip(player2, ShipType.MEDIUM, Orientation.VERTICAL, new Position(5, 3));
            game.placeShip(player2, ShipType.BIG, Orientation.HORIZONTAL, new Position(0, 5));

            game.startGame();
            game.placeShip(player1, ShipType.LITTLE, Orientation.VERTICAL, new Position(0, 0));
        }).toThrow('you cannot place ship, game has started');
    });

});

describe('startGame()', () => {
    test('players place all the ships, so the game can begin', () => {
        expect(() => {
            game.placeShip(player1, ShipType.LITTLE, Orientation.VERTICAL, new Position(0, 0));
            game.placeShip(player1, ShipType.MEDIUM, Orientation.HORIZONTAL, new Position(4, 4));
            game.placeShip(player1, ShipType.MEDIUM, Orientation.VERTICAL, new Position(5, 3));
            game.placeShip(player1, ShipType.BIG, Orientation.HORIZONTAL, new Position(0, 5));

            game.placeShip(player2, ShipType.LITTLE, Orientation.VERTICAL, new Position(0, 0));
            game.placeShip(player2, ShipType.MEDIUM, Orientation.HORIZONTAL, new Position(4, 4));
            game.placeShip(player2, ShipType.MEDIUM, Orientation.VERTICAL, new Position(5, 3));
            game.placeShip(player2, ShipType.BIG, Orientation.HORIZONTAL, new Position(0, 5));

            game.startGame();
        }).not.toThrow();
    });

    test('throw error if players have missed a ship', () => {
        expect(() => {
            game.placeShip(player1, ShipType.LITTLE, Orientation.VERTICAL, new Position(0, 0));
            game.placeShip(player1, ShipType.MEDIUM, Orientation.HORIZONTAL, new Position(4, 4));
            game.placeShip(player1, ShipType.MEDIUM, Orientation.VERTICAL, new Position(5, 3));
            game.placeShip(player1, ShipType.BIG, Orientation.HORIZONTAL, new Position(0, 5));

            game.placeShip(player2, ShipType.LITTLE, Orientation.VERTICAL, new Position(0, 0));
            game.placeShip(player2, ShipType.MEDIUM, Orientation.HORIZONTAL, new Position(4, 4));
            game.placeShip(player2, ShipType.MEDIUM, Orientation.VERTICAL, new Position(5, 3));
            /// players2 miss the BIG 

            game.startGame();
        }).toThrow('The player has not placed all the ships');
    });

    test('at start, the game state must be SETUP', () => {
        pending('pending test');
    });

    test('when game has been launch, the game state must be STARTED', () => {
        pending('pending test');
    });
});

describe('fireAtPosition()', () => {
    beforeEach(() => {
        game.placeShip(player1, ShipType.LITTLE, Orientation.VERTICAL, new Position(0, 0));
        game.placeShip(player1, ShipType.MEDIUM, Orientation.HORIZONTAL, new Position(4, 4));
        game.placeShip(player1, ShipType.MEDIUM, Orientation.VERTICAL, new Position(5, 3));
        game.placeShip(player1, ShipType.BIG, Orientation.HORIZONTAL, new Position(0, 5));

        game.placeShip(player2, ShipType.LITTLE, Orientation.VERTICAL, new Position(0, 0));
        game.placeShip(player2, ShipType.MEDIUM, Orientation.HORIZONTAL, new Position(4, 4));
        game.placeShip(player2, ShipType.MEDIUM, Orientation.VERTICAL, new Position(5, 3));
        game.placeShip(player2, ShipType.BIG, Orientation.HORIZONTAL, new Position(0, 5));
    });

    test('when a player sink all ennemies ships, the game is over, and throw exception if try fire', () => {
        expect(() => {
            game.startGame(player1);

            game.fireAtPosition(player1, new Position(0, 0));
            game.fireAtPosition(player1, new Position(0, 1));
            game.fireAtPosition(player1, new Position(0, 2));

            game.fireAtPosition(player2, new Position(0, 0));
            game.fireAtPosition(player2, new Position(1, 0));
            game.fireAtPosition(player2, new Position(0, 5));

            game.fireAtPosition(player1, new Position(1, 0));
            game.fireAtPosition(player1, new Position(1, 1));
            game.fireAtPosition(player1, new Position(1, 2));

            game.fireAtPosition(player2, new Position(0, 6));
            game.fireAtPosition(player2, new Position(0, 7));
            game.fireAtPosition(player2, new Position(0, 8));

            game.fireAtPosition(player1, new Position(2, 0));
            game.fireAtPosition(player1, new Position(2, 1));
            game.fireAtPosition(player1, new Position(2, 2));

            game.fireAtPosition(player2, new Position(0, 9));
            game.fireAtPosition(player2, new Position(4, 4));
            game.fireAtPosition(player2, new Position(4, 5));

            game.fireAtPosition(player1, new Position(3, 0));
            game.fireAtPosition(player1, new Position(3, 1));
            game.fireAtPosition(player1, new Position(3, 2));

            game.fireAtPosition(player2, new Position(4, 6));
            game.fireAtPosition(player2, new Position(5, 3));
            game.fireAtPosition(player2, new Position(6, 3));

            game.fireAtPosition(player1, new Position(4, 0));
            game.fireAtPosition(player1, new Position(4, 1));
            game.fireAtPosition(player1, new Position(4, 2));

            game.fireAtPosition(player2, new Position(7, 3));
            // here the game is finish
            // so the next fire will throw an exception
            game.fireAtPosition(player2, new Position(7, 4));

        }).toThrow('the game is over');
    });

    test('each player can fire 3 times', () => {
        expect(() => {
            game.startGame(player1);

            game.fireAtPosition(player1, new Position(0, 0));
            game.fireAtPosition(player1, new Position(0, 1));
            game.fireAtPosition(player1, new Position(0, 2));

            game.fireAtPosition(player2, new Position(0, 0));
            game.fireAtPosition(player2, new Position(0, 1));
            game.fireAtPosition(player2, new Position(0, 2));
        }).not.toThrow();
    });

    test('when player try to fire when game state is not STARTED, throw exception', () => {
        expect(() => {
            game = new Game(player1, player2, 10);
            // missing startGame       
            game.fireAtPosition(player1, new Position(0, 0));
        }).toThrow('you cannot fire at position, game has not started');
    });

    test('when player try to fire but it is not his turn, throw exception', () => {
        expect(() => {
            game.startGame(player2);
            game.fireAtPosition(player1, new Position(0, 0));
        }).toThrow('not your turn');
    });
});


describe('state()', () => {
    beforeEach(() => {
        game.placeShip(player1, ShipType.LITTLE, Orientation.VERTICAL, new Position(0, 0));
        game.placeShip(player1, ShipType.MEDIUM, Orientation.HORIZONTAL, new Position(4, 4));
        game.placeShip(player1, ShipType.MEDIUM, Orientation.VERTICAL, new Position(5, 3));
        game.placeShip(player1, ShipType.BIG, Orientation.HORIZONTAL, new Position(0, 5));

        game.placeShip(player2, ShipType.LITTLE, Orientation.VERTICAL, new Position(0, 0));
        game.placeShip(player2, ShipType.MEDIUM, Orientation.HORIZONTAL, new Position(4, 4));
        game.placeShip(player2, ShipType.MEDIUM, Orientation.VERTICAL, new Position(5, 3));
        game.placeShip(player2, ShipType.BIG, Orientation.HORIZONTAL, new Position(0, 5));
    });
    test('when a player sink all ennemies ships, the game state must be ENDED', () => {
        game.startGame(player1);

        game.fireAtPosition(player1, new Position(0, 0));
        game.fireAtPosition(player1, new Position(0, 1));
        game.fireAtPosition(player1, new Position(0, 2));

        game.fireAtPosition(player2, new Position(0, 0));
        game.fireAtPosition(player2, new Position(1, 0));
        game.fireAtPosition(player2, new Position(0, 5));

        game.fireAtPosition(player1, new Position(1, 0));
        game.fireAtPosition(player1, new Position(1, 1));
        game.fireAtPosition(player1, new Position(1, 2));

        game.fireAtPosition(player2, new Position(0, 6));
        game.fireAtPosition(player2, new Position(0, 7));
        game.fireAtPosition(player2, new Position(0, 8));

        game.fireAtPosition(player1, new Position(2, 0));
        game.fireAtPosition(player1, new Position(2, 1));
        game.fireAtPosition(player1, new Position(2, 2));

        game.fireAtPosition(player2, new Position(0, 9));
        game.fireAtPosition(player2, new Position(4, 4));
        game.fireAtPosition(player2, new Position(4, 5));

        game.fireAtPosition(player1, new Position(3, 0));
        game.fireAtPosition(player1, new Position(3, 1));
        game.fireAtPosition(player1, new Position(3, 2));

        game.fireAtPosition(player2, new Position(4, 6));
        game.fireAtPosition(player2, new Position(5, 3));
        game.fireAtPosition(player2, new Position(6, 3));

        game.fireAtPosition(player1, new Position(4, 0));
        game.fireAtPosition(player1, new Position(4, 1));
        game.fireAtPosition(player1, new Position(4, 2));

        game.fireAtPosition(player2, new Position(7, 3));

        expect(game.state).toBe(GameState.ENDED);
    });
});
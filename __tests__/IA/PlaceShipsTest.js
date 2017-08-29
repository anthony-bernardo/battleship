import PlaceShips from '../../src/IA/PlaceShips.js';
import Player from '../../src/objects/Player.js';
import Game from '../../src/objects/Game.js';

let placeShips;
let game;
let player1;
let player2;
beforeEach(() => {
  player1 = new Player(1001, 'Anthony');
  player2 = new Player(1002, 'Ivan');
  game = new Game(player1, player2, 10);
  placeShips = new PlaceShips(game, player1);
});

describe('execute()', () => {

  test('place all ships randomly on the player sea', () => {
    placeShips.execute();
    expect(game.didPlayerPlaceAllShips(player1)).toBe(true);
  });

  test('expect to see 13 cells on the sea after all ship places', () => {
    placeShips.execute();
    let nbCells = 0;
    game.playerSea(player1).seaMatrix.map((row) => {
      row.map((cell) => {
        if (cell === 1) {
          nbCells++;
        }
      });
    });
    expect(nbCells).toEqual(13);
  });
});
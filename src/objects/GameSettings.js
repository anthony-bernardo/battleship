import ShipType from './ShipType.js';
const GameSettings = {
    // nb of fire by turn for a user
    nbHitByPlayer: 3,
    // index are ShipType, value is nb of ships 
    shipsToPlace: {
        0: 1,
        1: 2,
        2: 1
    },
    // nb of hit on ships to win the party
    nbCellToHit: 13
};
export default GameSettings;
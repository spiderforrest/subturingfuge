import {
    createGame,
    subscribeToUserJoins,
    subscribeToUserResponses,
    sendPacket,
} from '../fetch-utils.js';

import { renderHostHeader, renderHostSetup } from '../render-utils.js';

// state
let gameCode;

// initalization
self.addEventListener('load', () => {
    // add controls to the host page
    modifyHostHeader();
    // make a code
    gameCode = generateGameCode();
    // create a game
    createGame(gameCode);
    // start listening for user joins
    subscribeToUserJoins();
});

// thanks stackoverflow-might need to add something to make sure it's 4 chars?
function generateGameCode() {
    return Math.random().toString(36).slice(2, 6);
}
function modifyHostHeader() {}

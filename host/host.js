import {
    createGame,
    subscribeToUserJoins,
    subscribeToUserResponses,
    sendPacket,
} from '../fetch-utils.js';

import { renderHostSetup, renderPromptPage } from '../render-utils.js';

// dom
const startGameButton = document.getElementById('start-game-button');

// state
let gameCode;

// initalization
self.addEventListener('load', async () => {
    // make a code
    gameCode = generateGameCode();
    // create a game
    await createGame(gameCode);
    // start listening for user joins
    await subscribeToUserJoins(gameCode);
});

startGameButton.addEventListener('click', () => {
    renderPromptPage();
});

// thanks stackoverflow-might need to add something to make sure it's 4 chars?
function generateGameCode() {
    return Math.random().toString(36).slice(2, 6);
}

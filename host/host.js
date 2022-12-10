import {
    createGame,
    subscribeToUserJoins,
    unsubscribeToUserJoins,
    subscribeToUserResponses,
    sendPacket,
} from '../fetch-utils.js';

import { renderHostSetup, renderPromptPage } from '../render-utils.js';

// dom
const startGameButton = document.getElementById('start-game-button');
const nextButton = document.getElementById('next-button');

// state
// on gameStage: i wish we had enums but here's the stage key:
// 0: setup, 1: prompt, 2: response, 3: guesses, 4: round results, 5: over
let gameCode, gameStage;
const playerArray = [];
const promptArray = [];

// initalization
self.addEventListener('load', async () => {
    // make a code
    gameCode = generateGameCode();
    // create the game
    await createGame(gameCode);
    // start listening for user joins
    await subscribeToUserJoins(gameCode, subscribeToUserJoinsHandler);
});

// launch the game
startGameButton.addEventListener('click', () => {
    // stop allowing joins
    unsubscribeToUserJoins(gameCode, subscribeToUserJoinsHandler);
    // set the game stage to the prompt stage, which is 1

    // render the prompt page, the first game page
    renderPromptPage();
});

// thanks stackoverflow-might need to add something to make sure it's 4 chars?
function generateGameCode() {
    return Math.random().toString(36).slice(2, 6);
}

// handlers
// this adds player objects to the array when one joins
function subscribeToUserJoinsHandler(packet) {
    const player = {
        uuid: packet.client_uuid,
        username: packet.username,
    };
    playerArray.push(player);
}

// this is half of the main game loop; it triggers when incoming response, checks gamestage, and tallies shit
function subscribeToUserResponsesHandler(packet) {
    switch (gameStage) {
        // prompt stage
        case 0:
            // just add the user's new prompt
            promptArray.push(packet.prompt_text);
            // TODO: add a visible counter for everyone, which would mean a packet needs to get sent out here
            break;
        // response stage
        // guesses stage
        // round results stage
        // end game page
    }
}

// kinda the main loop here
// when the next button is clicked, check gameStage to determine what needs to be ran
nextButton.addEventListener('click', () => {
    switch (gameStage) {
        // prompt stage
        case 1:
            // call the function
            promptStage();
            // move to the response stage
            gameStage = 2;
            break;
        // response stage
        // guesses stage
        // round results stage
        // end game page
    }
});
function promptStage() {}
function responseStage() {}
function guessesStage() {}
function resultsStage() {}
function endGame() {}

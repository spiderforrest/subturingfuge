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
let gameCode, gameStage;
const playerArray = [];
let promptArray = [];
let responseArray = [];
let guessArray = [];

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
    // set the game stage to the prompt stage
    gameStage = 'prompt';
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
        case 'prompt':
            // just add the user's new prompt
            promptArray.push(packet.prompt_text);
            // TODO: add a visible counter for everyone, which would mean a packet needs to get sent out here
            break;
        // response stage
        case 'response':
            // add the incoming response to the array
            responseArray.push({
                uuid: packet.client_uuid,
                username: packet.username,
                response: packet.response,
            });
            break;
        // guesses stage
        case 'guesses':
            // i 'guess' i'll just toss it in an array again
            guessArray.push(packet.guess);
            break;
    }
}

// kinda the main loop here
// when the next button is clicked, check gameStage to determine what needs to be ran
nextButton.addEventListener('click', () => {
    switch (gameStage) {
        // end prompt stage
        case 'prompt':
            // move to the response stage
            gameStage = 'response';
            // call the start stage function
            responseStage();
            break;
        // end response stage
        case 'response':
            gameStage = 'guesses';
            guessesStage();
            break;
        // end guesses stage
        case 'guesses':
            gameStage = 'results';
            resultsStage();
            break;
        // end round results stage
        case 'results':
            // TODO: check if there's more prompts and set to response
            gameStage = 'over';
            endGame();
            break;
    }
});

// main game functions, they run at the START of the stage they're named
function responseStage() {
    // reset responses
    responseArray = [];
    // pick a prompt
    const randNum = Math.floor(Math.random() * promptArray.length);
    const activePrompt = promptArray[randNum];
    // remove the prompt from promptArray
    promptArray = promptArray.splice(randNum, 1);
    // send out packet with prompt
    sendPacket({ promptText: activePrompt }, gameStage);
    // get the GPT response
}
function guessesStage() {
    guessArray = [];
    // send out all the response text and usernames as seperate arrays
    const packet = {
        response: [],
        usernames: [],
    };
    for (const item of playerArray) {
        packet.usernames.push(item.username);
    }
}
function resultsStage() {
    // hard part: tally everyone's scores
    // send out packet with response:username pairs and the score
}
function endGame() {}

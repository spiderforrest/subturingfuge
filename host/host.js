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
// i have no idea how to balance a game, TODO: anyone else pick better values
const correctGuessAi = 200;
const correctGuessUser = 75;

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
        score: 0,
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
        case 'response':
            // add the incoming response to the array
            responseArray.push({
                uuid: packet.client_uuid,
                username: packet.username,
                response: packet.response,
            });
            break;
        case 'guesses':
            // modify the response array's objects to hold each user's guess
            for (const item in packet.guess) {
                // i hate this
                // i love this
                // go to index item.id in the array, which is an object, and in that object add guesserUsername:guess-eeUsername
                responseArray[item.id][packet.username] = item.guess;
                // final structure of an item in responseArray: {uuid:, username:, response:, ${playerXGuess}:${playerYUsername}...}
            }
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
        case 'response':
            gameStage = 'guess';
            guessesStage();
            break;
        case 'guess':
            gameStage = 'results';
            resultsStage();
            break;
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
    sendPacket({ promptText: activePrompt }, 'prompt');
    // get the GPT response
}
function guessesStage() {
    // weird format here. we need an array that has an object for each response and that object will have each user's guess at who
    // wrote it appended to the object as key:value when it arrives(see subscribeToUserResponseHandler). so, gonna just reuse the responseArray.

    // send out all the response text and usernames as seperate arrays
    // create the object to put in the packet
    const state = {
        response: [],
        usernames: [],
    };
    // propogate the arrays with the raw list of usernames/responses-the local player/responseArray can't be sent out as they contain
    // objects with extra data(that would allow ppl to cheat with devtools/is just kinna messy tbh)
    for (const item of playerArray) {
        state.usernames.push(item.username);
    }
    // PRESERVING ORDER IS IMPORTANT: the client will respond with an array of objects containing the index of the response and their
    // guess. so i guess please don't rewrite this to scramble that.
    for (const item of responseArray) {
        state.response.push(item.response);
    }
    sendPacket(state, 'guess');
}
function resultsStage() {
    // hard part: tally everyone's scores
    // unpack modified responseArray-see function guessesStage for details
    for (const item of responseArray) {
    }
    // send out packet with response:username pairs and the score
}
function endGame() {}

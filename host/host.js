import {
    createGame,
    subscribeToUserJoins,
    unsubscribeToUserJoins,
    subscribeToUserResponses,
    sendPacket,
    checkAuth,
} from '../fetch-utils.js';

import {
    renderHostRoomSettingsUI,
    renderRoomCodeUI,
    renderPlayerListUI,
    renderHostControlBar,
} from '../render-utils.js';

// dom
const nextButton = document.getElementById('next-button');
const gameWindow = document.getElementById('game-window');
const headerBar = document.querySelector('.page-header');

// state
let gameCode, gameStage;
const playersObject = {};
let promptArray = [];
let responseArray = [];
// i have no idea how to balance a game, TODO: anyone else pick better values
const correctGuessAi = 200;
const correctGuessUser = 75;

// initalization
self.addEventListener('load', async () => {
    checkAuth();
    gameWindow.append(renderHostRoomSettingsUI(startButtonHandler));
    // make a code
    gameCode = generateGameCode();
    headerBar.append(renderHostControlBar(nextButtonHandler));
    gameWindow.append(renderRoomCodeUI(gameCode));
    gameWindow.append(renderPlayerListUI(''));
    // create the game
    await createGame(gameCode);
    // start listening for user joins
    await subscribeToUserJoins(gameCode, subscribeToUserJoinsHandler);
});

// launch the game
async function startButtonHandler() {
    const startGameButton = document.getElementById('start-game-button');
    // stop allowing joins
    await unsubscribeToUserJoins(gameCode, subscribeToUserJoinsHandler);
    // set the game stage to the prompt stage
    gameStage = 'prompt';
}

function getUsernameArray() {
    const usernameArray = [];
    for (const [key, _item] of playersObject.entries()) {
        usernameArray.push(key);
    }
}

// thanks stackoverflow-might need to add something to make sure it's 4 chars?
function generateGameCode() {
    return Math.random().toString(36).slice(2, 6);
}

// handlers
// this adds player objects to the object when one joins
function subscribeToUserJoinsHandler(packet) {
    playersObject[packet.username] = {
        uuid: packet.client_uuid,
        score: 0,
    };
    renderPlayerListUI(getUsernameArray());
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
                username: packet.username,
                response: packet.response,
                guesses: {},
            });
            break;
        case 'guesses':
            // modify the response array's objects to hold each user's guess
            for (const item in packet.guess) {
                // i hate this
                // i love this
                // go to index item.id in the array, in that object there's an object named guesses, and in that object add guesserUsername:guess-eeUsername
                responseArray[item.id].guesses[packet.username] = item.guess;
                // final structure of an item in responseArray: {uuid:, username:, response:, guesses:{playerXGuess:playerYUsername...}}
            }
            break;
    }
}

// kinda the main loop here
// when the next button is clicked, check gameStage to determine what needs to be ran
function nextButtonHandler() {
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
    console.log('suck it nerds');
}

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
    // just reusing response array here, so no reset
    // send out all the response text and usernames as seperate arrays
    // create the object to put in the packet
    const state = {
        response: [],
        usernames: [],
    };
    // propogate the arrays with the raw list of usernames/responses-the local player/responseArray can't be sent out as they contain
    // objects with extra data(that would allow ppl to cheat with devtools/is just kinna messy tbh)
    state.usernames = getUsernameArray();
    // PRESERVING ORDER IS IMPORTANT: the client will respond with an array of objects containing the index of the response and their
    // guess. so please don't rewrite this to scramble that.
    for (const item of responseArray) {
        state.response.push(item.response);
    }
    sendPacket(state, 'guess');
}
function resultsStage() {
    // hard part: tally everyone's scores
    // unpack modified responseArray-see function guessesStage and nextButton.handler for details
    for (const responseObject of responseArray) {
        for (const [guesser, guess] of responseObject.guesses.entries()) {
            // check if the guess is right
            if (guess === responseObject.username) {
                // add appropriate score
                playersObject[guesser] += guess === 'ai' ? correctGuessAi : correctGuessUser;
            }
        }
    }
    // send out packet with response:username pairs and the score
    sendPacket({ answers: responseArray, scores: playersObject }, 'results');
}
function endGame() {}

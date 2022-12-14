import {
    clearGameWindow,
    renderClientSetupUI,
    renderPromptEntryUI,
    renderResponseEntryUI,
    renderGuessesStageUI,
    renderPlayerListUI,
    renderRoomCodeUI,
    renderClientRoomSettingsUI,
    renderHostRoomSettingsUI,
    renderResultsPageUI,
    renderPromptTopUI,
} from '../render-utils.js';
import {
    joinGame,
    checkAuth,
    subscribeToHostPackets,
    sendPrompt,
    sendResponse,
    sendGuess,
} from '../fetch-utils.js';

const gameWindow = document.getElementById('game-window');

// game state vars
let joinedGameCode;
let joinedGameID;
let currentPrompt = '(no current prompt!)';

self.addEventListener('load', () => {
    // redirect to auth if not logged in
    checkAuth();
    // render room join ui
    gameWindow.append(renderClientSetupUI());
    // get submit button from room join ui
    const submitButton = document.querySelector('#submit-button');
    // event handler for clicking submit button
    submitButton.addEventListener('click', async () => {
        // grab user-provided room code and username from UI
        const roomCodeInput = document.querySelector('#roomcode-input');
        const usernameInput = document.querySelector('#username-input');
        await attemptJoinGame(roomCodeInput.value.toUpperCase(), usernameInput.value);
    });
});

// TODO
// - write functions for transitioning between game stages for client
// - write fetch functions for client

async function attemptJoinGame(code, username) {
    // make sure username is provided
    if (!username) {
        alert('you need a username, dingus!');
        return;
    }
    // attempt to join game, continue to next screen if successful
    joinedGameID = await joinGame(code, username);
    if (joinedGameID) {
        joinedGameCode = code;
        clearGameWindow();
        gameWindow.append(renderClientRoomSettingsUI('placeholder'), renderRoomCodeUI(code));
        await subscribeToHostPackets(code, subscribeToHostPacketsHandler);
    }
}

function subscribeToHostPacketsHandler(packet) {
    console.log(packet);
    switch (packet.game_status) {
        // prompt stage
        case 'prompt':
            clientPromptStage();
            break;
        case 'response':
            clientResponseStage(packet.state.promptText);
            currentPrompt = packet.state.promptText;
            break;
        case 'guess':
            clientGuessesStage(packet.state);
            break;
        case 'results':
            clientResultsStage(packet.state);
            break;
    }
}

function clientPromptStage() {
    clearGameWindow();
    gameWindow.append(renderPromptEntryUI());
    // TODO - have clients render player list when at prompt screen
    // event handler for client submitting prompt
    const promptInput = document.getElementById('prompt-input');
    const promptSubmitBtn = document.getElementById('prompt-submit-button');
    promptSubmitBtn.addEventListener('click', async () => {
        // push submitted prompt to supabase
        await sendPrompt(joinedGameID, promptInput.value);
        promptInput.value = '';
        promptSubmitBtn.disabled = true;
        promptSubmitBtn.textContent = 'submitted!';
    });
}

function clientResponseStage(promptText) {
    // rendering
    clearGameWindow();
    gameWindow.append(renderResponseEntryUI(promptText));
    const submitButton = document.getElementById('response-submit-button');
    const input = document.getElementById('response-input');
    submitButton.addEventListener('click', async () => {
        await sendResponse(joinedGameID, input.value);
        input.value = '';
        submitButton.disabled = true;
        submitButton.textContent = 'submitted!';
    });
}

function clientGuessesStage(dataObj) {
    // rendering
    clearGameWindow();
    gameWindow.append(renderGuessesStageUI(dataObj.responses, dataObj.usernames));
    gameWindow.append(renderPromptTopUI(currentPrompt));
    // grabbing DOM element and targeting form data
    const guessForm = document.querySelector('#guess-form');
    const submitButton = document.querySelector('#guess-submit-button');
    // on submit, gather guess/user pairs and submit to host
    guessForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        // create empty array for guesses to send to the host once populated
        const guessArray = [];
        // gather all of the response/guess pairs by getting each index from the response array
        for (const [index, _response] of dataObj.responses.entries()) {
            const formData = new FormData(guessForm);
            guessArray.push({
                // use the index of the response as a response id
                id: index,
                // fetch the associated response's username guess
                username: formData.get(index.toString()),
            });
        }
        // send guess array to host
        await sendGuess(joinedGameID, guessArray);
        submitButton.disabled = true;
        submitButton.textContent = 'submitted!';
    });
}

function clientResultsStage(dataObj) {
    clearGameWindow();
    gameWindow.append(renderPromptTopUI(currentPrompt));
    // pass incoming data to render function
    gameWindow.append(renderResultsPageUI(dataObj));
}

import {
    clearGameWindow,
    renderClientSetupUI,
    renderPromptEntryUI,
    renderResponseEntryUI,
    renderPlayerListUI,
    renderRoomCodeUI,
    renderClientRoomSettingsUI,
    renderHostRoomSettingsUI,
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

self.addEventListener('load', async () => {
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
    const maybeID = await joinGame(code, username);
    if (maybeID) {
        joinedGameCode = code;
        clearGameWindow();
        gameWindow.append(renderClientRoomSettingsUI('placeholder'), renderRoomCodeUI(code));
        await subscribeToHostPackets(code, subscribeToHostPacketsHandler);
    } else {
        joinedGameID = maybeID;
        return;
    }
}

function subscribeToHostPacketsHandler(payload) {
    switch (payload.game_status) {
        // prompt stage
        case 'prompt':
            break;
        case 'response':
            break;
        case 'guesses':
            break;
        case 'results':
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
    promptSubmitBtn.addEventHandler('click', async () => {
        // push submitted prompt to supabase
        await sendPrompt(joinedGameID, promptInput.value);
    });
}

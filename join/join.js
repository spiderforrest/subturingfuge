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
import { joinGame } from '../fetch-utils.js';

const gameWindow = document.getElementById('game-window');

self.addEventListener('load', async () => {
    // render room join ui
    gameWindow.append(renderClientSetupUI());
    // get submit button from room join ui
    const submitButton = document.querySelector('#submit-button');
    // event handler for clicking submit button
    submitButton.addEventListener('click', async () => {
        // grab user-provided room code and username from UI
        const roomCodeInput = document.querySelector('#roomcode-input');
        const usernameInput = document.querySelector('#username-input');
        await attemptJoinGame(roomCodeInput.value, usernameInput.value);
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
    if (await joinGame(code, username)) {
        clearGameWindow();
        gameWindow.append(renderClientRoomSettingsUI('placeholder'), renderRoomCodeUI(code));
    } else {
        return;
    }
}

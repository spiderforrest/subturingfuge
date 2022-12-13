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

self.addEventListener('load', async () => {});

async function joinGameButtonHandler(code, username) {
    if (await joinGame(code, username)) {
        clearGameWindow();
        gameWindow.append(renderClientRoomSettingsUI('placeholder'), renderRoomCodeUI(code));
    } else {
        return;
    }
}

gameWindow.append(renderClientSetupUI(joinGameButtonHandler));

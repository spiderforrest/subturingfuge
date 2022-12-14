import {
    clearGameWindow,
    renderClientSetupUI,
    renderPromptEntryUI,
    renderResponseEntryUI,
    renderPlayerListUI,
    renderRoomCodeUI,
    renderClientRoomSettingsUI,
    renderHostRoomSettingsUI,
    renderScoreboard,
} from '../render-utils.js';

const gameWindow = document.getElementById('game-window');

// fake data
let fakeResponseList = [
    'stringy stuff is the strongest',
    'strongy things are super great',
    'strung ingsup is loreming trombley',
];
let fakePlayerList = ['trongo', 'dongo', 'bongo'];

// gameWindow.append(renderClientSetupUI());
// gameWindow.append(renderPromptEntryUI());
// gameWindow.append(
//     renderResponseEntryUI(
//         'When I was a young boy, my father Took me into the city to see a marching band He said, "Son, when you grow up, would you be The savior of the broken, the beaten, and the damned?"'
//     )
// );
clearGameWindow();

// gameWindow.append(
//     renderPlayerListUI([{ name: 'Elmo' }, { name: 'Horse Criminal' }, { name: 'oh yeahhhh' }])
// );
// gameWindow.append(renderRoomCodeUI(6969));
// gameWindow.append(renderHostRoomSettingsUI('dork'));

let players = 'horse';

gameWindow.append(renderScoreboard(players));

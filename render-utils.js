export function clearGameWindow() {
    const gameWindow = document.querySelector('#game-window');
    gameWindow.innerHTML = '';
}

export function renderClientSetupUI() {
    // create html elements
    const uiBox = document.createElement('div');
    const usernameLabel = document.createElement('label');
    const roomCodeLabel = document.createElement('label');
    const usernameInput = document.createElement('input');
    const roomCodeInput = document.createElement('input');
    const submitButton = document.createElement('button');

    // set properties of html elements
    usernameLabel.textContent = 'Username: ';
    roomCodeLabel.textContent = 'Enter room code: ';
    submitButton.textContent = 'Go!';
    usernameInput.id = 'username-input';
    roomCodeInput.id = 'roomcode-input';
    usernameInput.type = 'text';
    roomCodeInput.type = 'text';

    // apply css classes
    uiBox.classList.add('ui-box-center');
    uiBox.classList.add('flexbox-column-centered');

    // event handler for clicking submit button
    // submitButton.addEventHandler();

    // append all the stuff to other stuff and then to the div we're returning
    usernameLabel.append(usernameInput);
    roomCodeLabel.append(roomCodeInput);
    uiBox.append(usernameLabel, roomCodeLabel, submitButton);

    return uiBox;
}

export function renderPromptEntryUI() {
    // create html elements
    const uiBox = document.createElement('div');
    const promptLabel = document.createElement('label');
    const promptInput = document.createElement('textarea');
    const submitButton = document.createElement('button');
    // set properties of html elements
    promptLabel.textContent = 'Prompt: ';
    submitButton.textContent = 'Submit';
    promptInput.id = 'prompt-input';
    promptInput.rows = '5';
    promptInput.cols = '40';
    // apply css classes
    uiBox.classList.add('ui-box-center');
    uiBox.classList.add('flexbox-column-centered');
    // event handler for clicking submit button
    // submitButton.addEventHandler();
    // append all the stuff to other stuff and then to the div we're returning
    promptLabel.append(promptInput);
    uiBox.append(promptLabel, submitButton);

    return uiBox;
}

export function renderResponseEntryUI(promptText) {
    // create html elements
    const uiBox = document.createElement('div');
    const promptLabel = document.createElement('label');
    const responseLabel = document.createElement('label');
    const promptDisplay = document.createElement('h2');
    const responseInput = document.createElement('textarea');
    const submitButton = document.createElement('button');

    // set properties of html elements
    promptLabel.textContent = 'The prompt is: ';
    promptDisplay.textContent = promptText;
    responseLabel.textContent = 'Enter your response: ';
    submitButton.textContent = 'Submit';
    responseInput.id = 'response-input';
    responseInput.rows = '5';
    responseInput.cols = '40';

    // apply css classes
    uiBox.classList.add('ui-box-center');
    uiBox.classList.add('flexbox-column-centered');

    // event handler for clicking submit button
    // submitButton.addEventHandler();

    // append all the stuff to other stuff and then to the div we're returning
    promptLabel.append(promptDisplay);
    responseLabel.append(responseInput);
    uiBox.append(promptLabel, responseLabel, submitButton);

    return uiBox;
}

// playerList should be a list of players with each player's name stored in player.name
export function renderPlayerListUI(playerList) {
    // create html elements
    const uiBox = document.createElement('div');
    const h3 = document.createElement('h3');
    // loop through all players in playerList, set textContent, append to uiBox
    h3.textContent = 'Players';
    uiBox.append(h3);
    for (let player of playerList) {
        const playerEl = document.createElement('p');
        playerEl.textContent = player.name;
        uiBox.append(playerEl);
    }

    // apply css classes
    uiBox.classList.add('ui-box-left-side');
    uiBox.classList.add('flexbox-column-left-justified');

    // return uiBox
    return uiBox;
}

export function renderRoomCodeUI(roomCode) {
    // create html elements
    const uiBox = document.createElement('div');
    const h4 = document.createElement('h4');
    const h3 = document.createElement('h3');
    // set textContent, append to uiBox
    h4.textContent = 'Room Code:';
    h3.textContent = roomCode;
    uiBox.append(h4, h3);
    // apply css classes
    uiBox.classList.add('ui-box-top-right');
    uiBox.classList.add('flexbox-column-centered');

    // return uiBox
    return uiBox;
}

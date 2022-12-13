export function clearGameWindow() {
    const gameWindow = document.querySelector('#game-window');
    gameWindow.innerHTML = '';
}

export function renderClientSetupUI(handler) {
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
    submitButton.addEventListener('click', async () => {
        await handler(roomCodeInput.value, usernameInput.value);
    });

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

export function renderClientRoomSettingsUI(settings) {
    // create elements
    const uiBox = document.createElement('div');
    const h2 = document.createElement('h2');
    const timerLabel = document.createElement('p');
    const roundsLabel = document.createElement('p');
    const waitMessage = document.createElement('h1');

    // set contents
    h2.textContent = 'Game Settings';
    timerLabel.textContent = 'Timer: not yet buddy';
    roundsLabel.textContent = 'Rounds: no';
    waitMessage.textContent = 'WAITING FOR HOST TO START GAME';

    // apply css
    uiBox.classList.add('ui-box-center');
    uiBox.classList.add('flexbox-column-centered');

    // append
    uiBox.append(h2, timerLabel, roundsLabel, waitMessage);

    // return uiBox
    return uiBox;
}

export function renderHostRoomSettingsUI(handler) {
    // create elements
    const uiBox = document.createElement('div');
    const h2 = document.createElement('h2');
    const timerLabel = document.createElement('label');
    const timerInput = document.createElement('input');
    const roundsLabel = document.createElement('label');
    const roundsInput = document.createElement('input');
    const usernameLabel = document.createElement('label');
    const usernameInput = document.createElement('input');
    const startGameButton = document.createElement('button');

    // set contents
    h2.textContent = 'Game Settings';
    timerLabel.textContent = 'Timer: (dummied out)';
    timerInput.disabled = true;
    roundsLabel.textContent = 'Rounds: (dummied out)';
    roundsInput.disabled = true;
    usernameLabel.textContent = 'Username: ';
    usernameInput.id = 'username-input';
    usernameInput.type = 'text';
    startGameButton.textContent = 'START GAME';

    // event listener
    startGameButton.addEventListener('click', async () => {
        await handler();
    });
    startGameButton.id = 'start-game-button';

    // apply css
    uiBox.classList.add('ui-box-center');
    uiBox.classList.add('flexbox-column-centered');

    // append
    uiBox.append(
        h2,
        timerLabel,
        timerInput,
        roundsLabel,
        roundsInput,
        usernameLabel,
        usernameInput,
        startGameButton
    );

    // return uiBox
    return uiBox;
}

//async later probably
export function renderWhoSaidWhatUI(playerList, responseList) {
    // create elements
    const uiBox = document.createElement('div');
    const h2 = document.createElement('h2');
    const submitButton = document.createElement('button');
    // set contents
    h2.textContent = 'Guess who said what!';
    submitButton.textContent = 'Submit';
    submitButton.id = 'guess-submit-button';
    // event listener
    submitButton.addEventListener('click', async () => {
        console.log("dang ol' submit button pushed");
    });
    // apply css
    uiBox.classList.add('ui-box-middle-column-full');
    uiBox.classList.add('flexbox-column-centered');
    // append
    uiBox.append(h2);
    // iterate through response list, render UI element for each, append to uiBox
    for (let response of responseList) {
        uiBox.append(renderPlayerResponsePairs(playerList, response));
    }
    uiBox.append(submitButton);
    // return uiBox
    return uiBox;
}

function renderPlayerResponsePairs(playerList, response) {
    // create elements
    const pairDiv = document.createElement('div');
    const playerSelect = document.createElement('select');
    const noGuessOption = document.createElement('option');
    const responseText = document.createElement('h3');
    // set contents
    noGuessOption.textContent = '(No Guess)';
    noGuessOption.value = '';
    playerSelect.append(noGuessOption);
    for (let player of playerList) {
        const playerOption = document.createElement('option');
        //add .username
        playerOption.textContent = player;
        playerOption.value = player;
        playerSelect.append(playerOption);
    }
    // .response
    responseText.textContent = response;
    //add .id
    pairDiv.id = response;
    // apply css
    pairDiv.classList.add('player-response-pair-container');
    // append
    pairDiv.append(playerSelect, responseText);
    // return pairDiv
    return pairDiv;
}

export function renderHostControlBar(handler) {
    // create elements
    const navBar = document.createElement('nav');
    const nextButton = document.createElement('button');
    // set contents
    nextButton.textContent = 'NEXT';
    // event listener
    nextButton.addEventListener('click', () => {
        handler();
    });
    // append
    navBar.append(nextButton);
    // return navBar
    return navBar;
}

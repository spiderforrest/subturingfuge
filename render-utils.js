export function clearGameWindow() {
    const gameWindow = document.querySelector('#game-window');
    gameWindow.innerHTML = '';
}

function removeElement(elementID) {
    const target = document.getElementById(elementID);
    if (target) target.remove();
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
    submitButton.id = 'submit-button';

    // apply css classes
    uiBox.classList.add('ui-box-center');
    uiBox.classList.add('flexbox-column-centered');

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
    submitButton.id = 'prompt-submit-button';
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
    submitButton.id = 'response-submit-button';
    responseInput.id = 'response-input';
    responseInput.rows = '5';
    responseInput.cols = '40';

    // apply css classes
    uiBox.classList.add('ui-box-center');
    uiBox.classList.add('flexbox-column-centered');

    // append all the stuff to other stuff and then to the div we're returning
    promptLabel.append(promptDisplay);
    responseLabel.append(responseInput);
    uiBox.append(promptLabel, responseLabel, submitButton);

    return uiBox;
}

// playerList should be an array of all the players' usernames
export function renderPlayerListUI(playerList) {
    removeElement('player-list');
    // create html elements
    const uiBox = document.createElement('div');
    const h3 = document.createElement('h3');
    // loop through all players in playerList, set textContent, append to uiBox
    h3.textContent = 'Players';
    uiBox.append(h3);
    uiBox.id = 'player-list';
    for (let player of playerList) {
        const playerEl = document.createElement('p');
        playerEl.textContent = player;
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
    // const timerLabel = document.createElement('label');
    // const timerInput = document.createElement('input');
    // const roundsLabel = document.createElement('label');
    // const roundsInput = document.createElement('input');
    const usernameLabel = document.createElement('label');
    const usernameInput = document.createElement('input');
    const APIKeyLabel = document.createElement('label');
    const APIKeyInput = document.createElement('input');
    const startGameButton = document.createElement('button');

    // set contents
    h2.textContent = 'Game Settings';
    // timerLabel.textContent = 'Timer: (dummied out)';
    // timerInput.disabled = true;
    // roundsLabel.textContent = 'Rounds: (dummied out)';
    // roundsInput.disabled = true;
    usernameLabel.textContent = 'Username: ';
    usernameInput.id = 'host-username-input';
    usernameInput.type = 'text';
    APIKeyLabel.textContent = 'OpenAI API key: ';
    APIKeyInput.id = 'api-key-input';
    APIKeyInput.type = 'password';
    startGameButton.textContent = 'JOIN GAME';

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
        // timerLabel,
        // timerInput,
        // roundsLabel,
        // roundsInput,
        usernameLabel,
        usernameInput,
        APIKeyLabel,
        APIKeyInput,
        startGameButton
    );

    // return uiBox
    return uiBox;
}

//async later probably
export function renderGuessesStageUI(responseList, playerList) {
    // create elements
    const uiBox = document.createElement('div');
    const form = document.createElement('form');
    const h2 = document.createElement('h2');
    const submitButton = document.createElement('button');
    // set contents
    h2.textContent = 'Guess who said what!';
    submitButton.textContent = 'Submit';
    submitButton.id = 'guess-submit-button';
    form.id = 'guess-form';
    // apply css
    uiBox.classList.add('ui-box-middle-column-mid-bottom');
    uiBox.classList.add('flexbox-column-centered');
    // append
    // iterate through response list, render UI element for each, append to uiBox
    for (const [index, response] of responseList.entries()) {
        form.append(renderPlayerResponsePairs(playerList, response, index));
    }
    form.append(submitButton);
    uiBox.append(h2, form);
    // return uiBox
    return uiBox;
}

function renderPlayerResponsePairs(playerList, response, index) {
    // create elements
    const pairDiv = document.createElement('div');
    const playerSelect = document.createElement('select');
    const noGuessOption = document.createElement('option');
    const responseText = document.createElement('h3');
    // set contents
    noGuessOption.textContent = '(No Guess)';
    noGuessOption.value = '';
    playerSelect.append(noGuessOption);
    playerSelect.name = index;
    for (const player of playerList) {
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
    nextButton.id = 'next-button';
    // event listener
    nextButton.addEventListener('click', () => {
        handler();
    });
    // append
    navBar.append(nextButton);
    // return navBar
    return navBar;
}

export function renderPromptTopUI(promptText) {
    // create elements
    const uiBox = document.createElement('div');
    const h3 = document.createElement('h3');
    const promptDisplay = document.createElement('h3');

    // set contents
    h3.textContent = 'The prompt is:';
    promptDisplay.textContent = promptText;

    // set classes
    uiBox.classList.add('ui-box-middle-column-top');
    uiBox.classList.add('flexbox-column-centered');

    // append
    uiBox.append(h3, promptDisplay);
    return uiBox;
}

export function renderResultsPageUI(results) {
    // create elements
    const uiBox = document.createElement('div');

    // for each response, create a new div to display it
    for (const response of results.answers) {
        // for each response, create div that displays who guessed who for that response
        const responseEl = document.createElement('div');
        const responseText = document.createElement('h3');
        const responseAuthor = document.createElement('h2');
        responseAuthor.textContent = `${response.username}'s response:`;
        responseEl.classList.add('results-page-response-box');
        responseEl.classList.add('flexbox-column-centered');
        responseText.textContent = response.response;
        responseEl.append(responseAuthor, responseText);
        // render, display, append users' guesses to response
        for (const [guessor, guessee] of Object.entries(response.guesses)) {
            // if guessing on own response, don't render to results
            if (guessor === guessee) {
                continue;
            }
            const guessText = document.createElement('p');
            guessText.textContent = `${guessor} guessed ${guessee}`;
            // if user guessed correctly, color their guess green and append points awarded
            if (guessee === response.username) {
                guessText.classList.add('results-page-correct-guess');
                // was ai correctly identified? if so, award points for that, otherwise points for id-ing human
                guessText.textContent +=
                    response.username === 'ai'
                        ? ` (${guessor} +${results.scoring.ai})`
                        : ` (${guessor} +${results.scoring.human})`;
                // check if someone misidentified AI as human
            } else if (guessee !== 'ai' && response.username === 'ai') {
                guessText.classList.add('results-page-ai-gain-points');
                guessText.textContent += ' (ai +400)';
                // check if someone misidentified human as ai
            } else if (guessee === 'ai' && response.username !== 'ai') {
                guessText.classList.add('results-page-user-tricked-user');
                guessText.textContent += ` (${guessor} +0, ${response.username} +400)`;
                // no points for you, chump
            } else {
                guessText.classList.add('results-page-incorrect-guess');
                guessText.textContent += ` (${guessor} +0)`;
            }
            responseEl.append(guessText);
            uiBox.append(responseEl);
        }
    }

    // apply css classes
    uiBox.classList.add('ui-box-middle-column-mid-bottom');

    return uiBox;
}

export function renderScoreboard(players) {
    // create elements
    const uiBox = document.createElement('div');
    const h2 = document.createElement('h2');
    const scoresEl = document.createElement('ul');
    // set contents
    h2.textContent = 'Scores:';
    // set classes
    uiBox.classList.add('ui-box-right-column-mid');
    uiBox.classList.add('flexbox-column-top');
    // loop through players and create username/score objects
    for (const [username, obj] of Object.entries(players)) {
        // create score entry
        const scoreEl = document.createElement('li');
        // set text content of score entry to 'username: score'
        scoreEl.textContent = `${username}: ${obj.score}`;
        // add each score list item to scores list
        scoresEl.append(scoreEl);
    }
    // append
    uiBox.append(h2, scoresEl);
    // return uiBox
    return uiBox;
}

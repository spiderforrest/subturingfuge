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
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

    // apply css classes
    uiBox.classList.add('ui-box-center');
    uiBox.classList.add('flexbox-column-centered');

    // event handler for clicking submit button
    submitButton.addEventHandler();

    // append all the stuff to other stuff and then to the div we're returning
    usernameLabel.append(usernameInput);
    roomCodeLabel.append(roomCodeInput);
    uiBox.append(usernameLabel, roomCodeLabel, submitButton);

    return uiBox;
}

# Sub(turing)fuge
_A multiplayer browser-based party game about discovering which of your friends are robots_

## Wireframe
[link to figma](https://www.figma.com/file/072cjuzX9lfm2bVswGm0hn/sub\(turing\)fuge?node-id=0%3A1&t=qUtQ75HHuN1vOfgG-0)

## Make a plan of attack


## HTML elements (stuff present upon page load)
### Homepage
    - title of game
    - host game link
    - join game link
    - settings (dummied out)
    - about/credits
    - how to play
    - logout link

### Game Page (for both host and client, differences in ui are handled in JS)
    - header with game title, controls for host
    - section for displaying game ui, likely just a `<section>` split into columns using css grid

### Settings Page
    - header with game title, link to menu
    - settings name column
    - settings interface column

### About/Credits
    - header with game title, link to main menu
    - three little avatars for each dev, small bio section, links to githubs/whatever else
    - also an about entry for GPT-3

### Auth
    - custom header styling, otherwise default
    - link to how to play/about pages

### How to play
    - header w/game title, link to main menu
    - info on how to play figure it out dude

## State (everything you need to track internally using JS variables)
### Cookies
    - settings???

### Game Page
    - `timer` - variable to store and be decremented for timer mode

## Events (anything that happens via JS when the user interacts with your site)
### Game Page
    - on page load:
        - determine if host based on URL param
        - if host, drop into game settings screen (num of rounds, set room code, etc)
        - if client, drop into "enter room code" and set username menu

### For client
    - on submit room code
        - add row for client with game id to responses table
        - retrieve game data from supabase, listen for new people added to lobby, display on screen
        - open "submit prompts" interface
        - wait for host to start game (game status column changes to `running`)

    - on game state updates to "prompts":
        - open prompt answering ui w/submit button
        - when clients submit: create/update row in response table

    - on game state updates to "guessing":
        - update ui to voting screen
        - when submitting votes: update player's row in response table

    - on game state updates to "reveal":
        - update ui to reveal screen
        - update scoreboard

    - on game state updates to "over":
        - update ui to display only scoreboard, link to main page

    - on game status updates to "aborted":
        - update ui to "game ended by host" screen, link back to main menu

### For host
    - on open lobby:
        - same as client lobby interface, but with button to start game
        - create row in game table
        - can also submit prompts on this screen
    
    - on start game:
        - continue as client with extra controls

## Functions (to plan out how you'll segment things)
- it's not necessary to specify all args! when starting out, you're just trying to figure out how you're going to segment your work
- but! make sure to put your render and display functions here!! that's part of segementing out your program logic!!
  - that also keeps your event listeners clean because it'll be mostly function calls

_example:_
- `calculateTripTime(distance)` - calculates trip time based on total trip distance

### Render Functions

### Display functions

### Fetch Functions (if applicable)

### Other Functions



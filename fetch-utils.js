const SUPABASE_URL = 'https://cotnztfoazrzxmsaflef.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvdG56dGZvYXpyenhtc2FmbGVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA2MTgyMTIsImV4cCI6MTk4NjE5NDIxMn0.Xr31zKtVKnNjm_F7s1aAyt2475jmgAuYR9ezhRIQXHg';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

// function catchError({ data, error }) {
//     if (error) return console.error(error);
//     return data;
// }
function catchError(response) {
    return response.error ? console.error(response.error) : response.data;
}

export function checkAuth() {
    if (!getUser()) {
        location.replace('/auth/index.html');
    }
}

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return catchError(
        await client.auth.signUp({
            email,
            password,
        })
    );
}

export async function signInUser(email, password) {
    return catchError(
        await client.auth.signIn({
            email,
            password,
        })
    );
}

export async function signOutUser() {
    return await catchError(client.auth.signOut());
}

/* Data functions */

// host functions:
export async function subscribeToUserJoins(gameId, handler) {
    return await client
        .from(`responses:game_id=eq.${gameId}`)
        .on('INSERT', (payload) => {
            handler(payload.new);
        })
        .subscribe();
}

export async function unsubscribeAll() {
    return await client.removeAllSubscriptions();
}

export async function subscribeToUserResponses(gameId, handler) {
    return await client
        .from(`responses:game_id=eq.${gameId}`)
        .on('UPDATE', (payload) => {
            handler(payload.new);
        })
        .subscribe();
}

export async function createGame(gameCode) {
    // TODO - make function check if existing running game already has this game code
    const response = await client
        .from('games')
        .insert({ game_status: 'lobby', host: client.auth.user().id, room_code: gameCode });
    return catchError(response);
}

export async function sendPacket(packet, gameStage, gameID) {
    const response = await client
        .from('games')
        .update({ game_status: gameStage, state: packet })
        .match({ id: gameID })
        .single();
}

// client function
export async function subscribeToHostPackets(gameCode, handler) {
    const response = await client
        .from(`games:room_code=eq.${gameCode}`)
        .on('UPDATE', (payload) => {
            handler(payload.new);
        })
        .subscribe();
}

export async function joinGame(gameCode, username) {
    // search for an open lobby with matching game code
    const response = await client
        .from('games')
        .select()
        .match({ room_code: gameCode, game_status: 'lobby' })
        .single();
    if (response.error) {
        alert('No room found.');
        return false;
    } else {
        // if one exists, join it by making new row on responses
        await client.from('responses').insert({
            client_uuid: client.auth.user().id,
            game_id: response.data.id,
            username: username,
        });
        return response.data.id;
    }
}

export async function sendPrompt(gameID, promptText) {
    const response = await client
        .from('responses')
        .update({ prompt_text: promptText })
        .match({ client_uuid: client.auth.user().id, game_id: gameID })
        .single();
}

export async function sendResponse(gameCode, response) {}

export async function sendGuess(gameCode, guess) {}

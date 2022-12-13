const SUPABASE_URL = 'https://cotnztfoazrzxmsaflef.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvdG56dGZvYXpyenhtc2FmbGVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA2MTgyMTIsImV4cCI6MTk4NjE5NDIxMn0.Xr31zKtVKnNjm_F7s1aAyt2475jmgAuYR9ezhRIQXHg';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

function catchError({ data, error }) {
    if (error) return console.error(error);
    return data;
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
export async function subscribeToUserJoins(gameId, handler) {}

export async function unsubscribeToUserJoins() {}

export async function subscribeToUserResponses(user, gameId, handler) {}

export async function createGame(gameCode) {
    // TODO - make function check if existing running game already has this game code
    const response = await client
        .from('games')
        .insert({ game_status: 'lobby', host: client.auth.user().id, room_code: gameCode });
    return catchError(response);
}

export async function sendPacket(packet, gameStage) {}

// client function
export async function subscribeToHostPackets(gameCode, handler) {}

export async function joinGame(gameCode) {}

export async function sendResponse(gameCode, response, guess, promptText) {}

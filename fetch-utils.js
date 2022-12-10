const SUPABASE_URL = 'https://cotnztfoazrzxmsaflef.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvdG56dGZvYXpyenhtc2FmbGVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA2MTgyMTIsImV4cCI6MTk4NjE5NDIxMn0.Xr31zKtVKnNjm_F7s1aAyt2475jmgAuYR9ezhRIQXHg';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */

// host functions:
export async function subscribeToUserResponses(user, gameId, handler) {}

export async function subscribeToUserJoins(gameId, handler) {}

export async function createGame(gameCode) {}

export async function sendPacket(packet, gameStatus) {}

// client function
export async function subscribeToHostPackets(gameCode, handler) {}

export async function joinGame(gameCode) {}

export async function sendResponse(gameCode, response, guess, promptText) {}

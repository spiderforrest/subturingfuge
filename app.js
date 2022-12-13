/* Imports */
import { getUser, signOutUser } from './fetch-utils.js';

/* Get DOM Elements */
const emailEl = document.querySelector('#logged-in-user-email');
const signInOutEl = document.querySelector('#sign-out-link');

/* State */

/* Events */
self.addEventListener('load', () => {
    emailEl.textContent = `[${getUser().email} ~] $`;
});

signInOutEl.addEventListener('click', async () => {
    await signOutUser();
});

/* Display Functions */
signInOutEl.textContent = getUser() ? 'Sign Out' : 'Sign In';
signInOutEl.href = getUser() ? '/' : 'auth';

/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { getUser } from './fetch-utils.js';

/* Get DOM Elements */
const emailEl = document.querySelector('#logged-in-user-email');

/* State */

/* Events */
self.addEventListener('load', () => {
    emailEl.textContent = `[${getUser().email} ~] $`;
});

/* Display Functions */

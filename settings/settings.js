/* Imports */
import { getUser } from '/fetch-utils.js';

/* Get DOM Elements */
const emailEl = document.querySelector('#logged-in-user-email');

/* State */

/* Events */
self.addEventListener('load', () => {
    emailEl.textContent = `[${getUser().email} ~] $`;
});

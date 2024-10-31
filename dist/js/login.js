import { LocalStorageUtil } from "./LocalStorageUtil.js";

document.addEventListener('DOMContentLoaded', async () => {
  // Get references to the form elements
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const error = document.getElementById('error');
  const loginButton = document.getElementById('login');

  // Add click event listener to the login button
  loginButton.addEventListener('click', async (e) => {
    e.preventDefault(); // Prevent the form from submitting normally

    // Get the values from the input fields
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Check if email or password is empty
    if (email === '' || password === '') {
      error.innerText = 'Please enter both email and password';
      error.className = "bg-red-900 text-white p-3 text-xl rounded-xl";
      return;
    }

    try {
      const authentication2 = await LocalStorageUtil.authenticateUser(email, password);
      if (authentication2) {
        window.location.href = './game.html';
      } else {
        error.innerText = 'Invalid email or password';
        error.className = "bg-red-900 text-white p-3 text-xl rounded-xl";
      }
    } catch (err) {
      console.error('Authentication error:', err);
      error.innerText = 'An error occurred during login. Please try again.';
      error.className = "bg-red-900 text-white p-3 text-xl rounded-xl";
    }
  });
});

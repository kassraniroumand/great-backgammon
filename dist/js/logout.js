import { LocalStorageUtil } from "./LocalStorageUtil.js";

document.addEventListener('DOMContentLoaded', async () => {
  const logOutButton = document.getElementById('logout');

  // Add click event listener to the login button
  logOutButton.addEventListener('click', async (e) => {
    e.preventDefault(); // Prevent the form from submitting normally



    try {
      await LocalStorageUtil.logout();
      window.location.href = './login.html';
    } catch (err) {
      console.error('Authentication error:', err);
      error.innerText = 'An error occurred during login. Please try again.';
      error.className = "bg-red-900 text-white p-3 text-xl rounded-xl";
    }
  });
});

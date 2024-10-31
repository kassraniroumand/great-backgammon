import { LocalStorageUtil } from "./LocalStorageUtil.js";
// const LocalStorageUtil = require('./LocalStorageUtil.js');

document.addEventListener('DOMContentLoaded', () => {
  // Get references to the form elements
  const nameInput = document.getElementById('name');
  const addressInput = document.getElementById('address');
  const phoneInput = document.getElementById('phone');
  const passwordInput = document.getElementById('password');
  const emailInput = document.getElementById('email');

  const nameError = document.getElementById('nameError');
  const addressError = document.getElementById('addressError');
  const phoneError = document.getElementById('phoneError');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');

  const registerButton = document.getElementById('register');

  // Add click event listener to the register button
  registerButton.addEventListener('click', (e) => {
    console.log('Register button clicked');

    e.preventDefault();

    // Get the values from the input fields
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const userName = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const address = addressInput.value.trim();

    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    // const passwordRegex = "";
    const phoneRegex = /^\d{10}$/; // Assuming a 10-digit phone number

    let isValid = true;

    // Username validation
    if (!usernameRegex.test(userName)) {
      isValid = false;
      nameError.innerText = "Username must be 3-20 characters long and can only contain letters, numbers, and underscores.";
      nameError.className = "bg-red-900 text-white p-3 text-xl rounded-xl"
    } else {
      nameError.innerText = "";
      nameError.className = "";
    }

    // Email validation
    if (!emailRegex.test(email)) {
      isValid = false;
      emailError.innerText = "Please enter a valid email address.";
      emailError.className = "bg-red-900 text-white p-3 text-xl rounded-xl"
    } else {
      emailError.innerText = "";
      emailError.className = "";
    }

    // Phone validation
    if (!phoneRegex.test(phone)) {
      isValid = false;
      phoneError.innerText = "Please enter a valid 10-digit phone number.";
      phoneError.className = "bg-red-900 text-white p-3 text-xl rounded-xl"
    } else {
      phoneError.innerText = "";
      phoneError.className = "";
    }

    // Address validation (simple check for non-empty)
    if (address.length === 0) {
      isValid = false;
      addressError.innerText = "Please enter your address.";
      addressError.className = "bg-red-900 text-white p-3 text-xl rounded-xl"
    } else {
      addressError.innerText = "";
      addressError.className = "";
    }

    if (isValid) {
      // Register the user
      LocalStorageUtil.addUser(
        email,
        password,
        userName,
        phone,
        address,
        0
      );
      window.location.replace("./game.html");
    } else {
    }
  });
});

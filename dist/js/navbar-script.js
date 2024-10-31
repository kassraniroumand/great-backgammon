import { LocalStorageUtil } from "./LocalStorageUtil.js";

document.addEventListener('DOMContentLoaded', async () => {
  const app = document.getElementById('navabar');
  if (!app) {
    console.error("Navbar container not found. Make sure there's an element with id 'navbar' in your HTML.");
    return;
  }

  const app_name = document.getElementById('app_name');
  if (app_name) {
    // Set app name if needed
    // app_name.textContent = 'Your App Name';
  }

  // Create and render navbar
  const navbar = await createNavbar();
  app.appendChild(navbar);

  // Initialize event listeners
  await initEventListeners();
});

async function createNavbar() {
  const isAuthenticated = await LocalStorageUtil.isUserAuthenticated();
  const navbar = document.createElement('nav');
  navbar.className = 'bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg';
  navbar.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
              <div class="flex items-center">
                  <div class="hidden md:block">
                      <div class="ml-10 flex items-baseline space-x-4">
                          <a href="./index.html" class="text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300">Home</a>
                          <a href="./ranking.html" class="text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300">Ranking</a>
                          ${isAuthenticated ?
                            '<a href="./profile.html" class="text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300">Profile</a>' :
                            '<a href="./signup.html" class="text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300">Register</a>'
                          }
                      </div>
                  </div>
              </div>
              <div class="hidden md:block">
                  <div class="ml-4 flex items-center md:ml-6">
                      <a href="./game.html?black=computer" class="text-white bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300">Start Game</a>
                      ${isAuthenticated ?
                        '<button id="logout-button" class="ml-3 text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300">Logout</button>' :
                        '<a href="./login.html" class="ml-3 text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300">Login</a>'
                      }
                      <button id="theme-toggle" type="button" class="ml-3 text-white bg-white bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-30 rounded-full text-sm p-2.5 inline-flex items-center transition-all duration-300">
                          <svg id="theme-toggle-dark-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
                          <svg id="theme-toggle-light-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                      </button>
                  </div>
              </div>
              <div class="-mr-2 flex md:hidden">
                  <button type="button" class="bg-white bg-opacity-20 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                      <span class="sr-only">Open main menu</span>
                      <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                      <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                  </button>
              </div>
          </div>
      </div>
      <div class="md:hidden hidden" id="mobile-menu">
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="./index.html" class="text-white hover:bg-white hover:bg-opacity-20 block px-3 py-2 rounded-md text-base font-medium transition-all duration-300">Home</a>
              <a href="./ranking.html" class="text-white hover:bg-white hover:bg-opacity-20 block px-3 py-2 rounded-md text-base font-medium transition-all duration-300">Ranking</a>
              ${isAuthenticated ?
                '<a href="./profile.html" class="text-white hover:bg-white hover:bg-opacity-20 block px-3 py-2 rounded-md text-base font-medium transition-all duration-300">Profile</a>' :
                '<a href="./signup.html" class="text-white hover:bg-white hover:bg-opacity-20 block px-3 py-2 rounded-md text-base font-medium transition-all duration-300">Register</a>'
              }
          </div>
          <div class="pt-4 pb-3 border-t border-gray-700">
              <div class="flex items-center px-5">
                  <a href="./game.html" class="text-white bg-pink-600 hover:bg-pink-700 block px-4 py-2 rounded-md text-base font-medium transition-all duration-300">Start Game</a>
                  ${isAuthenticated ?
                    '<button id="mobile-logout-button" class="ml-3 text-white bg-red-600 hover:bg-red-700 block px-4 py-2 rounded-md text-base font-medium transition-all duration-300">Logout</button>' :
                    '<a href="./login.html" class="ml-3 text-white bg-green-600 hover:bg-green-700 block px-4 py-2 rounded-md text-base font-medium transition-all duration-300">Login</a>'
                  }
              </div>
          </div>
      </div>
  `;
  return navbar;
}

async function initEventListeners() {
  // Mobile menu toggle
  const btn = document.querySelector("button[aria-controls='mobile-menu']");
  const menu = document.getElementById("mobile-menu");

  btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true" || false;
      btn.setAttribute("aria-expanded", !expanded);
      menu.classList.toggle("hidden");
      menu.classList.toggle("animate-fade-in-down");
  });

  // Dark mode toggle
  const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
  const themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");
  const themeToggleBtn = document.getElementById("theme-toggle");

  // Change the icons inside the button based on previous settings
  if (localStorage.getItem("color-theme") === "dark" || (!("color-theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      themeToggleLightIcon.classList.remove("hidden");
      document.documentElement.classList.add("dark");
  } else {
      themeToggleDarkIcon.classList.remove("hidden");
  }

  themeToggleBtn.addEventListener("click", function () {
      themeToggleDarkIcon.classList.toggle("hidden");
      themeToggleLightIcon.classList.toggle("hidden");

      if (localStorage.getItem("color-theme")) {
          if (localStorage.getItem("color-theme") === "light") {
              document.documentElement.classList.add("dark");
              localStorage.setItem("color-theme", "dark");
          } else {
              document.documentElement.classList.remove("dark");
              localStorage.setItem("color-theme", "light");
          }
      } else {
          if (document.documentElement.classList.contains("dark")) {
              document.documentElement.classList.remove("dark");
              localStorage.setItem("color-theme", "light");
          } else {
              document.documentElement.classList.add("dark");
              localStorage.setItem("color-theme", "dark");
          }
      }
  });

  // Logout functionality
  if (await LocalStorageUtil.isUserAuthenticated()) {
      const logoutBtn = document.getElementById("logout-button");
      const mobileLogoutBtn = document.getElementById("mobile-logout-button");

      if (logoutBtn) {
          logoutBtn.addEventListener("click", logout);
      }
      if (mobileLogoutBtn) {
          mobileLogoutBtn.addEventListener("click", logout);
      }
  }
}


async function logout() {
  // Implement your logout logic here
  // For example:
  await LocalStorageUtil.logout();
  // Redirect to login page or refresh the current page
  window.location.href = "./login.html";
}

import { LocalStorageUtil } from "./LocalStorageUtil.js";

document.addEventListener('DOMContentLoaded', async () => {
    const user = await LocalStorageUtil.getCurrentUser();

    console.log(user);

    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    // Update user initial
    const userInitialElement = document.getElementById('user-initial');
    userInitialElement.textContent = user.username?.charAt(0)?.toUpperCase() || 'U';

    // Update user details
    document.getElementById('user').innerHTML = user.name || '';
    document.getElementById('email').innerHTML = user.email || '';
    document.getElementById('phone').innerHTML = user.phone || '';
    document.getElementById('address').innerHTML = user.address || '';

   // Edit profile button
   document.getElementById('edit-profile-btn').addEventListener('click', () => {
    window.location.href = 'edit-profile.html';
  });
});

// Logout button
document.getElementById('logout-btn').addEventListener('click', async () => {
    await handleLogout();

});


async function handleLogout() {
    await LocalStorageUtil.clearCurrentUser();
    window.location.href = 'login.html';
}

import { LocalStorageUtil } from "./LocalStorageUtil.js";

document.addEventListener('DOMContentLoaded', async () => {
  const currentUser = await LocalStorageUtil.getCurrentUser()
  console.log(currentUser);

  if (currentUser == null) {
      window.location.replace("./login.html");
  }
});

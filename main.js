import { getLocal } from "./scripts/helpers.js";
import { renderUserInfo } from "./scripts/ui.js";

document.addEventListener("DOMContentLoaded", () => {
  const user = getLocal("USER");
  
  if(user) {
    renderUserInfo(user);
  } else {
    location = '/auth.html';
  }
});

import { API } from "./scripts/api.js";
import { getLocal } from "./scripts/helpers.js";
import {
  renderLoader,
  renderUserInfo,
  ele,
  renderTimeline,
  renderResults,
  renderDetail,
  renderDetailLoading,
  renderUserPage,
} from "./scripts/ui.js";

const user = getLocal("USER");

const router = async () => {
  const params = new URLSearchParams(location.search);
  const page = params.get("page");
  const query = params.get("q");

  switch (page) {
    // tweet detay
    case "status":
      renderDetailLoading();

      const tweetData = await API.fetchData(`/tweet.php?id=${query}`);
      renderDetail(tweetData);
      break;
    // arama sayfası
    case "search":
      renderLoader(ele.main);
      const results = await API.fetchData(`/search.php?query=${query}`);
      renderResults(results, ele.main);
      break;
    // kullanıcı detay sayfası
    case "user":
      //ana sayfayı ekrana bas
      renderLoader(ele.main);
      const userInfo = await API.getUser(query);
      renderUserPage(userInfo);
      const outlet = document.querySelector(".page-bottom");
      renderLoader(outlet);
      const userTweet = await API.fetchData(
        `/timeline.php?screenname=${query}`
      );
      renderTimeline(userTweet, outlet);
      break;
    default:
      renderLoader(ele.tweetsArea);

      const data = await API.fetchData(
        `/timeline.php?screenname=${user.profile}`
      );

      renderTimeline(data, ele.tweetsArea);
      break;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  if (user) {
    renderUserInfo(user);
  } else {
    location = "/auth.html";
  }

  router();
});

ele.logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("USER");
  location = "/auth.html";
});

ele.form.addEventListener("submit", (e) => {
  e.preventDefault();

  const query = e.target[0].value;

  location = `?page=search&q=${query}`;
});

ele.main.addEventListener("click", (e) => {
  if (e.target.id === "back-btn") {
    history.back();
  }
});

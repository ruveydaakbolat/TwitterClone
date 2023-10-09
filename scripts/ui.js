export const ele = {
  user_name: document.getElementById("user-name"),
  user_tag: document.getElementById("user-tag"),
  pics: document.querySelectorAll("#profile-pic"),
};

export const renderUserInfo = (user) => {
    ele.pics.forEach((img) => (img.src = user.avatar));

    ele.user_name.innerText = user.name;
    ele.user_tag.innerText = '@' + user.profile;
};

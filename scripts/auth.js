import { API } from "./api.js";
import { setLocal } from "./helpers.js";

const authEle = {
  loginForm: document.querySelector("#login"),
  nameInp: document.querySelector("#name"),
  passInp: document.querySelector("#pass"),
  nameArea: document.querySelector(".name-warning"),
  passArea: document.querySelector(".pass-warning"),
};

const regex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})";

const checkValues = (name, pass) => {
  let isPassError = false;
  let isNameError = false;

  if (!name) {
    isNameError = true;
    authEle.nameArea.innerHTML = `<p class="warning">Lütfen isim giriniz</p>`;
  } else if (name.length <= 3) {
    isNameError = true;
    authEle.nameArea.innerHTML = `<p class="warning">İsim 3 karakterden uzun olmalı</p>`;
  } else {
    let isNameError = false;
    authEle.nameArea.innerHTML = "";
  }

  if (!pass) {
    isPassError = true;
    authEle.passArea.innerHTML = `<p class="warning">Lütfen şifre giriniz</p>`;
  } else if (pass.length < 8) {
    isPassError = true;
    authEle.passArea.innerHTML = `<p class="warning">Şifre 8 karakterden kısa olamaz</p>`;
  } else if (!pass.match(regex)) {
    isPassError = true;
    authEle.passArea.innerHTML = `<p class="warning">Şifre yeterince güçlü değil</p>`;
  } else {
    isPassError = false;
    authEle.passArea.innerHTML = "";
  }

  if (isNameError || isPassError) {
    return false;
  } else {
    return true;
  }
};

authEle.loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = authEle.nameInp.value;
  const pass = authEle.passInp.value;

  if (checkValues(name, pass)) {
    API.getUser(name)
      .then((data) => {
        setLocal('USER', data);

        window.location = "/";
      })
      .catch((err) => alert("Kullanıcı bilgilerine erişirken hata oluştu"));
  }
});

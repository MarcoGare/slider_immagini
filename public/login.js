const myToken = "05e64d83-689d-4f51-b1ed-f15ab24d0de7";

const inputName = document.querySelector("#name");
const inputPassword = document.querySelector("#password");
const loginButton = document.querySelector("#login-btn");
const registerButton = document.querySelector("#register-btn");
const divPrivate = document.querySelector("#private");
const divLogin = document.querySelector("#login");
const logoutButton = document.querySelector("#logout-btn");

const showPrivateSection = () => {
  divLogin.classList.add("hidden");
  divPrivate.classList.remove("hidden");
};

const showLoginSection = () => {
  divLogin.classList.remove("hidden");
  divPrivate.classList.add("hidden");
};

let isLogged = sessionStorage.getItem("Logged") === "true";
if (isLogged) {
  showPrivateSection();
} else {
  showLoginSection();
}

const login = (username, password) => {
  return fetch("https://ws.cipiaceinfo.it/credential/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "key": myToken
    },
    body: JSON.stringify({ username, password })
  })
  .then(res => res.json())
  .then(data => data.result);
};

const register = (username, password) => {
  return fetch("https://ws.cipiaceinfo.it/credential/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "key": myToken
    },
    body: JSON.stringify({ username, password })
  })
  .then(res => res.text())
  .then(data => data === "ok");
};

loginButton.onclick = () => {
  login(inputName.value, inputPassword.value).then((result) => {
    if (result) {
      sessionStorage.setItem("Logged", "true");
      showPrivateSection();
    } else {
      alert("Login fallito, riprova.");
    }
  });
};

registerButton.onclick = () => {
  register(inputName.value, inputPassword.value).then((result) => {
    if (result) {
      alert("Registrazione completata! Ora puoi fare il login.");
    } else {
      alert("Errore nella registrazione.");
    }
  });
};

logoutButton.onclick = () => {
  sessionStorage.removeItem("Logged");
  showLoginSection();
};

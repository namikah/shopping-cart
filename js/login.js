let userLogin = document.querySelector("#user-login");
let userRegister = document.querySelector("#user-register");
let Register = document.querySelector(".register");
let Login = document.querySelector(".log-in");
let username = document.querySelector(".username");
let password = document.querySelector(".password");
let btnEnter = document.querySelector(".login-button");
let btnRegister = document.querySelector(".register-button");
let asGuest = document.querySelector(".as-guest");

let users = readLocalStorage();

if (localStorage.getItem("login") === "false" || localStorage.getItem("login") === null) {
    btnEnter.addEventListener("click", function (e) {
        for (const item of users) {
            if (username.value === item.username && password.value === item.password) {
                localStorage.setItem("login", username.value);
                window.location.href = "./index.html";
                break;
            }
        }
    })
    asGuest.addEventListener("click", function (e) {
        localStorage.setItem("login", "false");
        window.location.href = "./index.html";
    })
    btnRegister.addEventListener("click", function (e) {
        let newUser = {
            name: document.querySelector(".register-name").value,
            surname: document.querySelector(".register-surname").value,
            username: document.querySelector(".register-username").value,
            password: document.querySelector(".register-password").value
        }
        for (const item of users) {
            if (item.username === newUser.username) return;
        }
        users.push(newUser);
        writeLocalStorage();
        Login.click();
    })
}
else {
    window.location.href = "./index.html";
}

Register.addEventListener("click", function (e) {
    userLogin.style.display = "none";
    userRegister.style.display = "block";
})
Login.addEventListener("click", function (e) {
    userRegister.style.display = "none";
    userLogin.style.display = "block";
})
function readLocalStorage() {
    return JSON.parse(localStorage.getItem("Users"));
}
function writeLocalStorage() {
    localStorage.setItem("Users", JSON.stringify(users));
}
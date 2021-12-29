let username = document.querySelector(".username");
let password = document.querySelector(".password");
let btnEnter = document.querySelector(".login-button");
let asGuest = document.querySelector(".as-quest");

if (localStorage.getItem("login") !== "true") {
    btnEnter.addEventListener("click", function (e) {
        if (username.value === "admin" && password.value === "123") {
            localStorage.setItem("login", "true");
            window.location.href = "./index.html";
        }
        else {
            return;
        }
    })
    asGuest.addEventListener("click", function (e) {
        localStorage.setItem("login", "false");
        window.location.href = "./index.html";
    })
}
else {
    window.location.href = "./index.html";
}
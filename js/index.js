let userLogin = document.querySelector("#user-login");
let username = document.querySelector(".username");
let password = document.querySelector(".password");
let btnEnter = document.querySelector(".login-button");
let signIn = document.querySelector(".sign-in");
let signOut = document.querySelector(".sign-out");
let asGuest = document.querySelector(".as-quest");
let buyItems = document.querySelector("#buy-items");
let navbar = document.querySelector("#navbar-header");
let myShoppingCartList = document.querySelector(".my-cart-list");
let addcartButton = document.querySelectorAll(".add-cart-button");

if (localStorage.getItem("login") !== "true") {
    btnEnter.addEventListener("click", function (e) {
        e.preventDefault();
        if (username.value === "admin" && password.value === "123") {
            localStorage.setItem("login", "true");
            userLogin.style.display = "none";
            navbar.style.display = "block";
            buyItems.style.display = "block";
            signIn.style.display = "none";
        }
        else {
            return;
        }
    })
    asGuest.addEventListener("click", function (e) {
        e.preventDefault();
        localStorage.setItem("login", "false");
        userLogin.style.display = "none";
        navbar.style.display = "block";
        buyItems.style.display = "block";
        signIn.style.display = "block";
        signOut.style.display = "none";
    })
}
else {
    userLogin.style.display = "none";
    signIn.style.display = "none";
    navbar.style.display = "block";
    buyItems.style.display = "block";
    signOut.style.display = "block";
}

signOut.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("login");
    userLogin.style.display = "block";
    navbar.style.display = "none";
    buyItems.style.display = "none";
    signIn.style.display = "none";
    signOut.style.display = "none";
})
signIn.addEventListener("click", function (e) {
    e.preventDefault();
    userLogin.style.display = "block";
    navbar.style.display = "none";
    buyItems.style.display = "none";
    signIn.style.display = "none";
    signOut.style.display = "none";
})
let cards = [];

cards = readLocalStorage();
addNewElement();

addcartButton.forEach(item => {
    item.addEventListener("click", function (e) {

        let itemSrc = this.parentElement.parentElement.children[0].children[0].getAttribute("src");
        let itemName = this.parentElement.children[0].innerText;
        let itemPrice = this.parentElement.children[1].innerText;
        let itemCount = 1;

        let newCard = {
            src: itemSrc,
            name: itemName,
            price: itemPrice,
            count: itemCount
        }
        if (cards === null)
            cards = [];

        if (isExistItem(newCard) !== undefined) {
            newCard.count = Number(isExistItem(newCard).count) + 1;

            cards[cards.indexOf(isExistItem(newCard))] = newCard;
            if (localStorage.getItem("login") !== "true")
                sessionStorage.setItem("Basket", JSON.stringify(cards));
            else
                localStorage.setItem("Basket", JSON.stringify(cards));
            resetAll();
            cards = readLocalStorage();
            addNewElement();

            return;
        }

        cards.unshift(newCard);
        if (localStorage.getItem("login") !== "true")
            sessionStorage.setItem("Basket", JSON.stringify(cards));
        else
            localStorage.setItem("Basket", JSON.stringify(cards));

        cards = readLocalStorage();
        addNewElement();
    })
});

function readLocalStorage() {
    if (localStorage.getItem("login") !== "true")
        return JSON.parse(sessionStorage.getItem("Basket"));
    else
        return JSON.parse(localStorage.getItem("Basket"));
}

function addNewElement() {
    if (cards === null) {
        return;
    }
    resetAll();
    cards.forEach(element => {
        let shoppingItems = document.createElement("li");
        let selectedItemImage = document.createElement("img");
        let CartContext = document.createElement("div");
        let selectedItemName = document.createElement("p");
        let selectedItemPrice = document.createElement("p");
        let selectedItemCount = document.createElement("p");
        let CartTotal = document.createElement("div");
        selectedItemName.style.fontSize = "16px";
        selectedItemName.style.color = "red";
        shoppingItems.classList.add("d-flex", "justify-content-left", "align-items-center")
        CartContext.classList.add("cart-context", "d-flex", "flex-column", "justify-content-center", "align-items-start")

        selectedItemImage.setAttribute("src", element.src);
        selectedItemName.innerText = element.name;
        selectedItemPrice.innerText = "price: " + element.price;
        selectedItemCount.innerText = "count: " + element.count;

        shoppingItems.appendChild(selectedItemImage);
        CartContext.appendChild(selectedItemName);
        CartContext.appendChild(selectedItemPrice);
        CartContext.appendChild(selectedItemCount);
        shoppingItems.appendChild(CartContext);
        myShoppingCartList.appendChild(shoppingItems);
    });
}

function resetAll() {
    while (myShoppingCartList.children[0])
        myShoppingCartList.children[0].remove();
}

function isExistItem(item) {
    let isItem = cards.find(value => value.name === item.name);
    return isItem;
}
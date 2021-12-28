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

let cards = [];
readAllItemCount();
addNewElement();

if (localStorage.getItem("login") !== "true") {
    btnEnter.addEventListener("click", function (e) {
        e.preventDefault();
        if (username.value === "admin" && password.value === "123") {
            localStorage.setItem("login", "true");
            userLogin.style.display = "none";
            signIn.style.display = "none";
            signOut.style.display = "block";
            navbar.style.display = "block";
            buyItems.style.display = "block";
        }
        else {
            return;
        }
    })
    asGuest.addEventListener("click", function (e) {
        e.preventDefault();
        localStorage.setItem("login", "false");
        userLogin.style.display = "none";
        signOut.style.display = "none";
        signIn.style.display = "block";
        navbar.style.display = "block";
        buyItems.style.display = "block";
    })
}
else {
    userLogin.style.display = "none";
    signIn.style.display = "none";
    signOut.style.display = "block";
    navbar.style.display = "block";
    buyItems.style.display = "block";
}

signOut.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("login");
    signIn.click();
})
signIn.addEventListener("click", function (e) {
    e.preventDefault();
    userLogin.style.display = "block";
    navbar.style.display = "none";
    buyItems.style.display = "none";
    signIn.style.display = "none";
    signOut.style.display = "none";
})

addcartButton.forEach(item => {
    item.addEventListener("click", function (e) {
        readAllItemCount();

        let itemSrc = this.parentElement.parentElement.children[0].children[0].getAttribute("src");
        let itemName = this.parentElement.children[0].innerText;
        let unikalId = this.parentElement.children[1].innerText;
        let itemPrice = this.parentElement.children[2].innerText;
        let itemCount = 1;
        let total = Number(itemPrice.substring(0, itemPrice.length - 4)) * itemCount;

        // let allTotal = Number(document.querySelector(".nav-item-last").getAttribute("data-id")) + 1;
        // document.querySelector(".nav-item-last").setAttribute("data-id", allTotal);

        let newCard = {
            id: unikalId,
            src: itemSrc,
            name: itemName,
            price: itemPrice,
            count: itemCount,
            total: total
        }

        if (cards === null)
            cards = [];

        if (isExistItem(newCard) !== undefined) {
            newCard.count = Number(isExistItem(newCard).count) + 1;
            newCard.total = Number(isExistItem(newCard).total) + Number(isExistItem(newCard).price.substring(0, itemPrice.length - 4));
            cards[cards.indexOf(isExistItem(newCard))] = newCard;
            if (localStorage.getItem("login") !== "true")
                sessionStorage.setItem("Basket", JSON.stringify(cards));
            else
                localStorage.setItem("Basket", JSON.stringify(cards));
            resetAll();
            readAllItemCount();
            addNewElement();

            return;
        }
        cards.unshift(newCard);
        writeLocalStorage();
        readAllItemCount();
        addNewElement();
    })
});

function readLocalStorage() {
    if (localStorage.getItem("login") !== "true")
        return JSON.parse(sessionStorage.getItem("Basket"));
    else
        return JSON.parse(localStorage.getItem("Basket"));
}
function writeLocalStorage() {
    if (localStorage.getItem("login") !== "true")
        sessionStorage.setItem("Basket", JSON.stringify(cards));
    else
        localStorage.setItem("Basket", JSON.stringify(cards));
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
        let selectedItemID = document.createElement("p");
        let selectedItemName = document.createElement("p");
        let selectedItemPrice = document.createElement("p");
        // let selectedItemCount = document.createElement("p");
        let selectedItemTotal = document.createElement("p");
        let closeX = document.createElement("span");
        selectedItemName.style.fontSize = "16px";
        selectedItemName.style.color = "red";
        shoppingItems.classList.add("d-flex", "justify-content-left", "align-items-center")
        CartContext.classList.add("cart-context", "d-flex", "flex-column", "justify-content-center", "align-items-start")
        closeX.innerText = "x";
        closeX.classList.add("close-x");

        selectedItemImage.setAttribute("src", element.src);
        selectedItemName.innerText = element.name;
        selectedItemID.innerText = element.id;
        selectedItemPrice.innerText = "price: " + element.count + " x " + element.price;
        // selectedItemCount.innerText = "count: " + element.count + " pieces";
        selectedItemTotal.innerText = "Total: " + element.total + " AZN";
        shoppingItems.appendChild(selectedItemImage);
        CartContext.appendChild(selectedItemName);
        CartContext.appendChild(selectedItemID);
        CartContext.appendChild(selectedItemPrice);
        // CartContext.appendChild(selectedItemCount);
        CartContext.appendChild(selectedItemTotal);
        shoppingItems.appendChild(CartContext);
        shoppingItems.appendChild(closeX);
        myShoppingCartList.appendChild(shoppingItems);

        selectedItemImage.addEventListener("click", function (e) {
            window.location.href = "./basket.html";
        })

        closeX.addEventListener("click", function (e) {
            readAllItemCount();
            if (cards !== null) {
                for (const item of cards) {
                    if (item.id === this.parentElement.children[1].children[1].innerText) {
                        let index = cards.indexOf(item);
                        cards.splice(index, 1);
                        writeLocalStorage();
                        resetAll();
                        readAllItemCount();
                        addNewElement();
                        return;
                    }
                }
            }
            else {
                resetAll();
            }
        })
    });
}

function resetAll() {
    while (myShoppingCartList.children[0]) {
        myShoppingCartList.children[0].remove();
        readAllItemCount();
    }
}
function readAllItemCount() {
    cards = readLocalStorage();
    if (cards !== null) document.querySelector(".nav-item-last").setAttribute("data-id", cards.length)
    else { document.querySelector(".nav-item-last").setAttribute("data-id", "0") }
}
function isExistItem(item) {
    let isItem = cards.find(value => value.name === item.name);
    return isItem;
}
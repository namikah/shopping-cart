let myShoppingCartList = document.querySelector(".my-cart-list");
let addcartButton = document.querySelectorAll(".add-cart-button");
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
            localStorage.setItem("Basket", JSON.stringify(cards));
            resetAll();
            cards = readLocalStorage();
            addNewElement();

            return;
        }

        cards.unshift(newCard);
        localStorage.setItem("Basket", JSON.stringify(cards));

        cards = readLocalStorage();
        addNewElement();
    })
});

function readLocalStorage() {
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
        shoppingItems.classList.add("d-flex", "justify-content-left", "align-items-center")
        CartContext.classList.add("cart-context", "d-flex", "flex-column", "justify-content-center", "align-items-start")

        selectedItemImage.setAttribute("src", element.src);
        selectedItemName.innerText = element.name;
        selectedItemPrice.innerText ="price: 1x" + element.price + " AZN";
        selectedItemCount.innerText ="count: " + element.count;

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

let arr = readLocalStorage();

addNewItem();

function addNewItem() {
    if (arr.length > 0) {
        for (const item of arr) {
            $(".basket-list").append(`
        <li class="basket-item d-flex justify-content-between align-items-center">
        <div class="left-side d-flex justify-align-content-between align-items-md-center col-md-6">
          <div class="item-image">
            <img src="${item.src}" alt="" class="img-fluid">
          </div>
          <div class="item-content">
            <p>${item.name}</p>
            <p id="item-id">${item.id}</p>
            <p>${item.price}</p>
          </div>
        </div>
        <div class="item-count col-md-2 text-center">
          <button>-</button>
          <input value="${item.count}" type="text" class="counter">
          <button>+</button>
        </div>
        <div class="item-price col-md-2 text-center">
          <p>${item.total} AZN</p>
        </div>
        <a href="#" class="x-close col-md-2 text-center" data-id="${item.id}">
          <i class="far fa-trash-alt"></i>
        </a>
      </li>`)

      $(".x-close").click(function (e) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === this.getAttribute("data-id")) {
                arr.splice(i, 1);
                resetAllItem();
                writeLocalStorage();
                addNewItem();
            }
        }
    
    })
        }
    }
}

function readLocalStorage() {
    if (localStorage.getItem("login") !== "true")
        return JSON.parse(sessionStorage.getItem("Basket"));
    else
        return JSON.parse(localStorage.getItem("Basket"));
}

function writeLocalStorage() {
    if (localStorage.getItem("login") !== "true")
        sessionStorage.setItem("Basket", JSON.stringify(arr));
    else
        localStorage.setItem("Basket", JSON.stringify(arr));
}

function resetAllItem() {
    $(".basket-list").empty();
}

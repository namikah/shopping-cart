let arr = readLocalStorage();
if(!arr) arr = [];

if (arr.length > 0) {
  addNewItem();
}

//add new item to basket
function addNewItem() {
  for (const item of arr) {
    $(".basket-list").append(`
        <li class="basket-item d-flex flex-wrap justify-content-between align-items-center">
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
            <button class="decrement-count">-</button>
            <input value="${item.count}" type="number" class="counter" data-id="${item.id}">
            <button class="increment-count">+</button>
          </div>
          <div class="item-price col-md-2 text-center">
            <p>${item.total} AZN</p>
          </div>
          <div class="item-close col-md-2 text-center">
            <i class="far fa-trash-alt x-close" data-id="${item.id}"></i>
          </div>
        </li>
      `)
  }
  //close item
  $(".x-close").click(function (e) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === this.getAttribute("data-id")) {
        arr.splice(i, 1);
        resetAllItem();
        writeLocalStorage();
        arr = readLocalStorage();
        addNewItem();
      }
    }
  })
  //increment item's count
  $(".increment-count").click(function (e) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === this.previousElementSibling.getAttribute("data-id")) {
        arr[i].count = (Number(arr[i].count) + 1);
        arr[i].total = (Number(arr[i].count) * Number(arr[i].price.substring(0, arr[i].price.length - 4)));
        writeLocalStorage();
        resetAllItem();
        arr = readLocalStorage();
        addNewItem();
      }
    }
  })
  //decrement item's count
  $(".decrement-count").click(function (e) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === this.nextElementSibling.getAttribute("data-id")) {
        arr[i].count = (Number(arr[i].count) - 1);
        if (arr[i].count < 1) arr[i].count = 1;
        arr[i].total = (Number(arr[i].count) * Number(arr[i].price.substring(0, arr[i].price.length - 4)));
        writeLocalStorage();
        resetAllItem();
        arr = readLocalStorage();
        addNewItem();
      }
    }
  })
  //input value change item's count
  $(".counter").change(function (e) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === this.getAttribute("data-id")) {
        arr[i].count = $(this).val();
        if (arr[i].count < 1) arr[i].count = 1;
        arr[i].total = (Number(arr[i].count) * Number(arr[i].price.substring(0, arr[i].price.length - 4)));
        writeLocalStorage();
        resetAllItem();
        arr = readLocalStorage();
        addNewItem();
        console.log("girdi");
      }
    }
  })
}
//read local storage and return array
function readLocalStorage() {
  if (localStorage.getItem("login") === "false")
    return JSON.parse(sessionStorage.getItem("Basket"));
  else
    return JSON.parse(localStorage.getItem(localStorage.getItem("login")));
}
//write new array to local storage
function writeLocalStorage() {
  if (localStorage.getItem("login") === "false")
    sessionStorage.setItem("Basket", JSON.stringify(arr));
  else
    localStorage.setItem(localStorage.getItem("login"), JSON.stringify(arr));
}
//empty all item from basket
function resetAllItem() {
  $(".basket-list").empty();
}
//window scroll to Top
$(window).scroll(function () {
  let height = $(window).scrollTop();
  console.log(height);
  if (height > 250) {
      $(".scroll-up").css({ display: 'block' })

  }
  else {
      $(".scroll-up").css({ display: 'none' })
  }
})
$(".scroll-up").click(function () {
  window.scrollTo(0, 0)
})
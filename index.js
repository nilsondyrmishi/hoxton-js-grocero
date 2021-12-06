/*

This is how an item object should look like

{
  id: 1, // <- the item id matches the icon name in the assets/icons folder
  name: "beetroot",
  price: 0.35 // <- You can come up with your own prices
}

*/





const state = {
    products: [
        {
            id: 1,
            name: "beetroot",
            price: 0.35,
            amount: 0
        },
        {
            id: 2,
            name: "carrot",
            price: 0.30,
            amount: 0
        },
        {
            id: 3,
            name: "apple",
            price: 0.40,
            amount: 0
        },
        {
            id: 4,
            name: "apricot",
            price: 0.25,
            amount: 0
        },
        {
            id: 5,
            name: "avocado",
            price: 0.6,
            amount: 0
        },
        {
            id: 6,
            name: "bananas",
            price: 0.35,
            amount: 0
        },
        {
            id: 7,
            name: "bell-pepper",
            price: 0.30,
            amount: 0
        },
        {
            id: 8,
            name: "berry",
            price: 0.40,
            amount: 0
        },
        {
            id: 9,
            name: "blueberry",
            price: 0.5,
            amount: 0
        },
        {
            id: 10,
            name: "eggplant",
            price: 0.5,
            amount: 0
        }
    ],

    groceryCart: []
}


const cartUl = document.querySelector("#cart .item-list")
const totalPrice = document.querySelector(".total-number")



function addItemToCart(product) {
    for (let cartGrocery of state.groceryCart) {
        if (product.name === cartGrocery.name) {
            cartGrocery.amount++
            return false
        }
    }
    state.groceryCart.push(product)
    product.amount++
}

function addProductAmount(grocery) {
    grocery.amount++
}

function reduceProductAmount(grocery) {
    grocery.amount--
    if (grocery.amount === 0) {
        state.groceryCart.splice(state.groceryCart.indexOf(grocery), 1)
    }
}



function createProductCart(product) {

    const prodCartLi = document.createElement("li")

    const prodCartImg = document.createElement("img")
    prodCartImg.setAttribute("class", "cart--item-icon")
    prodCartImg.setAttribute(`src`, `assets/icons/${product.id < 10 ? '00' : '0'}${product.id}-${product.name}.svg`)

    const prodCartName = document.createElement("p")
    prodCartName.textContent = product.name

    const deleteBtn = document.createElement("button")
    deleteBtn.setAttribute("class", "quantity-btn remove-btn center")
    deleteBtn.textContent = "-"

    const span = document.createElement("span")
    span.setAttribute("class", "quantity-text center")
    span.textContent = product.amount

    const addBtn = document.createElement("button")
    addBtn.setAttribute("class", "quantity-btn add-btn center")
    addBtn.textContent = "+"

    cartUl.append(prodCartLi)
    prodCartLi.append(prodCartImg, prodCartName, deleteBtn, span, addBtn)

    deleteBtn.addEventListener("click", function () {
        reduceProductAmount(product)
        render()
    })

    addBtn.addEventListener("click", function () {
        addProductAmount(product)
        render()
    })
}




function createGroceryStore() {

    const strUl = document.querySelector("header .item-list")
    strUl.innerHTML = ""

    for (const product of state.products) {

        const strLi = document.createElement("li")

        const strDiv = document.createElement("div")
        strDiv.setAttribute("class", ".store--item-icon")

        const strImg = document.createElement("img")
        strImg.setAttribute(`src`, `assets/icons/${product.id < 10 ? '00' : '0'}${product.id}-${product.name}.svg`)

        const strBtn = document.createElement("button")
        strBtn.textContent = "Add to cart"

        strBtn.addEventListener("click", function () {
            addItemToCart(product)
            render()
        })

        strDiv.append(strImg)
        strUl.append(strLi)
        strLi.append(strDiv, strBtn)
    }
}



function renderProductCart() {

    cartUl.innerHTML = ""
    let priceSum = 0

    for (const product of state.groceryCart) {
        createProductCart(product)
        priceSum += product.price * product.amount
    }
    totalPrice.textContent = priceSum.toFixed(2)
    console.log(priceSum)
}

function render() {
    createGroceryStore()
    renderProductCart()
}
render()


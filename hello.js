//Products

const products = [
    {
        id: 1,
        name: "Classic Burger",
        price: 1000,
        category: "Burger",
        image: "CLASSIC BURGER.jpg",
        description: "Juicy beef patty with cheese, fresh vegetables and our special sauce."
    },

    {
        id: 2,
        name: "Cheese Burger",
        price: 119,
        category: "Burger",
        image: "chess burger.jpg",
        description: "A delicious burger with double cheese, juicy beef and special sauce."
    },

    {
        id: 3,
        name: "Classic Footlong",
        price: 89,
        category: "Footlong",
        image: "footlong.avif",
        description: "Delicious sausage with cheese, vegetables and special sauce."
    },

    {
        id: 4,
        name: "Chicken BBQ",
        price: 89,
        category: "Chicken",
        image: "chicken.avif",
        description: "Flavorful fried chicken with BBQ sauce, and vegetables."
    },

    {
        id: 5,
        name: "French Fries",
        price: 6969,
        category: "sides",
        image: "french fries.jpg",
        description: "Crispy golden fries with our signature seasoning."
    },

    {
        id: 6,
        name: "Cold Soda",
        price: 10000,
        category: "Drinks",
        image: "cold soda.jpg",
        description: "Ice-cold refreshing soda to complete your meal."
    }
];


        //cart

let cart = [];


    //Show Product details

let selectedProduct = null;
let quantity = 1;

function showProduct(id) {

    selectedProduct = products.find(product => product.id === id);

    quantity = 1;

    document.getElementById("modalImage").innerHTML =
        `<img src="${selectedProduct.image}" alt="${selectedProduct.name}">`;

    document.getElementById("modalCategory").textContent =
        selectedProduct.category;

    document.getElementById("modalName").textContent =
        selectedProduct.name;

    document.getElementById("modalDescription").textContent =
        selectedProduct.description;

    document.getElementById("modalPrice").textContent =
        "₱" + selectedProduct.price;

    document.getElementById("quantity").textContent =
        quantity;

    document.getElementById("productModal").classList.add("show");
}

//close product

function closeProduct() {

    document
        .getElementById("productModal")
        .classList.remove("show");
}


//change quantity

function changeQuantity(amount) {

    quantity += amount;

    if (quantity < 1) {
        quantity = 1;
    }

    document.getElementById("quantity").textContent = quantity;
}


    //add product to cart

function addToCart(id) {

    const product = products.find(product => product.id === id);

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
}


// ==============================
// ADD FROM PRODUCT MODAL
// ==============================

function addModalToCart() {

    const existing = cart.find(
        item => item.id === selectedProduct.id
    );

    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({
            ...selectedProduct,
            quantity: quantity
        });
    }

    updateCart();

    closeProduct();

    openCart();
}


// ==============================
// UPDATE CART
// ==============================

function updateCart() {

    const cartItems = document.getElementById("cartItems");

    const cartCount = document.getElementById("cartCount");

    const cartTotal = document.getElementById("cartTotal");


    let totalItems = 0;
    let totalPrice = 0;


    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';

    } else {

        cartItems.innerHTML = "";


        cart.forEach(item => {

            totalItems += item.quantity;

            totalPrice += item.price * item.quantity;


            const div = document.createElement("div");

            div.className = "cart-item";


            div.innerHTML = `
                <div>
                    <h4>${item.name}</h4>
                    <p>₱${item.price} × ${item.quantity}</p>
                </div>

                <div class="cart-controls">

                    <button onclick="changeCartQuantity(${item.id}, -1)">
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="changeCartQuantity(${item.id}, 1)">
                        +
                    </button>

                </div>
            `;


            cartItems.appendChild(div);

        });

    }


    cartCount.textContent = totalItems;

    cartTotal.textContent = "₱" + totalPrice;
}


// ==============================
// CHANGE CART QUANTITY
// ==============================

function changeCartQuantity(id, amount) {

    const item = cart.find(item => item.id === id);

    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart = cart.filter(item => item.id !== id);

    }


    updateCart();
}


// ==============================
// OPEN CART
// ==============================

function openCart() {

    document
        .getElementById("cartModal")
        .classList.add("show");
}


// ==============================
// CLOSE CART
// ==============================

function closeCart() {

    document
        .getElementById("cartModal")
        .classList.remove("show");
}


// ==============================
// FILTER PRODUCTS
// ==============================

function filterProducts(category) {

    const cards =
        document.querySelectorAll(".product-card");

    const buttons =
        document.querySelectorAll(".category-buttons button");


    buttons.forEach(button => {
        button.classList.remove("active");
    });


    event.target.classList.add("active");


    cards.forEach(card => {

        if (
            category === "all" ||
            card.dataset.category === category
        ) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });
}


// ==============================
// CHECKOUT
// ==============================

function showToast(message, isError = false) {
    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toast-message");

    toastMessage.textContent = message;
    toast.classList.toggle("error", isError);
    toast.classList.remove("hidden");
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

function checkout() {
    if (cart.length === 0) {
        showToast("Your cart is empty!", true);
        return;
    }

    showToast("Thank you for your order! Your food is being prepared.");

    cart = [];
    updateCart();
    closeCart();
}
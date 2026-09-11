// ==============================
// PRODUCTS
// ==============================

const products = [
    {
        id: 1,
        name: "Classic Burger",
        price: 99,
        category: "Burger",
        image: "🍔",
        description: "Juicy beef patty with cheese, fresh vegetables and our special sauce."
    },

    {
        id: 2,
        name: "Cheese Burger",
        price: 119,
        category: "Burger",
        image: "🍔",
        description: "A delicious burger with double cheese, juicy beef and special sauce."
    },

    {
        id: 3,
        name: "Classic Footlong",
        price: 89,
        category: "Footlong",
        image: "🌭",
        description: "Delicious sausage with cheese, vegetables and special sauce."
    },

    {
        id: 4,
        name: "Special Fried Rice",
        price: 79,
        category: "Fried Rice",
        image: "🍚",
        description: "Flavorful fried rice with egg, vegetables and meat."
    },

    {
        id: 5,
        name: "French Fries",
        price: 59,
        category: "sides",
        image: "🍟",
        description: "Crispy golden fries with our signature seasoning."
    },

    {
        id: 6,
        name: "Cold Soda",
        price: 10000,
        category: "Drinks",
        image: "🥤",
        description: "Ice-cold refreshing soda to complete your meal."
    }
];


// ==============================
// CART
// ==============================

let cart = [];


// ==============================
// SHOW PRODUCT DETAILS
// ==============================

let selectedProduct = null;
let quantity = 1;

function showProduct(id) {

    selectedProduct = products.find(product => product.id === id);

    quantity = 1;

    document.getElementById("modalImage").textContent =
        selectedProduct.image;

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


// ==============================
// CLOSE PRODUCT
// ==============================

function closeProduct() {

    document
        .getElementById("productModal")
        .classList.remove("show");
}


// ==============================
// CHANGE QUANTITY
// ==============================

function changeQuantity(amount) {

    quantity += amount;

    if (quantity < 1) {
        quantity = 1;
    }

    document.getElementById("quantity").textContent = quantity;
}


// ==============================
// ADD PRODUCT TO CART
// ==============================

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

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }


    alert(
        "Thank you for your order! Your food is being prepared."
    );


    cart = [];

    updateCart();

    closeCart();
}
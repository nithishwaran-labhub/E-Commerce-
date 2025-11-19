// ======== Global Variables ========
let products = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// ======== Fetch Products from JSON ========
fetch("data/products.json")
    .then(response => response.json())
    .then(data => {
        products = data;
        displayProducts();      // Home page
        displayCart();          // Cart page
        displayWishlist();      // Wishlist page
        displayProductDetails();// Product detail page
        updateCounts();
    })
    .catch(error => console.error("Error loading products:", error));

// ======== Display Products on Home Page ========
function displayProducts() {
    const productList = document.getElementById("product-list");
    if(!productList) return;

    productList.innerHTML = "";

    products.forEach(product => {
        const card = document.


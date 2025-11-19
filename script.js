// ======== Product & Cart Setup ========
let products = [];
let filteredProducts = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = [];

// Fetch products from products.json
fetch('products.json')
  .then(response => response.json())
  .then(data => {
    products = data;
    filteredProducts = products;
    displayProducts(filteredProducts);
    updateCartCount(); // initialize cart count on page load
  })
  .catch(err => console.error('Error loading products:', err));

// ======== Display Products ========
function displayProducts(productsArray) {
  const container = document.getElementById('products-container');
  container.innerHTML = '';

  if (productsArray.length === 0) {
    container.innerHTML = '<p style="grid-column:1/-1;text-align:center;">No products found</p>';
    return;
  }

  productsArray.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
      <img src="${product.img}" alt="${product.name}" class="product-img">
      <h3 class="product-name">${product.name}</h3>
      <p class="product-price">₹${product.price}</p>
      <div class="product-buttons">
        <button onclick="addToCart(${product.id})">Add to Cart</button>
        <button onclick="addToWishlist(${product.id})">Add to Wishlist</button>
      </div>
    `;
    container.appendChild(productCard);
  });
}

// ======== Cart Functions ========
function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (product) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart)); // save cart to localStorage
    updateCartCount();
    alert(`${product.name} added to cart!`);
  }
}

function updateCartCount() {
  document.getElementById('cart-count').innerText = cart.length;
}

function viewCart() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let cartDetails = "Your Cart:\n\n";
  let total = 0;
  cart.forEach((item, index) => {
    cartDetails += `${index + 1}. ${item.name} - ₹${item.price}\n`;
    total += item.price;
  });
  cartDetails += `\nTotal: ₹${total}`;
  alert(cartDetails);
}

// ======== Wishlist Function ========
function addToWishlist(id) {
  const product = products.find(p => p.id === id);
  if (product) {
    wishlist.push(product);
    alert(`${product.name} added to wishlist!`);
  }
}

// ======== Filter & Sort Products ========
function filterProducts() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const category = document.getElementById('categoryFilter').value;
  const sort = document.getElementById('sortPrice') ? document.getElementById('sortPrice').value : 'none';

  filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm);
    const matchesCategory = category === 'all' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  // Sort by price
  if (sort === 'low') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === 'high') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  displayProducts(filteredProducts);
}

// ======== Optional: Clear Cart Function ========
function clearCart() {
  cart = [];
  localStorage.removeItem("cart");
  updateCartCount();
  alert("Cart cleared!");
}

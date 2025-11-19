let products = []; // Will store products from JSON

// Fetch products from products.json
fetch('products.json')
  .then(response => response.json())
  .then(data => {
    products = data;
    displayProducts(products); // Display all products
  })
  .catch(err => console.error('Error loading products:', err));

// Display products in a grid
function displayProducts(productsArray) {
  const container = document.getElementById('products-container');
  container.innerHTML = ''; // Clear previous content

  productsArray.forEach(product => {
    // Create product card
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

// Cart & Wishlist functionality (simple for demo)
let cart = [];
let wishlist = [];

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (product) {
    cart.push(product);
    alert(`${product.name} added to cart!`);
  }
}

function addToWishlist(id) {
  const product = products.find(p => p.id === id);
  if (product) {
    wishlist.push(product);
    alert(`${product.name} added to wishlist!`);
  }
}

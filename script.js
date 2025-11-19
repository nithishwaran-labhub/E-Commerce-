let products = [];
let filteredProducts = [];

// Fetch products from products.json
fetch('products.json')
  .then(response => response.json())
  .then(data => {
    products = data;
    filteredProducts = products;
    displayProducts(filteredProducts);
  })
  .catch(err => console.error('Error loading products:', err));

// Display products in a grid
function displayProducts(productsArray) {
  const container = document.getElementById('products-container');
  container.innerHTML = '';

  if(productsArray.length === 0){
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

// Cart & Wishlist
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

// Filter products by search & category
function filterProducts() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const category = document.getElementById('categoryFilter').value;

  filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm);
    const matchesCategory = category === 'all' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  displayProducts(filteredProducts);
}

let products = [];

fetch("data/products.json")
  .then(response => response.json())
  .then(data => {
      products = data;
      displayProducts();      // Display on home page
      displayCart();          // Display cart items if any
      displayWishlist();      // Display wishlist items if any
  })
  .catch(error => console.error("Error loading products:", error));


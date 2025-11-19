let products = [
  { id:1,name:"Running Shoes", price:1200,img:"products/shoes1.jpg",category:"shoes" },
  { id:2,name:"Leather Watch", price:3500,img:"products/watch1.jpg",category:"watches" },
  { id:3,name:"Backpack", price:1500,img:"products/bag1.jpg",category:"bags" },
  { id:4,name:"Wireless Earbuds", price:2000,img:"products/electronics1.jpg",category:"electronics" },
  { id:5,name:"Sunglasses", price:800,img:"products/accessory1.jpg",category:"accessories" },
  { id:6,name:"Formal Shoes", price:2500,img:"products/shoes2.jpg",category:"shoes" },
  { id:7,name:"Digital Watch", price:2200,img:"products/watch2.jpg",category:"watches" },
  { id:8,name:"Handbag", price:1800,img:"products/bag2.jpg",category:"bags" },
  { id:9,name:"Bluetooth Speaker", price:3000,img:"products/electronics2.jpg",category:"electronics" },
  { id:10,name:"Cap", price:500,img:"products/accessory2.jpg",category:"accessories" },
  { id:11,name:"Sports Shoes", price:1400,img:"products/shoes3.jpg",category:"shoes" },
  { id:12,name:"Smart Watch", price:5000,img:"products/watch3.jpg",category:"watches" },
  { id:13,name:"Laptop Bag", price:2200,img:"products/bag3.jpg",category:"bags" },
  { id:14,name:"Headphones", price:2500,img:"products/electronics3.jpg",category:"electronics" },
  { id:15,name:"Belt", price:700,img:"products/accessory3.jpg",category:"accessories" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = [];

function displayProducts(productsArray){
  const container = document.getElementById('products-container');
  container.innerHTML = "";
  if(productsArray.length === 0){ container.innerHTML = "<p style='grid-column:1/-1;text-align:center;'>No products found</p>"; return; }

  productsArray.forEach(product=>{
    const card = document.createElement('div');
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.img}" class="product-img">
      <h3 class="product-name">${product.name}</h3>
      <p class="product-price">₹${product.price}</p>
      <div class="product-buttons">
        <button onclick="addToCart(${product.id})">Add to Cart</button>
        <button onclick="addToWishlist(${product.id})">Wishlist</button>
      </div>
    `;
    container.appendChild(card);
  });
  updateCartCount();
}

function addToCart(id){
  const product = products.find(p=>p.id===id);
  if(product){ cart.push(product); localStorage.setItem("cart",JSON.stringify(cart)); updateCartCount(); alert(`${product.name} added to cart!`); }
}

function addToWishlist(id){
  const product = products.find(p=>p.id===id);
  if(product){ wishlist.push(product); alert(`${product.name} added to wishlist!`); }
}

function updateCartCount(){ document.getElementById('cart-count').innerText = cart.length; }

function viewCart(){
  if(cart.length===0){ alert("Cart empty!"); return; }
  let message = "Your Cart:\n\n";
  let total = 0;
  cart.forEach((item,i)=>{ message+=`${i+1}. ${item.name} - ₹${item.price}\n`; total+=item.price; });
  message += `\nTotal: ₹${total}`;
  alert(message);
}

function filterProducts(){
  const search = document.getElementById('searchInput').value.toLowerCase();
  const category = document.getElementById('categoryFilter').value;
  const sort = document.getElementById('sortPrice').value;

  let filtered = products.filter(p=>{
    return p.name.toLowerCase().includes(search) && (category==='all' || p.category===category);
  });

  if(sort==='low'){ filtered.sort((a,b)=>a.price-b.price); }
  else if(sort==='high'){ filtered.sort((a,b)=>b.price-a.price); }

  displayProducts(filtered);
}

// Initialize
displayProducts(products);

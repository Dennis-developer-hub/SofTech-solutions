// ===== SHOW TOP BANNER ON LOAD =====
window.addEventListener('load', () => {
  const banner = document.getElementById('topBanner');
  if (banner) {
    setTimeout(() => banner.classList.add('show'), 300);
  }
});

// ===== ADD TO CART FUNCTIONALITY =====
const cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(name, price, image) {
  const item = { name, price, image };
  cart.push(item);
  saveCart();
  alert(`${name} has been added to your cart!`);
}

// Attach click events to buttons on product page
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.product-card button');
  buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      const name = card.querySelector('h3').innerText;
      const price = parseFloat(card.querySelector('p').innerText.replace('$', ''));
      const image = card.querySelector('img').src;
      addToCart(name, price, image);
    });
  });

  // Display cart items on cart page
  const cartContainer = document.getElementById('cartItems');
  if (cartContainer) {
    displayCart();
  }
});

function displayCart() {
  const cartContainer = document.getElementById('cartItems');
  const totalPriceElem = document.getElementById('totalPrice');
  cartContainer.innerHTML = '';

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    totalPriceElem.innerText = '0';
    return;
  }

  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>$${item.price.toFixed(2)}</p>
      <button onclick="removeItem(${index})">Remove</button>
    `;
    cartContainer.appendChild(div);
  });

  totalPriceElem.innerText = total.toFixed(2);
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  displayCart();
}
// ===== HAMBURGER MENU TOGGLE =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('open');
  });
}

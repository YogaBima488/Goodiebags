// Shopping Cart Logic
const cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartCountElement = document.getElementById('cart-count');

// Format number to currency
function formatCurrency(value) {
    return value.toLocaleString('id-ID');
}

// Update cart count
function updateCartCount() {
    const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCountElement.textContent = itemCount;
}

function showCategory(category) {
  // Hide all categories
  const categories = document.querySelectorAll('.product-category');
  categories.forEach((cat) => cat.classList.add('hidden'));

  // Show the selected category
  document.getElementById(category).classList.remove('hidden');

  // Update active button
  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach((btn) => btn.classList.remove('active'));
  document.querySelector(`[onclick="showCategory('${category}')"]`).classList.add('active');
}

// Add item to cart
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Event listeners for "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseInt(button.getAttribute('data-price'), 10);
        addToCart(name, price);
    });
});

// Initial cart count update
updateCartCount();

document.addEventListener('DOMContentLoaded', () => {
    const carouselItems = document.querySelector('.carousel-items');
    const slides = document.querySelectorAll('.carousel-items .slide');
    const indicators = document.querySelectorAll('.carousel-indicators span');
    let currentSlide = 0;

    function updateCarousel() {
        carouselItems.style.transform = `translateX(-${currentSlide * 100}%)`;
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }

    document.querySelector('.carousel-btn.next').addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    });

    document.querySelector('.carousel-btn.prev').addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateCarousel();
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
    });

    updateCarousel(); // Initialize carousel
});
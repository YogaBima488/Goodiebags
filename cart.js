// Get cart data from localStorage
const cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartItemsElement = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');

// Format number to currency
function formatCurrency(value) {
    return value.toLocaleString('id-ID');
}

// Update cart display
function updateCartDisplay() {
    cartItemsElement.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsElement.innerHTML = '<li>Your cart is empty.</li>';
    } else {
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} x${item.quantity} - Rp. ${formatCurrency(item.price * item.quantity)}`;
            cartItemsElement.appendChild(li);
            total += item.price * item.quantity;
        });
    }

    cartTotalElement.textContent = formatCurrency(total);
}

// Initial display update
updateCartDisplay();

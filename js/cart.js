function getCart(user) {
    user = user || getUser();
    return user.cart || [];
}

function updateCartUI() {
      const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        document.getElementById('cartCount').textContent = cartCount;
        renderCart();
    }

function renderCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalSpan = document.getElementById('cartTotal');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
        cartTotalSpan.textContent = '$0.00';
        return;
    }

    let totalPrice = 0;
    let cartHTML = '';

    cart.forEach((item, index) => {
        const itemTotal = (item.price * item.quantity).toFixed(2);
        totalPrice += parseFloat(itemTotal);
        cartHTML += `
            <div class="cart-item" style="padding: 1rem; border-bottom: 1px solid var(--secondary); display: flex; justify-content: space-between; align-items: center;">
            <div style="flex: 1;">
                <p style="font-weight: 600; margin-bottom: 0.5rem;">${item.title}</p>
                <p style="font-size: 0.9rem; opacity: 0.7;">$${item.price} x ${item.quantity} = $${itemTotal}</p>
            </div>
            <button onclick="removeFromCart(${index})" style="background: none; border: none; color: #ff6b6b; cursor: pointer; font-weight: 600;">Remove</button>
            </div>
        `;
    });

    cartItemsContainer.innerHTML = cartHTML;
    cartTotalSpan.textContent = '$' + totalPrice.toFixed(2);
}

// Function to complete checkout and log transaction
function completeCheckout() {

    let user = getUser();
    const cart = getCart(user)
    
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // Calculate total
    let totalAmount = 0;
    cart.forEach(item => {
        totalAmount += item.price * item.quantity;
    });

    logTransaction(cart, totalAmount); // log transaction

    delete user.cart; saveUser(user); // delete cart and save user.

    alert('Purchase completed successfully!');
    
    // Redirect to dashboard
    window.location.href = 'index.html';
}
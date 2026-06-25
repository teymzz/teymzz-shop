
  let tag = document.getElementById('user')
  let currentUserObj = getUser();
  tag.innerHTML = currentUserObj.fullname;

  // Load dashboard data
  function loadDashboard() {
    // Load stats
    const totalItems = getTotalItemsBought();
    document.getElementById('totalItemsBought').textContent = totalItems;

    const cartCount = getPendingCartCount();
    const cartTotal = getPendingCartTotal();
    document.getElementById('cartItemCount').textContent = cartCount;
    document.getElementById('cartAmountText').textContent = '$' + cartTotal.toFixed(2);

    const transactions = getTransactions(100);
    const totalTransCount = transactions.length;
    const totalSpent = transactions.reduce((sum, t) => sum + t.totalAmount, 0);
    document.getElementById('totalTransactions').textContent = totalTransCount;
    document.getElementById('totalSpentText').textContent = '$' + totalSpent.toFixed(2) + ' spent';

    // Load activities
    loadActivities();

    // Load transactions
    loadTransactions();

    // Load pending cart
    loadPendingCart();
  }

  function loadActivities() {
    const activities = getActivities(8);
    const activityList = document.getElementById('activityList');

    if (activities.length === 0) {
      activityList.innerHTML = `
        <div class="activity-item flex">
          <div class="activity-dot"></div>
          <div class="activity-content">
            <p class="activity-text">No activities yet</p>
            <span class="activity-time">Get started by making your first purchase!</span>
          </div>
        </div>
      `;
      return;
    }

    activityList.innerHTML = activities.map(activity => `
      <div class="activity-item flex">
        <div class="activity-dot">${getActivityIcon(activity.type)}</div>
        <div class="activity-content">
          <p class="activity-text">${activity.description}</p>
          <span class="activity-time">${getTimeAgo(activity.timestamp)}</span>
        </div>
      </div>
    `).join('');
  }

  function loadTransactions() {
    const transactions = getTransactions(5);
    const transactionsList = document.getElementById('transactionsList');

    if (transactions.length === 0) {
      transactionsList.innerHTML = `
        <div class="empty-state">
          <p>No transactions yet</p>
          <a href="shop.html" class="btn-shop">Start Shopping</a>
        </div>
      `;
      return;
    }

    transactionsList.innerHTML = transactions.map(transaction => `
      <div class="transaction-item">
        <div class="transaction-header">
          <span class="transaction-date">${new Date(transaction.date).toLocaleDateString()}</span>
          <span class="transaction-amount">$${transaction.totalAmount.toFixed(2)}</span>
        </div>
        <p class="transaction-items">${transaction.itemCount} item${transaction.itemCount !== 1 ? 's' : ''}</p>
        <span class="transaction-status">${transaction.status}</span>
      </div>
    `).join('');
  }

  function loadPendingCart() {
    const cart = getCart();
    const pendingList = document.getElementById('pendingList');

    if (cart.length === 0) {
      pendingList.innerHTML = `
        <div class="empty-state">
          <p>Your cart is empty</p>
          <a href="shop.html" class="btn-shop">Continue Shopping</a>
        </div>
      `;
      return;
    }

    let totalPrice = 0;
    cart.forEach(item => {
      totalPrice += item.price * item.quantity;
    });

    pendingList.innerHTML = `
      <div class="pending-summary">
        <p class="pending-count">${cart.length} item${cart.length !== 1 ? 's' : ''} in cart</p>
        <p class="pending-total">Total: $${totalPrice.toFixed(2)}</p>
      </div>
      <div class="pending-items">
        ${cart.map((item, index) => `
          <div class="pending-item">
            <span class="pending-item-name">${item.title}</span>
            <span class="pending-item-qty">×${item.quantity}</span>
            <span class="pending-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        `).join('')}
      </div>
      <a href="cart.html" class="btn-view-cart">View Cart & Checkout</a>
    `;
  }

  // Load dashboard when page loads
  window.addEventListener('load', loadDashboard);
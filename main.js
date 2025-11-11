document.addEventListener("DOMContentLoaded", () => {
  console.log("main.js loaded successfully");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  /* alert message */
  function showMessage(message, type = "info") {
    const existingMsg = document.getElementById("floating-message");
    if (existingMsg) existingMsg.remove();

    const msgBox = document.createElement("div");
    msgBox.id = "floating-message";
    msgBox.className =
      "alert text-center position-fixed top-50 start-50 translate-middle shadow-lg fade show";

    switch (type) {
      case "success":
        msgBox.style.backgroundColor = "#28a745"; 
        msgBox.style.color = "#fff";
        break;
      case "error":
        msgBox.style.backgroundColor = "#dc3545"; 
        msgBox.style.color = "#fff";
        break;
      case "info":
      default:
        msgBox.style.backgroundColor = "#ffc107";
        msgBox.style.color = "#000";
        break;
    }

    msgBox.innerHTML = message;
    document.body.appendChild(msgBox);

    setTimeout(() => {
      msgBox.style.opacity = "0";
      setTimeout(() => msgBox.remove(), 400);
    }, 1000);
  }

  /*cart page*/
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function updateCartCount() {
    const cartCountEl = document.getElementById("cart-count");
    if (cartCountEl) {
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartCountEl.textContent = totalItems;
    }
  }

  function addToCart(name, price) {
    const existing = cart.find((item) => item.name === name);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }
    saveCart();
    updateCartCount();
    showMessage(`✅ ${name} added to cart!`, "success");
  }

  function renderCart() {
    const cartContainer = document.getElementById("cart-items");
    const totalContainer = document.getElementById("cart-total");
    if (!cartContainer || !totalContainer) return;

    cartContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      cartContainer.innerHTML =
        "<tr><td colspan='5' class='text-center'>🛒 Your cart is empty.</td></tr>";
      totalContainer.textContent = "₱0";
      return;
    }

    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.name}</td>
        <td>₱${item.price.toLocaleString()}</td>
        <td><input type="number" min="1" value="${item.quantity}" class="form-control" data-index="${index}"></td>
        <td>₱${itemTotal.toLocaleString()}</td>
        <td><button class="btn btn-danger btn-sm" data-index="${index}">Remove</button></td>
      `;
      cartContainer.appendChild(row);
    });

    totalContainer.textContent = `₱${total.toLocaleString()}`;

    cartContainer.querySelectorAll("input").forEach((input) => {
      input.addEventListener("change", (e) => {
        const index = e.target.dataset.index;
        const newQty = parseInt(e.target.value);
        if (newQty > 0) {
          cart[index].quantity = newQty;
          saveCart();
          renderCart();
        }
      });
    });

    cartContainer.querySelectorAll(".btn-danger").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        cart.splice(index, 1);
        saveCart();
        renderCart();
        updateCartCount();
        showMessage("❌ Item removed from cart.", "error");
      });
    });
  }

  function clearCart() {
    if (cart.length === 0) {
      showMessage("🛒 Your cart is already empty!", "info");
      return;
    }
    cart = [];
    saveCart();
    renderCart();
    updateCartCount();
    showMessage("✅ Cart cleared successfully!", "success");
  }

  function checkout() {
    if (cart.length === 0) {
      showMessage("🛒 Your cart is empty. Add products before checking out!", "error");
      return;
    }

    localStorage.removeItem("cart");
    cart = [];
    updateCartCount();
    renderCart();
    showMessage("🎉 Thank you for your purchase! Your order has been placed.", "success");
  }

  const clearCartBtn = document.getElementById("clear-cart");
  if (clearCartBtn) clearCartBtn.addEventListener("click", clearCart);

  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) checkoutBtn.addEventListener("click", checkout);

  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const name = button.dataset.name;
      const price = parseFloat(button.dataset.price);
      addToCart(name, price);
    });
  });

  renderCart();
  updateCartCount();

  /*contact page*/
  const contactForm = document.getElementById("contact-form");
  const feedbackBox = document.getElementById("feedback-box");
  const closeBtn = document.getElementById("close-feedback");

  if (contactForm && feedbackBox && closeBtn) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      feedbackBox.style.display = "flex";
      contactForm.reset();

      setTimeout(() => {
        feedbackBox.style.display = "none";
      }, 4000);
    });

    closeBtn.addEventListener("click", function () {
      feedbackBox.style.display = "none";
    });
  }
});

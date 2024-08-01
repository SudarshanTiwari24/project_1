document.addEventListener("DOMContentLoaded", () => {
  const hamburgerIcon = document.querySelector(".hamburger-icon");
  const dropdown = document.querySelector(".dropdown");
  const cartButton = document.getElementById("cart-button");
  const filterButton = document.getElementById("filter-button");
  const cartModal = document.getElementById("cart-modal");
  const orderFormModal = document.getElementById("order-form-modal");
  const filterModal = document.getElementById("filter-modal");
  const overlay = document.getElementById("overlay");
  const closeModalButtons = document.querySelectorAll(".close");
  const buyNowButton = document.getElementById("buy-now");
  const orderForm = document.getElementById("order-form");
  const filterForm = document.getElementById("filter-form");
  const notification = document.getElementById("notification");
  const cartItemsContainer = document.querySelector(".cart-items");
  const closeOrderFormButton = document.querySelector(".close-form");
  const productDetailsContainer = document.getElementById(
    "product-details-container"
  );
  let cart = [];

  // Toggle dropdown menu
  hamburgerIcon.addEventListener("click", () => {
    dropdown.style.display =
      dropdown.style.display === "block" ? "none" : "block";
  });

  // Close the dropdown if clicking outside of it
  document.addEventListener("click", (event) => {
    if (
      !hamburgerIcon.contains(event.target) &&
      !dropdown.contains(event.target)
    ) {
      dropdown.style.display = "none";
    }
  });

  // Close modals
  closeModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      cartModal.style.display = "none";
      orderFormModal.style.display = "none";
      filterModal.style.display = "none";
      overlay.style.display = "none";
    });
  });

  // Function to display cart items
  function displayCartItems() {
    cartItemsContainer.innerHTML = "";
    cart.forEach((item, index) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
                <div class="product-item">
                    <img src="IMG/${item.name}.png" alt="${item.name}">
                    <div class="product-details">
                        <h3>${item.name}</h3>
                        <p>${item.price}</p>
                        <button class="remove-item" data-index="${index}">Remove</button>
                    </div>
                </div>`;
      cartItemsContainer.appendChild(cartItem);
    });

    // Add event listeners to remove buttons
    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        cart.splice(index, 1);
        displayCartItems();
      });
    });
  }

  // Add to cart functionality
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (e) => {
      const productItem = e.target.closest(".product-item");
      const productName = productItem.querySelector("h3").innerText;
      const productPrice = productItem.querySelector("p").innerText;

      cart.push({ name: productName, price: productPrice });

      // Show notification
      notification.style.display = "block";
      setTimeout(() => {
        notification.style.display = "none";
      }, 2000); // Hide after 2 seconds
    });
  });

  // Show cart modal
  cartButton.addEventListener("click", () => {
    displayCartItems();
    cartModal.style.display = "block";
  });

  // Open order form modal
  buyNowButton.addEventListener("click", () => {
    if (cart.length > 0) {
      productDetailsContainer.innerHTML = "";
      cart.forEach((item, index) => {
        const productDetail = document.createElement("div");
        productDetail.classList.add("product-detail");
        productDetail.innerHTML = `
                    <h3>${item.name} (${
          item.category || "Unknown Category"
        })</h3>
                    <input type="hidden" name="product-name-${index}" value="${
          item.name
        }">
                    <input type="hidden" name="product-category-${index}" value="${
          item.category || "Unknown Category"
        }">
                    <label for="quantity-${index}">Order Quantity:</label>
                    <input type="number" id="quantity-${index}" name="quantity-${index}" required>
                `;
        productDetailsContainer.appendChild(productDetail);
      });
      orderFormModal.style.display = "block";
    } else {
      alert("Your cart is empty.");
    }
  });

  // Close order form modal
  closeOrderFormButton.addEventListener("click", () => {
    orderFormModal.style.display = "none";
  });

  // Handle order form submission
  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(orderForm);
    const orderDetails = {};

    formData.forEach((value, key) => {
      orderDetails[key] = value;
    });

    // Send order details to admin via WhatsApp (mock implementation)
    let orderSummary = `Order placed:\nName: ${orderDetails.name}\nAddress: ${orderDetails.address}\nProducts:`;
    cart.forEach((item, index) => {
      orderSummary += `\nProduct: ${orderDetails[`product-name-${index}`]} (${
        orderDetails[`product-category-${index}`]
      })\nQuantity: ${orderDetails[`quantity-${index}`]}`;
    });

    alert(orderSummary);

    // Reset cart and close modals
    cart = [];
    cartModal.style.display = "none";
    orderFormModal.style.display = "none";
  });

  // Show filter modal
  filterButton.addEventListener("click", () => {
    filterModal.style.display = "block";
    overlay.style.display = "block";
  });

  // Close modal
  closeModalButton.addEventListener("click", () => {
    filterModal.style.display = "none";
    overlay.style.display = "none";
  });

  // Handle filter form submission
  filterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const price = document.getElementById("price").value;
    let products = document.querySelectorAll(".product-item");

    console.log("Filter applied. Price:", price);

    if (price) {
      products = Array.from(products);
      products.sort((a, b) => {
        const priceA = parseFloat(
          a.querySelector("p").innerText.replace("$", "")
        );
        const priceB = parseFloat(
          b.querySelector("p").innerText.replace("$", "")
        );
        return price === "low-to-high" ? priceA - priceB : priceB - priceA;
      });

      const parent = products[0].parentElement;
      parent.innerHTML = "";
      products.forEach((product) => parent.appendChild(product));
    }

    filterModal.style.display = "none";
    overlay.style.display = "none";
  });

  // Slideshow
  let slideIndex = 0;
  showSlides();

  function showSlides() {
    let i;
    const slides = document.querySelectorAll(".mySlides");
    const dots = document.querySelectorAll(".dot");

    console.log("Slides:", slides);
    console.log("Dots:", dots);

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    setTimeout(showSlides, 2000); // Change image every 2 seconds
  }
});

const navLinks = document.querySelectorAll(".nav-menu .nav-link")
const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

menuOpenButton.addEventListener("click", () => {
    // Menu MOBILE 
    document.body.classList.toggle("show-mobile-menu");
});

// Fechar o menu quando o botão for clicado //
menuCloseButton.addEventListener("click", () => menuOpenButton.click());

// Fechar o menu quando o nav link for clicado //
navLinks.forEach(link => {
    link.addEventListener("click", () => menuOpenButton.click());
});

// Meu carrinho //
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");
cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));

const addCartButtons = document.querySelectorAll(".add-cart");
addCartButtons.forEach(button => {
    button.addEventListener("click", event => {
        const productBox = event.target.closest(".product-box");
        addToCart(productBox);
    });
});

const cartContent = document.querySelector(".cart-content");
const addToCart = productBox => {
    const productImgSrc = productBox.querySelector("img").src;
    const productTitle = productBox.querySelector(".product-title").textContent;
    const productPrice = productBox.querySelector(".price").textContent;

    const cartItems = cartContent.querySelectorAll(".cart-product-title");
    for (let item of cartItems) {
        if (item.textContent === productTitle) {
            alert("Este item já está no carrinho.");
            return;
        }
    }

    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.innerHTML = `
    <img src="${productImgSrc}" alt="cart-img">
            <div class="cart-detail">
              <h2 class="cart-product-title">${productTitle}</h2>
              <span class="cart-price">${productPrice}</span>
              <div class="cart-quantity">
                <button id="decrement">-</button>
                <span class="number">1</span>
                <button id="increment">+</button>
              </div>
            </div>
            <i class="ri-delete-bin-line cart-remove"></i> 
    `;

    cartContent.appendChild(cartBox);

    cartBox.querySelector(".cart-remove").addEventListener("click", () => {
        cartBox.remove();

        updateCartCount(-1);

        updateTotalPrice();
    });

    cartBox.querySelector(".cart-quantity").addEventListener("click", event => {
        const numberElement = cartBox.querySelector(".number");
        const decrementButton = cartBox.querySelector("#decrement");
        let quantity = numberElement.textContent;

        if (event.target.id === "decrement" && quantity > 1) {
            quantity--;
            if (quantity === 1) {
                decrementButton.style.color = "#999";
            }
        } else if (event.target.id === "increment") {
            quantity++;
            decrementButton.style.color = "#333";
        }

        numberElement.textContent = quantity;

        updateTotalPrice();
    });

    updateCartCount(1);

    updateTotalPrice();
};

const updateTotalPrice = () => {
    const totalPriceElement = document.querySelector(".total-price");
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    let total = 0;
    cartBoxes.forEach(cartBox => {
        const priceElement = cartBox.querySelector(".cart-price");
        const quantityElement = cartBox.querySelector(".number");
        const price = priceElement.textContent.replace("R$", "");
        const quantity = quantityElement.textContent;
        total += price * quantity;
    });
    totalPriceElement.textContent = total.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
};

let cartItemCount = 0;
const updateCartCount = change => {
    const cartItemCountBadge = document.querySelector(".cart-item-count");
    cartItemCount += change;
    if (cartItemCount > 0) {
        cartItemCountBadge.style.visibility = "visible";
        cartItemCountBadge.textContent = cartItemCount;
    } else {
        cartItemCountBadge.style.visibility = "hidden";
        cartItemCountBadge.textContent = "";
    }
};

const buyNowButton = document.querySelector(".btn-buy");
buyNowButton.addEventListener("click", () => {
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    if (cartBoxes.length === 0) {
        alert("Seu carrinho está vazio. Adicione itens ao seu carrinho antes de comprar.");
        return;
    }

    cartBoxes.forEach(cartBox => cartBox.remove());

    cartItemCount = 0;
    updateCartCount(0);

    updateTotalPrice();

    alert("Obrigado pela compra!");

});

// User //

let user = document.querySelector('.user');

document.querySelector('#user-icon').onclick = () => {
    user.classList.toggle('active');
    search.classList.remove('active');
    search.classList.remove('active');
}

// Saiba Mais //
function toggleInfo(id) {
  const info = document.getElementById(id);
  info.style.display = info.style.display === "none" ? "block" : "none";
}

function toggleInfo(id) {
  const info = document.getElementById(id);
  info.style.display = info.style.display === "none" ? "block" : "none";
}
// DONT ERASE ANYTHGING


// TURNING IMAGE
function showInfo(info) {
    const infoOverlay = document.querySelector('.info-overlay');
    if (infoOverlay) {
        infoOverlay.innerHTML = `<h2>Product Information</h2><p>${info}</p>`;
    } else {
        console.error('Info overlay element not found');
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    const largePicture = document.getElementById('largePicture');

    if (largePicture) {
        largePicture.addEventListener('mouseleave', () => {
            largePicture.classList.remove('hover');
        });
    } else {
        console.error('Large picture element not found');
    }
});

// SMALL TO BIG PICTURE
function changeMainImage(thumbnail) {
    var mainImage = document.getElementById('mainImage');
    mainImage.src = thumbnail.src;
}

function changeMainImage(thumbnail) {
    var mainImage = document.getElementById('mainImage');
    mainImage.src = thumbnail.src;
}

// + BUTTON
function increment() {
    var quantityInput = document.getElementById('quantity');
    quantityInput.value = parseInt(quantityInput.value) + 1;
}

// - BUTTON
function decrement() {
    var quantityInput = document.getElementById('quantity');
    if (quantityInput.value > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
    }
}

// TOTAL PRICE 
function updateTotalPrice() {
    const quantity = document.getElementById('quantity').value;
    const unitPrice = 10; // Replace with your actual unit price
    const totalPrice = quantity * unitPrice;
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

function increment() {
    const quantity = document.getElementById('quantity');
    quantity.value = parseInt(quantity.value) + 1;
    updateTotalPrice();
}

function decrement() {
    const quantity = document.getElementById('quantity');
    if (quantity.value > 1) {
        quantity.value = parseInt(quantity.value) - 1;
        updateTotalPrice();
    }
}

// Initialize total price on page load
function updateTotalPrice() {
    const element = document.querySelector('#element-id');
    if (element) {
        const value = element.value;
        // Вашиот код за ажурирање на цената
    } else {
        console.error('Element not found');
    }
}

// STARS 



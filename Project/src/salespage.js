document.addEventListener("DOMContentLoaded", function() {
    let products = {};

    // Fetch the products.json file
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            showSaleProducts();
        })
        .catch(error => console.error('Error fetching products:', error));

    const savedProduct = JSON.parse(localStorage.getItem('currentProduct'));
    if (savedProduct) {
        showProductDetails(savedProduct.category, savedProduct.id);
    }

    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    updateCartCount();
    updateCartDisplay();

    function saveCartItems() {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    function showCategory(category) {
        const productContainer = document.getElementById('products');
        productContainer.innerHTML = '';

        products[category].forEach(function(product) {
            if (product.onSale) {
                const newPrice = parseFloat(product.newPrice.replace(' EUR', ''));
                const oldPrice = parseFloat(product.oldPrice.replace(' EUR', ''));
                const savings = oldPrice - newPrice;
                const discountPercent = calculateDiscount(oldPrice, newPrice);

                const productHTML = `
                    <div class="col-xs-12 col-sm-6 col-md-2 product-item" data-id="${product.id}" data-category="${category}">
                        <img src="${product.image}" class="img-responsive center-block">
                        <span class="badge"><h5>Extra ${discountPercent}% Off</h5></span>
                        <h4 class="text-center">${product.name}</h4>
                        <h5 class="text-center" id="new-Price">${product.newPrice}</h5>
                        <h6 class="text-center">${product.oldPrice}</h6>
                        <p class="save">Save: ${savings.toFixed(2)} EUR</p>
                        <div class="btn-container">
                            <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
                            <button class="more-details" data-product-id="${product.id}" data-category="${category}">More Details</button>
                        </div>
                    </div>
                `;
                productContainer.innerHTML += productHTML;
            }
        });

        addMoreDetailsEventListeners();
        addAddToCartEventListeners();
    }

    function showSaleProducts() {
        const productContainer = document.getElementById('products');
        productContainer.innerHTML = '';

        for (const category in products) {
            products[category].forEach(function(product) {
                if (product.onSale) {
                    const newPrice = parseFloat(product.newPrice.replace(' EUR', ''));
                    const oldPrice = parseFloat(product.oldPrice.replace(' EUR', ''));
                    const savings = oldPrice - newPrice;
                    const discountPercent = calculateDiscount(oldPrice, newPrice);

                    const productHTML = `
                        <div class="col-xs-12 col-sm-6 col-md-2 product-item" data-id="${product.id}" data-category="${category}">
                            <img src="${product.image}" class="img-responsive center-block">
                            <span class="badge"><h5>Extra ${discountPercent}% Off</h5></span>
                            <h4 class="text-center">${product.name}</h4>
                            <h5 class="text-center" id="new-Price">${product.newPrice}</h5>
                            <h6 class="text-center">${product.oldPrice}</h6>
                            <p class="save">Save: ${savings.toFixed(2)} EUR</p>
                            <div class="btn-container">
                                <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
                                <button class="more-details" data-product-id="${product.id}" data-category="${category}">More Details</button>
                            </div>
                        </div>
                    `;
                    productContainer.innerHTML += productHTML;
                }
            });
        }

        addMoreDetailsEventListeners();
        addAddToCartEventListeners();
    }

    function addMoreDetailsEventListeners() {
        const moreDetailsBtns = document.querySelectorAll('.more-details');
        moreDetailsBtns.forEach((btn) => {
            btn.addEventListener('click', function() {
                const productId = this.getAttribute('data-product-id');
                const category = this.getAttribute('data-category');
                showProductDetails(category, productId);

                const currentProduct = {
                    category: category,
                    id: productId
                };
                localStorage.setItem('currentProduct', JSON.stringify(currentProduct));
            });
        });
    }

    function addAddToCartEventListeners() {
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-product-id');
                addToCart(productId);
            });
        });
    }

    function calculateDiscount(oldPrice, newPrice) {
        return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
    }

    function addToCart(productId) {
        const product = findProductById(productId);
        if (!product) {
            console.error('Product not found:', productId);
            return;
        }

        const existingProduct = cartItems.find(item => item.id === product.id);

        if (existingProduct) {
            alert('Product is already in the cart!');
        } else {
            cartItems.push({ ...product, quantity: 1 });
            updateCartDisplay();
            alert('Product added to cart!');
            updateCartCount();
        }

        saveCartItems();
    }

    function findProductById(productId) {
        for (const category in products) {
            const product = products[category].find(item => item.id === productId);
            if (product) {
                return product;
            }
        }
        return null;
    }

    function updateCartDisplay() {
        const cartItemsContainer = document.querySelector('.cart-items');
        const cartSummary = document.querySelector('.cart-summary');
        const emptyCartMessage = document.getElementById('empty-cart-message');

        cartItemsContainer.innerHTML = '';

        if (cartItems.length === 0) {
            emptyCartMessage.classList.remove('hidden');
            cartSummary.classList.add('hidden');
        } else {
            emptyCartMessage.classList.add('hidden');
            cartSummary.classList.remove('hidden');

            cartItems.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');

                cartItem.innerHTML = `
                    <div class="item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="item-details">
                        <h3>${item.name}</h3>
                        <p class="item-price" data-price="${item.newPrice}">Price: ${item.newPrice}</p>
                        <div class="quantity">
                            <label for="quantity${index}">Quantity:</label>
                            <input type="number" id="quantity${index}" value="${item.quantity}" min="1">
                        </div>
                        <button class="remove-item" data-index="${index}">Remove</button>
                    </div>
                `;

                cartItemsContainer.appendChild(cartItem);
            });

            document.querySelectorAll('.quantity input').forEach((input, index) => {
                input.addEventListener('change', function() {
                    updateQuantity(index, this.value);
                });
            });

            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', function() {
                    const index = this.getAttribute('data-index');
                    removeItem(index);
                });
            });

            updateCartSummary();
        }
    }

    function updateQuantity(index, quantity) {
        cartItems[index].quantity = parseInt(quantity);
        updateCartSummary();
        updateCartCount();
        saveCartItems();
    }

    function removeItem(index) {
        cartItems.splice(index, 1);
        updateCartDisplay();
        updateCartCount();
        saveCartItems();

        if (cartItems.length === 0) {
            showHomePage();
        }
    }

    function updateCartSummary() {
        const subtotalElement = document.getElementById('subtotal');
        const totalElement = document.getElementById('total');

        const subtotal = cartItems.reduce((total, item) => total + parseFloat(item.newPrice.replace(' EUR', '')) * item.quantity, 0);
        subtotalElement.textContent = subtotal.toFixed(2);
        totalElement.textContent = subtotal.toFixed(2);
    }

    function updateCartCount() {
        const cartCountElement = document.getElementById('cart-count');
        const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

        if (totalItems > 0) {
            cartCountElement.textContent = totalItems;
            cartCountElement.classList.remove('hidden');
            setCartLinkActive();
        } else {
            cartCountElement.classList.add('hidden');
            setCartLinkInactive();
        }

        localStorage.setItem('cartItemCount', totalItems); // Save cart count to localStorage
    }

    function setCartLinkInactive() {
        const cartLink = document.getElementById('cart-link');
        const cartAnchor = cartLink.querySelector('a');
        cartAnchor.classList.add('disabled');
        cartAnchor.removeEventListener('click', showCart);
    }

    function setCartLinkActive() {
        const cartLink = document.getElementById('cart-link');
        const cartAnchor = cartLink.querySelector('a');
        cartAnchor.classList.remove('disabled');
        cartAnchor.addEventListener('click', showCart);
    }

    function showHomePage() {
        hideAllSections();
        const homePage = document.querySelector('.homepagehidden');
        homePage.classList.remove('hidden');
    }

    function showCart() {
        hideAllSections();
        document.querySelector('.cart-container').style.display = 'block';
    }

    function showProductDetails(category, productId) {
        const product = products[category].find(product => product.id === productId);

        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-description').textContent = product.description || "No description available.";
        document.getElementById('product-price').textContent = product.newPrice;
        document.getElementById('product-image').src = product.image;

        const addToCartButton = document.querySelector('.container-moredetails .product-add');
        addToCartButton.setAttribute('data-product-id', productId);

        const newAddToCartButton = addToCartButton.cloneNode(true);
        addToCartButton.parentNode.replaceChild(newAddToCartButton, addToCartButton);

        newAddToCartButton.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            addToCart(productId);
        });

        document.querySelector('.container-moredetails').style.display = 'block';

        document.querySelector('.all-reviews').setAttribute('data-id', product.id);
    }

    function setActiveCategory(header) {
        document.querySelectorAll('#slider-text h2').forEach(function(h2) {
            h2.classList.remove('active');
        });
        header.classList.add('active');
    }

    document.querySelectorAll('#slider-text h2').forEach(function(header) {
        header.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            setActiveCategory(this);
            showCategoryProducts(category);
        });
    });

    function showCategoryProducts(category) {
        const productContainer = document.getElementById('products');
        productContainer.innerHTML = '';

        let categoryProducts = products[category].filter(product => product.onSale);
        categoryProducts.forEach(function(product) {
            const newPrice = parseFloat(product.newPrice.replace(' EUR', ''));
            const oldPrice = parseFloat(product.oldPrice.replace(' EUR', ''));
            const savings = oldPrice - newPrice;
            const discountPercent = calculateDiscount(oldPrice, newPrice);

            const productHTML = `
                <div class="col-xs-12 col-sm-6 col-md-2 product-item" data-id="${product.id}" data-category="${category}">
                    <img src="${product.image}" class="img-responsive center-block">
                    <span class="badge"><h5>Extra ${discountPercent}% Off</h5></span>
                    <h4 class="text-center">${product.name}</h4>
                    <h5 class="text-center" id="new-Price">${product.newPrice}</h5>
                    <h6 class="text-center">${product.oldPrice}</h6>
                    <p class="save">Save: ${savings.toFixed(2)} EUR</p>
                    <div class="btn-container">
                        <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
                        <button class="more-details" data-product-id="${product.id}" data-category="${category}">More Details</button>
                    </div>
                </div>
            `;
            productContainer.innerHTML += productHTML;
        });

        addMoreDetailsEventListeners();
        addAddToCartEventListeners();
    }

    function showAllProducts() {
        const productContainer = document.getElementById('products');
        productContainer.innerHTML = '';

        let allProducts = [];
        for (const category in products) {
            allProducts = allProducts.concat(products[category].map(product => ({ ...product, category })));
        }

        allProducts = allProducts.sort(() => Math.random() - 0.5);

        allProducts.forEach(function(product) {
            
            const oldPrice = parseFloat(product.oldPrice.replace(' EUR', ''));
            const productHTML = `
                <div class="col-xs-12 col-sm-6 col-md-2 product-item" data-id="${product.id}" data-category="${product.category}">
                    <img src="${product.image}" class="img-responsive center-block">
                    <h4 class="text-center">${product.name}</h4>
                    <h5 class="text-center" id="old-Price">${product.oldPrice}</h5>
                    <div class="btn-container">
                        <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
                        <button class="more-details" data-product-id="${product.id}" data-category="${product.category}">More Details</button>
                    </div>
                </div>
            `;
            productContainer.innerHTML += productHTML;
        });

        addMoreDetailsEventListeners();
        addAddToCartEventListeners();
    }

    function showSalePage() {
        hideAllSections();
        document.getElementById('bcground').style.display = 'block';
        document.querySelector('.mainsale').style.display = 'block';
        document.querySelector('.theTime').style.display = 'block';
        document.getElementById('timer').style.display = 'block';
        document.getElementById('sale-hidden').style.display = 'block';
        showSaleProducts();
        updateHash('#/salespage');
    }

    document.getElementById('category-toggle').addEventListener('click', function(event) {
        event.preventDefault();
        hideAllSections();
        document.getElementById('bcground').style.display = 'block';
        document.querySelector('.mainsale').style.display = 'none';
        document.querySelector('.theTime').style.display = 'none';
        document.getElementById('timer').style.display = 'none';
        document.getElementById('sale-hidden').style.display = 'none'; // Hide sales specific elements
        showAllProducts(); // Show all products with onSale false
        updateHash('#/category');
    });

    document.getElementById('sale-product-link').addEventListener('click', function(event) {
        event.preventDefault();
        showSalePage();
    });

    // Function to update hash without reloading the page
    function updateHash(hash) {
        history.pushState(null, '', hash);
    }

    // Function to hide all sections
    function hideAllSections() {
        document.querySelector('.homepagehidden').style.display = 'none';
        document.getElementById('bcground').style.display = 'none';
        document.querySelector('.log-reg-hidden').style.display = 'none';
        document.querySelector('.contact-hidden').style.display = 'none';
        document.querySelector('.cart-container').style.display = 'none';
        document.querySelector('.container-moredetails').style.display = 'none';
        document.querySelector('.profile-show').style.display = 'none';
    }

    window.addEventListener('hashchange', function() {
        const currentHash = location.hash;
        if (currentHash === '#/salespage') {
            showSalePage();
        } else if (currentHash === '#/category') {
            hideAllSections();
            document.getElementById('bcground').style.display = 'block';
            document.querySelector('.mainsale').style.display = 'none';
            document.querySelector('.theTime').style.display = 'none';
            document.getElementById('timer').style.display = 'none';
            document.getElementById('sale-hidden').style.display = 'none'; // Hide sales specific elements
            showAllProducts(); // Show all products with onSale false
        } else if (currentHash.startsWith('#/details/')) {
            const [_, category, productId] = currentHash.split('/');
            showProductDetails(category, productId);
        }
    });

    window.addEventListener('load', function() {
        const currentHash = location.hash;
        if (currentHash === '#/salespage') {
            showSalePage();
        } else if (currentHash === '#/category') {
            hideAllSections();
            document.getElementById('bcground').style.display = 'block';
            document.querySelector('.mainsale').style.display = 'none';
            document.querySelector('.theTime').style.display = 'none';
            document.getElementById('timer').style.display = 'none';
            document.getElementById('sale-hidden').style.display = 'none'; // Hide sales specific elements
            showAllProducts(); // Show all products with onSale false
        } else if (currentHash.startsWith('#/details/')) {
            const [_, category, productId] = currentHash.split('/');
            showProductDetails(category, productId);
        }
        
    });
    function sortProducts(criteria) {
        const productsContainer = document.getElementById('products');
        const products = Array.from(productsContainer.getElementsByClassName('product-item'));
    
        products.sort((a, b) => {
            if (criteria === 'lower-price') {
                const priceA = parseFloat(a.querySelector('#new-Price').textContent.replace(/[^\d.-]/g, ''));
                const priceB = parseFloat(b.querySelector('#new-Price').textContent.replace(/[^\d.-]/g, ''));
                return priceA - priceB;
            } else if (criteria === 'higher-price') {
                const priceA = parseFloat(a.querySelector('#new-Price').textContent.replace(/[^\d.-]/g, ''));
                const priceB = parseFloat(b.querySelector('#new-Price').textContent.replace(/[^\d.-]/g, ''));
                return priceB - priceA;
            } else if (criteria === 'highest-offer') {
                const discountA = parseFloat(a.querySelector('.badge').textContent.replace('Extra ', '').replace('% Off', ''));
                const discountB = parseFloat(b.querySelector('.badge').textContent.replace('Extra ', '').replace('% Off', ''));
                return discountB - discountA;
            } else if (criteria === 'alphabetical') {
                const nameA = a.querySelector('h4').textContent.toLowerCase();
                const nameB = b.querySelector('h4').textContent.toLowerCase();
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0;
            }
        });
    
        productsContainer.innerHTML = '';
        products.forEach(product => productsContainer.appendChild(product));
    }
    
    document.addEventListener('DOMContentLoaded', function () {
        const timerElement = document.getElementById('timer');
    
        let endTime = localStorage.getItem('saleEndTime');
    
        if (!endTime) {
            const now = new Date().getTime();
            endTime = now + 30 * 24 * 60 * 60 * 1000;
            localStorage.setItem('saleEndTime', endTime);
        }
    
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const timeLeft = endTime - now;
    
            if (timeLeft <= 0) {
                clearInterval(interval);
                timerElement.textContent = "expired";
                localStorage.removeItem('saleEndTime');
            } else {
                const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
                timerElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
            }
        }, 1000);
});
});
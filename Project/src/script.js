
// SKRIPTA ZA SLIKITE SLIDESHOW
const slides = [
    {
        quote: "Home is not a place, it's a feeling",
        img: "../templates/img/home.png",
        title: "Home Decorations"
    },
    {
        quote: "Stir up some love in every pot",
        img: "../templates/img/kitchen.jpg",
        title: "Kitchen Equipment"
    },
    {
        quote: "Every toy has a story waiting to be told.",
        img: "../templates/img/Toys.jpg",
        title: "Toys"
    },
    {
        quote: "Life begins the day you start a garden.",
        img: "../templates/img/Garden Greenery.jpg",
        title: "Gardening tools"
    },
    {
        quote: "Elegance is the only beauty that never fades.",
        img: "../templates/img/accesories.jpg",
        title: "Accessories"
    },
    {
        quote: "Style is a way to say who you are without having to speak.",
        img: "../templates/img/clothes.jpg",
        title: "Clothes"
    }
];

let currentSlide = 0;
const slideContainer = document.getElementById('carouselContainer');

function createSlide(slideData) {
    const slide = document.createElement('div');
    slide.classList.add('slide');

    const img = document.createElement('img');
    img.src = slideData.img;
    img.alt = 'Slide Image';
    slide.appendChild(img);

    const content = document.createElement('div');
    content.classList.add('content');

    const title = document.createElement('h2');
    title.classList.add('Categorytitle');
    title.textContent = slideData.title;
    content.appendChild(title);

    const quote = document.createElement('p');
    quote.classList.add('quote');
    quote.textContent = slideData.quote;
    content.appendChild(quote);

    slide.appendChild(content);

    return slide;
}

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => slide.classList.remove('active'));

    slides[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

slides.forEach(slideData => {
    const slide = createSlide(slideData);
    slideContainer.appendChild(slide);
});

showSlide(currentSlide);

setInterval(nextSlide, 5000);

// ----------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function() {
    // Initial setup: Show the correct section based on the current hash
    function showSectionFromHash() {
        const hash = window.location.hash;
        hideAllSections();
        switch (hash) {
            case '#/home':
                document.querySelector('.homepagehidden').style.display = 'block';
                break;
            case '#/salespage':
                document.querySelector('.bcground').style.display = 'block';
                break;
            case '#/login':
                document.querySelector('.log-reg-hidden').style.display = 'block';
                break;
            case '#/contact':
                document.querySelector('.contact-hidden').style.display = 'block';
                break;
            case '#/profile':
                const profileSection = document.querySelector('.profile-show');
                profileSection.classList.remove('hidden');
                profileSection.style.display = 'block';
                break;
            case '#/cart':
                document.querySelector('.cart-container').style.display = 'block';
                break;
            case '#/moredetails':
                document.querySelector('.container-moredetails').style.display = 'block';
                break;
            default:
                document.querySelector('.homepagehidden').style.display = 'block';
                updateHash('#/home'); // Update hash to home if hash is not recognized
                break;
        }
    }

    // Function to hide all sections
    function hideAllSections() {
        document.querySelector('.homepagehidden').style.display = 'none';
        document.querySelector('.bcground').style.display = 'none';
        document.querySelector('.log-reg-hidden').style.display = 'none';
        document.querySelector('.contact-hidden').style.display = 'none';
        document.querySelector('.cart-container').style.display = 'none'; // Ensure cart content is hidden
        document.querySelector('.container-moredetails').style.display = 'none'; // Hide order page content
        document.querySelector('.profile-show').style.display = 'none'; // Hide profile content
    }

    // Function to update hash without reloading the page
    function updateHash(hash) {
        history.pushState(null, '', hash);
    }

    // Function to clear the sign-up form
    function clearSignUpForm() {
        document.getElementById('first-last-name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('dob').value = '';
        document.getElementById('gender').value = '';
        document.getElementById('sign-up-password').value = '';
    }

    // Show the correct section based on the current hash
    showSectionFromHash();

    // Show home section and hide others when "Home" is clicked
    document.getElementById('home-link').addEventListener('click', function(event) {
        event.preventDefault();
        hideAllSections();
        document.querySelector('.homepagehidden').style.display = 'block';
        updateHash('#/home');
    });

    // Show sales section and hide others when "Sale Product" is clicked
    document.getElementById('sale-product-link').addEventListener('click', function(event) {
        event.preventDefault();
        hideAllSections();
        document.querySelector('.bcground').style.display = 'block';
        updateHash('#/salespage');
    });

    // Show login/register section and hide others when "Login / Sign Up" is clicked
    document.querySelector('.dropdown2 a').addEventListener('click', function(event) {
        event.preventDefault();
        hideAllSections();
        document.querySelector('.log-reg-hidden').style.display = 'block';
        updateHash('#/login');

        // Check if sign-up form is currently visible
        if (document.getElementById('sign-up-form').classList.contains('hidden')) {
            // Show login form and hide sign-up form
            document.getElementById('login-form').classList.remove('hidden');
            document.getElementById('sign-up-form').classList.add('hidden');
        } else {
            // Show sign-up form and hide login form
            document.getElementById('sign-up-form').classList.remove('hidden');
            document.getElementById('login-form').classList.add('hidden');
        }
    });

    // Show home section and hide others when "LOGO" is clicked
    document.querySelector('.navbar-brand').addEventListener('click', function(event) {
        event.preventDefault();
        hideAllSections();
        document.querySelector('.homepagehidden').style.display = 'block';
        updateHash('#/home');
    });

    // Show sign-up form and hide login form when "Sign Up" is clicked
    document.getElementById('login-sign-up-btn').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('login-form').classList.add('hidden');
        document.getElementById('sign-up-form').classList.remove('hidden');
    });

    // Show login form and hide sign-up form when "Back to Login" is clicked
    document.getElementById('back-to-login-btn').addEventListener('click', function(event) {
        event.preventDefault();
        clearSignUpForm();
        document.getElementById('sign-up-form').classList.add('hidden');
        document.getElementById('login-form').classList.remove('hidden');
    });

    // Show contact form and hide others when "Contact us" is clicked
    document.getElementById('contact-us').addEventListener('click', function(event) {
        event.preventDefault();
        hideAllSections();
        document.querySelector('.contact-hidden').style.display = 'block';
        updateHash('#/contact');
    });

    // Show profile content and hide others when "Profile" is clicked
    document.getElementById('profile-link').addEventListener('click', function(event) {
        event.preventDefault();
        hideAllSections();
        const profileSection = document.querySelector('.profile-show');
        profileSection.classList.remove('hidden');
        profileSection.style.display = 'block';
        updateHash('#/profile');
    });

    // Show cart content and hide others when "Cart" is clicked
    document.getElementById('cart-link').addEventListener('click', function(event) {
        event.preventDefault();
        hideAllSections();
        document.querySelector('.cart-container').style.display = 'block';
        updateHash('#/cart');
    });

    // Show order page content and hide others when "More Details" is clicked
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('more-details')) {
            event.preventDefault();
            hideAllSections();
            document.querySelector('.container-moredetails').style.display = 'block';
            updateHash('#/moredetails');
        }
    });

    // Handle back button navigation
    window.addEventListener('hashchange', showSectionFromHash);
});




// ----------------------------------------------------------------



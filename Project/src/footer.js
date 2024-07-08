// Get the bubbles container
const bubblesContainer = document.querySelector('.bubbles');

// Create bubbles
for (let i = 0; i < 128; i++) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.style.setProperty('--size', `${2 + Math.random() * 4}rem`);
    bubble.style.setProperty('--distance', `${6 + Math.random() * 4}rem`);
    
    // Ensure the position is within 5% to 95%
    let position = 5 + Math.random() * 90;
    bubble.style.setProperty('--position', `${position}%`);
    
    bubble.style.setProperty('--time', `${2 + Math.random() * 2}s`);
    bubble.style.setProperty('--delay', `${-1 * (2 + Math.random() * 2)}s`);
    bubblesContainer.appendChild(bubble);
}



document.addEventListener('DOMContentLoaded', () => {
    const subscribedEmails = new Set(JSON.parse(localStorage.getItem('subscribedEmails')) || []);
    const emailInput = document.getElementById('email-subscribe');
    const subscribeButton = document.getElementById('button-subscribe');
    const messageDiv = document.getElementById('subscribe-message');

    subscribeButton.addEventListener('click', subscribe);
    emailInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            subscribe();
        }
    });

    function subscribe() {
        const email = emailInput.value.trim();
        if (!validateEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        if (subscribedEmails.has(email)) {
            showMessage('This email is already subscribed.', 'error');
            emailInput.value = '';
            return;
        }

        subscribedEmails.add(email);
        localStorage.setItem('subscribedEmails', JSON.stringify([...subscribedEmails]));
        showMessage('Successfully subscribed!', 'success');
        emailInput.value = '';
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showMessage(message, type) {
        subscribeButton.style.display = 'none';
        messageDiv.textContent = message;
        messageDiv.className = `message ${type}`;
        messageDiv.style.display = 'block';
        setTimeout(() => {
            messageDiv.style.display = 'none';
            subscribeButton.style.display = 'inline-block';
        }, 3000);
    }
});
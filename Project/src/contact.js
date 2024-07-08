document.addEventListener("DOMContentLoaded", function() {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email-contact');
  const phoneInput = document.getElementById('phone');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const sendButton = document.getElementById('send');

  // Allow only numbers in the phone input and enforce min/max length
  phoneInput.addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9]/g, '');
    if (this.value.length > 15) {
      this.value = this.value.slice(0, 15);
    }
  });

  // Capitalize the first letter of the name
  nameInput.addEventListener('input', function() {
    this.value = this.value.replace(/\b\w/g, function(char) {
      return char.toUpperCase();
    });
  });

  // Validate email format
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Validate form fields and send the message
  function sendMessage() {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    let errorMessage = "";

    if (!name) {
      errorMessage += "Name is required.\n";
    }

    if (!email) {
      errorMessage += "Email is required.\n";
    } else if (!validateEmail(email)) {
      errorMessage += "Invalid email format. Email must contain '@'.\n";
    }

    if (!phone) {
      errorMessage += "Phone number is required.\n";
    } else if (phone.length < 5 || phone.length > 15) {
      errorMessage += "Phone number must be between 5 and 15 digits long.\n";
    }

    if (!subject) {
      errorMessage += "Subject is required.\n";
    } else if (subject.length < 5) {
      errorMessage += "Subject must be at least 5 characters long.\n";
    }

    if (!message) {
      errorMessage += "Message is required.\n";
    } else if (message.length < 10 || message.length > 100) {
      errorMessage += "Message must be between 10 and 100 characters long.\n";
    }

    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    alert(`Your message has been successfully sent!\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\nMessage: ${message}`);
    nameInput.value = '';
    emailInput.value = '';
    phoneInput.value = '';
    subjectInput.value = '';
    messageInput.value = '';
  }

  sendButton.addEventListener('click', sendMessage);

  messageInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
  });
});
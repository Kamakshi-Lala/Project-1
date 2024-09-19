(function () {
    emailjs.init('Vtt9I8P44WY26hy78'); // Replace with your Email.js public key
})();

document.addEventListener('DOMContentLoaded', function () {
    const sendEmailButton = document.getElementById('sendEmailButton');

    sendEmailButton.addEventListener('click', function () {
        sendEmail();
    });
});

function sendEmail() {
    const contactForm = document.getElementById('contactForm');
    emailjs.sendForm('service_jku7fzx', 'template_as2f3gb', contactForm)
        .then(function (response) {
            console.log('Email sent successfully:', response);
            alert('Email sent successfully!');
            // You can redirect to a thank you page or perform other actions upon successful submission.
        })
        .catch(function (error) {
            console.error('Error sending email:', error);
            alert('Error sending email. Please try again.');
        });
}

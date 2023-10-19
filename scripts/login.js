// Add an event listener to execute the code when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Get the form element by querying the DOM
  const form = document.querySelector('form');

  // Add an event listener to the form submit event
  form.addEventListener('submit', (event) => {
    // Get the values of the username and password fields by querying the DOM
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    // Check if either the username or password field is empty
    if (username.trim() === '' || password.trim() === '') {
      // Prevent the form from submitting if either field is empty
      event.preventDefault();
      // Display an alert message to inform the user to enter their credentials
      alert('Please enter your username and password');
    }
  });
});

// Listen for the DOMContentLoaded event to read URL parameters
document.addEventListener("DOMContentLoaded", function() {
  // Create an instance of URLSearchParams to parse the URL query string
  const urlParams = new URLSearchParams(window.location.search);
  // Get the value of the "msg" parameter from the URL query string
  const msg = urlParams.get("msg");
  // If the "msg" parameter is present, display its value in an alert
  if (msg) {
      alert(msg);
  }
});

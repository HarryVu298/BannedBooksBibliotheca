<?php
// Start a new session or resume the existing session
session_start();
// Include the configuration file to connect to the database
require 'config.php';

// Check if the "login" button is clicked in the form
if (isset($_POST['login'])) {
    // Retrieve the username and password from the submitted form data
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Prepare an SQL statement to select a user record with the given username
    $sql = "SELECT * FROM users WHERE username = ?";
    $stmt = $conn->prepare($sql);
    // Bind the parameter to the prepared statement
    $stmt->bind_param('s', $username);
    // Execute the prepared statement
    $stmt->execute();
    // Get the result of the query
    $result = $stmt->get_result();
    // Fetch the first row of the result as an associative array
    $row = $result->fetch_assoc();

    // Check if the fetched row exists and the submitted password matches the hashed password in the database
    if ($row && password_verify($password, $row['password'])) {
		// Use session variables to store user info
		$_SESSION['username'] = $row['username'];
		$_SESSION['password'] = $row['password'];
		$_SESSION['admin'] = $row['admin'];
        // Redirect the user to the success page
        header('Location: ../../index.html');
        exit();
    } else {
        // Redirect the user to the login page with an error message
        header('Location: ../../login.html?msg=Invalid username or password');
        exit();
    }
}
?>

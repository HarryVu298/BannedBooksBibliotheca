<?php

// Include the configuration file containing the database connection settings
require 'config.php';

// Check if the register button has been clicked
if (isset($_POST['register'])) {
    // Get the submitted username and password from the form
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Hash the password using the default password hashing algorithm
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Prepare an SQL query to insert the new user into the users table
    $sql = "INSERT INTO users (username, password) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);

    // Bind the parameters (username and hashed password) to the SQL query
    $stmt->bind_param('ss', $username, $hashed_password);

    // Execute the prepared SQL statement and store the result
    $result = $stmt->execute();

    // Check if the user registration was successful
    if ($result) {
        // Redirect to the login page with a success message
        header('Location: ../../login.html?msg=Successfully registered, please log in');
        exit();
    } else {
        // Redirect to the login page with a failure message
        header('Location: ../../login.html?msg=Registration failed, please try again');
        exit();
    }
}
?>

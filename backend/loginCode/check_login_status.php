<?php
// Start a new session or resume the existing session
session_start();
// Include the configuration file to connect to the database
require 'config.php';

$username = $_SESSION['username'];
$password = $_SESSION['password'];
$admin = $_SESSION['admin'];

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
if ($row && ($password == $row['password'])) {
	// Check if user is admin
	if ($admin == 1) {
		print 'admin';
		exit();
	} else {
		print 'user';
		exit();
	}
} else {
	// User is not logged in or admin
	print 'guest';
	exit();
}

?>

<?php
// Database configuration settings
$host = 'localhost';
$user = 'root';
$password = '123456789';
$db_name = 'cse201sql';

// Create a new connection to the database using the mysqli library
$conn = new mysqli($host, $user, $password, $db_name);

// Check if the connection to the database was successful
// If there's an error, output the error message and try to connect to a backup database
if ($conn->connect_error) {
	// Database configuration settings
	$host = 'localhost';
	$user = 'uiqpc2balgjcp';
	$password = 'gE1kQ5#@1x6@';
	$db_name = 'dbizeiwyzgyysy';

	// Create a new connection to the database using the mysqli library
	$conn = new mysqli($host, $user, $password, $db_name);

	// Check if the connection to the database was successful
	// If there's an error, output the error message and terminate the script
	if ($conn->connect_error) {
		die('Connection failed: ' . $conn->connect_error);
	}
}
?>

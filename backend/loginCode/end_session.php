<?php
    // Start a new session or resume an existing session
    session_start();

    // Clear the username stored in the session
    $_SESSION['username'] = '';

    // Clear the password stored in the session
    $_SESSION['password'] = '';

    // Clear the admin status stored in the session
    $_SESSION['admin'] = '';

    // Destroy the session to log the user out
    session_destroy();
?>

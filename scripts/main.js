// Javascript for every web page

// Login status of user (guest, user, or admin)
let login_status = '';

// Current username
let username = '';

let document_ready = false;

// Gets sign in status of user on page load.
refresh_sign_in_status();

// Keeps track of when document is ready
$( document ).ready(function() {
    document_ready = true;
});

// Get sign in info on page load
async function refresh_sign_in_status() {
	// path to backend login php
	let backendLoginDataPath = "backend/loginCode/";

	// Gets login status (guest, user, or admin)
	await $.ajax({
		type: 'GET',
		url: backendLoginDataPath + 'check_login_status.php',
		success: function(response) {
			login_status = response;
			console.log(login_status);
		}
	});
	
	// Get username
	await $.ajax({
		
		type: 'GET',
		url: backendLoginDataPath + 'get_username.php',
		success: function(response) {
			username = response;
		}
	});
	
	try_check_sign_in_status();
}

// Go to catalog page
function goToCatalog() {
	window.location = "catalog";
}

// Go to sign in page if signed in.
// Else, sign out.
function signInButton() {
	if (login_status == 'admin' || login_status == 'user') {
		endSession();
	} else {
		window.location = "login";
	}
}

// Will wait until page is loaded to try and call check_sign_in_status() and update page accordingly
function try_check_sign_in_status() {
	if (document_ready == false) {
		setTimeout(try_check_sign_in_status, 50);
		return;
	}
	
	check_sign_in_status();
}

// Changes page appropriately based on whether you are signed in or not
async function check_sign_in_status() {
	switch (login_status) {
		// Guest page
		case "guest":
			$("#sign_in_button").text("Sign in");
			$("#bookrequestbutton").remove();
			$("#bookrequestbuttonadmin").remove();
			break;
		// User page
		case "user":
			$("#sign_in_button").text("Sign out");
			$("#bookrequestbutton").attr("hidden", false);
			$("#bookrequestbuttonadmin").attr("hidden", false);
			break;
		// Admin page
		case "admin":
			$("#sign_in_button").text("Sign out");
			$("#bookrequestbutton").attr("hidden", false);
			$("#bookrequestbuttonadmin").attr("hidden", false);
			break;
	}

	// Insert username before sign in button
	if (username != '') {
		$("#sign_in_button").parent().before('<li class="nav-item"><h6 class="subpage nav-link text-white">' + username + '</h6></li>');
	}
	
	// Some pages have specific functionality that happens after a user's log-in status has been checked.
	// This calls that functionality.
	if (typeof readyAfterSignIn !== "undefined") {
		readyAfterSignIn();
	}
}

// Sign out functionality
async function endSession() {
	let backendLoginDataPath = "backend/loginCode/";
	$.ajax({
		type: 'GET',
		url: backendLoginDataPath + 'end_session.php',
		success: function(response) {
			//location.reload();
			window.location = "index";
		}
	});
}



// Sorting functionality:
// Order to sort
var direction = "ascending";

// Last column that was sorted by
var lastSortColumn = -1;

// Sorts a table
  function sortTable(n, tableID) {
    console.log(n);
    var table;
    table = document.getElementById(tableID);
    var rows, i, x, y, count = 0;
    var switching = true;
  
	// If new column selected, automatically set to ascending
	if (lastSortColumn != n) {
		direction = "ascending";
		lastSortColumn = n;
	} else {
		// Switch between ascending and descending
		if (direction == "ascending") {
			direction = "descending";
		} else {
			direction = "ascending";
		}
	}
  
    // Run loop until no switching is needed
    while (switching) {
      switching = false;
      var rows = table.rows;

      //Loop to go through all rows
      for (i = 1; i < (rows.length - 1); i++) {
        var Switch = false;
        // Fetch 2 elements that need to be compared
        
          x = rows[i].getElementsByTagName("TD")[n];
          y = rows[i + 1].getElementsByTagName("TD")[n];
		  
          // Check the direction of order
          if (direction == "ascending") {
            // Check if 2 rows need to be switched
            if (x.innerText.toLowerCase() > y.innerText.toLowerCase())
              {
              // If yes, mark Switch as needed and break loop
              Switch = true;
              break;
            }
          } else if (direction == "descending") {

            // Check direction
            if (x.innerText.toLowerCase() < y.innerText.toLowerCase())
              {
              // If yes, mark Switch as needed and break loop
              Switch = true;
              break;
            }
        }
      }
      if (Switch) {
          // Function to switch rows and mark switch as completed
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;

          // Increase count for each switch
          count++;
      } else {
          // Run while loop again for descending order
          if (count == 0 && direction == "ascending") {
              direction = "descending";
              switching = true;
          }
      }
    }
  }
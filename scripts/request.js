// Page specific code for request.html

// Runs after checking if user is signed in or not
async function readyAfterSignIn() {
	// If not signed in, redirect to index
	if (login_status == "guest") {
		window.location = "index";
	}
}

// Request form refreshing page
$("#requestForm").submit(function(e) {
	e.preventDefault();
});

// Submits request form to add book to csv
function submitForm() {
	// properties about current book
	let book = {
		requester : '', // 0
		title : '', // 1
		author : '', // 2
		year : '', // 3
		location : '', // 4
		reason : '', // 5
		isbn : '', // 6
		url : '', // 7
		image : '' // 8
	}
	
	book.requester = username;
	book.title = $('#bookTitle').val()
	book.author = $('#bookAuthor').val()
	book.year = $('#bookYear').val()
	book.location = $('#bookLocation').val()
	book.location = book.location.replaceAll(',', '');
	book.reason = $('#bookReason').val()
	book.isbn = $('#bookISBN').val()
	book.url = $('#bookURL').val()
	book.image = $('#bookImage').val()
	book.image = book.image.replaceAll(',', '');
	
	var content = book.requester + "," + book.title + "," + book.author + "," + book.year + "," + book.location + "," + book.reason + "," + book.isbn + "," + book.url + "," + book.image + "\n";
	
	book_list_accessor.addBookToPendingList(content);

}
function goToLandingPage() {
	window.location = "index_login.html";
}
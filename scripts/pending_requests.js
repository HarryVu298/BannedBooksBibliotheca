// Javascript for pending_requests page

// Prepares page after checking if user is signed in or not
async function readyAfterSignIn() {
	// If not logged in, redirect to index
	if (login_status == "guest") {
		window.location = "index";
	}
	
	// Insert judgement row if admin, or options row if user
	if (login_status == "admin") {
		$("#isbncol").after("<th>Judgement</u></th>");
	} else {
		$("#isbncol").after("<th>Options</u></th>");
	}
	populateCatalog();
	
}
	
// Populates catalog with book requests
async function populateCatalog(){

		// Get list of books in pending book csv as comma separated string
		var file = await book_list_accessor.getPendingBooksList();

		// Split by line break to gets rows Array
		var rowData = file.split('\n');

		// <table > <tbody>
		var tbodyEl = document.getElementById('tblcsvdata').getElementsByTagName('tbody')[0];
		tbodyEl.innerHTML = "";
		
		// Keep track of how many books have been added to table
		let booksAdded = 0;

		// Loop on the row Array
		for (var row = 0; row < rowData.length; row++) {

			// Insert a row at the end of table
			var newRow = tbodyEl.insertRow();

			// Split by comma (,) to get column Array
			rowColData = rowData[row].split(',');

			// properties about current book
			let book = {
				requester : '',
				title : '',
				author : '',
				year : '',
				location : '',
				reason : '',
				isbn : '',
				image : '',
				url : ''
			}
			
			// Loop on the row column Array to create book object
			for (let col = 0; col < rowColData.length; col++) {
				// Requester
				if (col == 0) {
					book.requester = rowColData[col].replace(/["]+/g, '');
				}
				// Title
				else if (col == 1) {
					book.title = rowColData[col].replace(/["]+/g, '');
				}
				// Author
				else if (col == 2) {
					book.author = rowColData[col].replace(/["]+/g, '');
				}
				// Release years
				else if (col == 3) {
					book.year = rowColData[col];
				}
				// Location banned
				else if (col == 4) {
					book.location = rowColData[col].replace(/["]+/g, '');
				}
				// Reason for ban
				else if (col == 5) {
					book.reason = rowColData[col].replace(/["]+/g, '');
				}
				// ISBN
				else if (col == 6) {
					book.isbn = rowColData[col];
				}
				// URL
				else if (col == 7) {
					book.url = rowColData[col].replace(/["]+/g, '');
				}
				// Image
				else if (col == 8) {
					book.image = rowColData[col].replace(/["]+/g, '');
				}
			}
			
			// Users can only see books they requested. Admins can see all requested books.
			if (login_status != "admin" && book.requester != username) {
				continue;
			}
			
			// Something went wrong, so abort
			if (book.title == '') {
				continue;
			}
			
			// Increment books added by 1
			booksAdded += 1;
			
			
			// Text to show who requested book
			let request_text = "Requested by ";
			if (book.requester == "0") {
				request_text = "Unknown";
			} else {
				request_text += book.requester;
			}
			
			// Add book entry to list
			
			// Image
			{
				let newCell = newRow.insertCell();
				let image = document.createElement('img');
				image.src = book.image;
				image.width = 150
				image.height = 200;
				if (request_text != "Unknown") {
					image.title = request_text;
				}
				newCell.append(image);
			}
			
			// title
			{
				let newCell = newRow.insertCell();
				let link = document.createElement('a');
				link.innerHTML = book.title;
				link.href = book.url;
				newCell.appendChild(link);
			}
			
			// Author
			{
				let newCell = newRow.insertCell();
				newCell.append(book.author);
			}
			
			// Release year
			{
				let newCell = newRow.insertCell();
				newCell.append(book.year);
			}
			// Location
			{
				let newCell = newRow.insertCell();
				newCell.append(book.location);
			}
			// Reason
			{
				let newCell = newRow.insertCell();
				newCell.append(book.reason);
			}
			// ISBN
			{
				let newCell = newRow.insertCell();
				newCell.append(book.isbn);
			}
			
			// Judgement
			{
				let newCell = newRow.insertCell();
				// Accept book if you're an admin
				if (login_status == "admin") {
					let acceptButton = document.createElement('button');
					acceptButton.innerHTML = 'Accept';
					acceptButton.type = 'button';
					acceptButton.className = "btn btn-primary";
					acceptButton.value = book.isbn;
					acceptButton.addEventListener('click', function() {
						book_list_accessor.acceptPendingBook(book.isbn);
					});
					
					newCell.append(acceptButton);
				}
		
		
				// Reject book
				let rejectButton = document.createElement('button');
				if (login_status == "admin") {
					rejectButton.innerHTML = 'Reject';
				} else {
					rejectButton.innerHTML = 'Delete';
				}
				rejectButton.type = 'button';
				rejectButton.className = "btn btn-primary";
				rejectButton.value = book.isbn;
				rejectButton.addEventListener('click', function() {
					book_list_accessor.rejectPendingBook(book.isbn);
				});
				newCell.append(rejectButton);
			}
			
		}
		
		// If no books are pending, add disclaimer text and hide table.
		if (booksAdded == 0) {
			$("#tblcsvdata").hide();
			if (login_status == "admin") {
				$("#tableLabel").text("There are no pending book requests.");
			} else {
				$("#tableLabel").text("You have not made any book requests.");
				
			}
		}

  }

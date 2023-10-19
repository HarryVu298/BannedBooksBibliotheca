// Javascript for catalog.html

// Prepares page after checking if user is signed in or not
async function readyAfterSignIn() {

	// if admin, insert judgement row in table to remove books from catalog
	if (login_status == "admin") {
		$("#isbncol").after("<th>Admin</u></th>");
	}

	// Populate catalog
	populateCatalog();
}



// Populates catalog with books
async function populateCatalog() {

	// Get list of books in catalog as comma separated string
	var file = await book_list_accessor.getBookList();

	// Split by line break to gets rows Array
	var rowData = file.split('\n');

	// <table > <tbody>
	var tbodyEl = document.getElementById('tblcsvdata').getElementsByTagName('tbody')[0];
	tbodyEl.innerHTML = "";

	// Loop on the row Array (change row=0 if you also want to read 1st row)
	for (var row = 1; row < rowData.length; row++) {

		// Insert a row at the end of table
		var newRow = tbodyEl.insertRow();

		// Split by comma (,) to get column Array
		rowColData = rowData[row].split(',');

		// properties about current book
		let book = {
			number: '',
			title: '',
			author: '',
			year: '',
			location: '',
			reason: '',
			isbn: '',
			image: '',
			url: ''
		}

		// Loop on the row column Array to create book object
		for (let col = 0; col < rowColData.length; col++) {
			// Title
			if (col == 1) {
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

		// Something went wrong, so abort
		if (book.title == '') {
			continue;
		}

		// Add book entry to list

		// Image
		{
			let newCell = newRow.insertCell();
			let image = document.createElement('img');
			image.src = book.image;
			image.width = 150
			image.height = 200;
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
		if (login_status == 'admin') {
			let newCell = newRow.insertCell();

			let rejectButton = document.createElement('button');
			rejectButton.innerHTML = 'Unlist';
			rejectButton.type = 'button';
			rejectButton.className = "btn btn-primary";
			rejectButton.value = book.isbn;
			rejectButton.addEventListener('click', function () {
				book_list_accessor.unlistBook(book.isbn);
			});
			newCell.append(rejectButton);
		}


	}

}


async function deleteAllRows() {
	var table = document.getElementById("tblcsvdata");

	var rows = table.rows;
	for (i = 1; i < (rows.length - 1); i++) {
		document.getElementById("tblcsvdata").deleteRow(i);
	}
}

//Searches based on the n column of the table.
//Removes anything in that column that does not contain the passed in string.
async function searchByCriteria() {
	// Get the search value from the input element
	var search = document.getElementById('authorsearch').value;

	// Delete all rows and repopulate the catalog
	await deleteAllRows();
	await populateCatalog();

	// Determine the column index based on the chosen criteria
	var n;
	var criteria = document.getElementById("criteria").value;

	if (criteria == "title") {
		n = 1;
	} else if (criteria == "author") {
		n = 2;
	} else if (criteria == "year") {
		n = 3;
	}

	// Log the search value and its type for debugging purposes
	console.log(search + " " + typeof search);

	// Get the table element and its rows
	var table = document.getElementById("tblcsvdata");
	var rows = table.rows;

	console.log("before the loop");

	// Loop through the rows and compare the search value with the chosen column
	for (i = 1; i < (rows.length - 1); i++) {
		// Get the value in the current row and chosen column, and convert it to lowercase
		x = rows[i].getElementsByTagName("TD")[n].innerText;
		x = x.toLowerCase();

		// Log the current value and its type for debugging purposes
		console.log(x + " " + typeof x);

		// Check if the search value is not included in the current value
		if (!(x.includes(search.toLowerCase()))) {
			// Delete the row if the search value is not included
			document.getElementById("tblcsvdata").deleteRow(i);
			console.log("delete");
			i--;
		}
	}
}


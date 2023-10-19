// path to backend book data
const backendBookDataPath = "backend/bookData/";

// file name of pending requests csv
const fileNameRequests = 'bookRequests.csv';
// file name of data csv
const fileNameCatalog = 'data.csv';


// Class to move books to and from catalog and pending book list.
class book_list_accessor {
	
	// Sends request to remove a book from the CSV based on ISBN
	static rejectPendingBook(content) {
		$.ajax({
			type: 'POST',
			url: backendBookDataPath + 'delete_csv_entry.php',
			data: {
				fileName: fileNameRequests,
				content: content
			},
			success: function(response) {
				console.log(response);
				location.reload();
			}
		});
	}
	

	// Sends request to move book from pending request list to catalog
	static acceptPendingBook(content) {
		$.ajax({
			type: 'POST',
			url: backendBookDataPath + 'move_csv_entry_between_files.php',
			data: {
				fileNameFrom: fileNameRequests,
				fileNameTo: fileNameCatalog,
				content: content
			},
			success: function(response) {
				console.log(response);
				location.reload();
			}
		});
	}

	// Unlist book from main catalog and move it to book requests list
	static unlistBook(content) {
		$.ajax({
			type: 'POST',
			url: backendBookDataPath + 'move_csv_entry_between_files.php',
			data: {
				fileNameFrom: fileNameCatalog,
				fileNameTo: fileNameRequests,
				content: content
			},
			success: function (response) {
				console.log(response);
				location.reload();
			}
		});
	}
	
	// Adds book to pending book list
	static addBookToPendingList(content) {
		$.ajax({
			type: 'POST',
			url: backendBookDataPath + 'file_append_if_unique_isbn.php',
			data: {
				fileName: fileNameRequests,
				content: content
			},
			success: function(response) {
				if (response == 'Error: Duplicate ISBN') {
					alert('A book with this ISBN already exists in the catalog');
				} else {
					console.log(response);
					window.location.href = "request.html";
				}
			}
		});
	}
	
	// Gets list of books in catalog as comma separated string
	static async getBookList() {
		const filePath = backendBookDataPath + 'data.csv';
		
		var response = await fetch(filePath, { cache: "no-store" });
		var file = await response.text();
		return file;
	}
	
	// Gets list of pending books as comma separated string
	static async getPendingBooksList() {
		const filePath = backendBookDataPath + 'bookRequests.csv';
		
		var response = await fetch(filePath, { cache: "no-store" });
		var file = await response.text();
		return file;
	}
}
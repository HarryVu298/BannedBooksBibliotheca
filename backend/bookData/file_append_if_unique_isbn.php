<?php
// Appends new book to line if ISBN is not already in catalog or requests csv
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $fileName = $_POST['fileName'];
    $content = $_POST['content'];
	$fileCatalog = 'data.csv';
	
	// ISBN is 7th row of content
	$contentArr = explode(',', $content);
    $isbn = $contentArr[6];

	$fileNameFile = fopen($fileName, 'r');
	// Loop through rows of fileName
	while (($row = fgetcsv($fileNameFile)) !== false) {
		// Check if the 7th column matches the content isbn
		if ($row[6] == $isbn) {
		  // If it does, abort and echo error.
		  print 'Error: Duplicate ISBN';
		  return;
		}
	}
	fclose($fileNameFile);
	
	$fileCatalogFile = fopen($fileCatalog, 'r');
	// Loop through rows of catalog
	while (($row = fgetcsv($fileCatalogFile)) !== false) {
		// Check if the 7th column matches the content isbn
		if ($row[6] == $isbn) {
		  // If it does, abort and echo error.
		  print 'Error: Duplicate ISBN';
		  return;
		}
	}
	fclose($fileCatalogFile);

	// Separates content into an array based on commas.
    $newRow = explode(',', $content);
	// Opens fileName file in 'a' / append mode.
    $file = fopen($fileName, 'a');
	// Puts array of newRow into file in csv format.
    fputcsv($file, $newRow);
    fclose($file);
	print 'Success: Content appended';
}
?>
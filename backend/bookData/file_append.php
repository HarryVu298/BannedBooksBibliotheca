<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $fileName = $_POST['fileName'];
    $content = $_POST['content'];
	// Separates content into an array based on commas.
    $newRow = explode(',', $content);
	// Opens fileName file in 'a' / append mode.
    $file = fopen($fileName, 'a');
	// Puts array of newRow into file in csv format.
    fputcsv($file, $newRow);
    fclose($file);
    echo "Content appended.";
}
?>
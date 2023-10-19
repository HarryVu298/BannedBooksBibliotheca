<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $fileName = $_POST['fileName'];
    $content = $_POST['content'];

    // Open fileName csv
    $inputFile = fopen($fileName, 'r');

    // Open a temp file
    $tempFile = fopen('temp.csv', 'a');

    // Loop through fileName.
    while (($row = fgetcsv($inputFile)) !== false) {
        if ($row[6] !== $content) {
            // Write the row to the temp file
            fputcsv($tempFile, $row);
        }
    }

    // Close the input file and replace input file with temp file.
    fclose($inputFile);
	fclose($tempFile);
    rename('temp.csv', $fileName);
    
    echo 'Done!';
} else {
    echo 'Error!';
}
?>
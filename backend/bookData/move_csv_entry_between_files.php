<?php
if($_SERVER['REQUEST_METHOD'] == 'POST') {
  $fileNameFrom = $_POST['fileNameFrom'];
  $fileNameTo = $_POST['fileNameTo'];
  $content = $_POST['content'];

  // Open files
  $fileFrom = fopen($fileNameFrom, 'r');
  $fileTo = fopen($fileNameTo, 'a');
  $tempFile = fopen('temp.csv', 'a');

  // Loop through rows of fileFrom
  while (($row = fgetcsv($fileFrom)) !== false) {
    // Check if the 7th column matches the content
    if ($row[6] == $content) {
      // If it does, write the row to fileTo
      fputcsv($fileTo, $row);
    } else {
      // If it doesn't, write the row to a temporary file
      fputcsv($tempFile, $row);
    }
  }

  // Close the files
  fclose($fileFrom);
  fclose($fileTo);
  fclose($tempFile);

  // Rename the temporary file to the original fileFrom
  rename('temp.csv', $fileNameFrom);
}
?>




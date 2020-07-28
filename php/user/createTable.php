<?php
# Author: kayley Kiesel
# createTable.php, API endpoint creates a user table
//CALL THIS AT THE START OF YOUR PROGRAM
include '../database.php';

// create a new database connection
$db = new Database;
$connection = $db->getConnection();


//   create table
$insertion = "CREATE TABLE IF NOT EXISTS user (".
"Id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,".
"Name varchar(255) NOT NULL,".
"Multiplier FLOAT(3) UNSIGNED DEFAULT 1,".
"Level SMALLINT UNSIGNED Default 1,".
"Image varchar(255) NOT NULL)";

// check if insertion
if(mysqli_query($connection, $insertion)) {
echo "successfully inserted";
} else {
echo "ERROR: unable to execute $insertion.";
}

/// close database connection;
mysqli_close($connection);

?>
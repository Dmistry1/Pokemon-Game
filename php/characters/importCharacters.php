<?php
// API endpoint that imports all pokemon into database
// CALL THIS AT THE START OF YOUR PROGRAM.
include '../database.php';

$db = new Database();
$connection = $db->getConnection();

    //   create full character table
    $insertion = "CREATE TABLE IF NOT EXISTS characters (".
    "Id SMALLINT UNSIGNED NOT NULL,".
    "Name varchar(255) NOT NULL,".
    "Type1 varchar(255) NOT NULL,".
    "Type2 varchar(255),".
    "Total SMALLINT UNSIGNED NOT NULL,".
    "Hp SMALLINT UNSIGNED NOT NULL,".
    "Attack SMALLINT UNSIGNED NOT NULL,".
    "Defense SMALLINT UNSIGNED NOT NULL,".
    "SpAtk SMALLINT UNSIGNED NOT NULL,".
    "SpDef SMALLINT UNSIGNED NOT NULL,".
    "Speed SMALLINT UNSIGNED NOT NULL,".
    "Generation TINYINT UNSIGNED NOT NULL,".
    "Legendary TINYINT(1) Default 0, ".
    "Image varchar(255) NOT NULL)";
    
    if(mysqli_query($connection, $insertion)) {
        echo "successfully inserted";
    } else {
        echo "ERROR: unable to execute $insertion.";
    }

    
    // load data from csv file into database
    $load = "LOAD DATA LOCAL INFILE '../../pokemon_data_short.csv' INTO TABLE characters FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS (Id, Name, Type1, Type2, Total, Hp, Attack, Defense, SpAtk, SpDef, Speed, Generation, Legendary, Image);";

    // check load was successful
    if(mysqli_query($connection, $load)) {
        echo "successfully inserted";
    } else {
        echo "ERROR: unable to execute $load.";
    }

    
    mysqli_close($connection);


?> 
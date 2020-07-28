<?php
//Author: kayley Kiesel
// getOne.php, API endpoint retrieves one pokemon from user's table.

include_once '../database.php';
include_once 'pokemon_user.php';

// create a new database connection
$db = new Database;
$connection = $db->getConnection();

$pokemon = new Pokemon_user($connection);



if (!empty($_GET['Id']) ) {
    $pokemon->Id = $_GET['Id'];
    echo($pokemon->getPokemonById());
}

else if (!empty($_GET['Name']) ) {
    $pokemon->Name = $_GET['Name'];
    echo($pokemon->getPokemonByName());
    
} else if (!empty($_GET['Offset']) || $_GET['Offset'] == 0 ){
    $pokemon->Offset = $_GET['Offset'];
    echo ($pokemon->getPokemonByIndex());
}
else {
    die("no name or Id specified");
}

$connection->close();





<?php
// Author: kayley Kiesel
// API endpoint for retrieving one pokemon from character table.

include_once '../database.php';
include_once 'pokemon_character.php';

// create a new database connection
$db = new Database;
$connection = $db->getConnection();

$pokemon = new Pokemon_character($connection);


if (!empty($_GET['Id']) ) {
    $pokemon->Id = $_GET['Id'];
    echo($pokemon->getPokemonById());
}

else if (!empty($_GET['Name']) ) {
    $pokemon->Name = $_GET['Name'];
    echo($pokemon->getPokemonByName());
} else {
    die("no name or Id specified");
}


$connection->close();




?>
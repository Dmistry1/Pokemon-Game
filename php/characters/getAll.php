<?php

// getALL.php, API endpoint for retrieving all pokemon from character table.

include_once '../database.php';
include_once 'pokemon_character.php';

// create a new database connection
$db = new Database;
$connection = $db->getConnection();

$pokemon = new Pokemon_character($connection);

echo($pokemon->getAllPokemon());


$connection->close();


?>
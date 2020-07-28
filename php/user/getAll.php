<?php

//Author: kayley Kiesel
// getAll.php, API endpointretrieves all pokemon from user's table.

include_once '../database.php';
include_once 'pokemon_user.php';

// create a new database connection
$db = new Database;
$connection = $db->getConnection();

$pokemon = new Pokemon_user($connection);

echo($pokemon->getAllPokemon());


$connection->close();


?>
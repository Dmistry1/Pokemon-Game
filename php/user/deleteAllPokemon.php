<?php
//Author: kayley Kiesel
// delete.php, API endpoint deletes a pokemo from user's table.
include_once '../database.php';
include 'pokemon_user.php';

$db = new Database();
$connection = $db->getConnection();
$pokemon = new Pokemon_user($connection);



// load post vars into character object
$pokemon->deleteAllPokemon();


$connection->close();


?>
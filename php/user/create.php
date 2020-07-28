<?php
// Author: kayley Kiesel
// Create.php, API endpoint creates a new pokemon in user table.
include_once '../database.php';
include 'pokemon_user.php';

$db = new Database();
$connection = $db->getConnection();
$pokemon = new Pokemon_user($connection);

$pokemon->Name = $_POST['Name'];
$pokemon->Multiplier = $_POST['Multiplier'];
$pokemon->Level = $_POST['Level'];
$pokemon->Image = $_POST['Image'];
/*$pokemon->Name = "charmander";
$pokemon->Multiplier = 5;
$pokemon->Level = 2;*/


// load post vars into character object
$pokemon->createPokemon();


$connection->close();


?>
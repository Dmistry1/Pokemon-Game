<?php
// Author: Kayley Kiesel
// Transfer.php, API endpoint transfers a pokemon from characters table to user's table
// 
include_once '../database.php';
include_once 'pokemon_user.php';
include_once '../characters/pokemon_character.php';

// create a new database connection
$db = new Database;
$connection = $db->getConnection();

$pokemon_char = new Pokemon_character($connection);


if (!empty($_GET['Id']) ) {
    $pokemon_char->Id = $_GET['Id'];
    // fetched pokemo from full table
    $target_pokemon = $pokemon_char->getPokemonById();
}

else if (!empty($_GET['Name']) ) {
    $pokemon_char->Name = $_GET['Name'];
    $target_pokemon = $pokemon_char->getPokemonByName();
} else {
    die("no name or Id specified");
}


// create new user pokemon.
$pokemon_user = new Pokemon_user($connection);

$decoded_pokemon = json_decode($target_pokemon);

// fetch image, and name for user table
$pokemon_user->Name = $decoded_pokemon->Name;
$pokemon_user->Image = $decoded_pokemon->Image;
$pokemon_user->Multiplier = 1;
$pokemon_user->Level = 1;

echo $target_pokemon;


$pokemon_user->createPokemon();


// now extract data from newChar and place it into the user database.


$connection->close();




?>
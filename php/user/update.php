
<?php

#author: Kayley Kiesel
# Description: API endpoint updates a pokemon's data in user table.

include_once '../databases.php';
include_once 'pokemon_user.php';

$db = new Database;

$connection = $db->getConnection();

$pokemon = new Pokemon_user($connection);

// name of current pokemon to update value of
$pokemon->Name = $_POST['Name'];

// updated values
$pokemon->Multiplier = $_POST['Multiplier'];
$pokemon->Level = $_POST['Level'];

$pokemon->updatePokemonByName();


$connection->close();




?>
<?php
//Author: kayley Kiesel
// delete.php, API endpoint deletes a pokemo from user's table.
include_once '../database.php';
include 'pokemon_user.php';

$db = new Database();
$connection = $db->getConnection();
$pokemon = new Pokemon_user($connection);

parse_str(file_get_contents("php://input"),$post_vars);

$pokemon->Id = !empty($post_vars['Id']) ? $post_vars['Id'] : die("id var is empty");


// load post vars into character object
$pokemon->deletePokemon();


$connection->close();


?>
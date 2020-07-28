<?php
# Author: kayley Kiesel
# Pokemon object for character table, handles all interaction with database.
include_once '../database.php';

class Pokemon_character {

private $connection;
private $table = "characters";

//fields
public $Id;
public $Name;


// constructor, assigns connection var to database
public function __construct($db){
    $this->connection = $db;
}

// get all pokemon pokemon

    public function getAllPokemon() {

        // 
        $query = $this->connection->query("SELECT * FROM characters");

                //create an array for query
                $characterArray = $query->fetch_all(MYSQLI_ASSOC);
        
                // print json object to screen
                //echo json_encode($characterArray[0]);


        return json_encode($characterArray);
    }

    public function getPokemonById() {

     // find character in database table
        $query = $this->connection->query("SELECT * FROM characters WHERE Id = $this->Id LIMIT 1");

     //create an array for query
        $characterArray = $query->fetch_all(MYSQLI_ASSOC);
        
    // print json object to screen
   // echo json_encode($characterArray);

     // print json object to screen
     //echo json_encode($query);
     return json_encode($characterArray[0]);

    }

    public function getPokemonByName() {
        //echo '".$this->Name."';
        // find character in database table
        $query = $this->connection->query("SELECT * FROM characters WHERE Name = '{$this->Name}' LIMIT 1");
   
        //create an array for query
       $characterArray = $query->fetch_all(MYSQLI_ASSOC);
           
       // print json object to screen
      // echo json_encode($characterArray);
   
        // print json object to screen
        //echo json_encode($query);
        return json_encode($characterArray[0]);
       // return $this->Name;
   
       }

}


?>
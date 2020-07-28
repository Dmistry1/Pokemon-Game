<?php

include_once '../database.php';

class Pokemon_user {

private $connection;
private $table = "user";

//fields
public $Id;
public $Name;
public $Multiplier;
public $Level;
public $Image;
// constructor, assigns connection var to database
public function __construct($db){
    $this->connection = $db;
}

// Author: kayley Kiesel
 // Pokemon Object handles all communication with user table in the database.

    public function getAllPokemon() {

        // 
        $query = $this->connection->query("SELECT * FROM {$this->table}");

                //create an array for query
                $characterArray = $query->fetch_all(MYSQLI_ASSOC);
        
                // print json object to screen
                //echo json_encode($characterArray[0]);


        return json_encode($characterArray);
    }

    public function getPokemonById() {

        // find character in database table
        $query = $this->connection->query("SELECT * FROM {$this->table} WHERE Id = $this->Id LIMIT 1");

        //create an array for query
        $characterArray = $query->fetch_all(MYSQLI_ASSOC);
        
        // print json object to screen
        // echo json_encode($characterArray);

        // print json object to screen
        //echo json_encode($query);
        return json_encode($characterArray);

    }

    public function getPokemonByIndex() {

        // find character in database table
        $query = $this->connection->query("SELECT * FROM {$this->table} LIMIT 1 OFFSET $this->Offset");
   
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
        $query = $this->connection->query("SELECT * FROM {$this->table} WHERE Name = {$this->Name} LIMIT 1");
   
        //create an array for query
       $characterArray = $query->fetch_all(MYSQLI_ASSOC);
           
       // print json object to screen
      // echo json_encode($characterArray);
   
        // print json object to screen
        //echo json_encode($query);
        return json_encode($characterArray[0]);
        //return $characterArray;
   
       }

    public function createPokemon() {
        $query = "INSERT INTO {$this->table} (Name, Multiplier, Level, Image) VALUES ('{$this->Name}', {$this->Multiplier}, {$this->Level}, '{$this->Image}')";
           
        if(!$this->connection->query($query)) {
            die("failed to add pokemon");
        }
    }

    public function deletePokemon() {

        $query = "DELETE FROM {$this->table} WHERE (Id = '{$this->Id}')";
           
        if(!$this->connection->query($query)) {
            die( "failed to query");
        } else {
            die( "queried");
        }
        return "hello";
    }
    
    public function deleteAllPokemon(){
        $query = "DELETE  FROM {$this->table}";
           
        if(!$this->connection->query($query)) {
            die( "failed to query");
        } else {
            die( "queried");
        }
        return "hello";
    }
    public function updatePokemonByName() {

        $query = "UPDATE {$this->table} SET Multiplier={$this->Multiplier}, Level={$this->Level} WHERE (Name = '{$this->Name}')";
           
        if(!$this->connection->query($query)) {
            die( "failed to query");
        }
        return "hello";
    }

}



?>
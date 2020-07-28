function start_game(){
    $(".start_game")[0].style.visibility = 'hidden';
    
    let httpReq = new XMLHttpRequest();

    // open get request to backend for pokemon data
    httpReq.open("PUT", './php/user/deleteAllPokemon.php');
    httpReq.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
    
    httpReq.onreadystatechange = function() {
        // Check if the request is compete and was successful
        if(this.readyState === 4 && this.status === 200) {
            
            // access Id element of new javascript pokemon object
           // document.getElementById("data").innerHTML += this.responseText;
        }
    };
    httpReq.send();
    
    //starts the music 
    document.getElementById("mainMenuAudio").volume = 0.1;
    document.getElementById("mainMenuAudio").play();
    document.getElementById("mainMenuAudio").muted = false;
    musicToggle = true;
    
    $(".introScene")[0].style.visibility = 'visible'
}
/* If the user chooses a male character */
var maleChar = false;
function male_character(){
    maleChar = true;
    $(".select_character")[0].style.visibility = 'hidden';
    $(".select_pokemon")[0].style.visibility = 'visible';
    $("#player2").css("visibility",'hidden');
    $("#play2").css("visibility", 'hidden');
    $("#p2").css("visibility", 'hidden');
}
function female_character(){
    $(".select_character")[0].style.visibility = 'hidden';
    $(".select_pokemon")[0].style.visibility = 'visible';
    $("#player").css("visibility",'hidden');
    $("#p1").css("visibility", 'hidden');
}

/* Help Menu Functions */
function help_button() {
    $(".main_menu")[0].style.visibility = 'hidden';
    $(".help_menu")[0].style.visibility = 'visible';
}
function help_wild_Battle() {
    $(".help_menu")[0].style.visibility = 'hidden';
    $(".PokemonBattle_help")[0].style.visibility = 'visible';
}
function help_pokemonStats() {
    $(".help_menu")[0].style.visibility = 'hidden';
    $(".PokemonStats_help")[0].style.visibility = 'visible';
}
function help_pokemonType(){
    $(".help_menu")[0].style.visibility = 'hidden';
    $(".PokemonType_help")[0].style.visibility = 'visible';
}
function back_menu(){
    $(".help_menu")[0].style.visibility = 'hidden';
    $(".main_menu")[0].style.visibility = 'visible';
}
function back(){
    $(".PokemonType_help")[0].style.visibility = 'hidden';
    $(".PokemonStats_help")[0].style.visibility = 'hidden';
    $(".PokemonBattle_help")[0].style.visibility = 'hidden';
    $(".help_menu")[0].style.visibility = 'visible';
}

/* Selects Starter Pokemon */
function select_pokm(id){

    var pokemon;
    let httpReq = new XMLHttpRequest();

    // open get request to backend for pokemon data
    httpReq.open("GET", './php/characters/getOne.php?Id='+id);
    httpReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // Defining event listener for readystatechange event
    httpReq.onreadystatechange = function() {
        // Check if the request is compete and was successful
        if(this.readyState === 4 && this.status === 200) {

            console.log(this.responseText);
            // convert JSON to javascript object
            var pokemon_data = JSON.parse(this.responseText);
            pokemon = pokemon_data;

            // open get request to backend for pokemon data
            httpReq.open("POST", './php/user/create.php');
            httpReq.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');

            httpReq.onreadystatechange = function() {
                // Check if the request is compete and was successful
                if(this.readyState === 4 && this.status === 200) {

                    // access Id element of new javascript pokemon object
                    //document.getElementById("data").innerHTML = this.responseText;
                }
            };

            // create request to user table in database
            httpReq.send("Name=" + pokemon.Name + "&Multiplier=" + 1 + "&Level=" + 1 + "&Image=./Images/" + pokemon.Image);

        }
    };

    // send request
    httpReq.send();


    $(".select_pokemon")[0].style.visibility = 'hidden';
    $(".main_menu")[0].style.visibility = 'visible';

}

function endGameScene(){
    $(".endScene")[0].style.visibility = 'visible';
}

function Endintro(){
    $(".select_character")[0].style.visibility = 'visible';
    $(".introScene")[0].style.visibility = 'hidden';
    $("#d1").css("visibility", 'hidden');
    $("#d2").css("visibility", 'hidden');
    $("#d3").css("visibility", 'hidden');
    $("#d4").css("visibility", 'hidden');
    $("#d5").css("visibility", 'hidden');
    $("#d6").css("visibility", 'hidden');
    $("#d7").css("visibility", 'hidden');
}

var numT = 0;
function next_button_I(){
    numT+=1;
    if(numT == 1){
        $("#d1").css("visibility", 'hidden');
        $("#d2").css("visibility", 'visible');        
    }
    else if(numT == 2){
        $("#d2").css("visibility", 'hidden');
        $("#d3").css("visibility", 'visible'); 
    }
    else if(numT == 3){
        $("#d3").css("visibility", 'hidden');
        $("#d4").css("visibility", 'visible'); 
    }
    else if(numT == 4){
        $("#d4").css("visibility", 'hidden');
        $("#d5").css("visibility", 'visible'); 
    }
    else if(numT == 5){
        $("#d5").css("visibility", 'hidden');
        $("#d6").css("visibility", 'visible'); 
    }
    else if(numT == 6){
        $("#d6").css("visibility", 'hidden');
        $("#d7").css("visibility", 'visible'); 
    }
    else if(numT == 7){
        $("#d7").css("visibility", 'hidden');
        Endintro();
    }
}

var C = 1;
function rollCredits(){
    var roller = document.getElementById("x"+C);
    roller.style.visibility = "visible";
    roller.classList.add("movie");    
    C++;
    setTimeout(() => {
        roller.style.visibility = "hidden";
    }, 5000);
}

function EndWinScreen(){
    $(".main_menu")[0].style.visibility = 'visible';
    $(".endScene")[0].style.visibility = 'hidden';
    $("#s1").css("visibility", 'hidden');
    $("#s2").css("visibility", 'hidden');
    $("#s3").css("visibility", 'hidden');
    $("#s4").css("visibility", 'hidden');   

    $("#x1").css("visibility", 'hidden');     
    $("#x2").css("visibility", 'hidden');    
    $("#x3").css("visibility", 'hidden');    
    $("#x4").css("visibility", 'hidden');    
    $("#x5").css("visibility", 'hidden');    
    $("#x6").css("visibility", 'hidden');    
    $("#x7").css("visibility", 'hidden');    
}

var numT = 0;
function next_button_E(){
    numT+=1;
    if(numT == 1){
        $("#s1").css("visibility", 'hidden');
        $("#s2").css("visibility", 'visible');        
    }
    else if(numT == 2){
        $("#s2").css("visibility", 'hidden');
        $("#s3").css("visibility", 'visible'); 
    }
    else if(numT == 3){
        $("#s3").css("visibility", 'hidden');
        $("#s4").css("visibility", 'visible'); 
    }
    else if(numT == 4){
        $("#s4").css("visibility", 'hidden'); 
        rollCredits();
        setTimeout(() => {
            rollCredits();
        }, 3000);
        setTimeout(() => {
            rollCredits();
        }, 6000);
        setTimeout(() => {
            rollCredits();
        }, 9000);
        setTimeout(() => {
            rollCredits();
        }, 12000);
        setTimeout(() => {
            rollCredits();
        }, 15000);
        setTimeout(() => {
            rollCredits();
        }, 18000);
    }
    else if(numT == 5){
        EndWinScreen();
    }
}

/* Ends a Battle and returns to Main Menu */
function endBattle() {
    $("#fightScene").css("visibility",'hidden');
    document.getElementById("wildBattleAudio").pause();
    openMenu();
}

/* Opens the Main Menu */
function openMenu() {
    $(".main_menu")[0].style.visibility = 'visible';
}

/* Closes the Main Menu */
function closeMenu() {
    $(".main_menu")[0].style.visibility = 'hidden';
}

/* Closes the Main Menu and Sets up the Wild Battle */
function wildBattle() {
    numBatt+=1;
    closeMenu();
    // plays the music 
    document.getElementById("mainMenuAudio").pause();
    document.getElementById("wildBattleAudio").play();
    document.getElementById("wildBattleAudio").muted = false;
    document.getElementById("wildBattleAudio").volume = 0.1;
    musicToggle = false
    //adds the loading screen 
    $(".loading")[0].style.visibility = 'visible';
    setTimeout(function(){
        $(".loading")[0].style.visibility = 'hidden';
    },2000)
    musicToggle = false
    wildBattleSetup();
}

/* Sets up the Wild Pokemon Battle */
function wildBattleSetup() {
    // Display the wild battle scene
    $("#fightScene").css("visibility",'visible');
    $("#fightScene").attr("class","wild");
    $("#wildPokemonBattle").css("visibility",'visible');
    $("#progressionBanner").css("visibility", 'hidden');
    $("#trainerBanner").css("visibility", 'hidden');
    // Loads the Pokemon for the battle
    loadPokemon("wild");
}

/* Closes the main menu and sets up the trainer battle */
function trainerBattle() {
    numBatt+=1;
    closeMenu();
    // plays the music
    document.getElementById("mainMenuAudio").pause();
    document.getElementById("wildBattleAudio").play();
    document.getElementById("wildBattleAudio").muted = false;
    document.getElementById("wildBattleAudio").volume = 0.1;
    musicToggle = false
    //adds the loading screen
    $(".loading")[0].style.visibility = 'visible';
    setTimeout(function(){
    $(".loading")[0].style.visibility = 'hidden';
    },2000)
    musicToggle = false
    trainerBattleSetup();
}

/* Sets up the Random Trainer Battle */
function trainerBattleSetup() {
    // Displays the trainer battle scene
    $("#fightScene").css("visibility",'visible');
    $("#fightScene").attr("class","trainer");
    $("#wildPokemonBattle").css("visibility",'hidden');
    $("#trainerBanner").css("visibility", 'visible');
    // Loads in the pokemon
    loadPokemon("random");
}

/* Closes the menu and starts the Progression Battle */
function progressionBattle() {
    numBatt+=1;
    // If there are still gym leaders to fight, loads
    if (progression < 8) {
        closeMenu();
        // plays the music
        document.getElementById("mainMenuAudio").pause();
        document.getElementById("wildBattleAudio").play();
        document.getElementById("wildBattleAudio").muted = false;
        document.getElementById("wildBattleAudio").volume = 0.1;
        musicToggle = false
        //adds the loading screen
        $(".loading")[0].style.visibility = 'visible';
        setTimeout(function(){
            $(".loading")[0].style.visibility = 'hidden';
        },2000)
        musicToggle = false
        progressionBattleSetup();
    }
}

function progressionBattleSetup() {
    // Displays the trainer battle scene
    $("#fightScene").css("visibility",'visible');
    $("#fightScene").attr("class","progression");
    $("#wildPokemonBattle").css("visibility",'hidden');
    $("#progressionBanner").css("visibility", 'visible');
    $("#trainerBanner").css("visibility", 'hidden');
    // Loads in the pokemon
    loadPokemon("progression");
}

/* Plays or pauses music when menu button toggled */
var musicToggle = true
function toggleMusic(){
    document.getElementById("mainMenuAudio").volume = 0.3

    if (!musicToggle){
        document.getElementById("mainMenuAudio").play()
        document.getElementById("mainMenuAudio").muted = false
        musicToggle = true
    }else{
        document.getElementById("mainMenuAudio").pause()
        musicToggle = false
    }
}
function userStats() {
    $(".main_menu")[0].style.visibility = 'hidden';
    $(".UserStats")[0].style.visibility = 'visible';
    if(maleChar == true){
        $("#play1").css("visibility", 'visible');
        $("#play2").css("visibility", 'hidden');
    }
    else{
        $("#play2").css("visibility", 'visible');
        $("#play1").css("visibility", 'hidden');
    }
}
function userToMain() {
    $(".UserStats")[0].style.visibility = 'hidden';
    $(".main_menu")[0].style.visibility = 'visible';
    $("#play2").css("visibility", 'hidden');
    $("#play1").css("visibility", 'hidden');
}
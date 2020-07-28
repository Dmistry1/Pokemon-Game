/* Variables for the pokemon objects */
var user_pkmn;
var opp_pkmn;

/* Variables to manage user's party */
var userPkmns;
var index = 0

/* Variables relevant for trainer battles */
var isTrainer;
var trainerPkmnIDs;
var trainerIndex;
var trainerLevel;
var isProgression;
var progression = 0;
var countWin = 0;
var numBatt = 0;
var checker = 0;

/* Constant to distinguish between user and computer*/
const USER = 1;
const COMP = 2;

/* Constant for the max width of the health bar */
const HB_WIDTH = 191;

/* Constants for attack power, based on water gun, water pulse, hydro pump */
const L_ATK = 40;
const M_ATK = 60;
const H_ATK = 90;

/* Constant for the number of pokemon in the user's party */
const MAX_PARTY = 6;

/* Constant array of pokemon IDs for the progression battles */
const PROG_POKEMON = [[74,95],
		      [54,121],
		      [100,81,26],
		      [114,70,45],
		      [110,89,42,49],
		      [122,80,124,65],
		      [126,78,38,59],
			  [51,31,34,112]];
			  
/* update progression stats */
function perStats(){
	document.getElementById("TB").innerHTML = numBatt;
	document.getElementById("BW").innerHTML = countWin;
	document.getElementById("PB").innerHTML = progression.toString() + "/8";
	document.getElementById("PC").innerHTML = userPkmns.length;

	let httpReq = new XMLHttpRequest();
}

/* Music toggle */
var music = true;
function stopMusic() {
    if (!music) {
		document.getElementById("wildBattleAudio").play();
		document.getElementById("wildBattleAudio").muted = false;
		music = true;
    } else {
		document.getElementById("wildBattleAudio").pause();
		music = false;
    }
}

/* displays the buttons for the different attacks */
function displayMoves(){
    $("#fightbtn").css("visibility",'hidden');
    $("#useItem").css("visibility",'hidden');
    $("#swapPkmn").css("visibility",'hidden');
    $("#return").css("visibility",'visible');
    $("#light").css("visibility",'visible');
    $("#medium").css("visibility",'visible');
    $("#heavy").css("visibility",'visible');
}

/* Hides the buttons for the different attacks */
function hideMoves() {
    $("#fightbtn").css("visibility",'visible');
    $("#useItem").css("visibility",'visible');
    $("#swapPkmn").css("visibility",'visible');
    $("#return").css("visibility",'hidden');
    $("#light").css("visibility",'hidden');
    $("#medium").css("visibility",'hidden');
    $("#heavy").css("visibility",'hidden');
}

/* Calculates the damage of the attack */
function calcDamage(atkPkmn, defPkmn, atk) {
    // Based on the damage calculation listed on Bulbapedia

    let power;
    // Determines the move's power based on the atk used
    if (atk == "Light") {
		power = L_ATK;
    } else if (atk == "Medium") {
		power = M_ATK;
    } else if (atk == "Heavy") {
		power = H_ATK;
    } else {
		console.log("Something went wrong");
    }

    // Calculates the damage (based on Bulbapedia)
    let damage = ((2*atkPkmn.level/5+2)*power*atkPkmn.attack/defPkmn.defense/50 + 2)*typeMatchup(atkPkmn, defPkmn);
    damage = Math.round(damage);
    return damage;
}

/* Determines the type advantage based on the user pokemon's
types and the opposing pokemon's primary type */
function typeMatchup(atkPkmn, defPkmn) {
    /* Matrix of the type matchups. X is the defending type
    Y is the attacking type. */
    let typeChart = [[1,1,1,1,1,1,1,1,1,1,1,1,.5,0,1,1,.5,1],
		     [1,.5,.5,1,2,2,1,1,1,1,1,2,.5,1,.5,1,2,1],
		     [1,2,.5,1,.5,1,1,1,2,1,1,1,2,1,.5,1,1,1],
		     [1,1,2,.5,.5,1,1,1,0,2,1,1,1,1,.5,1,1,1],
		     [1,.5,2,1,.5,1,1,.5,2,.5,1,.5,2,1,.5,1,.5,1],
		     [1,.5,.5,1,2,.5,1,1,2,2,1,1,1,1,2,1,.5,1],
		     [2,1,1,1,1,2,1,.5,1,.5,.5,.5,2,0,1,2,2,.5],
		     [1,1,1,1,2,1,1,.5,.5,1,1,1,.5,.5,1,1,0,2],
		     [1,2,1,2,.5,1,1,2,1,0,1,.5,2,1,1,1,2,1],
		     [1,1,1,.5,2,1,2,1,1,1,1,2,.5,1,1,1,.5,1],
		     [1,1,1,1,1,1,2,2,1,1,.5,1,1,1,1,0,.5,1],
		     [1,.5,1,1,2,1,.5,.5,1,.5,2,1,1,.5,1,2,.5,.5],
		     [1,2,1,1,1,2,.5,1,.5,2,1,2,1,1,1,1,.5,1],
		     [0,1,1,1,1,1,1,1,1,1,2,1,1,2,1,.5,1,1],
		     [1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,.5,0],
		     [1,1,1,1,1,1,.5,1,1,1,2,1,1,2,1,.5,1,.5],
		     [1,.5,.5,.5,1,2,1,1,1,1,1,1,2,1,1,1,.5,2],
		     [1,.5,1,1,1,1,2,.5,1,1,1,1,1,1,2,2,.5,1]];
    /* List of the types in order */
    let types = ["Normal","Fire","Water","Electric","Grass","Ice","Fighting","Poison","Ground","Flying","Psychic","Bug","Rock","Ghost","Dragon","Dark","Steel","Fairy"];
    let multiplier = 1;

    /* finds the type indexes and then the multiplier */
    let defIndex = types.indexOf(defPkmn.type1);
    let atkIndex = types.indexOf(atkPkmn.type1);
    multiplier *= typeChart[atkIndex][defIndex];

    /* Repeats the process if the user pokemon has 2 types */
    if (defPkmn.type2 != "") {
		defIndex = types.indexOf(defPkmn.type2);
		multiplier *= typeChart[atkIndex][defIndex];
    }

    //multiplier;
    return multiplier;
}

/* User chose to attack with Light Attack, and fight() is called */
function lightChoice(){
    fight("Light")
}

/* User chose to attack with Medium Attack, and fight() is called */
function mediumChoice(){
    fight("Medium")
}

/* User chose to attack with Heavy Attack, and fight() is called */
function heavyChoice(){
    fight("Heavy")
}

/* Attacking pokemon uses light attack on defending pokemon. Contains miss mechanic and returns the string with the defending pokemon's remaing health */
function lightAttack(atkPkmn, defPkmn){

    let missChance = Math.random()

    if (missChance < .9){
		let damageDealt = calcDamage(atkPkmn, defPkmn, "Light") + (Math.round(atkPkmn.attack * .05))
		alert(atkPkmn.name + " used Light Attack and dealt " + damageDealt + " damage!")
		defPkmn.hp -= damageDealt

		if (defPkmn.hp < 0){
		    defPkmn.hp = 0
		}

		updateHealth();
    }else{
		alert(atkPkmn.name + " used Light Attack and missed!")
    }
}

/* Attacking pokemon uses medium attack on defending pokemon. Contains miss mechanic
   and returns the string with the defending pokemon's remaing health */
function mediumAttack(atkPkmn, defPkmn){

    let missChance = Math.random()

    if (missChance < .8){
		let damageDealt = calcDamage(atkPkmn, defPkmn, "Medium") + (Math.round(atkPkmn.attack * .1))
		alert(atkPkmn.name  + " used Medium Attack and dealt " + damageDealt +" damage!")
		defPkmn.hp -= damageDealt

		if (defPkmn.hp < 0){
		    defPkmn.hp = 0
		}

		updateHealth();
    }else{
		alert(atkPkmn.name + " used Medium Attack and missed!")
    }
}

/* Attacking pokemon uses heavy attack on defending pokemon. Contains miss mechanic
   and returns the string with the defending pokemon's remaing health */
function heavyAttack(atkPkmn, defPkmn){

    let missChance = Math.random()

    if (missChance < .6){
		let damageDealt = calcDamage(atkPkmn, defPkmn, "Heavy") + (Math.round(atkPkmn.attack * .15))
		alert(atkPkmn.name + " used Special Attack and dealt " + damageDealt +" damage!")
		defPkmn.hp -= damageDealt

		if (defPkmn.hp < 0){
		    defPkmn.hp = 0
		}

		updateHealth();
    }else{
		alert(atkPkmn.name + " used Special Attack and missed!")
    }
}

/* Function that initiates battle when fight button is pressed */
function fight(choice){
    /* Computer Pokemon chooses a random move to attack with*/
    let oppAttack = Math.floor(Math.random() * 3)

    /* Enemy pokemon turn if their speed is higher */
    if (opp_pkmn.speed > user_pkmn.speed){
		if (oppAttack == 0){
	    	lightAttack(opp_pkmn, user_pkmn);
		}else if (oppAttack == 1 && opp_pkmn.hp != 0){
		    mediumAttack(opp_pkmn, user_pkmn);
		}else if (oppAttack == 2 && opp_pkmn.hp != 0){
	    	heavyAttack(opp_pkmn, user_pkmn);
	    }
	}

	// Updates the currently battling pokemon's hp in teh user's party
	userPkmns[index].Hp = user_pkmn.hp

	// If the user pokemon faints checks if there are available pokemon and initiate swap, otherwise ends battle
	if (user_pkmn.hp == 0){
	    var i
	    var gameOver = true
	    for (i = 0; i < userPkmns.length; i++){
			if (userPkmns[i].Hp != 0){
		    	gameOver = false
		    	break
			}
	    }

	    if (gameOver == true){
			alert("You lost! D:")
			endBattle();
	    }else{
			userSwapPokemon();
	    }
    }

    /* User pokemon turn depending on move chosen */
    if (choice == "Light" && user_pkmn.hp != 0){
		lightAttack(user_pkmn, opp_pkmn);
    }else if (choice == "Medium" && user_pkmn.hp != 0){
		mediumAttack(user_pkmn, opp_pkmn);
    }else if (choice == "Heavy" && user_pkmn.hp != 0){
		heavyAttack(user_pkmn, opp_pkmn);
    }

    // If the opposing pokemon faints and its a wild battle, allows the user to catch the pokemon
    if (opp_pkmn.hp == 0){
		if (isTrainer == false) {
	    	let captureFlag = invCheck();
	    	if (captureFlag == true) {
				alert("You captured the wild " + opp_pkmn.name + "!");
				capture(opp_pkmn.name, opp_pkmn.img, opp_pkmn.level);
	    	} else {
				alert("You defeated the wild " + opp_pkmn.name + "!");
	    	}
	    	countWin+=1;
	    	endBattle();
		}
    } else {

		/* Enemy Pokemon turn if their speed is lower */
		if (opp_pkmn.speed <= user_pkmn.speed) {
	    	if (oppAttack == 0 && opp_pkmn.hp != 0){
				lightAttack(opp_pkmn, user_pkmn);
	    	}else if (oppAttack == 1 && opp_pkmn.hp != 0){
				mediumAttack(opp_pkmn, user_pkmn);
	    	}else if (oppAttack == 2 && opp_pkmn.hp != 0){
				heavyAttack(opp_pkmn, user_pkmn);
	    	}
	    
	    	// Updates the currently battling pokemon's hp in the user's party
	    	userPkmns[index].Hp = user_pkmn.hp

	    	// If the user pokemon faints checks if there are available pokemon and initiate swap, otherwise ends battle
	    	if (user_pkmn.hp == 0){
				var i
				var gameOver = true
				for (i = 0; i < userPkmns.length; i++){
					if (userPkmns[i].Hp != 0){
						gameOver = false
						break
		    		}
				}

				if (gameOver == true){
		    		alert("You lost! D:")
		    		endBattle();
				}else{
		    		userSwapPokemon();
				}
	    	}
		}
    }
    
    /* If the enemy trainer's pokemon fainted, checks if they have
       another, declaring the user the winner if not */
    if ((opp_pkmn.hp == 0) && (isTrainer == true)) {
		trainerIndex++;
		if (trainerIndex >= trainerPkmnIDs.length) {
	    	if (isProgression == false) {
				alert("You've defeated the opposing trainer! :)");
	    	} else {
				alert("You defeated the gym leader! :)");
				progression++;
	    	}
	    	countWin+=1;
	    	updateLevels();
	    	endBattle();
		} else {
	    	let oldPkmn = opp_pkmn.name;
	    	swapTrainer();
	   		alert(oldPkmn + " fainted! The opposing trainer sent out a new pokemon!");
		}
    }

    /* Re display the fight button for the next turn */
    hideMoves();
    if(progression == 8 && checker == 0){
		checker+=1;
        endGameScene();
    }
}

function capture(name,image,level) {
    let httpReq = new XMLHttpRequest();
    // open post request
    httpReq.open("POST", './php/user/create.php');
    httpReq.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');

    // 0.05 increase per level, -1 to account for level 1
    let multiplier = 1 + (0.05 * (level - 1));
    // create request to user table in database
    httpReq.send("Name=" + name + "&Multiplier=" + multiplier + "&Level=" + level + "&Image=" + image);
}

/* Maintains party size at 6 */
function invCheck() {
    // If the user doesn't have a full party, they can catch a wild pokemon
    if (userPkmns.length < MAX_PARTY) {
		return true;
    }

    // Asks the user if they'd like to remove a pokemon, and asks which one if so
    let promptString = "Would you like to remove a pokemon from your party? (Enter an index or click cancel to keep your current party):\n"
    for (let i = 0; i < userPkmns.length; i++){
		promptString += i + ". " + userPkmns[i].Name + "\n"
    }
    let removeIndex = prompt(promptString);

    // validation for index
    while ((removeIndex != null) && ((removeIndex < 0) || (removeIndex >= MAX_PARTY))) {
		removeIndex = prompt("Please enter a valid index or press cancel");
    }

    // If the user wishes to maintain their party, returns false
    if (removeIndex == null) {
		return false;
    }

    // Otherwise removes the pokemon at the given index and returns true
    else {
		removePkmn(removeIndex);
		return true;
    }
}

/* Removes the pokemon at a certain index in the party */
function removePkmn(removeIndex) {
    let httpReq = new XMLHttpRequest();

    //Remove() call to the database
    httpReq.open("PUT", './php/user/delete.php');
    httpReq.setRequestHeader("Content-Type",  'application/x-www-form-urlencoded');
    console.log(userPkmns[removeIndex].Id)
    httpReq.send("Id=" + userPkmns[removeIndex].Id);
}

/* Updates the user pokemon's levels */
function updateLevels() {
    /* determines how many levels are gained based on the fight type
       Progression Battles gain 3 levels
       Random Battles gain 1 level */
    let levels;
    if (isProgression == true) {
		levels = 3;
    } else {
		levels = 1;
    }

    let httpReq = new XMLHttpRequest();
    
    // Iterates through the array of user pokemon, updating each
    for (let i = 0; i < userPkmns.length; i++) {
		// Update() call to the database
		httpReq.open("POST", './php/user/update.php');
		httpReq.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
		// Multiplier increases by 0.05 per level
		userPkmns[i].Multiplier = Number(userPkmns[i].Multiplier);
		userPkmns[i].Level = Number(userPkmns[i].Level);
		userPkmns[i].Multiplier += (0.05 * levels);
		userPkmns[i].Level += levels;
		httpReq.send("Name=" + userPkmns[i].Name + "&Multiplier=" + userPkmns[i].Multiplier + "&Level=" + userPkmns[i].Level);
    }
}

/* Updates the user pokemon's levels */
function updateLevels() {
    /* determines how many levels are gained based on the fight type
       Progression Battles gain 3 levels
       Random Battles gain 1 level */
    let levels;
    if (isProgression == true) {
		levels = 3;
    } else {
		levels = 1;
    }

    let httpReq = new XMLHttpRequest();
    
    // Iterates through the array of user pokemon, updating each
    for (let i = 0; i < userPkmns.length; i++) {
		// Update() call to the database
		httpReq.open("POST", './php/user/update.php');
		httpReq.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
		// Multiplier increases by 0.05 per level
		userPkmns[i].Multiplier = Number(userPkmns[i].Multiplier);
		userPkmns[i].Level = Number(userPkmns[i].Level);
		userPkmns[i].Multiplier += (0.05 * levels);
		userPkmns[i].Level += levels;
		httpReq.send("Name=" + userPkmns[i].Name + "&Multiplier=" + userPkmns[i].Multiplier + "&Level=" + userPkmns[i].Level);
    }
}

/* Sets the HUD and max health values according to the pokemon in combat */
function setHUD() {
    let healthbar = String(HB_WIDTH) + "px";
    $("#userPkmnName").text(user_pkmn.name);
    $("#userLevel").text(user_pkmn.level);
    $("#userCurrHealth").text(user_pkmn.hp);
    $("#userMaxHealth").text("/ " + user_pkmn.hp);
    $("#userHealthBar").css("width",healthbar);
    $("#enemyPkmnName").text(opp_pkmn.name);
    $("#enemyLevel").text(opp_pkmn.level);
    $("#enemyCurrHealth").text(opp_pkmn.hp);
    $("#enemyMaxHealth").text("/ " + opp_pkmn.hp);
    $("#enemyHealthBar").css("width",healthbar);
}

/* Sets ONLY the User's HUD (used for swapping)*/
function setUserHUD(){
    let healthbar = String(HB_WIDTH) + "px";
    $("#userPkmnName").text(user_pkmn.name);
    $("#userLevel").text(user_pkmn.level);
    $("#userCurrHealth").text(user_pkmn.hp);
    $("#userMaxHealth").text("/ " + userPkmns[index].MaxHp);
    $("#userHealthBar").css("width",healthbar);
}

/* Sets ONLY the Computer's HUD (used for swapping)*/
function setOppHUD(){
    let healthbar = String(HB_WIDTH) + "px";
    $("#enemyPkmnName").text(opp_pkmn.name);
    $("#enemyLevel").text(opp_pkmn.level);
    $("#enemyCurrHealth").text(opp_pkmn.hp);
    $("#enemyMaxHealth").text("/ " + opp_pkmn.hp);
    $("#enemyHealthBar").css("width",healthbar);
}

/* Updates the health values and bars on the HUD */
function updateHealth() {
    $("#userCurrHealth").text(user_pkmn.hp);
    $("#enemyCurrHealth").text(opp_pkmn.hp);

    // Gets values for max health
    let userMaxHP = $("#userMaxHealth").text();
    let enemyMaxHP = $("#enemyMaxHealth").text();
    userMaxHP = userMaxHP.slice(2);
    enemyMaxHP = enemyMaxHP.slice(2);

    // Calculates and updates health bars
    let userHealth = (user_pkmn.hp / userMaxHP) * HB_WIDTH;
    let enemyHealth = (opp_pkmn.hp / enemyMaxHP) * HB_WIDTH;
    userHealth = String(userHealth) + "px";
    enemyHealth = String(enemyHealth) + "px";
    $("#userHealthBar").css("width",userHealth);
    $("#enemyHealthBar").css("width",enemyHealth);
}

/* Loads Pokemon for a battle */
function loadPokemon(battleType) {
    index = 0;
    trainerIndex = 0;

    // If the battle is a wild pokemon, randoly chooses one
    if (battleType == "wild") {
		isTrainer = false;
		let PkmnId = 1;
		// Chooses a random valid pokemon and adds it to an array
		while (PkmnId == 1 || PkmnId == 2 || PkmnId == 3 || PkmnId == 20 || PkmnId == 32) {
			PkmnId = Math.floor(Math.random() * 149);
		}
		trainerPkmnIDs = [PkmnId];
    }
    
    // If the battle is a progression battle, pulls from the table
    else if (battleType == "progression") {
		isTrainer = true;
		isProgression = true;
		trainerPkmnIDs = PROG_POKEMON[progression];
    }

    // If its a random trainer battle, randomly choose 3 pokemon
    else if (battleType == "random") {
		isTrainer = true;
		isProgression = false;
		trainerPkmnIDs = [1, 1, 1];
		for (let i = 0; i < 3; i++) {
	    	let PkmnId = 1;
	    	// Chooses a random valid pokemon and adds it to an array
	    	while (PkmnId == 1 || PkmnId == 2 || PkmnId == 3 || PkmnId == 20 || PkmnId == 32) {
				PkmnId = Math.floor(Math.random() * 149);
	    	}
	    	trainerPkmnIDs[i] = PkmnId;
		}
    }

    let httpReq = new XMLHttpRequest();

    // Opens the Backend to pull the user's pokemon from the user table
    httpReq.open("GET", './php/user/getAll.php');
    httpReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpReq.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
	   		// Convert JSON to javascript object
	    	userPkmns = JSON.parse(this.responseText);

	    	// Appends hp attributes to the pokemon from the user's table
	    	userPkmns.forEach(function(pokemon) {
			pokemon.Hp = -1;
			pokemon.MaxHp = -1;
	    	});

	    	// Opens the Backend to load the user's first pokemon
	    	httpReq.open("GET", './php/characters/getOne.php?Name='+userPkmns[0].Name);
	    	httpReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	    	httpReq.onreadystatechange = function() {
				if (this.readyState === 4 && this.status === 200) {
		    		var user_pokemon_data = JSON.parse(this.responseText);
		    		var temp_user_pkmn = {
						name: user_pokemon_data.Name,
						type1: user_pokemon_data.Type1,
						type2: user_pokemon_data.Type2,
						level: userPkmns[index].Level,
						total: user_pokemon_data.Total,
						hp: Math.floor(Number(user_pokemon_data.Hp) * Number(userPkmns[index].Multiplier)),
						attack: Number(user_pokemon_data.Attack) * Number(userPkmns[index].Multiplier),
						defense: Number(user_pokemon_data.Defense) * Number(userPkmns[index].Multiplier),
						spatk: Number(user_pokemon_data.SpAtk) * Number(userPkmns[index].Multiplier),
						spdef: Number(user_pokemon_data.SpDef) * Number(userPkmns[index].Multiplier),
						speed: Number(user_pokemon_data.Speed) * Number(userPkmns[index].Multiplier),
						img: userPkmns[index].Image
		    		}

		    		user_pkmn = temp_user_pkmn;
		    		userPkmns[0].MaxHp = user_pkmn.hp;

		    		// Loads in the first pokemon in the opposing pokemon array
		    		httpReq.open("GET", './php/characters/getOne.php?Id='+trainerPkmnIDs[0]);
		    		httpReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		    		httpReq.onreadystatechange = function() {
						if (this.readyState === 4 && this.status === 200) {
			    			var opp_pokemon_data = JSON.parse(this.responseText);
			    			var temp_opp_pkmn = {
								name: opp_pokemon_data.Name,
								type1: opp_pokemon_data.Type1,
								type2: opp_pokemon_data.Type2,
								level: 1,
								total: opp_pokemon_data.Total,
								hp: Number(opp_pokemon_data.Hp),
								attack: Number(opp_pokemon_data.Attack),
								defense: Number(opp_pokemon_data.Defense),
								spatk: Number(opp_pokemon_data.SpAtk),
								spdef: Number(opp_pokemon_data.SpDef),
								speed: Number(opp_pokemon_data.Speed),
								img: "./Images/" + opp_pokemon_data.Image
			    			}
			    			opp_pkmn = temp_opp_pkmn;

			    			// Sets the Level for the opposing pokemon
			    			if (isTrainer == false || isProgression == false) {
							// Sets level based on user lead pokemon
							trainerLevel = user_pkmn.level;
			    			} else {
							// Sets level as a multiple of 5 based on progression
							// progression is an index, so have to add 1
							trainerLevel = (progression + 1) * 5;
			    			}
			    			opp_pkmn.level = trainerLevel;
			    
			    			// Loads the pokemon images and HUD
			    			let userPkmnImg = document.getElementById("userPkmnImg");
			    			let oppPkmnImg = document.getElementById("enemyPkmnImg");
			    			userPkmnImg.src = user_pkmn.img;
			    			oppPkmnImg.src = opp_pkmn.img;

			    			setHUD();
						}
		    		};
		    		// send requests
		    		httpReq.send();
				}
	    	};
	    	httpReq.send();
		}
	};
    httpReq.send();
}

/* Allow the user to swap their currently battling pokemon */
function userSwapPokemon(){
    var promptString = "Which pokemon would you like to swap to? (Enter associated number): \n"
    var i
    for (i = 0; i < userPkmns.length; i++){

        //If a pokemon has fainted, display it to the user
        if (userPkmns[i].Hp == 0){
            promptString += i + ". " + userPkmns[i].Name + "(Fainted)\n"
        }else{
            promptString += i + ". " + userPkmns[i].Name + "\n"
        }
    }

    //Store the current health of the battling pokemon into the user's party array
    userPkmns[index].Hp = user_pkmn.hp


    index = Number(prompt(promptString));
    while ((index < 0) || (index >= userPkmns.length) || isNaN(index) || (userPkmns[index].Hp == 0)) {
        if ((index < 0) || (index >= userPkmns.length) || isNaN(index)) {
            alert("Invalid choice. Please select a valid number.")
        } else {
	    	alert("This Pokemon has fainted. Please choose a different one.");
		}
		index = Number(prompt(promptString));
    }
    
    let httpReq = new XMLHttpRequest();

    // open get request to backend for pokemon data
    httpReq.open("GET", './php/characters/getOne.php?Name='+userPkmns[index].Name);
    httpReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // Defining event listener for readystatechange event
    httpReq.onreadystatechange = function() {
        // Check if the request is compete and was successful
        if(this.readyState === 4 && this.status === 200) {
	    
            //FROM THE CHARACTER TABLE
            var user_pokemon_data = JSON.parse(this.responseText);

            var temp_user_pkmn = {
                name: user_pokemon_data.Name,
                type1: user_pokemon_data.Type1,
                type2: user_pokemon_data.Type2,
                level: userPkmns[index].Level,
                total: user_pokemon_data.Total,
                hp: Math.floor(Number(user_pokemon_data.Hp)  * Number(userPkmns[index].Multiplier)),
                attack: Number(user_pokemon_data.Attack)  * Number(userPkmns[index].Multiplier),
                defense: Number(user_pokemon_data.Defense)  * Number(userPkmns[index].Multiplier),
                spatk: Number(user_pokemon_data.SpAtk)  * Number(userPkmns[index].Multiplier),
                spdef: Number(user_pokemon_data.SpDef)  * Number(userPkmns[index].Multiplier),
                speed: Number(user_pokemon_data.Speed)  * Number(userPkmns[index].Multiplier),
                img: userPkmns[index].Image
            }

            user_pkmn = temp_user_pkmn

            //If the health of the pokemon in user table is anything other than default, this means
            //that the pokemon has already fought but hasnt fainted, so the current health, must be
            //restored
            if (userPkmns[index].MaxHp == -1){
                userPkmns[index].Hp = user_pkmn.hp
                userPkmns[index].MaxHp = temp_user_pkmn.hp
            }else{
                user_pkmn.hp = userPkmns[index].Hp
            }
	    
	    	// Resets the user's pokemon img and HUD
            let userPkmnImg = document.getElementById("userPkmnImg");
            userPkmnImg.src = user_pkmn.img;

            setUserHUD();
            updateHealth()
        }
    }
    httpReq.send();
}

function swapTrainer() {
    // loads in the trainer's next pokemon
    let httpReq = new XMLHttpRequest();
    httpReq.open("GET", './php/characters/getOne.php?Id='+trainerPkmnIDs[trainerIndex]);
    httpReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpReq.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
	    	var opp_pokemon_data = JSON.parse(this.responseText);

	    	var temp_opp_pkmn = {
				name: opp_pokemon_data.Name,
				type1: opp_pokemon_data.Type1,
				type2: opp_pokemon_data.Type2,
				level: trainerLevel,
				total: opp_pokemon_data.Total,
				hp: Number(opp_pokemon_data.Hp),
				attack: Number(opp_pokemon_data.Attack),
				defense: Number(opp_pokemon_data.Defense),
				spatk: Number(opp_pokemon_data.SpAtk),
				spdef: Number(opp_pokemon_data.SpDef),
				speed: Number(opp_pokemon_data.Speed),
				img: "./Images/" + opp_pokemon_data.Image
	    	}
	    	opp_pkmn = temp_opp_pkmn;
	    
	    	// Reset's the enemy pokemon's img and HUD
	    	let oppPkmnImg = document.getElementById("enemyPkmnImg");
	    	oppPkmnImg.src = opp_pkmn.img;

	    	setOppHUD();
	    	updateHealth();
		}
    };
    // send request
    httpReq.send();
}
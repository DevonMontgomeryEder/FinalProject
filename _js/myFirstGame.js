//lovingly stolen from http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
//...and modified heavily

// Create the canvas
// declares variable to hold the canvas object/API

//################ SETUP CANVAS ##################
//create the canvas element
var canvas = document.createElement("canvas");
//takes canvas gets its context and puts that value in the ctx variable
var ctx = canvas.getContext("2d");
// set canvas width and height
canvas.width = 512;
canvas.height = 480;
//appends the canvas to the document object
document.body.appendChild(canvas);

//################ Global variables ##################
var monstersCaught = 0;
var now;
var delta;
var allMonsters = [];

function Monster(gravity, damage, life) {
	this.gravity = gravity;
	this.damage = damage;
	this.life = life;
	this.name = "Greg";
	allMonsters.push(this);
}

var Grendel = new monster(9.8, 10, 5);
var Barney = new monster(4, 1000, 100000);
var Homework = new monster(1000, 10000, 25);

Grendel.name = "Turdly";
console.log(Grendel.name);

//################ Setting up images ##################
// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "_images/background2.0.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "_images/hero2.0.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "_images/monster2.0.png";

//################ Game Objects ##################
var hero = {
	name: "Zoltar",
	gravity: 9.8,
	speed: 256, // movement in pixels per second
	messages: ["Hello there!", "Hi", "Whassup!"],
	speak: function(){
		console.log(this.messages[randNum(3)]);
	},
	jump: function(){
		this.y-=25;
	}
};

var monster = {
	gravity:2.0,
};

//################ Setup Keyboard controls ##################

var keysDown = {};
//function that replaced prior "w" "a" "s" "d" individual commands
addEventListener("keydown", function (e) {
	keysDown[e.key] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.key];
}, false);

//################ Functions ##################
var reset = function () {
	// hero.x = canvas.width / 2;
	// hero.y = canvas.height / 2;
	hero.x = canvas.width-64;
	hero.y = canvas.height-64;

	// Place the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};

//generate random number (like a dice)
var randnum = function (x) {
	return math.floor (Math.random()*x);
};

console.log(randNum(2345));

var input = function(modifier) {
		// checks for user input
		if ("w" in keysDown) { // Player holding up
			// hero.y -= hero.speed * modifier;\
			hero.jump();
		}
		if ("s" in keysDown) { // Player holding down
			hero.y += hero.speed * modifier;
		}
		if ("a" in keysDown) { // Player holding left
			hero.x -= hero.speed * modifier;
		}
		if ("d" in keysDown) { // Player holding right
			hero.x += hero.speed * modifier;
		}
		if (" " in keysDown) { // Player holding right
			hero.speak();
		}
}

// ###Update###
var update = function (modifier) {

	// these are the updates!!!!
	// these are the jump conditions
	//prevents hero from going off screen top
	if (hero.y > canvas.height) {
		// console.log("he fell of the screen...")
		hero.y = 448;
		hero.gravity = 0;
	}

	//prevents hero from going off screen bottom
	if (hero.y < canvas.height - 32) {
		// console.log("he's in the air!...")
		hero.gravity = 9.8;
	}

	//prevents hero from going off screen right
	if (hero.x > canvas.width-32){
		hero.x = canvas.width - 32;
		console.log ("the computer knows he's off the screen");
		console.log (hero.x);
	}

	//prevents hero from going off screen left
	if (hero.x <= 0){
		hero.x = 32;
		console.log ("the computer knows he's off the screen");
		console.log (hero.x);
	}
// if (monster.y > canvas.height) {

	// 	monster.y = 0;
	// }

	// // this is where the gravity is applied to the monster
	// monster.y += monster.gravity;
	for (monster in allMonsters) {
		ctx.fillStyle = "#FF0000";
		ctx.fillRect(allMonsters[monster].x, allMonsters[monster].y, allMonsters[monster].hitpoints * 5, 50);
		if (allMonsters[monster].y <= canvas.height) {
			allMonsters[monster].y += allMonsters[monster].gravity * modifier;
		}
		if (allMonsters[monster].y > canvas.height) {
			allMonsters[monster].jump();
			allMonsters[monster].x = randNum(canvas.width);
		}
	}

// this is where the gravity is applied to the hero
hero.y+=hero.gravity;

	// Collision detection
// 	if (
// 		hero.x <= (monster.x + 32)
// 		&& monster.x <= (hero.x + 32)
// 		&& hero.y <= (monster.y + 32)
// 		&& monster.y <= (hero.y + 32)
// 	  {
// 		++monstersCaught;
// 		reset();
// 	}

or (monster in allMonsters) {
	if (
		Hero.x <= (allMonsters[monster].x + 64) &&
		allMonsters[monster].x <= (Hero.x + 64) &&
		Hero.y <= (allMonsters[monster].y + 64) &&
		allMonsters[monster].y <= (Hero.y + 64)
	) {
		Hero.hitpoints -= 15;
		allMonsters.splice(monster, 1);
		console.log("collision");
		console.log(allMonsters);
		console.log(allMonsters);
	}
}
};

// ### Render ###
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	// if (monsterReady) {
	// 	ctx.drawImage(monsterImage, monster.x, monster.y);
	// }

	if (monsterReady) {
		for (monster in allMonsters) {
			ctx.drawImage(monsterImage, allMonsters[monster].x, allMonsters[monster].y);
		}
	}
		
	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);
	// frames
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Delta:" + now, 256, 32);
};

// ### Main loop function ###
var main = function () {
	//perpetually occurring updates
	now = Date.now();
	var delta = now - then;

	input(delta /1000);
	update(delta / 1000);
	render();
	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
//allows for constant refresh
var then = Date.now();
var now;
var delta;
reset();
main();
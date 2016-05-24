//var score = 0;
//var scoreText;
var movementDirection;
var myPlatforms;
var player = {};
var playerPosition;
var scaleX = false;
var enemies;
var stop = true;
var music;
var cursors;
var background = {
	objects: new Array(),
	speeds: new Array(),
};

var playState = {

	create: function() {
		game.stage.backgroundColor = "#90D0F6";
		//Для счетчика FPS
		game.time.advancedTiming = true;

		//Создание игрового мира
		game.world.setBounds(0, 0, 4800, 2000);
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Добавление музыки
		music = game.add.audio ('magntron');
		// killmusic.play();


		// облака
		сloud2 = game.add.tileSprite(0, 00, 5000, game.cache.getImage('cloud2').height, 'cloud2');
		cloud3 = game.add.tileSprite(0, 400, 5000, game.cache.getImage('cloud3').height, 'cloud3');
		
		// горы
		background.objects.push(game.add.tileSprite(0, game.height - game.cache.getImage('mountains-back').height, 5000, game.cache.getImage('mountains-back').height, 'mountains-back'));
		background.speeds.push(0.3);
		background.objects.push(game.add.tileSprite(0, game.height - game.cache.getImage('mountains-mid').height, 5000, game.cache.getImage('mountains-mid').height,'mountains-mid'));
		background.speeds.push(0.6);

		cursors = game.input.keyboard.createCursorKeys();



		//game.add.sprite(0, 100, 'background');
		game.add.sprite(30, 40, 'tree');
		game.add.sprite(1400, 40, 'tree');
		game.add.sprite(1200, 40, 'tree');
		//var kitSprite = 
		game.add.sprite(2160, 240, 'kit');


		//var kitTween = game.add.tween(kitSprite);
		//kitTween.to({y:240}, 2000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);




		platforms = game.add.group();
		platforms.enableBody = true;
		var ground = platforms.create(0, 1000, 'ground');
		ground.scale.setTo(16, 2);
		ground.body.immovable = true;

		//Добавление земли


		for (var i = 0, groundPosition = 0; i < 90; i++) {
			game.add.sprite(-3 + groundPosition, 1000, "groundSprite");
			groundPosition += 109;
		};

		//Создание платформ

		myPlatforms = game.add.group();
		myPlatforms.enableBody = true;
		var platform1 = myPlatforms.create(500, 700, "platform2");
		platform1.body.immovable = true;
		platform1 = myPlatforms.create(-150, 400, "platform2");
		platform1.body.immovable = true;
		platform1 = myPlatforms.create(1200, 400, "platform3");
		platform1.body.immovable = true;
		platform1 = myPlatforms.create(2100, 300, "platform1");
		platform1.body.immovable = true;

		//Создание игрока

		//player = game.add.sprite(900, 500, 'monster');
		player = game.add.sprite(900, 500, 'mushroom');
		player.anchor.setTo(.5,.5);
		game.physics.arcade.enable(player);
		player.body.bounce.y = 0.2;
		player.body.gravity.y = 300;
		player.body.setSize(100, 180);
		player.body.collideWorldBounds = true;




		player.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31], 45, true);
		player.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31], 45, true);


		//Создание врагов
		enemies = game.add.group();
		enemy1 = new EnemyMushroom(1000, 400);
		enemy1.enemy.animations.play("move");

		enemy2 = new EnemyMonster(1200, 400);
		enemy2.enemy.animations.play("move");
	  
		//Тест анимации
		enemy3 = game.add.sprite(1200, 140, "monster_attack");
		enemy3.animations.add("monster_hit", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], 24, true);
		enemy3.animations.play('monster_hit');
		
		//Тест анимации
		enemy4 = game.add.sprite(1400, 140, "monster_run_attack");
		enemy4.animations.add("monster_hit", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31], 38, true);
		enemy4.animations.play('monster_hit');
		
		//Тест анимации
		enemy5 = game.add.sprite(1600, 170, "monster");
		enemy5.animations.add("monster_hit", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31], 38, true);
		enemy5.animations.play('monster_hit');

		//scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
		cursors = game.input.keyboard.createCursorKeys();

		game.input.onTap.add(function(pointer, isDoubleClick) {
			if (pointer.button == 0 && isDoubleClick || pointer.button == 1) {
				toogleFullScreen();
			};
		});
	},

	update: function () {
		player.body.velocity.x = 0;

		// двигаем облака
		сloud2.tilePosition.x -= 0.2;
		cloud3.tilePosition.x -= 0.3;
		
		game.physics.arcade.collide(player, platforms);
		game.physics.arcade.collide(player, enemies, killEnemy, null, this);
		game.physics.arcade.collide(player, myPlatforms);
		game.physics.arcade.collide(enemies, platforms);

		if (cursors.left.isDown) {
			//  Move to the left

			if (scaleX == true) {
				player.scale.x *= -1;
				scaleX = false;
			};
			player.body.velocity.x = -250;
			if (stop == true) {
				player.animations.play('left');
			};
			movementDirection = "left";

			backgroundParallax(false);
		} else if (cursors.right.isDown) {
			//  Move to the right

			if (scaleX == false) {
				player.scale.x *= -1;
				scaleX = true;
			};
			player.body.velocity.x = 250;
			if (stop == true) {
				player.animations.play('right');
			};
			movementDirection = "right";

			backgroundParallax(true);
		};

		if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
		   changeTexture();
		   player.animations.play('attack');
		   stop = false;
		};


		if (cursors.up.isDown && player.body.touching.down) {
			player.body.velocity.y = -450;
		};

		if (player.body.velocity.x == 0 && stop) {
			player.animations.stop();
			player.frame = 0;
		};



		//Движение камеры
		game.camera.follow(player);
	},

	render: function() {
		//Счетчик FPS
		game.debug.text(game.time.fps, 100, 104, "#ffffff");
		//game.debug.body(enemy1);
		//game.debug.body(player);
	}
};


function killEnemy (player, enemy) {
	if (stop == false) game.time.events.add(300, function() {
		enemy.kill();
	}, this);

};


//Конструктор врагов
function EnemyMushroom(x, y) {
	this.enemy = enemies.create(x, y, "mushroom");
	game.physics.enable(this.enemy, Phaser.Physics.ARCADE);
	this.enemy.body.gravity.y = 300;
	this.enemy.body.velocity.x = -50;
	this.enemy.body.collideWorldBounds = true;

	this.enemy.animations.add('move', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31], 40, true);
};


function EnemyMonster(x, y) {
	this.enemy = enemies.create(x, y, "monster");
	this.enemy.anchor.setTo(.5,.5)
	this.enemy.scale.x *= -1;
	game.physics.enable(this.enemy, Phaser.Physics.ARCADE);
	this.enemy.body.setSize(236, 225);
	this.enemy.body.gravity.y = 300;
	this.enemy.body.velocity.x = 200;
	this.enemy.body.collideWorldBounds = true;
	this.enemy.animations.add("move", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31], 40, true);
};


function changeTexture() {
	player.loadTexture("mushroom_attack", 0, false);
	// player.animations.add('death', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], 40, false).onComplete.add(afterDeath);
	player.animations.add('attack', [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 14, 14, 0, 1, 2, 3, 4], 30, false).onComplete.add(afterDeath);
};


function afterDeath() {
	player.animations.stop();
	stop = true;
	player.loadTexture("mushroom", 0, false);
	player.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31], 45, true);
	player.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31], 45, true);
};


function toogleFullScreen() {
	if (game.scale.isFullScreen) {
		game.scale.stopFullScreen();
	} else {
		game.scale.startFullScreen(false);
	};
};


function backgroundParallax(course) {
	if (typeof(course) != "boolean") {
		return null;
	};

	// TODO:
	// привязываться не к нажатиям на клавиши, а к положению камеры
	for (var i=0,m=background.objects.length;i<m;i++) {
		background.objects[i].tilePosition.x += background.speeds[i] * (course ? -1 : 1);
	};
};

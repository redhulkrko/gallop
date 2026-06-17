// game config

var game;

var gameOptions = {
    gameWidth: window.innerWidth,
    gameHeight: window.innerHeight,
}



this.window.onload = function () {
    var gameConfig = {
        type: Phaser.CANVAS,
        width: gameOptions.gameWidth,
        height: gameOptions.gameHeight,
        backgroundColor: '#71c5cf',
        pixelArt: true,
        physics: {
            default: 'arcade',
            arcade: {
                debug: false
            }
        },
        
        

 //preload: preload, create: create, update:update, render:render,
        scene: [PreloadSc, GameSc],

    };
    game = new Phaser.Game(gameConfig);
    resize();
    window.addEventListener("resize", resize, false);
	 //game.forceSingleUpdate=false;
}


// responsive resize

function resize() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight; 
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;
    if (windowRatio < gameRatio) {
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    } else {
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}
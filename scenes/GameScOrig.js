

// variables



var fenceGroup;
var fenceQty = 8;
var fenceCount = 0;
var fence;
var fenceHurdle = false;
var fenceCollider;

var jumpCount = 0;

var horseGroup;
var horse;

var startLine;
var finishLine;
var raceTrack;

// background variables

var skyBg;
var distantBg;
var fartreesBg;
var farmidtreesBg;
var midtreesBg;
var stonewallBg;
var roadBg;
var barrierBg;

var goTime = false;
var stopTime = false;
var trotTime = false;

var delay = Phaser.Math.Between(750, 2250);
var delayStart = Phaser.Math.Between(14000, 26000);


// get the window sizes
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

//MATT-insert
var hdHeight = 1080; //1080  //216
var hdWidth = 1920; //1920 //384

var scaleFactor = windowHeight / hdHeight;

var midHeight = windowHeight / 2;
var midWidth = windowWidth / 2;

//game.time.desiredFps = 30;
//MATT-end

class GameSc extends Phaser.Scene {


   constructor () {
        super({key: 'GameSc'});
    }

    preload() {

    }
    
    create() {

        ///// horse elements
        var array = [];
        for (var i = 0; i < horseQty; i++) {
            array.push('geegee' + i);
        }

        fenceGroup = this.physics.add.group();
        horseGroup = this.physics.add.group({ key: array, setXY: { x: 110, y: (650*scaleFactor), stepY: -15 } });
        

        // backgrounds are called in here as tileSprites, which make them repeat/tile 

        // properties are (xPos, yPos, imageWidth, imageHeight)

        
        skyBg = this.add.tileSprite(midWidth, midHeight, windowWidth/scaleFactor, windowHeight/scaleFactor, 'sky');
        distantBg = this.add.tileSprite(midWidth, midHeight, windowWidth/scaleFactor, windowHeight/scaleFactor, 'distantBg');
        fartreesBg = this.add.tileSprite(midWidth, midHeight, windowWidth/scaleFactor, windowHeight/scaleFactor, 'fartreesBg');
        farmidtreesBg = this.add.tileSprite(midWidth, midHeight, windowWidth/scaleFactor, windowHeight/scaleFactor, 'farmidtreesBg');
        midtreesBg = this.add.tileSprite(midWidth, midHeight, windowWidth/scaleFactor, windowHeight/scaleFactor, 'midtreesBg');
        stonewallBg = this.add.tileSprite(midWidth, midHeight, windowWidth/scaleFactor, windowHeight/scaleFactor, 'stonewallBg');
        roadBg = this.add.tileSprite(midWidth, midHeight, windowWidth/scaleFactor, windowHeight/scaleFactor, 'road');
        
		  barrierBg = this.add.tileSprite(midWidth, midHeight, windowWidth/scaleFactor, windowHeight/scaleFactor, 'barrier');
        raceTrack = this.add.tileSprite(midWidth, midHeight, windowWidth/scaleFactor, windowHeight/scaleFactor, 'track');
        
        
        
        distantBg.setScale(scaleFactor, scaleFactor);
        fartreesBg.setScale(scaleFactor, scaleFactor);
        farmidtreesBg.setScale(scaleFactor, scaleFactor);  
        midtreesBg.setScale(scaleFactor, scaleFactor); 
        stonewallBg.setScale(scaleFactor, scaleFactor);
        roadBg.setScale(scaleFactor, scaleFactor); 
        barrierBg.setScale(scaleFactor, scaleFactor);
        raceTrack.setScale(scaleFactor, scaleFactor);    
        skyBg.setScale(scaleFactor, scaleFactor);     

        this.timedEvent = this.time.addEvent({
            delay: delay,
            callback: this.moveTrack,
            callbackScope: this,
            loop: false
        });

        this.horseRunners();

        // trigger startline
        this.timedEvent = this.time.addEvent({ delay: delayStart, callback: this.addStartLine, callbackScope: this, loop: false });
        
        this.trotStartLine();

    }

    update() {

        horseGroup.children.each(this.horseActions, this);

        // background speeds set here

        if (trotTime) {
            skyBg.tilePositionX += 0.1;
            distantBg.tilePositionX += 0.2;
            fartreesBg.tilePositionX += 0.3;
            farmidtreesBg.tilePositionX += 0.4;
            midtreesBg.tilePositionX += 0.5;
            stonewallBg.tilePositionX += 0.7;
            roadBg.tilePositionX += 0.9;
            barrierBg.tilePositionX += 1.3;
            raceTrack.tilePositionX += 1.8;
        } else if (goTime) {
            skyBg.tilePositionX += 1.0;
            distantBg.tilePositionX += 2.0;
            fartreesBg.tilePositionX += 3.0;
            farmidtreesBg.tilePositionX += 4;
            midtreesBg.tilePositionX += 5;
            stonewallBg.tilePositionX += 7;
            roadBg.tilePositionX += 9;
            barrierBg.tilePositionX += 13;
            raceTrack.tilePositionX += 18;
        } else {
            skyBg.tilePositionX = 0;
            distantBg.tilePositionX = 0;
            fartreesBg.tilePositionX = 0;
            farmidtreesBg.tilePositionX += 0;
            midtreesBg.tilePositionX = 0;
            stonewallBg.tilePositionX += 0;
            roadBg.tilePositionX = 0;
				barrierBg.tilePositionX += 0.0;
            raceTrack.tilePositionX = 0;
        }
        
        
    }

    horseActions(horse) {

        var horseID = horse.texture.key.replace('geegee', '');

        var value = Phaser.Math.Between(0, 5);

        if (goTime) {

            horse.anims.pause();

            if (!horse.anims.isPlaying) {
                horse.anims.play('gallop' + horseID, true);            
            }

            if (value == 1 || value == 2 || value == 3) {
                horse.body.velocity.x += 1;
            } else {
                horse.body.velocity.x += -1;
            }

            horse.body.collideWorldBounds = true;


        } else if (!stopTime && !goTime) {
           
            horse.anims.play('trot' + horseID, true);
       
        }

    }

    
    jumpFence(item, fence) {
        
        var horseID = item.texture.key.replace('geegee', '');
        
        if(fenceHurdle && this.isFenceAlive) {
            item.body.checkCollision.none = true;
            item.anims.play('jump' + horseID);
            this.time.addEvent({ delay: 2000, callback: function() { item.body.checkCollision.none = false; }, callbackScope: this, loop: false });
        } 

        fenceHurdle = true;
    
    }


    // horses

    horseRunners() {

        horse = horseGroup.getChildren();
        
        for (var i = 0; i < horseQty; i++) {
            Phaser.Actions.ScaleXY(horseGroup.getChildren(), -0.001, -0.001, -0.003, -0.003);
            horse[i].depth += horse[i].y;
            //horse[i].setScale(scaleFactor, scaleFactor);
            horse[i].setX(Phaser.Math.Between(0, 200));
        }
        
    }

    // horses actions
    
    fastForward(item, startLine) {
        goTime = true;
        trotTime = false;
        if (!startLine.hasOverlapped && !item.hasOverlapped) {
            startLine.hasOverlapped = item.hasOverlapped = true;
            this.triggerFences();
        }
        
    }

    slowDown(item, finishLine) {
        
        var horseID = item.texture.key.replace('geegee', '');
        
        if(stopTime && this.isFinishAlive) {
            item.body.checkCollision.none = true;
            item.anims.play('canter' + horseID);
            this.time.addEvent({ delay: 2000, callback: function() { item.body.checkCollision.none = false; }, callbackScope: this, loop: false });
        } 

        stopTime = true;
        
    }

    // fences

    addOneFence() {
        
        fence = fenceGroup.create(windowWidth * 2, windowHeight - 190, 'fence');
        fence.setScale(0.5, 0.5);
        fence.setSize(300, 550).setOffset(80, 56);
        fence.body.velocity.x = -500;  
        fence.checkWorldBounds = true;
        fence.outOfBoundsKill = true;
        
        if (this.isFenceAlive) {
            fenceCollider = this.physics.add.overlap(fenceGroup, horse, this.jumpFence, null, this);
        }
        
        fenceCount++;
        if (fenceCount === fenceQty) {
            this.timedEvent.remove(false);
            this.triggerFinish();
        }

    }

    triggerFences() {

        this.timedEvent = this.time.addEvent({ delay: 8000, callback: this.addOneFence, callbackScope: this, loop: true });
        this.isFenceAlive = true;
    
    }

    // start/finish

    addStartLine() {

        startLine = this.physics.add.sprite(windowWidth * 2, windowHeight - 190, 'finish');
        startLine.setScale(0.5, 0.5);
        startLine.body.velocity.x = -800;  
        startLine.checkWorldBounds = true;
        startLine.outOfBoundsKill = true;

        this.physics.add.overlap(horseGroup, startLine, this.fastForward, null, this);

    }

    trotStartLine() {

        horse = horseGroup.getChildren();

        for (var i = 0; i < horseQty; i++) { 
    
            // horse animation speeds
            var fpsTrot = Phaser.Math.Between(8, 12);
        
            //  horse animations, gallop, trot and jump.
            this.anims.create({
                key: 'trot' + i,
                frames: this.anims.generateFrameNumbers('geegee' + i, { start: 26, end: 33 }),
                frameRate: fpsTrot,
                delay: delay,
                repeat: -1
            });

            var startPos = Phaser.Math.Between(475, 560);
            var startDur = Phaser.Math.Between(10000, 16000);
    
            var timeline = this.tweens.timeline({
    
                tweens: [{
                    targets: horse[i],
                    x: startPos,
                    duration: startDur,
                    ease: 'Sine.easeInOut',
                    delay: delay
                    }]
    
            });


        }
    }

    addFinishLine() {

        finishLine = this.physics.add.sprite(windowWidth * 2, windowHeight - 190, 'finish');
        finishLine.setScale(0.5, 0.5);
        finishLine.body.velocity.x = -400;  
        finishLine.checkWorldBounds = true;
        finishLine.outOfBoundsKill = true;

        if (this.isFinishAlive) {
            fenceCollider = this.physics.add.overlap(horse, finishLine, this.slowDown, null, this);
        }
        
    }

    triggerFinish() {
        this.timedEvent = this.time.addEvent({ delay: 14000, callback: this.addFinishLine, callbackScope: this, loop: false });
        this.isFinishAlive = true;
    }

    moveTrack() {
        trotTime = true;
    }


}
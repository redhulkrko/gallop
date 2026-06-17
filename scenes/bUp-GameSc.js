

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

var goTime = false;
var stopTime = false;

var delay = Phaser.Math.Between(750, 2250);
var delayStart = Phaser.Math.Between(14000, 26000);


// get the window sizes
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

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
        horseGroup = this.physics.add.group({ key: array, setXY: { x: 110, y: 350, stepY: -15 } });

        this.horseRunners();

        // trigger startline
        this.timedEvent = this.time.addEvent({ delay: delayStart, callback: this.addStartLine, callbackScope: this, loop: false });
        
        this.trotStartLine();

    }

    update() {

        horseGroup.children.each(this.horseActions, this);

        
        
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
            Phaser.Actions.ScaleXY(horseGroup.getChildren(), -0.001, -0.001, -0.006, -0.006);
            horse[i].depth += horse[i].y;
            horse[i].setX(Phaser.Math.Between(0, 200));
        }
        
    }

    // horses actions
    
    fastForward(item, startLine) {
        goTime = true;
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
            var fpsTrot = Phaser.Math.Between(8, 14);
        
            //  horse animations, gallop, trot and jump.
            this.anims.create({
                key: 'trot' + i,
                frames: this.anims.generateFrameNumbers('geegee' + i, { start: 26, end: 33 }),
                frameRate: fpsTrot,
                delay: delay,
                repeat: -1
            });

            var startPos = Phaser.Math.Between(475, 560);
            var startDur = Phaser.Math.Between(8000, 10000);
    
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


}
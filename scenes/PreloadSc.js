
// variables

//const config = {

  //type: Phaser.WEBGL,
  //width: 128,
  //height: 96,
  //parent: 'game',
  //backgroundColor: '#1b2632',
  //zoom: 5,
  //pixelArt: true,


//};

var animCreate = 0;

var currentGame1st = 100;
var currentGame2nd = 100;

var scupperGame1st = 0;
var scupperGame2nd = 0;

var isFirstRace = 1;

var fontA;
var fontB;
var fontC;
var fontD;
var fontE;



var playerHorses = [5,19,4,12,1,14,6,15]; //5,19,4,13,1
var playerPreviousPoints = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; 
var playerPoints = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; 
var playerBoosts = [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6]; 
var playerScuppers = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]; 

var playerNames = ['Matt','River','Willow','Madeline','Rich','Helen','Grandma','Ian']; //5,19,4,13,1
var horseNames = ['Captain Hungry',
'Billy Bollivard',
'Goodwill Bunting',
'Free for a Pound',
'High-Tide Fiasco',
'Midnight Raider',
'Killer Kitten',
'Lotus Prince',
'Arctic Stone',
'Indian Star',
'Fence Smasher',
'Desert Lightning',
'Mr McLucky',
'Bound to Lose',
'Steaming Brenda',
'Gammy Leg Lucy',
'One Horsepower',
'Dynamite Dan',
'That\'s No Horse',
'Leopard Girl']; //

// That\'s No Horse
// Mr McLucky
// Free for a Pound
// Bound to Lose

var tempRaceStarters;
var raceStarters = [];
var horseQty;





//sound variables
var sounds;
var audioGallopA;
var audioGallopB;
var audioFallGroup = [];
var audioCrowdCheerA;
var audioCrowdCheerB;
var audioBGCrowdA;
var audioBGCrowdB;
var audioSingleCheer;
var audioHorseJumpGroup = [];
var audioCommentaryA;
var audioCommentaryB;
var audioCommentaryC;
var audioStartersOrders;
var audioStartRaceFanfare;
var audioEndRaceScores;


function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    console.log('shuffled');
    return a;
}





class PreloadSc extends Phaser.Scene {
    
    constructor () {
        super({key: 'PreloadSc'});
    }
    
    preload() {

	
    	
    	
    	
    	this.time.advancedTiming = true;

//            var progressBar = this.add.graphics();
//            var progressBox = this.add.graphics();
//            progressBox.fillStyle(0x222222, 0.8);
//            progressBox.fillRect(width / 2, 270, 450, 50);
            
            
            var width = this.cameras.main.width;
            var height = this.cameras.main.height;
            var loadingText = this.make.text({
                x: width / 2,
                y: height / 2 - 50,
                text: 'Loading...',
                style: {
                    font: '20px monospace',
                    fill: '#ffffff'
                }
            });
            loadingText.setOrigin(0.5, 0.5);
            
            var percentText = this.make.text({
                x: width / 2,
                y: height / 2 - 5,
                text: '0%',
                style: {
                    font: '28px monospace',
                    fill: '#ffffff'
                }
            });
            percentText.setOrigin(0.5, 0.5);
            
            var assetText = this.make.text({
                x: width / 2,
                y: height / 2 + 50,
                text: '',
                style: {
                    font: '18px monospace',
                    fill: '#ffffff'
                }
            });
            assetText.setOrigin(0.5, 0.5);
            
            this.load.on('progress', function (value) {
                percentText.setText(parseInt(value * 100) + '%');
//                progressBar.clear();
//                progressBar.fillStyle(0xffffff, 1);
//                progressBar.fillRect(width / 2, 280, 300 * value, 30);
            });
            
            this.load.on('fileprogress', function (file) {
                assetText.setText('Loading asset: ' + file.key);
            });

            this.load.on('complete', function () {
//                progressBar.destroy();
//                progressBox.destroy();
                loadingText.destroy();
                percentText.destroy();
                assetText.destroy();
            });
            
             
            this.load.image('shadow', 'assets/lowres/shadows.png'); 
            this.load.spritesheet('starter', 'assets/lowres/starter-sprite-lowres.png', { frameWidth: (84), frameHeight: (106) });
				this.load.spritesheet('ambulance', 'assets/lowres/ambulanceSprite.png', { frameWidth: (162), frameHeight: (92) });
             this.load.spritesheet('camtruck', 'assets/lowres/camtruckSprite.png', { frameWidth: (195), frameHeight: (105) });
                
            
                		
        		
        		
            for (var i = 0; i < 20; i++) {
            	// orig frame size was 368 x 300
            	// med frame size is 245 x 200
                this.load.spritesheet('geegee' + i, 'assets/medres/horse-' + i + '.png', { frameWidth: (245), frameHeight: (200) });
				
            }

            this.load.image('fence', 'assets/lowres/jumpfence1.png'); 
            this.load.image('track', 'assets/lowres/grasstrack1.png');
            this.load.image('finish', 'assets/compressed/finishline.png');
            this.load.image('finishMarker', 'assets/lowres/finishmarker.png');
            this.load.image('finishPost', 'assets/lowres/finishpost.png');
            this.load.image('start', 'assets/startline.png');
            
            
            this.load.image('photoFinishpic', 'assets/photofinish.png');
            this.load.image('finishPic', 'assets/finishGraphic.png');
            this.load.image('first', 'assets/first.png'); 
            this.load.image('second', 'assets/second.png'); 
            this.load.image('third', 'assets/third.png'); 
            this.load.image('arrow', 'assets/arrow.png');
            this.load.image('rectangle1', 'assets/rectangle1.png');
            this.load.image('rectangle2', 'assets/rectangle2.png');
            

            // backgrounds go here

            this.load.image('sky', 'assets/lowres/sky2.png');
            this.load.image('distantBg', 'assets/lowres/distantbg1.png');
            this.load.image('fartreesBg', 'assets/lowres/fartrees1.png');
            this.load.image('farmidtreesBg', 'assets/lowres/farmidtrees1.png');
            this.load.image('midtreesBg', 'assets/lowres/midtrees1.png');
            this.load.image('stonewallBg', 'assets/lowres/stonewallbg.png');
            this.load.image('road', 'assets/lowres/graveltrack1.png');
            this.load.image('barrier', 'assets/lowres/barriers.png');
            this.load.image('barrier2', 'assets/lowres/barriersnear.png');
            this.load.image('adhoard1', 'assets/lowres/adhoard1.png');
            this.load.image('adhoard2', 'assets/lowres/adhoard2.png');
            this.load.image('adhoard3', 'assets/lowres/adhoard3.png');
            this.load.image('adhoard4', 'assets/lowres/adhoard4.png');
            this.load.image('trackSpectator1', 'assets/lowres/trackSpectator1.png');
            this.load.image('trackSpectator2', 'assets/lowres/trackSpectator2.png');
            this.load.image('trackSpectator3', 'assets/lowres/trackSpectator3.png');
            this.load.image('trackSpectator4', 'assets/lowres/trackSpectator4.png');
            
            this.load.image('stadiumA', 'assets/lowres/stadiumSpriteA.png');
            this.load.image('stadiumB', 'assets/lowres/stadiumSpriteB.png');
            this.load.image('stadiumC', 'assets/lowres/stadiumSpriteC.png');
            this.load.image('stadiumTransitionA', 'assets/lowres/stadiumTransitionA.png');
            this.load.image('stadiumTransitionB', 'assets/lowres/stadiumTransitionB.png');
            this.load.image('stadiumTransitionC', 'assets/lowres/stadiumTransitionC.png');
            this.load.image('peopleLine', 'assets/lowres/peopleLineSprite.png');
            
            // sounds go here
            
            this.load.audio('audioGallopA', 'assets/audio/horseLoop3lowres.mp3');
            this.load.audio('audioGallopB', 'assets/audio/horseLoop3lowres.mp3');
            this.load.audio('audioCrowdCheerA', 'assets/audio/CrowdCheeringSound.mp3');
            this.load.audio('audioCrowdCheerB', 'assets/audio/CrowdCheeringSound.mp3');
            this.load.audio('audioSingleCheer', 'assets/audio/SingleCheer.mp3');
            this.load.audio('audioBGCrowdA', 'assets/audio/BGCrowd.mp3');
            this.load.audio('audioBGCrowdB', 'assets/audio/BGCrowd.mp3');
            this.load.audio('audioHorseJump', 'assets/audio/HorseJumpSound.mp3');
            this.load.audio('audioHorseJump2', 'assets/audio/HorseJumpSound2.mp3');
            this.load.audio('audioHorseJump3', 'assets/audio/HorseJumpSound3.mp3');
            this.load.audio('audioFall1', 'assets/audio/Fall3.mp3');
            this.load.audio('audioFall2', 'assets/audio/Fall4.mp3');
            this.load.audio('audioStartersOrders', 'assets/audio/startersorders.mp3');
            this.load.audio('audioCommentaryA', 'assets/audio/commentary-Aa.mp3');
            this.load.audio('audioCommentaryB', 'assets/audio/commentary-Bf.mp3');
            this.load.audio('audioCommentaryC', 'assets/audio/commentary-Ce.mp3');
            this.load.audio('audioStartRaceFanfare', 'assets/audio/race-start-fanfare.mp3');
            this.load.audio('audioEndRaceScores', 'assets/audio/end-of-race2.mp3');
            

    }
    
    create() {
    	
    	
tempRaceStarters = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];    	
raceStarters = [];


for(var h = 0; h < playerHorses.length; h++){
for( var i = 0; i < tempRaceStarters.length; i++){ 
   if ( tempRaceStarters[i] === playerHorses[h]) {
     tempRaceStarters.splice(i, 1); 
   }
}
}



/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */




shuffle(tempRaceStarters);

for(var h = 0; h < playerHorses.length; h++){
tempRaceStarters.unshift(playerHorses[h]); 
}


horseQty = Phaser.Math.Between(8,20);
if (horseQty < playerHorses.length) { horseQty = playerHorses.length;}
console.log(horseQty+' starters');
for(var i = 0; i < horseQty; i++){
	raceStarters.push(tempRaceStarters[i]);
}        	
    	
    	
    	
    	
    	
    	
    	//sounds
    	audioGallopA = this.sound.add('audioGallopA',{loop:true});
    	audioGallopB = this.sound.add('audioGallopB',{loop:true});
    	audioCrowdCheerA = this.sound.add('audioCrowdCheerA',{loop:true});
    	audioCrowdCheerB = this.sound.add('audioCrowdCheerB',{loop:true});
    	audioSingleCheer = this.sound.add('audioSingleCheer',{loop:false});
    	audioBGCrowdA = this.sound.add('audioBGCrowdA',{loop:true});
    	audioBGCrowdB = this.sound.add('audioBGCrowdB',{loop:true});
    	audioStartersOrders = this.sound.add('audioStartersOrders',{loop:false});
    	audioCommentaryA = this.sound.add('audioCommentaryA',{loop:false});
    	audioCommentaryB = this.sound.add('audioCommentaryB',{loop:true});
    	audioCommentaryC = this.sound.add('audioCommentaryC',{loop:false});
    	audioStartRaceFanfare = this.sound.add('audioStartRaceFanfare',{loop:false});
    	audioEndRaceScores = this.sound.add('audioEndRaceScores',{loop:true});
    	
    	  
        for (var i = 0; i < 20; i++) {
        	if(i < 7){audioHorseJumpGroup[i] = this.sound.add('audioHorseJump',{loop:false, volume:0.3});}
        	if(i > 6 && i < 14){audioHorseJumpGroup[i] = this.sound.add('audioHorseJump2',{loop:false, volume:0.3});}
         if(i > 13){audioHorseJumpGroup[i] = this.sound.add('audioHorseJump3',{loop:false, volume:0.3});}   
        }
        
                for (var i = 0; i < 20; i++) {
        	if(i < 10){audioFallGroup[i] = this.sound.add('audioFall1',{loop:false, volume:0.3});}
         if(i > 9){audioFallGroup[i] = this.sound.add('audioFall2',{loop:false, volume:0.3});}   
        }
    	
    	
    	   //gallopSound = [ audioGallop ];

    		//  Being mp3 files these take time to decode, so we can't play them instantly
    		//  Using setDecodedCallback we can be notified when they're ALL ready for use.
    		//  The audio files could decode in ANY order, we can never be sure which it'll be.

    		//this.sound.setDecodedCallback(sounds, this.startGameScene, this); 
    		
    		
  //only needs to do this at the start of the game.  		
  if(animCreate == 0 ){
    	
    	animCreate = 1;
    	
		// starter pre animation
        this.anims.create({
            key: 'starterPre',
            frames: this.anims.generateFrameNumbers('starter', { frames: [0,1] }),
            frameRate: 8,
            repeat: -1
        });  
        
        // starter pre animation
        this.anims.create({
            key: 'starterPost',
            frames: this.anims.generateFrameNumbers('starter', { frames: [2,3,4,5] }),
            frameRate: 12,
            //repeat: 0
        });  	
        
        
                // ambulance
        this.anims.create({
            key: 'ambulanceGo',
            frames: this.anims.generateFrameNumbers('ambulance', { frames: [0,1] }),
            frameRate: 18,
            repeat: -1
        });  
        
                        // camtrck
        this.anims.create({
            key: 'camtruckGo',
            frames: this.anims.generateFrameNumbers('camtruck', { frames: [0,1] }),
            frameRate: 18,
            repeat: -1
        });  
    	
    	
    	
 	
    	
    	
    	
        
        for (var i = 0; i < 20; i++) {

        var fpsGallop = Phaser.Math.Between(16,20);

        // gallop animation
        this.anims.create({
            key: 'firstFurlong' + i,
            frames: this.anims.generateFrameNumbers('geegee' + i, { frames: [2,3,4,5,6,7,8,9,10,0,1] }),
            frameRate: fpsGallop,
            repeat: -1
        });
            
        }
        
        
        
        
        for (var i = 0; i < 20; i++) {

        var fpsGallop = Phaser.Math.Between(19,23);

        // gallop animation
        this.anims.create({
            key: 'gallop' + i,
            frames: this.anims.generateFrameNumbers('geegee' + i, { frames: [2,3,4,5,6,7,8,9,10,0,1] }),
            frameRate: fpsGallop,
            repeat: -1
        });
            
        }
        
        
        
        
        for (var i = 0; i < 20; i++) {

        var fpsGallop = Phaser.Math.Between(16,18);

        // gallop animation
        this.anims.create({
            key: 'gallopBegin' + i,
            frames: this.anims.generateFrameNumbers('geegee' + i, { frames: [2,3,4,5,6,7,8,9,10,0,1] }),
            frameRate: fpsGallop,
            repeat: 6
        });
            
        }
        
        
        
        
        for (var i = 0; i < 20; i++) {

        var fpsGallop = Phaser.Math.Between(16,19);

        // gallop animation
        this.anims.create({
            key: 'retire' + i,
            frames: this.anims.generateFrameNumbers('geegee' + i, { frames: [2,3,4,5,6,7,8,9,10,0,1] }),
            frameRate: fpsGallop,
            repeat: -1
        });
            
        }
        
        
        
        for (var i = 0; i < 20; i++) {

        var fpsGallop = Phaser.Math.Between(22, 30);

        // gallop animation
        this.anims.create({
            key: 'lastFurlong' + i,
            frames: this.anims.generateFrameNumbers('geegee' + i, { frames: [2,3,4,5,6,7,8,9,10,0,1] }),
            frameRate: fpsGallop,
            repeat: -1
        });
            
        }        
        
        
        
        
        for (var i = 0; i < 20; i++) {

        var fpsBetween = 13;

        // between animation
        this.anims.create({
            key: 'betweenEnd' + i,
            frames: this.anims.generateFrameNumbers('geegee' + i, { frames: [2,25] }),
            frameRate: fpsBetween,
            //repeat: -1
        });
            
        }       
        
        
        
                for (var i = 0; i < 20; i++) {

        var fpsBetween = 17;

        // between animation
        this.anims.create({
            key: 'betweenStart' + i,
            frames: this.anims.generateFrameNumbers('geegee' + i, { frames: [25, 9] }),
            frameRate: fpsBetween,
            //repeat: -1
        });
            
        }    
        
        
        
        for (var i = 0; i < 20; i++) {
        
        var fpsJump = Phaser.Math.Between(12, 16);

        // jump animation
        this.anims.create({
            key: 'jump' + i,
            frames: this.anims.generateFrameNumbers('geegee' + i, { frames: [4, 11, 12, 13, 14, 15, 16, 17, 18, 1] }),
            frameRate: fpsJump
        });
            
        }
        
        
        
        
        for (var i = 0; i < 20; i++) {
        
        var fpsFall = Phaser.Math.Between(8,12);

        // fall animation
        this.anims.create({
            key: 'fall' + i,
            frames: this.anims.generateFrameNumbers('geegee' + i, { frames: [20,21,22,21,21,21,21,21,21,21,21,21,21,21,,22,22,23,23,24,24,25,25,26] }),
            frameRate: fpsFall,
            repeat: 0
        });
            
        }
        

for (var i = 0; i < 20; i++) {
        
        var fpsJump = 1;

        // finishline animation
        this.anims.create({
            key: 'finish' + i,
            frames: this.anims.generateFrameNumbers('geegee' + i, { frames: [25] }),
            frameRate: fpsJump
        });
            
        }        
        
        

        for (var i = 0; i < 20; i++) {

        var fpsCanter = Phaser.Math.Between(11, 14);
    
        // gallop animation
        this.anims.create({
            key: 'canter' + i,
            frames: this.anims.generateFrameNumbers('geegee' + i, { start: 26, end: 33 }),
            frameRate: fpsCanter,
            repeat: -1
        });
                
        }
        
        
        
        for (var i = 0; i < 20; i++) {

        var fpsCanter = Phaser.Math.Between(12, 16);
    
        // gallop animation
        this.anims.create({
            key: 'canterfast' + i,
            frames: this.anims.generateFrameNumbers('geegee' + i, { start: 26, end: 33 }),
            frameRate: fpsCanter,
            repeat: -1
        });
             
                
        }
        

		for (var i = 0; i < 20; i++) { 
    
            // horse animation speeds
            var fpsTrot = Phaser.Math.Between(8, 12);
        
            //  horse animations, gallop, trot and jump.
            this.anims.create({
                key: 'trot' + i,
                frames: this.anims.generateFrameNumbers('geegee' + i, { start: 26, end: 33 }),
                frameRate: fpsTrot,
                //delay: delay,
                repeat: -1
            });     
            
         }   
        
        
     }
        
        this.scene.start('GameSc');

    }
    


}
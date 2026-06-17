//import rexSoundFade from './plugins/soundfade.js';
//var soundFadeIn = rexSoundFade.fadeIn;
//var soundFadeOut = rexSoundFade.fadeOut

//const fadeIn = soundFade.fadeIn;
//const fadeOut = soundFade.fadeOut;

// variables

var fenceGroup;
var photoGroup;
var finishGraphicGroup;
var fenceQty;
var upperDrift;
var lowerDrift;
var upperDriftAmount;
var lowerDriftAmount;
var fenceCount;
var fence;
var photo;
var fenceHurdle;
var fenceCollider;
var defaultY;
var liveFence;
var deltaTimea;
var deltaTimeb;
var deltaTime;
var deltaAIrate; // how much time has passed compared to the expected last update (should always be around 1))
var AIperSec; // how many calculations per second for horse actions etc
var trotSpeed;
var goSpeed;
var horsesLeft;
var arrowFlag;

var firstFurlongSpeed;
var midRaceSpeed;
var lastFurlongSpeed;
var initialSpeed;
var finalStraightDuration;
var leaderPosition;
var secondPosition;
var leaderID;
var horseList;
var resultsRect;
var resultsTextPlyr;
var resultsTextHorse;
var resultsTextPos;
var resultsTextPts;

var reducedResultsRect;
var reducedResultsTextPlyr;
var reducedResultsTextHorse;
var reducedResultsTextPos;
var reducedResultsTextPts;

var playerResultsPos;
var playerResultsPts;
var rectangle1;
var resultsTitleText;
var resultsTitleRect;

var starter;
var flagdown;
var horseActs;
var horseX;
var horseY; 
var horseState; 

// 0 = not yet started; 
// 1 = transition at start; 
// 2 = finished but not in top 3 (or 4); 
// 3 = fallen but on screen; 
// 4 = fallen and off screen;
// 5 = in top3 (or 4);
// 6 = pulled muscle;
// 7 = sprite has been destroyed;
// 8 = second wind;
// 9 = retires;
// 10 = Did Not Finish

var prizeMoney;
var vehicle;
var nextVehicle;
var finishers;
var places;
var timeDifference;
var fourthFinish;
var photoFinish;
var showIcon;
var driftFlag;

var jumpCount;

var horseGroup;
var horse;
    //playerHorses[x] = the image-number of the horse e.g. 17
    //horseList[17] = the number that horse 17 has in the horsegroup array - e.g. 4
    //horsegroup (or horse[i]) = a list of horse-sprites that start the race - e.g. 8 items

var startLine;
var finishLine;
var finishMarker;
var finishPost;
var finishPostBig;
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
var barrier2Bg;
var finishMarkerFlag;

var stadiumA;
var stadiumB;
var stadiumC;
var stadiumTransitionA;
var stadiumTransitionB;
var stadiumTransitionC;
var peopleLine;
var scrollStadiumA;
var scrollStadiumB;
var scrollStadiumC;
var scrollPeopleLine;

var startGrad;
var preGrad;

var photoIcon;
var finishIcon;
var firstIcon;
var secondIcon;
var thirdIcon;
var arrowIconA;
var arrowIconB;
var fenceDelay;

var horseWatch;
var horseWatchStamp;
var leaderWatch;
//var lastLeader = 100;
var leaderTick;




var goTime; // main race segment
var stopTime; // when first horse crosses line
var trotTime; // pre-race amble up to start line
var finishTime;
var startTime; // first moments of race - transition segment
var lineTime; // camera slows down 2 sec after first horse crosses line
var lastFurlong;
var firstFurlong;
var midRace;
var speedUp1;
var speedUp2;

var delay;
var delayStart;
var ticker;
var tickerMax;


// get the window sizes
var windowWidth;
var windowHeight;

//MATT-insert
var hdHeight; //1080  //216
var hdWidth; //1920 //384

var scaleFactor;

var midHeight;
var midWidth;




var crowdCheerVolume;
var crowdCheerFlag;
var masterVolume;
var BGCrowdVolume;
var BGCrowdFlag;
var audioGallopVolume;
var audioJumpVolume;
var audioFallVolume;
var audioCommentaryVolume;
var ComCFlag;
var arrowHorseText;    	
    	






//var soundFadeIn = this.get('rexSoundFade').fadeIn;
//var soundFadeOut = this.get('rexSoundFade').fadeOut;

//game.time.desiredFps = 30;
//MATT-end

class GameSc extends Phaser.Scene {


   constructor () {
        super({key: 'GameSc'});
    }

    preload() {

    }
    
  
    
    create() {
    	




fenceQty = Math.round(3.1 + (horseQty/2));
//fenceQty = 4;
//leadHandicap = Phaser.Math.Between(1,8)/10;
//packHandicap = 0-((leadHandicap/2)-0.1);
upperDrift = 600+(Phaser.Math.Between(1,80)*10);
lowerDrift = 1200-(Phaser.Math.Between(1,80)*10);
upperDriftAmount = (Phaser.Math.Between(1,60)/10);
lowerDriftAmount = 0-(Phaser.Math.Between(1,60)/10);
fenceCount = 0;

fenceHurdle = false;
defaultY = 840;

deltaAIrate; // how much time has passed compared to the expected last update (should always be around 1))
AIperSec = 30; // how many calculations per second for horse actions etc
trotSpeed = 1.5;
horsesLeft = horseQty;
arrowFlag = true;

firstFurlongSpeed = 1.2;
midRaceSpeed = 1.4;
lastFurlongSpeed = 1.6;
initialSpeed = 0.9;
finalStraightDuration = 14000;
leaderPosition = 0;
secondPosition = 0;
leaderID = 100;
horseList = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    //playerHorses[x] = the image-number of the horse e.g. 17
    //horseList[17] = the number that horse 17 has in the horsegroup array - e.g. 4
    //horsegroup (or horse[i]) = a list of horse-sprites that start the race - e.g. 8 items
resultsRect = [];
resultsTextPlyr = [];
resultsTextHorse = [];
resultsTextPos = [];
resultsTextPts = [];

reducedResultsRect = [];
reducedResultsTextPlyr = [];
reducedResultsTextHorse = [];
reducedResultsTextPos = [];
reducedResultsTextPts = [];

playerResultsPos = [];
playerResultsPts = [];



flagdown = 0;

horseX = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
horseY = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; 
horseState = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; 
prizeMoney = [];
// 0 = not yet started; 
// 1 = transition at start; 
// 2 = finished but not in top 3 (or 4); 
// 3 = fallen but on screen; 
// 4 = fallen and off screen;
// 5 = in top3 (or 4);
// 6 = pulled muscle;
// 7 = sprite has been destroyed;
// 8 = second wind;
// 9 = retires;
// 10 = Did Not Finish



nextVehicle = 'ambulance';
finishers = 0;
places = [];

fourthFinish = false;
photoFinish = false;
showIcon = true;
driftFlag = true;

jumpCount = 0;


// background variables


finishMarkerFlag = 0;


scrollStadiumA = false;
scrollStadiumB = false;
scrollStadiumC = false;
scrollPeopleLine = false;

startGrad = 0.2;
preGrad = 0.001;


fenceDelay = 0;

horseWatch = 0;
horseWatchStamp = 0;
leaderWatch = false;
//lastLeader = 100;
leaderTick = 1;




goTime = false; // main race segment
stopTime = false; // when first horse crosses line
trotTime = false; // pre-race amble up to start line
finishTime = false;
startTime = false; // first moments of race - transition segment
lineTime = false; // camera slows down 2 sec after first horse crosses line
lastFurlong = false;
firstFurlong = false;
midRace = false;
speedUp1 = false;
speedUp2 = false;

delay = 1500;
delayStart = 20000;
ticker = 0;
tickerMax = 20;


// get the window sizes
windowWidth = window.innerWidth;
windowHeight = window.innerHeight;

//MATT-insert
hdHeight = 1080; //1080  //216
hdWidth = 1920; //1920 //384

scaleFactor = (windowHeight / hdHeight);

midHeight = windowHeight / 2;
midWidth = windowWidth / 2;

crowdCheerFlag = 0;
masterVolume = 1.5;
BGCrowdVolume = 0.00001;
BGCrowdFlag = 0;
audioGallopVolume = 0.5;
audioJumpVolume = 0.5;
audioFallVolume = 0.2
audioCommentaryVolume = 0.3;
ComCFlag = 0;
 	
    	
    	
    	
    	
			deltaTimea = this.time.now;
        ///// horse elements
        var horseArray = [];
        for (var i = 0; i < horseQty; i++) {
            horseArray.push('geegee' + raceStarters[i]);
            horseList[raceStarters[i]] = i;
            //playerHorses[x] = the image-number of the horse e.g. 17
    			//horseList[17] = the number that horse 17 has in the horsegroup array - e.g. 4
    			//horsegroup (or horse[i]) = a list of horse-sprites that start the race - e.g. 8 items
    			console.log(horseArray[i]);
        }

        fenceGroup = this.physics.add.group();
        photoGroup = this.physics.add.group();
        finishGraphicGroup = this.physics.add.group();
        horseGroup = this.physics.add.group({ key: horseArray, setXY: { x: 110, y: (650*scaleFactor), stepY: -15 } });
        starter = this.physics.add.sprite(106, 84, 'starter');
        
        
        
       resultsTitleRect = this.add.image(windowWidth/2, (200*scaleFactor), 'rectangle2');
       resultsTitleRect.setPosition(-2000,(130*scaleFactor));
       resultsTitleRect.setScale(windowWidth/2, 95*scaleFactor);
       resultsTitleRect.depth += windowHeight*2;             	  

        resultsTitleText = this.make.text({
                x: windowWidth / 2,
                y: windowHeight / 2 - 50,
                text: 'Race Results',
                style: {
                    font: '40px monospace',
                    fill: '#3333ff',
                    align: "left",
                    fontStyle: 'bold'
                }
            });
         resultsTitleText.setOrigin(0, 0.5);
         resultsTitleText.setPosition(-2000,(90*scaleFactor));
         resultsTitleText.depth += windowHeight*2;
         
      
        
        // create graphics for full results list
         for (var i = 0; i < horseQty; i++) {
         	
         resultsRect[i] = this.add.image(windowWidth/2, (200*scaleFactor), 'rectangle1');

         
  
       	
       	resultsRect[i].setPosition(-2000,(230*scaleFactor));
       	resultsRect[i].setScale(windowWidth/2, 75*scaleFactor);
       	resultsRect[i].depth += windowHeight*2;
       	
       	
       	resultsTextPos[i] = this.make.text({
                x: windowWidth / 2,
                y: windowHeight / 2 - 50,
                text: 'Position',
                style: {
                    font: '20px monospace',
                    fill: '#ffffff',
                    align: "left"
                }
            });
         resultsTextPos[i].setOrigin(0, 0.5);
         resultsTextPos[i].setPosition(-2000,(200*scaleFactor));
         resultsTextPos[i].depth += windowHeight*2;
         
         
         
       	resultsTextPlyr[i] = this.make.text({
                x: windowWidth / 2,
                y: windowHeight / 2 - 50,
                text: '',
                style: {
                    font: '20px monospace',
                    fill: '#ffff00',
                    align: "left",
                    fontStyle: 'bold'
                }
            });
         resultsTextPlyr[i].setOrigin(0, 0.5);
         resultsTextPlyr[i].setPosition(-2000,(200*scaleFactor));
         resultsTextPlyr[i].depth += windowHeight*2;
         
         
       	resultsTextHorse[i] = this.make.text({
                x: windowWidth / 2,
                y: windowHeight / 2 - 50,
                text: '',
                style: {
                    font: '20px monospace',
                    fill: '#ffffff',
                    align: "left"
                }
            });
         resultsTextHorse[i].setOrigin(0, 0.5);
         resultsTextHorse[i].setPosition(-2000,(200*scaleFactor)); 
         resultsTextHorse[i].depth += windowHeight*2; 
         
         
       	resultsTextPts[i] = this.make.text({
                x: windowWidth / 2,
                y: windowHeight / 2 - 50,
                text: '',
                style: {
                    font: '20px monospace',
                    fill: '#ffff00',
                    align: "left"
                }
            });
         resultsTextPts[i].setOrigin(0, 0.5);
         resultsTextPts[i].setPosition(-2000,(200*scaleFactor)); 
         resultsTextPts[i].depth += windowHeight*2;      
         
         	
         	if (i == 0) {
         	prizeMoney[i] = horseQty * 20000;	
         	}
         	else if (i == 1) {
         	prizeMoney[i] = horseQty * 10000;	
         	}
         	else if (i == 2) {
         	prizeMoney[i] = horseQty * 5000;	
         	}
         	else {
         	prizeMoney[i] = Math.round((horseQty  - (i - 3)) * (2500/((i+1)/4)));
         	}
            console.log('Place '+(i+1)+' prize money: £'+prizeMoney[i]);
        } 





		// create graphics for reduced Results List
		for (var i = 0; i < playerNames.length; i++) {
         	
         reducedResultsRect[i] = this.add.image(windowWidth/2, (200*scaleFactor), 'rectangle1');
         
  
       	
       	reducedResultsRect[i].setPosition(-2000,(230*scaleFactor));
       	reducedResultsRect[i].setScale(windowWidth/2, 75*scaleFactor);
       	reducedResultsRect[i].depth += windowHeight*2;
       	
       	
       	reducedResultsTextPos[i] = this.make.text({
                x: windowWidth / 2,
                y: windowHeight / 2 - 50,
                text: 'Position',
                style: {
                    font: '20px monospace',
                    fill: '#ffffff',
                    align: "left"
                }
            });
         reducedResultsTextPos[i].setOrigin(0, 0.5);
         reducedResultsTextPos[i].setPosition(-2000,(200*scaleFactor));
         reducedResultsTextPos[i].depth += windowHeight*2;
         
         
         
         
       	reducedResultsTextPlyr[i] = this.make.text({
                x: windowWidth / 2,
                y: windowHeight / 2 - 50,
                text: '',
                style: {
                    font: '20px monospace',
                    fill: '#ffff00',
                    align: "left",
                    fontStyle: 'bold'
                }
            });
         reducedResultsTextPlyr[i].setOrigin(0, 0.5);
         reducedResultsTextPlyr[i].setPosition(-2000,(200*scaleFactor));
         reducedResultsTextPlyr[i].depth += windowHeight*2;
         
         
       	reducedResultsTextHorse[i] = this.make.text({
                x: windowWidth / 2,
                y: windowHeight / 2 - 50,
                text: '',
                style: {
                    font: '20px monospace',
                    fill: '#ffffff',
                    align: "left"
                }
            });
         reducedResultsTextHorse[i].setOrigin(0, 0.5);
         reducedResultsTextHorse[i].setPosition(-2000,(200*scaleFactor)); 
         reducedResultsTextHorse[i].depth += windowHeight*2; 
         
         
       	reducedResultsTextPts[i] = this.make.text({
                x: windowWidth / 2,
                y: windowHeight / 2 - 50,
                text: '',
                style: {
                    font: '20px monospace',
                    fill: '#ffff00',
                    align: "left"
                }
            });
         reducedResultsTextPts[i].setOrigin(0, 0.5);
         reducedResultsTextPts[i].setPosition(-2000,(200*scaleFactor)); 
         reducedResultsTextPts[i].depth += windowHeight*2;      
         
         	
        } 





      
       
        
        arrowHorseText = this.make.text({
                x: windowWidth / 2,
                y: windowHeight / 2 - 50,
                text: 'Horse Name',
                style: {
                    font: '20px monospace',
                    fill: '#ffff00'
                }
            });
            arrowHorseText.setOrigin(0.5, 0.5);
            arrowHorseText.setPosition(-2000,(200*scaleFactor));

       
        
        
        
        //horseGroup.children.each(function(horse){horse.anchor.setTo(1, 0.5);}	, this);
    	 //horseGroup.children.setAll('anchor.x', 1);
    	 
    	 
    	 
        
		  
        // backgrounds are called in here as tileSprites, which make them repeat/tile 

        // properties are (xPos, yPos, imageWidth, imageHeight)

        
        skyBg = this.add.tileSprite(0, 0, windowWidth/(scaleFactor*5), 100, 'sky');
        distantBg = this.add.tileSprite(0,0, windowWidth/(scaleFactor*5), 70, 'distantBg');
        fartreesBg = this.add.tileSprite(0,0, windowWidth/(scaleFactor*5), 70, 'fartreesBg');
        farmidtreesBg = this.add.tileSprite(0,0, windowWidth/(scaleFactor*5), 100, 'farmidtreesBg');
        midtreesBg = this.add.tileSprite(0,0, windowWidth/(scaleFactor*5), 100, 'midtreesBg');
        stonewallBg = this.add.tileSprite(0,0, windowWidth/(scaleFactor*5), 100, 'stonewallBg');
        roadBg = this.add.tileSprite(0,0, windowWidth/(scaleFactor*5), 110, 'road');
		  
		stadiumA = this.add.tileSprite(windowWidth+(100* scaleFactor*5),0, windowWidth/(scaleFactor*5), 100, 'stadiumA');  
		//stadiumTransitionA = this.physics.add.sprite(windowWidth, 0, 'stadiumTransitionA');      
        stadiumB = this.add.tileSprite(windowWidth+(500* scaleFactor*5),0, windowWidth/(scaleFactor*5), 100, 'stadiumB');
        stadiumTransitionB = this.physics.add.sprite(windowWidth, 0, 'stadiumTransitionB');
        stadiumC = this.add.tileSprite(windowWidth+(500* scaleFactor*5),0, windowWidth/(scaleFactor*5), 100, 'stadiumC');
		stadiumTransitionC = this.physics.add.sprite(windowWidth, 0, 'stadiumTransitionC');
		

                
        //finishMarker = this.physics.add.sprite(windowWidth * 1.1, 0, 'finishMarker');
        
        peopleLine = this.add.tileSprite(windowWidth,0, windowWidth/(scaleFactor*5), 100, 'peopleLine');
			
        
        
		barrierBg = this.add.tileSprite(0,0, windowWidth/(scaleFactor*5), 110, 'barrier');
        raceTrack = this.add.tileSprite(0,0, windowWidth/(scaleFactor*5), 300, 'track');
        barrier2Bg = this.add.tileSprite(0,-15*scaleFactor, windowWidth/(scaleFactor*5), 226, 'barrier2');
        
        
        distantBg.setScale(scaleFactor*5, scaleFactor*5);
        fartreesBg.setScale(scaleFactor*5, scaleFactor*5);
        farmidtreesBg.setScale(scaleFactor*5, scaleFactor*5);  
        midtreesBg.setScale(scaleFactor*5, scaleFactor*5); 
        stonewallBg.setScale(scaleFactor*5, scaleFactor*5);
        roadBg.setScale(scaleFactor*5, scaleFactor*5); 
        barrierBg.setScale(scaleFactor*5, scaleFactor*5);
        raceTrack.setScale(scaleFactor*5, scaleFactor*5);    
        skyBg.setScale(scaleFactor*5, scaleFactor*5);
        barrier2Bg.setScale(scaleFactor*5, scaleFactor*5); 
        
        stadiumA.setScale(scaleFactor*5, scaleFactor*5); 
        stadiumB.setScale(scaleFactor*5, scaleFactor*5); 
        stadiumC.setScale(scaleFactor*5, scaleFactor*5); 
        //stadiumTransitionA.setScale(scaleFactor*5, scaleFactor*5); 
        stadiumTransitionB.setScale(scaleFactor*5, scaleFactor*5); 
        stadiumTransitionC.setScale(scaleFactor*5, scaleFactor*5);
        peopleLine.setScale(scaleFactor*5, scaleFactor*5);


        this.timedEvent = this.time.addEvent({ delay: 500, callback: function(){stadiumA.tilePositionX += 1042;}, callbackScope: this, loop: true });
        this.timedEvent = this.time.addEvent({ delay: 500, callback: function(){stadiumB.tilePositionX += 1042;}, callbackScope: this, loop: true });
        this.timedEvent = this.time.addEvent({ delay: 500, callback: function(){stadiumC.tilePositionX += 1042;}, callbackScope: this, loop: true });
        this.timedEvent = this.time.addEvent({ delay: 500, callback: function(){peopleLine.tilePositionX += 463;}, callbackScope: this, loop: true });
        

         
        distantBg.setOrigin(0,0);  
        fartreesBg.setOrigin(0,0);
        farmidtreesBg.setOrigin(0,0);  
        midtreesBg.setOrigin(0,0); 
        stonewallBg.setOrigin(0,0);
        roadBg.setOrigin(0,0); 
        barrierBg.setOrigin(0,0);
        barrier2Bg.setOrigin(0,0);
        raceTrack.setOrigin(0,0);  
        skyBg.setOrigin(0,0);  
        stadiumA.setOrigin(0,0); 
        stadiumB.setOrigin(0,0); 
        stadiumC.setOrigin(0,0); 
        //stadiumTransitionA.setOrigin(0,0); 
        stadiumTransitionB.setOrigin(0,0); 
        stadiumTransitionC.setOrigin(0,0); 
        peopleLine.setOrigin(0,0); 
        
        //this.physics.add.existing(raceTrack);
        barrierBg.depth = 2;
        barrier2Bg.depth += windowHeight;




    

	//firstIcon = this.add.image(125*scaleFactor, 125*scaleFactor, 'first').setVisible(false);
	     firstIcon = this.physics.add.sprite(125*scaleFactor, 125*scaleFactor, 'first').setVisible(false);
        firstIcon.setScale(scaleFactor, scaleFactor);
	     secondIcon = this.physics.add.sprite(125*scaleFactor, 125*scaleFactor, 'second').setVisible(false);
        secondIcon.setScale(scaleFactor, scaleFactor);
        thirdIcon = this.physics.add.sprite(125*scaleFactor, 125*scaleFactor, 'third').setVisible(false);
        thirdIcon.setScale(scaleFactor, scaleFactor);
        arrowIconA = this.physics.add.sprite(30*scaleFactor, 40*scaleFactor, 'arrow');
        arrowIconA.setScale(scaleFactor, scaleFactor);
        arrowIconB = this.physics.add.sprite(30*scaleFactor, 40*scaleFactor, 'arrow');
        arrowIconB.setScale(scaleFactor, scaleFactor);
        
        firstIcon.setPosition(-2000,0);
        arrowIconA.setPosition(-2000,0);
        arrowIconB.setPosition(-2000,(285*scaleFactor));
        arrowIconA.depth = 10000;
        arrowHorseText.depth = 10000;
        arrowIconB.depth = 10000;
        secondIcon.setPosition(-2000,0);
        thirdIcon.setPosition(-2000,0);
	 

    photoIcon = this.add.image(640*scaleFactor, 400*scaleFactor, 'photoFinishpic').setVisible(false);
    photoIcon.setPosition((windowWidth/2),(windowHeight/2));
    
    finishIcon = this.add.image(640*scaleFactor, 400*scaleFactor, 'finishPic').setVisible(false);
    finishIcon.setPosition((windowWidth/2),(windowHeight/2));
    
    starter.setPosition((delayStart/7)*scaleFactor,355*scaleFactor);
    starter.depth = 1;
    starter.setScale(3*scaleFactor, 3*scaleFactor);
    starter.anims.play('starterPre', true);
	 
    //  Let's show the logo when the camera flashes, and hide it when it completes

    this.cameras.main.on('cameraflashstart', function (cam, fx, duration) {

        //photoIcon.setVisible(true);
        finishIcon.setVisible(true);
        showIcon = false;
        
    });
	
	
        	
   
	
       





        this.timedEvent = this.time.addEvent({
            delay: delay,
            callback: this.moveTrack,
            callbackScope: this,
            loop: false
        });
        
       
			audioStartersOrders.play();
			audioStartersOrders.volume= 1;
        this.horseRunners();

        // trigger startline
        this.timedEvent = this.time.addEvent({ delay: delayStart, callback: this.addStartLine, callbackScope: this, loop: false });
        
        this.trotStartLine();



    }

    update() {
    	
    	  if (!showIcon) {

            this.time.addEvent({ delay: 4000, callback: function() { finishIcon.destroy(); }, callbackScope: this, loop: false });        	
   			this.time.addEvent({ delay: 10000, callback: function() { photoIcon.destroy(); }, callbackScope: this, loop: false });        	
    
        }
    	




            // Get the time in seconds since the last frame
            //deltaTime = this.time.elapsed / 1000;
            deltaTimeb = this.time.now;
            deltaTime = (deltaTimeb - deltaTimea)/1000; // e.g. 1/30th sec or 0.033
            deltaTimea = this.time.now;
            
            
            deltaAIrate = deltaTime * AIperSec; // e.g. 0.033 * 30 = 1
            if(Math.abs(deltaAIrate)>2){deltaAIrate = 1;} // if too much tome has passed, just do next step, instead of a huge leap
            
   if(BGCrowdFlag == 0){
          			
        			audioBGCrowdA.play();
        			this.time.addEvent({ delay: 4502, callback: function() { audioBGCrowdB.play(); }, callbackScope: this, loop: false });        	
            	audioBGCrowdA.volume = 0.00001 * masterVolume;
            	audioBGCrowdB.volume = 0.00001 * masterVolume;
            	BGCrowdVolume = 0.00001;
            	BGCrowdFlag = 1;
            	}
            	if(BGCrowdFlag == 1 && BGCrowdVolume < 0.05 && flagdown == 0 && ticker == 0){
            	BGCrowdVolume += 0.002 * tickerMax;
            	audioBGCrowdA.volume = BGCrowdVolume * masterVolume;
            	audioBGCrowdB.volume = BGCrowdVolume * masterVolume;
            	} 
            	
            	if(BGCrowdFlag == 1 && BGCrowdVolume > 0.04 && flagdown == 1 && lastFurlong ==false && ticker == 0){
            	BGCrowdVolume -= 0.0001 * tickerMax;
            	audioBGCrowdA.volume = BGCrowdVolume * masterVolume;
            	audioBGCrowdB.volume = BGCrowdVolume * masterVolume;
            	} 
            	
            	if(BGCrowdFlag == 1 && BGCrowdVolume < 0.2 && fenceCount == fenceQty-2 && ticker == 0){
            	BGCrowdVolume += 0.00025 * tickerMax;
            	audioBGCrowdA.volume = BGCrowdVolume * masterVolume;
            	audioBGCrowdB.volume = BGCrowdVolume * masterVolume;
            	} 
            	
            	if(lineTime == true && audioGallopVolume > 0 && ticker == 0){
            	audioGallopVolume -= 0.001 * tickerMax;
            	audioGallopA.volume = audioGallopVolume * masterVolume;
            	audioGallopB.volume = audioGallopVolume * masterVolume;
            	if(audioGallopVolume < 0.002){
            	audioGallopA.stop(); 
            	audioGallopB.stop();
            	audioGallopVolume = 0;
            	}
            	}
            	

       	
            	if(fenceCount == fenceQty-2){

            if(ComCFlag == 0) {
            
            audioCommentaryVolume = 0.3;
            
            this.time.addEvent({ delay: 6000, callback: function() { audioCommentaryB.stop();audioCommentaryB.destroy(); audioCommentaryC.play(); }, callbackScope: this, loop: false });        	
            	
            audioCommentaryC.volume = audioCommentaryVolume * masterVolume;
            ComCFlag = 1;
            }
            if(ComCFlag == 1 && audioCommentaryVolume < 1 && ticker == 0) {
            audioCommentaryVolume += 0.00015 * tickerMax;
            audioCommentaryC.volume = audioCommentaryVolume * masterVolume;	
            }
         
            	}
            	

            	
            
            
    	if(ticker>tickerMax){ticker = 0;}
    	
    	else {ticker += 1 * deltaAIrate;}   
    	
 		if(goTime){this.arrowLabel(this.time.now);}
            //this is where the problem
        horseGroup.children.each(this.horseActions, this);
		  //fenceGroup.children.each(this.fenceActions, this);

			
			//if (liveFence){
			//liveFence.x += -7.2;
			//}	  
		  
        // background speeds set here
        
        

            	
            	

        if (trotTime) {
        	
        	this.starterActions;
            //skyBg.tilePositionX += 0.04;
            //distantBg.tilePositionX += 0.08;
            //fartreesBg.tilePositionX += 0.12;
            //farmidtreesBg.tilePositionX += 0.16;
            //midtreesBg.tilePositionX += 0.2;
            //stonewallBg.tilePositionX += 0.28;
            //roadBg.tilePositionX += 0.36;
            //barrierBg.tilePositionX += 0.52;
            //raceTrack.tilePositionX += 0.72;
            //barrier2Bg.tilePositionX += 1;
            
            

            // Move the character to the right at x pixels per second, regardless of framerate 
            skyBg.tilePositionX += 1.2 * preGrad * deltaTime  * trotSpeed;
            distantBg.tilePositionX += 2.4 * preGrad * deltaTime  * trotSpeed;
            fartreesBg.tilePositionX += 3.6 * preGrad * deltaTime  * trotSpeed;
            farmidtreesBg.tilePositionX += 4.8 * preGrad * deltaTime  * trotSpeed;
            midtreesBg.tilePositionX += 6 * preGrad * deltaTime  * trotSpeed;
            stonewallBg.tilePositionX += 8.4 * preGrad * deltaTime  * trotSpeed;
            roadBg.tilePositionX += 12 * preGrad * deltaTime  * trotSpeed;
            barrierBg.tilePositionX += 15.6 * preGrad * deltaTime  * trotSpeed;
            raceTrack.tilePositionX += 21.6 * preGrad * deltaTime  * trotSpeed;
            barrier2Bg.tilePositionX += 30 * preGrad * deltaTime  * trotSpeed;
            starter.x -= 12 * preGrad * deltaTime  * trotSpeed * 3;
            
            
            preGrad += (1-preGrad)/100;
            
        } else if (startTime) {
        	
        	
        	        //sound updates
            

        	
        	this.starterActions;
            //skyBg.tilePositionX += (startGrad * 0.2) ;
            //distantBg.tilePositionX += (startGrad * 0.4);
            //fartreesBg.tilePositionX += (startGrad * 0.6);
            //farmidtreesBg.tilePositionX += (startGrad * 0.8);
            //midtreesBg.tilePositionX += (startGrad * 1);
            //stonewallBg.tilePositionX += (startGrad * 1.4);
            //roadBg.tilePositionX += (startGrad * 1.8);
            //barrierBg.tilePositionX += (startGrad * 2.6);
            //raceTrack.tilePositionX += (startGrad * 3.6);
            //barrier2Bg.tilePositionX += (startGrad * 5);
            
            // Move the character to the right at x pixels per second, regardless of framerate 
            skyBg.tilePositionX += (startGrad *6 * deltaTime * goSpeed);
            distantBg.tilePositionX += (startGrad *12 * deltaTime  * goSpeed);
            fartreesBg.tilePositionX += (startGrad *18 * deltaTime  * goSpeed);
            farmidtreesBg.tilePositionX += (startGrad *24 * deltaTime  * goSpeed);
            midtreesBg.tilePositionX += (startGrad *30 * deltaTime  * goSpeed);
            stonewallBg.tilePositionX += (startGrad *42 * deltaTime  * goSpeed);
            roadBg.tilePositionX += (startGrad *60 * deltaTime  * goSpeed);
            barrierBg.tilePositionX += (startGrad *78 * deltaTime  * goSpeed);
            raceTrack.tilePositionX += (startGrad *108 * deltaTime  * goSpeed);
            barrier2Bg.tilePositionX += (startGrad *150 * deltaTime  * goSpeed);
            starter.x -= (startGrad *78 * deltaTime  * goSpeed)*3;
            if(flagdown == 0){
            	starter.anims.play('starterPost', true);
            	audioGallopA.play();
            	//audioCommentaryOff.play();
            	this.time.addEvent({ delay: 2000, callback: function() { audioStartersOrders.destroy(); audioCommentaryA.play(); }, callbackScope: this, loop: false });
            	this.time.addEvent({ delay: 9000, callback: function() { audioCommentaryA.destroy(); audioCommentaryB.play(); }, callbackScope: this, loop: false });
            	audioCommentaryA.volume = audioCommentaryVolume * masterVolume;
            	audioCommentaryB.volume = audioCommentaryVolume * masterVolume;
            	audioSingleCheer.play();
            	audioSingleCheer.volume = 0.03;
            	audioGallopA.volume = audioGallopVolume * masterVolume;
            	this.time.addEvent({ delay: 5000, callback: function() { audioGallopB.play();  }, callbackScope: this, loop: false });        	
            	audioGallopB.volume = audioGallopVolume * masterVolume;
            	//audioCheerFadeIn = soundFadeIn(this, audioCrowdCheer, 10000);
            	//var sound = soundFadeIn(scene, sound, duration);  // sound: sound instance, or a key of audio cache
					// var sound = soundFadeIn(scene, sound, duration, endVolume, startVolume);
            	flagdown = 1;
            	this.time.addEvent({ delay: 10000, callback: function() { starter.destroy(); }, callbackScope: this, loop: false });
        
         }
            
            startGrad += (1-startGrad)/6;
        } else if (lineTime) {
            skyBg.tilePositionX += (startGrad *6 * deltaTime  * goSpeed);
            distantBg.tilePositionX += (startGrad *12 * deltaTime  * goSpeed);
            fartreesBg.tilePositionX += (startGrad *18 * deltaTime  * goSpeed);
            //if(finishMarkerFlag == 1) {finishMarker.x -= (285 * deltaTime  * goSpeed);} // was 150 or 390
                            	
                
                if(stadiumA.x < 1){
                scrollStadiumA = true;
                stadiumA.tilePositionX += (startGrad *24 * deltaTime  * goSpeed);
                }
                else{this.enterBG(stadiumA,(startGrad* 24 * deltaTime  * goSpeed * scaleFactor*5)); }
                
                if(stadiumB.x < 1){
                scrollStadiumB = true;
                stadiumB.tilePositionX += (startGrad *30 * deltaTime  * goSpeed);
                }
                else{this.enterBG(stadiumB,(startGrad* 30 * deltaTime  * goSpeed * scaleFactor*5)); }
                
                if(stadiumC.x < 1){
                scrollStadiumC = true;
                stadiumC.tilePositionX += (startGrad *42 * deltaTime  * goSpeed);
                }
                else{this.enterBG(stadiumC,(startGrad* 42 * deltaTime  * goSpeed * scaleFactor*5)); }
                
            

            roadBg.tilePositionX += (startGrad *60 * deltaTime  * goSpeed);
            peopleLine.tilePositionX += (startGrad *60 * deltaTime  * goSpeed);
            barrierBg.tilePositionX += (startGrad *78 * deltaTime  * goSpeed);
            raceTrack.tilePositionX += (startGrad *108 * deltaTime  * goSpeed);
            barrier2Bg.tilePositionX += (startGrad *150 * deltaTime  * goSpeed);
            if(stadiumTransitionB.x > (stadiumTransitionB.width*-5*scaleFactor)){stadiumTransitionB.x -= (30 * deltaTime  * goSpeed * scaleFactor*5);}
            if(stadiumTransitionC.x > (stadiumTransitionC.width*-5*scaleFactor)){stadiumTransitionC.x -= (42 * deltaTime  * goSpeed * scaleFactor*5);}
            
            
            if(startGrad > 0.2){
            startGrad += -(startGrad-0.2)/200;
         }
         else{
         	lineTime = false;
         	
         }
        } else if (goTime) {
        	
       if(ticker == 0){
    		this.packAdjust();
    	}    
        	
        	if(fenceCount>(fenceQty/2) && driftFlag == true){
        	upperDrift = 600+(Phaser.Math.Between(1,80)*10);
			lowerDrift = 1200-(Phaser.Math.Between(1,80)*10);
			upperDriftAmount = (Phaser.Math.Between(1,60)/10);
			lowerDriftAmount = 0-(Phaser.Math.Between(1,60)/10);
        	driftFlag = false;
        	
        	}
        	
        	
        	
        	
        	if(lastFurlong==true ){
          		if(crowdCheerFlag == 0){
          			
        			audioCrowdCheerA.play();
        			this.time.addEvent({ delay: 5000, callback: function() { audioCrowdCheerB.play(); }, callbackScope: this, loop: false });        	
            	audioCrowdCheerA.volume = 0.00001 * masterVolume;
            	audioCrowdCheerB.volume = 0.00001 * masterVolume;
            	crowdCheerVolume = 0.00001 * masterVolume;
            	crowdCheerFlag = 1;
            	}
            }
            
            	if(crowdCheerFlag == 1 && crowdCheerVolume < 1 && ticker == 0){
            	crowdCheerVolume += 0.0002 * masterVolume * tickerMax;
            	audioCrowdCheerA.volume = crowdCheerVolume * masterVolume;
            	audioCrowdCheerB.volume = crowdCheerVolume * masterVolume;
            	}               	
        	
        	
        	if(midRace==true && goSpeed < midRaceSpeed && speedUp1 == true){
			goSpeed = goSpeed*1.01;
			
			if(goSpeed>midRaceSpeed){goSpeed=midRaceSpeed;}        	
        	}
        	
        	if(lastFurlong==true && goSpeed < lastFurlongSpeed && speedUp2 == true){

            	
			goSpeed = goSpeed*1.01;
			if(goSpeed>lastFurlongSpeed){goSpeed=lastFurlongSpeed;}        	
        	}
        	
        	
        	

            	
                   	
        	
        	
        	if (firstFurlong == true && goSpeed < firstFurlongSpeed){
        	goSpeed = goSpeed*1.003;
			if(goSpeed>firstFurlongSpeed){goSpeed=firstFurlongSpeed;} 
        	}
        	
        	
            skyBg.tilePositionX += (6 * deltaTime  * goSpeed);
            distantBg.tilePositionX += (12 * deltaTime  * goSpeed);
            fartreesBg.tilePositionX += (18 * deltaTime  * goSpeed);
            
            if(fenceCount < fenceQty){
            farmidtreesBg.tilePositionX += (24 * deltaTime  * goSpeed);
            midtreesBg.tilePositionX += (30 * deltaTime  * goSpeed);
            stonewallBg.tilePositionX += (42 * deltaTime  * goSpeed);
            }

            if(fenceCount == fenceQty){
            
            if(scrollStadiumA == false) {

       		           	
               //this.time.addEvent({ delay: 9000, callback: function() { stadiumTransitionA.body.velocity.x = (-24  * goSpeed * scaleFactor*5); }, callbackScope: this, loop: false });
                this.exitBG(farmidtreesBg,(24 * deltaTime  * goSpeed * scaleFactor*5));        	
                	// previously, it was 5 second delay
                	this.enterBG(stadiumA,(24 * deltaTime  * goSpeed * scaleFactor*5)); 
                	       	
      
                
                if(stadiumA.x < 1){scrollStadiumA = true;}
                }

            if(scrollStadiumB == false) {
                stadiumTransitionB.x -= (30 * deltaTime  * goSpeed * scaleFactor*5);       	
                this.exitBG(midtreesBg,(30 * deltaTime  * goSpeed * scaleFactor*5));       	       	
                // previously, it was 10 second delay
                this.enterBG(stadiumB,(30 * deltaTime  * goSpeed * scaleFactor*5));     	
                    if(stadiumB.x < 1){scrollStadiumB = true;}
                }
                    
            if(scrollStadiumC == false) {
            	stadiumTransitionC.x -= (42 * deltaTime  * goSpeed * scaleFactor*5);        	
            	this.exitBG(stonewallBg,(42 * deltaTime  * goSpeed * scaleFactor*5));          	   	
               // previously, it was 6 second delay
               this.enterBG(stadiumC,(42 * deltaTime  * goSpeed * scaleFactor*5));	
                        if(stadiumC.x < 1){scrollStadiumC = true;}
            } 

            if(scrollPeopleLine == false) {
                //this.exitBG(stonewallBg,(42 * deltaTime  * goSpeed * scaleFactor*5));
                this.enterBG(peopleLine,(60 * deltaTime  * goSpeed * scaleFactor*5));
                if(peopleLine.x < 1){scrollPeopleLine = true;}
            }
               
               
            if(scrollStadiumA == true) {stadiumA.tilePositionX += (24 * deltaTime  * goSpeed);}
            
            if(scrollStadiumB == true) {
            stadiumB.tilePositionX += (30 * deltaTime  * goSpeed);
            if(stadiumTransitionB.x > (stadiumTransitionB.width*-5*scaleFactor)){ stadiumTransitionB.x -= (30 * deltaTime  * goSpeed * scaleFactor*5);}
            }
            if(scrollStadiumC == true) {
            stadiumC.tilePositionX += (42 * deltaTime  * goSpeed);
				if(stadiumTransitionC.x > (stadiumTransitionC.width*-5*scaleFactor)){stadiumTransitionC.x -= (42 * deltaTime  * goSpeed * scaleFactor*5);}
            
            }
            if(scrollPeopleLine == true) {peopleLine.tilePositionX += (60 * deltaTime  * goSpeed);}

   
            }
            
            //if(finishMarkerFlag == 1) {finishMarker.x -= (285 * deltaTime  * goSpeed);} // was 150 or 390

   
           
            
            
            
            

            

            roadBg.tilePositionX += (60 * deltaTime  * goSpeed);
            barrierBg.tilePositionX += (78 * deltaTime  * goSpeed);
            raceTrack.tilePositionX += (108 * deltaTime  * goSpeed);
            barrier2Bg.tilePositionX += (150 * deltaTime  * goSpeed);
            starter.x -= (78 * deltaTime  * goSpeed)*3;
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
            barrier2Bg.tilePositionX += 0;
        }
        
        

 
        
    }
    
     
     
    render() {
  //this.debug.body(horseGroup);
  //game.debug.geom(horseGroup.getBounds());
   game.debug.text(game.time.fps, 5, 14, "#00ff00");
   //this.debug.fps;
    }
    
    
    
		starterActions(){
		
		if(trotTime && !starter.anims.isPlaying){
        starter.anims.play('starterPre', true);
        
        }  
		
		if(startTime){
        starter.anims.play('starterPost', true);
        } 
        
      if(goTime){
      
      }  
		
		
		}
    
    
       // fenceActions(fence) {
        
        //fence.body.x += -3.6;
     
 		  //}
 		  
	 packAdjust() {
	 	//console.log('yes');
	 //let horse = horseGroup.getChildren();
	 	 	leaderPosition = 0;
	 	secondPosition = 0;
	 	//leaderID = 100;
	 	let tempLeader = 0;
	 	let tempLeadPos = 0;
	 	let tempSecPos= 0;

    for (var i = 0; i < horseQty; i++) {      
         if(horse[i] && horse[i].x > tempLeadPos)	{
			tempLeadPos = horse[i].x;
			tempLeader = i;            	
         }    	
       }
       
       
       
        for (var i = 0; i < horseQty; i++) {      
         if(horse[i] && horse[i].x > tempSecPos && horse[i].x < tempLeadPos)	{
			tempSecPos = horse[i].x;
			            	//console.log(secondPosition);
         }    	
       }
       
       leaderID = tempLeader;
       leaderPosition = tempLeadPos;
       //console.log(leaderPosition);
       secondPosition = tempSecPos;
     
     // nudge pack back if leader is out of shot
     if(lastFurlong == false && firstFurlong == false && leaderPosition > windowWidth*0.85){
         for (var i = 0; i < horseQty; i++) {  
         if(horse[i]){    
  	horse[i].body.velocity.x -= 0.05*scaleFactor*5 * deltaAIrate * tickerMax;
  }
       }
     } 
     
     
          if(lastFurlong == false && firstFurlong == false && leaderPosition < windowWidth*0.8){
         for (var i = 0; i < horseQty; i++) {  
         if(horse[i]){    
  	horse[i].body.velocity.x += 0.05*scaleFactor*5 * deltaAIrate * tickerMax;
  }
       }
     } 
     
                
     
     
     // nudge pack back if leader is too far forward on home straight
     if(lastFurlong == true && !stopTime && leaderPosition > windowWidth*0.6){
         for (var i = 0; i < horseQty; i++) {      
  	if(horse[i]){
  		horse[i].body.velocity.x -= 0.05*scaleFactor*5 * deltaAIrate * tickerMax;
  	}
       }
     } 
     
     // nudge pack forward if leader is too far back on home straight
     if(lastFurlong && leaderPosition < windowWidth*0.55){
         for (var i = 0; i < horseQty; i++) {      
  	if(horse[i]){
  		horse[i].body.velocity.x += 0.05*scaleFactor*5 * deltaAIrate * tickerMax;
  	}
       }
     }  
     
     
     
          if(lastFurlong == true && !stopTime && leaderPosition > windowWidth*0.65){
         for (var i = 0; i < horseQty; i++) {      
  	if(horse[i]){
  		horse[i].body.velocity.x -= 0.1*scaleFactor*5 * deltaAIrate * tickerMax;
  	}
       }
     } 
     
     // nudge pack forward if leader is too far back on home straight
     if(lastFurlong && leaderPosition < windowWidth*0.5){
         for (var i = 0; i < horseQty; i++) {      
  	if(horse[i]){
  		horse[i].body.velocity.x += 0.1*scaleFactor*5 * deltaAIrate * tickerMax;
  	}
       }
     }    
     
       

	 }






    horseActions(horse) {
		

        horseID = horse.texture.key.replace('geegee', '');
		console.log(horseID);
        var value;
        
			if (startTime && horseState[horseID] == 0){
				horse.body.velocity.x = horse.body.velocity.x *2;
				horseState[horseID] = 1;
				
				value = Phaser.Math.Between(0, 5);
				
            var startSequence = value*85;
            //this.timedEvent = this.time.addEvent({ delay: startSequence, callback: function () {horse.anims.play('canterfast' + horseID, true); }, callbackScope: this, loop: false });
        		//this.timedEvent = this.time.addEvent({ delay: startSequence+400, callback: function () {horse.anims.pause(); horse.anims.play('between' + horseID, true);}, callbackScope: this, loop:actor) false });
        		this.time.addEvent({ delay: startSequence, callback: function (){ this.startBetween(horseID,horse);}, callbackScope: this, loop: false });
        
            }
            
   		
            //up to here
        if(horseState[horseID] == 3 && !horse.anims.isPlaying){
        horse.anims.play('fall' + horseID, true);
        horseState[horseID] = 4; //fallen and animation has finished
        }  
        
        else if(horseState[horseID] == 9){
        	if(!horse.anims.isPlaying){
        horse.anims.play('retire' + horseID, true);
     		}
     		if(ticker == 0){
      		  horse.body.velocity.x += -1 * tickerMax;
      	}

       	 if(horse.body.x < (-400*scaleFactor)){
       	 horseState[horseID] = 7;
       	 horsesLeft -= 1;
       	 horse.body.x = -100000;
       	 return;
     		  }
      		  }
        
        else if(horseState[horseID] == 4){
        	let targetVelocity = (-540 * goSpeed * scaleFactor);
        if(horse.body.velocity.x > targetVelocity){
        horse.body.velocity.x += -66 * deltaAIrate;
        }
        else{
		  horse.body.velocity.x = targetVelocity;     
        }
        
        if(horse.body.x < (-400*scaleFactor)){
        horseState[horseID] = 7;	
        horsesLeft -= 1;
        horse.body.x = -100000;
        return;
        }
        
        }  
        
        
        
				// Y movement algorhythm
				let trackY = defaultY-(horse.y/scaleFactor);
            let horseScale = (2 * scaleFactor)/(1+(trackY/650));
            horse.setScale(horseScale, horseScale);
            horse.depth = horse.y;
         	let goDown = true;
         	let goUp = true;            
            
				if(ticker<100){
				let bufferX = 210*horseScale;
         	let bufferY = 20*horseScale;

         	
				for (var i = 0; i < horseQty; i++) {
					//this is a problem (I think its fixed)
            if(raceStarters[i] != horseID){
            let xCol = horseX[raceStarters[i]]-horse.x;
            let yCol = horseY[raceStarters[i]]-horse.y;
         	
            
            if(Math.abs(yCol)<bufferY*2 && Math.abs(xCol)<bufferX){
            	
            if(Math.abs(yCol)<(bufferY/3) && Math.abs(xCol)<bufferX){
            if(yCol>0){horse.y += -1;  goDown = false;}

            if(yCol<0){horse.y += 1;  goUp = false;} 
				}
				
				if(Math.abs(yCol)<(bufferY) && Math.abs(xCol)<bufferX){

            if(yCol>0){horse.body.velocity.y = -0.25;  goDown = false;}

            if(yCol<0){horse.body.velocity.y = 0.25;  goUp = false;} 
				}
				
				else {            
            //if(xCol>0 && xCol<bufferX*1.25){horse.body.velocity.y += -0.25;}
            if(yCol>0){horse.body.velocity.y += -0.1 * deltaAIrate; goDown = false;}

            //if(xCol<0 && Math.abs(xCol)<bufferX*1.25){horse.body.velocity.y += 0.25;}
            if(yCol<0){horse.body.velocity.y += 0.1 * deltaAIrate; goUp = false;}            
            }
				
				
                       
           
				   
				} 
				}   	
        		}	
        		
        					

				if(horse.body.velocity.y > 10){horse.body.velocity.y *= 1-(0.1 * deltaAIrate);}
				if(horse.body.velocity.y < -10){horse.body.velocity.y *= 1-(0.1 * deltaAIrate);}
				
				horseX[horseID]=horse.x;
				horseY[horseID]=horse.y;
				
			}
				
				if(ticker==0){
				if(goDown == true && goUp == true){
					if(horse.body.velocity.y>0){horse.body.velocity.y += (Phaser.Math.Between(-1, 100)/400);}
					else{horse.body.velocity.y += (Phaser.Math.Between(-100, 10)/400);}
					if(horse.y<upperDrift*scaleFactor){horse.body.velocity.y += upperDriftAmount;}
					if(horse.y>lowerDrift*scaleFactor){horse.body.velocity.y += lowerDriftAmount;}
					}
				else if(goDown == true){horse.body.velocity.y += (Phaser.Math.Between(0, 100)/200); 
				}
				else if(goUp == true){horse.body.velocity.y += (Phaser.Math.Between(-100, 0)/200);
				}
				            
            }
         
            
				if((horse.y+horse.body.height)>((1200)*scaleFactor)){if(horse.body.velocity.y > 0){horse.body.velocity.y *= 1-(0.2 * deltaAIrate);}}
				if((horse.y+horse.body.height)<((710)*scaleFactor)){if(horse.body.velocity.y < 0){horse.body.velocity.y *= 1-(0.2 * deltaAIrate);}}            
            
            if((horse.y+horse.body.height)>((1275)*scaleFactor)){horse.y += -1; horse.body.velocity.y = -2;}
				if((horse.y+horse.body.height)<((660)*scaleFactor)){horse.y += 1; horse.body.velocity.y = 2;}
//End of Y-movement algorhythm


        
        
        
        
            
            
        else if (goTime) {
       
				
			

				
				//horse.anims.pause();
				
            if (!horse.anims.isPlaying) {
            	if(firstFurlong == true){
					horse.anims.play('firstFurlong' + horseID, true);
         	}
         	  if(midRace == true){
					horse.anims.play('gallop' + horseID, true);
         	}
         	  if(lastFurlong == true){
					horse.anims.play('lastFurlong' + horseID, true);
         	}
         	
         	
            }
            
            
            
          
				
				if(ticker==0){
				value = Phaser.Math.Between(0, 5);	
				
		
				
         	
         	if(horseState[horseID] == 8 && lastFurlong == true){
       // if(!horse.anims.isPlaying){
        //horse.anims.play('fall' + horseID, true);
     		//}
       		 horse.body.velocity.x += 2; 
     			}   
     			
     			
            //horse has pulled a muscle
       		 if(horseState[horseID] == 6){
        	//if(!horse.anims.isPlaying){
        //horse.anims.play('fall' + horseID, true);
     		//}
      		  horse.body.velocity.x += -1;

       	 if(horse.body.x < (-400*scaleFactor)){
       	 horseState[horseID] = 7;
       	 horsesLeft -= 1;
       	 horse.body.x = -100000;
       	 return;
     		  }
      		  }  
         	
         	
         	
         	
         	
         	
         
         					
					
            if (value == 1 || value == 2 || value == 3) {
            	if(horse.body.velocity.x < 25 && horse.body.velocity.x > -25){
            		// inertia : when velocity is low its harder to change
            	horse.body.velocity.x += 1*scaleFactor*5;
            	}
            	else{
                horse.body.velocity.x += 2*scaleFactor*5;
             }
            } 
            
            
            else {
                if(horse.body.velocity.x < 25 && horse.body.velocity.x > -25){
            		// inertia : when velocity is low its harder to change
            	horse.body.velocity.x += -1*scaleFactor*5;
            	}
            	else{
                horse.body.velocity.x += -2*scaleFactor*5;
             }
            }
            
            
            if(horseState[horseID] == 7){
            horse.body.velocity.x = -10000;
            
            }
         }
         
        //zonal nudges during race
        if(horseState[horseID] != 2 && horseState[horseID] != 7 && ticker == 0){
            	
            if(lastFurlong == false && horse.body.x < -windowWidth*0.5*(1/(20/horseQty))){
            horse.body.velocity.x += 1*scaleFactor*5 * deltaAIrate * tickerMax;
            }
            
            //if(lastFurlong == false && leaderID == horseID && (leaderPosition - secondPosition) > (windowWidth*0.05)){// 0.15 = 3 three-length gap
            //horse.x += -10*scaleFactor*5 * deltaAIrate * tickerMax;
            //console.log(horseID);
            //}
            
            if(firstFurlong == false && lastFurlong == false && horse.body.x > (windowWidth*0.42) && horse.body.x < (windowWidth*0.57) && horse.body.velocity.x > -2){
            horse.body.velocity.x += -0.04*scaleFactor*5 * deltaAIrate * tickerMax; //-0.08
            }
            
            if(firstFurlong == false && lastFurlong == false && horse.body.x > (windowWidth*0.68) && horse.body.x < (windowWidth*0.73)){
            horse.body.velocity.x += 0.02*scaleFactor*5 * deltaAIrate * tickerMax; //0.06
            }
            
            // move horses backwards for finish line
         //   if(lastFurlong == true && !stopTime){
         //   horse.body.velocity.x += -0.025*scaleFactor*5 * deltaAIrate * tickerMax;
         //   }
            
             if(lastFurlong == false && horse.body.x > 1700 * scaleFactor && horse.body.velocity.x > -5){
            horse.body.velocity.x += -0.05*scaleFactor*5 * deltaAIrate * tickerMax;
            }
            
            if(lastFurlong == true && horse.body.x > 1700 * scaleFactor && horse.body.velocity.x > -5){
            horse.body.velocity.x += -0.2*scaleFactor*5 * deltaAIrate * tickerMax;
            }
            
            
           if(lastFurlong == false && horse.body.x > 1900 * scaleFactor && horse.body.velocity.x > -5){
            horse.body.velocity.x += -0.2*scaleFactor*5 * deltaAIrate * tickerMax;
            }
            
            if(horse.body.velocity.x < -30){
            horse.body.velocity.x += 0.5*scaleFactor*5 * deltaAIrate * tickerMax * 0.4;
            }
            
            if(horse.body.velocity.x > 60){
            horse.body.velocity.x += -0.25*scaleFactor*5 * deltaAIrate * tickerMax * 0.4;
            }
         	}
         	
         	
         	// horses that finish in top 3 (or 4)
         	if(horseState[horseID] == 5 && ticker == 0){
            	
            if(horse.body.x < 600 * scaleFactor){
            horse.body.velocity.x += 0.1*scaleFactor * deltaAIrate * tickerMax;
            }
            
            if(horse.body.x > 1200 * scaleFactor){
            horse.body.velocity.x += -0.1*scaleFactor * deltaAIrate * tickerMax;
            }
            
           
         	}
         	
         	
         	
         	
         	
      

            //horse.body.collideWorldBounds = true;
            
           }
            
         
            
            


         
        
        else if (!stopTime && !goTime && !startTime) {
           
           // this is a problem
           console.log(horseID+'x');
           
            horse.anims.play('trot' + horseID, true);
       	
        }
        
        else if (stopTime && !lineTime) {
           
            horse.anims.play('trot' + horseID, true);
            
            
       
        }
        
        if (lineTime) {
        	
			horse.anims.play('trot' + horseID, true);
        if(places[0] == horseID){
	            firstIcon.x = horse.x;
	            firstIcon.y = horse.y-(140*scaleFactor)
	            firstIcon.depth = horse.y +1;
	            if(horse.x < (100*scaleFactor) && ticker == 0){horse.body.velocity.x += 1 * tickerMax;}
	            if(horse.x > (windowWidth-(100*scaleFactor)) && ticker == 0){horse.body.velocity.x += -1 * tickerMax;}
            }
            
            
            if(places[1] == horseID){
	            secondIcon.x = horse.x;
	            secondIcon.y = horse.y-(140*scaleFactor)
	            secondIcon.depth = horse.y +1;
	            if(horse.x < (100*scaleFactor) && ticker == 0){horse.body.velocity.x += 1 * tickerMax;}
	            if(horse.x > (windowWidth-(100*scaleFactor)) && ticker == 0){horse.body.velocity.x += -1 * tickerMax;}
            }
            
           
            if(places[2] == horseID){
	            thirdIcon.x = horse.x;
	            thirdIcon.y = horse.y-(140*scaleFactor)
	            thirdIcon.depth = horse.y +1;
	            if(horse.x < (100*scaleFactor) && ticker == 0){horse.body.velocity.x += 1 * tickerMax;}
	            if(horse.x > (windowWidth-(100*scaleFactor)) && ticker == 0){horse.body.velocity.x += -1 * tickerMax;}
            }
            
               if(places[3] == horseID && fourthFinish == true){
	            
	            if(horse.x < (100*scaleFactor) && ticker == 0){horse.body.velocity.x += 1;}
	            if(horse.x > (windowWidth-(100*scaleFactor)) && ticker == 0){horse.body.velocity.x += -1 * tickerMax;}
            }
        
}
        
        
        


    }
    
    resultsList(r){
	 resultsTitleText.x = windowWidth*0.3;  
	 resultsTitleRect.x = windowWidth*0.75; 	
    	
    	// to begin with, r = the number of starters, then decreases to 0
    	console.log('resultsList'+r+' ' +finishers);
    var horseID;
    	
    if(r > finishers){
    let item = horseGroup.getChildren();	
    for (var i = 0; i < horseQty; i++) {
    horseID = item[i].texture.key.replace('geegee', '');
    
    // go through each of the horses and find out which one's did not finish
    if(horseState[horseID] != 2 && horseState[horseID] != 5){
	 horseState[horseID]	= 10; // DNF
	 resultsTextPos[r-1].setText('DNF'); 
	 resultsTextHorse[r-1].setText(horseNames[horseID]);
	 resultsTextPts[r-1].setText('£0');
	 resultsTextPlyr[r-1].setText('');
	 
	 // if a horse dnf, find out if it belongs to a player
	 for (var q = 0; q < playerHorses.length; q++) {
	 if (playerHorses[q] && playerHorses[q] == horseID) {
	 resultsTextPlyr[r-1].setText(playerNames[q]);
	 playerResultsPos[q] = 'DNF';
	 playerResultsPts[q] = 0;
	 }	
	 }
	 
	 
	 // place the dnf horse at top of screen
	 //position = top of list
	 resultsTextPos[r-1].x = (windowWidth/2)-(500*scaleFactor);
	 resultsTextHorse[r-1].x = (windowWidth/2)-(40*scaleFactor);
	 resultsTextPts[r-1].x = (windowWidth/2)+(340*scaleFactor);
	 resultsTextPlyr[r-1].x = (windowWidth/2)-(400*scaleFactor);
	 resultsRect[r-1].x = windowWidth*0.75;
	 
	 
	 // move all other horse results down a notch
    for (var q = (raceStarters.length-1); q > (r-1); q--) {
    //move others down
    resultsTextPos[q].y += 90*scaleFactor;
	 resultsTextHorse[q].y += 90*scaleFactor;
	 resultsTextPts[q].y += 90*scaleFactor;
	 resultsTextPlyr[q].y += 90*scaleFactor;
	 resultsRect[q].y += 90*scaleFactor;
 	 }
 	 
 	 r -= 1;
    	
	 
    }
    
    
//
    }
    
    
    }
    
    else{
    	
    if(r > -1){
    	
    horseID = places[r-1];
    
    resultsTextPos[r-1].setText(r);
	 resultsTextHorse[r-1].setText(horseNames[horseID]);
	 resultsTextPts[r-1].setText('£'+this.numberWithCommas(prizeMoney[r-1]));
	 
	 
	 for (var q = 0; q < playerHorses.length; q++) {
	 if (playerHorses[q] && playerHorses[q] == raceStarters[horseList[horseID]]) {
	 resultsTextPlyr[r-1].setText(playerNames[q]);
	 playerResultsPos[q] = r;
	 playerResultsPts[q] = prizeMoney[r-1];
	 }	
	 }	 
	 
	 //resultsTextPlyr[r-1].setText(playerNames[raceStarters[horseID]]);
	 
	 //position = top of list
	 resultsTextPos[r-1].x = (windowWidth/2)-(500*scaleFactor);
	 resultsTextHorse[r-1].x = (windowWidth/2)-(40*scaleFactor);
	 resultsTextPts[r-1].x = (windowWidth/2)+(340*scaleFactor);
	 resultsTextPlyr[r-1].x = (windowWidth/2)-(400*scaleFactor);
	 resultsRect[r-1].x = windowWidth*0.75;
	 
	 
	  // move all other horse results down a notch
    for (var q = (raceStarters.length-1); q > (r-1); q--) {
    //move others down
    resultsTextPos[q].y += 90*scaleFactor;
	 resultsTextHorse[q].y += 90*scaleFactor;
	 resultsTextPts[q].y += 90*scaleFactor;
	 resultsTextPlyr[q].y += 90*scaleFactor;
	 resultsRect[q].y += 90*scaleFactor;
 	 }
    
    
    }	
    	
r -= 1;
    }
    
    
    
    
    if(r > 0){
    	this.time.addEvent({ delay: 1500, callback: function() { this.resultsList(r)}, callbackScope: this});
    	}
    else{
    	

    	
    this.time.addEvent({ delay: 7000, callback: function() { this.clearResultsList()}, callbackScope: this});
    }
    }
    
    
    clearResultsList(){
    for (var q = 0; q < (raceStarters.length); q++) {
    //make results table disappear
    resultsTextPos[q].x = -2000;
	 resultsTextHorse[q].x = -2000;
	 resultsTextPts[q].x = -2000;
	 resultsTextPlyr[q].x = -2000;
	 resultsRect[q].x = -2000;
 	 }
 	 this.time.addEvent({ delay: 1500, callback: function() { this.resultsListReduced(raceStarters.length)}, callbackScope: this});  	
    }
    
    
	 resultsListReduced(r){
	 
	var pos = playerNames.length - 1;
	
	 for (var q = 0; q < (playerNames.length); q++){
	
	 if(playerResultsPos[q] == 'DNF'){
	 	 //fill in text values
	 
	 reducedResultsTextPos[pos].setText('DNF');
	 reducedResultsTextHorse[pos].setText(horseNames[playerHorses[q]]);
	 reducedResultsTextPts[pos].setText('£0');
	 reducedResultsTextPlyr[pos].setText(playerNames[q]);
	 playerPoints[q] = 0;
	 
	 //position = top of list
	 reducedResultsTextPos[pos].x = (windowWidth/2)-(500*scaleFactor);
	 reducedResultsTextHorse[pos].x = (windowWidth/2)-(40*scaleFactor);
	 reducedResultsTextPts[pos].x = (windowWidth/2)+(340*scaleFactor);
	 reducedResultsTextPlyr[pos].x = (windowWidth/2)-(400*scaleFactor);
	 reducedResultsRect[pos].x = windowWidth*0.75;
	 
	 reducedResultsTextPos[pos].y += 90*scaleFactor*pos;
	 reducedResultsTextHorse[pos].y += 90*scaleFactor*pos;
	 reducedResultsTextPts[pos].y += 90*scaleFactor*pos;
	 reducedResultsTextPlyr[pos].y += 90*scaleFactor*pos;
	 reducedResultsRect[pos].y += 90*scaleFactor*pos;
	  
 	
 	 
 	 pos -=1;
	 }
	 	 	
	 }
	 
	 for (var rs = raceStarters.length; rs > 0; rs--){
	 
	 for (var qi = 0; qi < (playerNames.length); qi++){
	 if(playerResultsPos[qi] == rs){
	 //position = top of list
	 
	 reducedResultsTextPos[pos].setText(playerResultsPos[qi]);
	 reducedResultsTextHorse[pos].setText(horseNames[playerHorses[qi]]);
	 reducedResultsTextPts[pos].setText('£'+this.numberWithCommas(playerResultsPts[qi]));
	 reducedResultsTextPlyr[pos].setText(playerNames[qi]);
	 playerPoints[qi] = playerResultsPts[qi];

	 	
	 //position = top of list
	 reducedResultsTextPos[pos].x = (windowWidth/2)-(500*scaleFactor);
	 reducedResultsTextHorse[pos].x = (windowWidth/2)-(40*scaleFactor);
	 reducedResultsTextPts[pos].x = (windowWidth/2)+(340*scaleFactor);
	 reducedResultsTextPlyr[pos].x = (windowWidth/2)-(400*scaleFactor);
	 reducedResultsRect[pos].x = windowWidth*0.75;
	 
	 reducedResultsTextPos[pos].y += 90*scaleFactor*pos;
	 reducedResultsTextHorse[pos].y += 90*scaleFactor*pos;
	 reducedResultsTextPts[pos].y += 90*scaleFactor*pos;
	 reducedResultsTextPlyr[pos].y += 90*scaleFactor*pos;
	 reducedResultsRect[pos].y += 90*scaleFactor*pos;
	 
	 pos -=1;
	 
	 }
	
	 }
	 
	 
	 
	 }
	 
	 
this.time.addEvent({ delay: 5000, callback: function() { audioBGCrowdA.stop(); audioBGCrowdB.stop(); audioCrowdCheerA.stop(); audioCrowdCheerB.stop(); this.scene.start('StandingsSc');}, callbackScope: this});	 
	 }    
    
    
    
    
    
    numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	 }
    
    
    arrowLabel(timeNow){
    if(arrowFlag == false){
    arrowIconA.x = -2000;
    arrowIconB.x = -2000;
    arrowHorseText.x = -2000;
    }
    else{
    	if (timeNow - horseWatchStamp > 3000 && timeNow - horseWatchStamp < 6000) {
    		    arrowIconA.x = -2000;
    			arrowIconB.x = -2000;
    			arrowHorseText.x = -2000;
    		}
    		else{
    if (timeNow - horseWatchStamp > 6000) {
    horseWatchStamp = timeNow;
    
    if (leaderTick==4) {
    	leaderWatch = true;
    	leaderTick = 1;
    	}
    else{
    leaderWatch = false;
    leaderTick += 1;
    if(horseWatch < (playerHorses.length - 1)){
    horseWatch += 1;
    
    }
    else{
	 horseWatch = 0;    
    }
    }
    }
    
    else{
    	//let horse = horseGroup.getChildren();
    	if (leaderWatch == true && horseState[raceStarters[horseList[leaderID]]]!= 7) {
    arrowIconA.x = horse[leaderID].x+(18*scaleFactor);
	 arrowIconA.y = horse[leaderID].y-(75*scaleFactor);
	 arrowIconA.depth = horse[leaderID].depth - 1;
	 arrowIconB.x = horse[leaderID].x+(18*scaleFactor); 
	 arrowHorseText.x = horse[leaderID].x+(18*scaleFactor); 
	 arrowHorseText.setText("Current Leader:\n"+horseNames[leaderID]); 		
    	}
    
    else {
    //console.log(playerHorses[horseWatch]);
    if(horseState[playerHorses[horseWatch]]!= 7){
    arrowIconA.x = horse[horseList[playerHorses[horseWatch]]].x+(18*scaleFactor);
	 arrowIconA.y = horse[horseList[playerHorses[horseWatch]]].y-(75*scaleFactor);
	 arrowIconA.depth = horse[horseList[playerHorses[horseWatch]]].depth - 1;
	 arrowIconB.x = horse[horseList[playerHorses[horseWatch]]].x+(18*scaleFactor);
	 arrowHorseText.x = horse[horseList[playerHorses[horseWatch]]].x+(18*scaleFactor);
	 arrowHorseText.setText(playerNames[horseWatch]+"\n"+horseNames[playerHorses[horseWatch]]); 
}
	 }
    }
  }  
 }
    }
    


    
    jumpFence(item, fence) {
    	
        if(horseState[horseID] != 7){
        var horseID = item.texture.key.replace('geegee', '');
        audioHorseJumpGroup[horseID].play();
        audioHorseJumpGroup[horseID].volume = audioJumpVolume * masterVolume;
        if(fenceHurdle && this.isFenceAlive) {
            item.body.checkCollision.none = true;
            item.anims.play('jump' + horseID);
            this.events.emit('firstHorse');
           
            this.time.addEvent({ delay: 2000, callback: function() { if(horseState[horseID] != 7){if(horseState[horseID] != 4){ item.body.checkCollision.none = false;} }}, callbackScope: this, loop: false });
        
        } 


        fenceHurdle = true;
        
        item.body.velocity.x = (Phaser.Math.Between(-30, 50)*scaleFactor);
        let stumble = Phaser.Math.Between(0, 40);
        let horseFortune = Phaser.Math.Between(0, 120);
        let fortuneDelay = Phaser.Math.Between(1, 20)*500;
        if(stumble < 3){
        item.body.velocity.x = (Phaser.Math.Between(-100, -10)*scaleFactor);
        }
        
        //RICH TRIGGER - retired/pulled-up horses are triggered here, between these IF brackets
        if(horseFortune < 3 && horsesLeft > 4 && item.body.x > 900*scaleFactor){
        	//horse pulls muscle
        this.time.addEvent({ delay: fortuneDelay, callback: function() { horseState[horseID] = 6;  }, callbackScope: this, loop: false });
        }
        
        if(horseFortune == 11 && horsesLeft > 4){
        	//horse retires
        this.time.addEvent({ delay: fortuneDelay, callback: function() { horseState[horseID] = 9; this.events.emit('horseRetire'); }, callbackScope: this, loop: false });
        }
        
        if(horseFortune > 117 && item.body.x < 300*scaleFactor){
        	//horse gets second wind
        this.time.addEvent({ delay: fortuneDelay, callback: function() { horseState[horseID] = 8;  }, callbackScope: this, loop: false });
        }
        
        //RICH TRIGGER - faller is triggered here, between these IF brackets
        if(stumble == 10 && horsesLeft > 4){
        horseState[horseID]= 3;
        audioFallGroup[horseID].play();
        audioFallGroup[horseID].volume = audioFallVolume * masterVolume;
        }
    
    }
 }


    // horses

    horseRunners() {

        horse = horseGroup.getChildren();
        
        for (var i = 0; i < horseQty; i++) {
        		
            //Phaser.Actions.ScaleXY(horseGroup.getChildren(), -0.01, -0.01, -0.03, -0.03);
            var trackY = 10*Phaser.Math.Between(1, 40);
            //horse[i].body.width = 100;
             horse[i].body.offset.setTo(-27, 0)
            horse[i].y = (defaultY - (trackY))*scaleFactor;
            var horseScale = (2 * scaleFactor)/(1+(trackY/650));
            horse[i].setScale(horseScale, horseScale);
            horse[i].depth += horse[i].y;
            
            horse[i].setX((Phaser.Math.Between(0, 60)-80)*10*scaleFactor);
        }
        
    }

    // horses actions
    
    startBetween(horseID, item){
    //item.anims.play('gallop' + horseID);
    item.anims.play('betweenStart' + horseID);
    this.time.addEvent({ delay: 118, callback: function() { item.anims.play('gallopBegin' + horseID); }, callbackScope: this, loop: false });
    
    }
    
    fastForward(item, startLine) {
        
        this.time.addEvent({ delay: 1000, callback: function () {startTime = false; goTime = true;}, callbackScope: this, loop: false });
        startTime = true;
        firstFurlong = true;
        goSpeed = initialSpeed;
        trotTime = false;
        if (!startLine.hasOverlapped && !item.hasOverlapped) {
            startLine.hasOverlapped = item.hasOverlapped = true;
            console.log("and they're off!");
            this.events.emit('raceStart');
            this.triggerFences();
            
            //for each horse velocity
            
		 // horse = horseGroup.getChildren();
        
        //for (var i = 0; i < horseQty; i++) {      
        //horse[i].body.velocity.x = -1*Phaser.Math.Between(170, 50)*scaleFactor;
        //}      
            
        }
        
    }
    
    
    

    slowDown(item, finishLine) {
        
        var horseID = item.texture.key.replace('geegee', '');
        var finishDelay = Phaser.Math.Between(250, 750);
        
        if(stopTime && this.isFinishAlive) {
            item.body.checkCollision.none = true;
            
            this.time.addEvent({ delay: finishDelay, callback: function() { item.anims.play('betweenEnd' + horseID); }, callbackScope: this, loop: false });
            
            this.time.addEvent({ delay: finishDelay+150, callback: function() { item.anims.play('canter' + horseID); }, callbackScope: this, loop: false });
            
            this.time.addEvent({ delay: 8000, callback: function() { item.anims.play('trot' + horseID); }, callbackScope: this, loop: false });
            
            this.time.addEvent({ delay: 2000, callback: function() { if(horseState[horseID] != 7){item.body.checkCollision.none = false; }}, callbackScope: this, loop: false });
        
        if(!places[0]){
        	this.photoFlash();
        	audioSingleCheer.play();
        	audioSingleCheer.volume = 0.1;
        	places[0] = horseID;
        	
        	timeDifference = this.time.now;
        	horseState[horseID]=5;
        	finishers = 1;
        	console.log('Place: '+finishers+' - '+'Horse: '+horseID+' '+horseNames[horseID]);
        	
        	}
        	
        	else if(!places[1]){
        	places[1] = horseID;
        	
        	if(this.time.now - timeDifference < 60){photoFinish = true;}

        	horseState[horseID]=5;
        	timeDifference = this.time.now;
        	finishers = 2;
        	console.log('Place: '+finishers+' - '+'Horse: '+horseID+' '+horseNames[horseID]);
        	}
        	
        	else if(!places[2]){
        	places[2] = horseID;
        	if(this.time.now - timeDifference < 60){photoFinish = true;}

        	horseState[horseID]=5;
        	timeDifference = this.time.now;
        	finishers = 3;
        	console.log('Place: '+finishers+' - '+'Horse: '+horseID+' '+horseNames[horseID]);
        	}
        	
        	else if(!places[3]){
        	places[3] = horseID;
        	if(this.time.now - timeDifference < 60){
        		photoFinish = true; 
        		fourthFinish = true;
        	
        		}
        		finishers = 4;
        		console.log('Place: '+finishers+' - '+'Horse: '+horseID+' '+horseNames[horseID]);
        		


        	
			if(photoFinish == true){
				
			//this.photoFlash();
			this.time.addEvent({ delay: 6000, callback: function() { photoIcon.setVisible(true); }, callbackScope: this, loop: false });        	
    
    this.time.addEvent({ delay: 18000, callback: function() { thirdIcon.setVisible(true); }, callbackScope: this, loop: false });        	
    this.time.addEvent({ delay: 24000, callback: function() { secondIcon.setVisible(true); }, callbackScope: this, loop: false });        	
    this.time.addEvent({ delay: 25000, callback: function() { firstIcon.setVisible(true); }, callbackScope: this, loop: false });
    this.time.addEvent({ delay: 30000, callback: function() {this.resultsList(raceStarters.length)}, callbackScope: this});        	
    //this.time.addEvent({ delay: 33000, callback: function() { this.scene.restart(); }, callbackScope: this, loop: false });        	
    
        	
        	if(fourthFinish == true){horseState[horseID]=5;}
        	
        	}
        	else{

if(fourthFinish == false){
        	//console.log('fourthfinish = false');
			var startDur = Phaser.Math.Between(30, 36)*1000;
    			horseState[horseID]=2;
    			var dest = Phaser.Math.Between((windowWidth*-0.5)/1000, (windowWidth*-1)/1000)*1000;
    			
    			//if(dest > (windowWidth/2)){
    			//	dest += windowWidth;
    			//	startDur = startDur*1.5;
    			//	}
    			//else{dest += -windowWidth;}
            
            var timeline = this.tweens.timeline({
    			
                tweens: [{
                    targets: item,
                    x: dest,
                    duration: startDur,
                    ease: 'Sine.easeInOut',
                    delay: 0
                    }]
    			
            });	
            
            this.time.addEvent({ delay: startDur, callback: function() { item.body.x = -100000; }, callbackScope: this, loop: false });        	
        	
        	}        		
        		
        		
        	this.time.addEvent({ delay: 1000, callback: function() { thirdIcon.setVisible(true); }, callbackScope: this, loop: false });        	
    this.time.addEvent({ delay: 2000, callback: function() { secondIcon.setVisible(true); }, callbackScope: this, loop: false });        	
    this.time.addEvent({ delay: 3000, callback: function() { firstIcon.setVisible(true); }, callbackScope: this, loop: false }); 
    this.time.addEvent({ delay: 12000, callback: function() {this.resultsList(raceStarters.length)}, callbackScope: this});        	
    //this.time.addEvent({ delay: 10000, callback: function() { this.scene.restart(); }, callbackScope: this, loop: false });        	
    
        	}
        }
        
         else if(!places[finishers]){
        	places[finishers] = horseID;
        	finishers += 1;
        	console.log('Place: '+finishers+' - '+'Horse: '+horseID+' '+horseNames[horseID]);

				var startDur = Phaser.Math.Between(30, 36)*1000;
    			horseState[horseID]=2;
    			var dest = Phaser.Math.Between((windowWidth*-0.5)/1000, (windowWidth*-1)/1000)*1000;
    			
    			//if(dest > (windowWidth/2)){
    			//	dest += windowWidth;
    			//	startDur = startDur*1.5;
    			//	}
    			//else{dest += -windowWidth;}
            
            var timeline = this.tweens.timeline({
    			
                tweens: [{
                    targets: item,
                    x: dest,
                    duration: startDur,
                    ease: 'Sine.easeInOut',
                    delay: 0
                    }]
    			
            });	
            
            this.time.addEvent({ delay: startDur, callback: function() { item.body.x = -100000; }, callbackScope: this, loop: false });
			}     
			
			
			
			
			
			
			
			}			
			   
        
         
		  this.time.addEvent({ delay: 2000, callback: function() { lineTime = true;  }, callbackScope: this, loop: false });
        stopTime = true;
        
    }

    // fences

    addOneFence() {
    	
    	
        
        fence = fenceGroup.create(windowWidth * 2, windowHeight - (330*scaleFactor), 'fence');
        
        fence.setScale(scaleFactor*5, scaleFactor*5);
        fence.setSize(scaleFactor*60, scaleFactor*110).setOffset(scaleFactor*20, scaleFactor*40);
        fence.body.velocity.x = (-540 * goSpeed * scaleFactor); 
        fence.depth= 3;
        // velocity used  to be -330 
     //liveFence = true;
        fence.checkWorldBounds = true;
        fence.outOfBoundsKill = true;
        
        if (this.isFenceAlive) {
            fenceCollider = this.physics.add.overlap(fenceGroup, horse, this.jumpFence, null, this);
        }
        
       
        
        fenceCount++;
        this.events.emit('addFence');
        if (fenceCount === fenceQty) {
            this.timedEvent.remove(false);
            this.triggerFinish();
        }
        else{
			this.triggerFences();        
        }
        
        //if (fenceCount == 1) {this.addVehicle();}
        
        
        if (fenceCount == 3) {
        	this.time.addEvent({ delay: 7000, callback: function() { firstFurlong = false; midRace = true; speedUp1= true;}, callbackScope: this, loop: false });        	
        
        	
        	//goSpeed = midRaceSpeed;
        }
        
        
        if (fenceCount == (fenceQty-2)) {
        	this.time.addEvent({ delay: 7000, callback: function() { midRace = false; lastFurlong = true; speedUp2 = true;}, callbackScope: this, loop: false }); 
       
        	//goSpeed = lastFurlongSpeed;
        }
        
        

    }

    triggerFences() {
    	if(fenceCount == (fenceQty-2)){
    		fenceDelay = 20000; // normally 10000,22000
    		//console.log('2nd last');
    	}
    	else {
    		if(fenceCount == (fenceQty-1)){
    			fenceDelay = 8500; // normally 10000,22000
    			//console.log('last');
    	}
       else{ 
       fenceDelay = Phaser.Math.Between(15, 17)*1000; // normally 10000,22000
       //console.log('normal');
    		} 
    	}

        this.timedEvent = this.time.addEvent({ delay: fenceDelay, callback: this.addOneFence, callbackScope: this, loop: false });
        this.isFenceAlive = true;
    
    }

    exitBG(item,speed){
        if(item.x > (0-windowWidth)){
        item.x -= speed;
        }
    }

    enterBG(item,speed){
        if(item.x > 0){
        item.x -= speed;
        }
    }

    // start/finish

    addStartLine() {

        startLine = this.physics.add.sprite(windowWidth * 2, windowHeight - 190, 'start');
        startLine.setScale(0.5*scaleFactor, 0.5*scaleFactor);
        startLine.body.velocity.x = -800;  
        startLine.checkWorldBounds = true;
        startLine.outOfBoundsKill = true;

        this.physics.add.overlap(horseGroup, startLine, this.fastForward, null, this);
        
      
        
				

    }

    trotStartLine() {

        //let horse = horseGroup.getChildren();

        for (var i = 0; i < horseQty; i++) { 
    

				
            var startPos = Phaser.Math.Between(850, 900) * scaleFactor;
            if(Phaser.Math.Between(0, 7)==5){
            	startPos = Phaser.Math.Between(125, 400);
            }
            if(startPos > (850 * scaleFactor) && horse[i].body.velocity.x >0){
            	horse[i].body.velocity.x = Phaser.Math.Between(-5, 0)*scaleFactor;
            	}
            else{
            	horse[i].body.velocity.x = Phaser.Math.Between(-10, 10)*scaleFactor;
         }
         var startDur = Phaser.Math.Between(9, 14)*1000;
    
            var timeline = this.tweens.timeline({
    
                tweens: [{
                    targets: horse[i],
                    x: startPos-(scaleFactor*Phaser.Math.Between(0, 350)),
                    duration: startDur,
                    ease: 'Sine.easeInOut',
                    delay: delay*2
                    }]
    			
            });
            



        }
    }
    
    addVehicle(){
    	  var exit = 1-(Phaser.Math.Between(0, 1)*2);
    	  vehicle = this.physics.add.sprite(-500*scaleFactor, 420*scaleFactor, nextVehicle);
        vehicle.setScale(2*scaleFactor,2*scaleFactor);
        vehicle.body.velocity.x = (60 * goSpeed * scaleFactor)*exit;
    		if(nextVehicle=='ambulance'){nextVehicle = 'camtruck';}
    		else{nextVehicle = 'ambulance';}
    		
    		var startDur = Phaser.Math.Between(9, 14)*1000;
    
            var timeline = this.tweens.timeline({
    
                tweens: [{
                    targets: vehicle,
                    x: (scaleFactor*Phaser.Math.Between(650, 1250)),
                    duration: startDur,
                    ease: 'Sine.easeInOut',
                    delay: 0
                    }]
    			
            });
            
            //this.timedEvent = this.time.addEvent({ delay: Phaser.Math.Between(10000, 25000), callback: this.addVehicle, callbackScope: this, loop: false });
        
    
    }


    stadiumAnim(item){
    item.tilePositionX += 1024;
    //console.log('loop');
    return;
    }



    addFinishLine() {


        
		  arrowFlag = false;
		  
        finishLine = this.physics.add.sprite(windowWidth * 2, windowHeight - 190, 'finish');
        finishMarker = this.physics.add.sprite(windowWidth * 1.875, 0, 'finishMarker'); //was 1.1
        finishPost = this.physics.add.sprite(windowWidth * 1.975, 200, 'finishPost');
        finishPostBig = this.physics.add.sprite(windowWidth * 1.958, 480, 'finishPost');
        finishLine.setScale(0.75*scaleFactor, 0.75*scaleFactor);
       

        finishPost.setScale(2*scaleFactor, 2*scaleFactor);
        finishPostBig.setScale(3*scaleFactor, 3*scaleFactor);
        finishPost.setOrigin(0,0);
        finishPostBig.setOrigin(0,0);
        finishMarker.setScale(5*scaleFactor, 5*scaleFactor);
        finishMarker.setOrigin(0,0);
        finishLine.body.velocity.x = (-540 * goSpeed * scaleFactor);  
		  finishMarkerFlag = 1;
		  finishMarker.body.velocity.x = (-540 * goSpeed * scaleFactor);
        finishPost.body.velocity.x = (-540 * goSpeed * scaleFactor);
        finishPostBig.body.velocity.x = (-540 * goSpeed * scaleFactor);
        
        //finishLine.checkWorldBounds = true;
       // finishLine.outOfBoundsKill = true;
        finishMarker.checkWorldBounds = true;
        finishMarker.outOfBoundsKill = true;
        finishPost.checkWorldBounds = true;
        finishPost.outOfBoundsKill = true;
        finishPostBig.checkWorldBounds = true;
        finishPostBig.outOfBoundsKill = true;
        this.timedEvent = this.time.addEvent({ delay: 10000, callback: function() { finishLine.destroy();}, callbackScope: this, loop: false });
        

        if (this.isFinishAlive) {
            fenceCollider = this.physics.add.overlap(horse, finishLine, this.slowDown, null, this);
        }
        
    }

    triggerFinish() {
        this.timedEvent = this.time.addEvent({ delay: finalStraightDuration, callback: this.addFinishLine, callbackScope: this, loop: false });
        this.isFinishAlive = true;
        
    }

    moveTrack() {
        trotTime = true;
    }
    
    
    photoFlash() {

    //  You can set your own flash color and duration
    //this.camera.flash(0xffffff, 500);
    this.cameras.main.flash();

}





}


class UserInSc extends Phaser.Scene {

    constructor () {
        super({key: 'UserInSc', active: true});
    }

    preload() {

    }

    create() {

       this.timedEvent = this.time.addEvent({ delay: 1500, callback: this.testCommentaryBox, callbackScope: this});
       
    }

    update() {


    }

    testCommentaryBox() {

      //this.showCommentaryBox("HELLO THERE! Put Some Text Here!");
		//this.timedEvent = this.time.addEvent({ delay: 5000, callback: this.hideCommentaryBox, callbackScope: this});
    }

    showCommentaryBox(text) {

       var commBox = this.add.group();
       var rect = new Phaser.Geom.Rectangle(0, (960*scaleFactor), windowWidth, 70);
       var commBack = this.add.graphics({ fillStyle: { color: 0x0000ff } });
       commBack.fillRectShape(rect);

       rect.depth += windowHeight;

       var style = { 
           fontSize: 24,
           fontFamily: 'Arial',
           align: "center"
       }

       var commText = this.add.text(windowWidth / 2, (1020*scaleFactor), text, style).setOrigin(0.5, 0.5);

       commBox.add(commBack);
       commBox.add(commText);

       this.commBox = commBox;

    }

    hideCommentaryBox() {
		//this.commBox.commBack.destroy();
    }



}
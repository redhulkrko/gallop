class StandingsSc extends Phaser.Scene {
	
	    numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	 }

    constructor ()
    {
        super({ key: 'StandingsSc' });
    }

    preload ()
    {
        //this.load.spritesheet('bobs', 'assets/sprites/bobs-by-cleathley.png', { frameWidth: 32, frameHeight: 32 });
    }

    create ()
    {
        console.log('Standings scene');
        
        
        
        
//this.time.addEvent({ delay: 5000, callback: function() { this.scene.start('GameSc');}, callbackScope: this});
//this.time.addEvent({ delay: 5000, callback: function() { let theOtherScene = this.scene.get('GameSc'); theOtherScene.scene.restart();}, callbackScope: this});

 
 	//get array of previous user points
 	//get array of race user points
 	//add together into old array
 	//display as leader board
	 
	var pos = playerNames.length - 1;

	var keyPlayers = [];
	 for (var q = 0; q < (playerNames.length); q++){
	 	playerPreviousPoints[q] = playerPreviousPoints[q]+playerPoints[q];
	 	
	 	if(q<10){keyPlayers[q] = Number(playerPreviousPoints[q]+'.0'+q).toFixed(2);}
	 	else{keyPlayers[q] = Number(playerPreviousPoints[q]+'.'+q).toFixed(2);}
	 	console.log(keyPlayers[q]);
	 	}
	 	
	keyPlayers.sort(function(a, b){return b-a});
	var keyExtract;
	
	for (var q = 0; q < (playerNames.length); q++){
	
	//print out the standings
       resultsTitleRect = this.add.image(windowWidth/2, (200*scaleFactor), 'rectangle2');
       resultsTitleRect.setPosition(-2000,(130*scaleFactor));
       resultsTitleRect.setScale(windowWidth/2, 95*scaleFactor);
       resultsTitleRect.depth += windowHeight*2;             	  

        resultsTitleText = this.make.text({
                x: windowWidth / 2,
                y: windowHeight / 2 - 50,
                text: 'Overall Standings',
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
         
         resultsTitleText.x = windowWidth*0.3;  
	 		resultsTitleRect.x = windowWidth*0.75; 	
	 		}
      
        // create graphics for reduced Results List
		for (var i = 0; i < playerNames.length; i++) {
         	
         reducedResultsRect[i] = this.add.image(windowWidth/2, (200*scaleFactor), 'rectangle1');
         
  
       	
       	reducedResultsRect[i].setPosition(windowWidth*0.75,(230*scaleFactor));
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
         reducedResultsTextPos[i].setPosition(windowWidth*0.3,(200*scaleFactor));
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
        
	
	
	for (var qi = 0; qi < (playerNames.length); qi++){
	keyExtract = keyPlayers[qi]+'.-null';

keyExtract = keyExtract.replace('.','~');
keyExtract = keyExtract.split("~");	
	
	console.log(keyExtract[0]+" "+qi);
	console.log(keyExtract[1]);
	 reducedResultsTextPos[qi].setText(qi+1);
	 reducedResultsTextHorse[qi].setText(horseNames[playerHorses[parseInt(keyExtract[1],10)]]);
	 reducedResultsTextPts[qi].setText('£'+(parseInt(keyExtract[0],10)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
	 reducedResultsTextPlyr[qi].setText(playerNames[parseInt(keyExtract[1],10)]);
	 

	 	
	 //position = top of list
	 reducedResultsTextPos[qi].x = (windowWidth/2)-(500*scaleFactor);
	 reducedResultsTextHorse[qi].x = (windowWidth/2)-(40*scaleFactor);
	 reducedResultsTextPts[qi].x = (windowWidth/2)+(340*scaleFactor);
	 reducedResultsTextPlyr[qi].x = (windowWidth/2)-(400*scaleFactor);
	 reducedResultsRect[qi].x = windowWidth*0.75;
	 
	 reducedResultsTextPos[qi].y += 90*scaleFactor*qi;
	 reducedResultsTextHorse[qi].y += 90*scaleFactor*qi;
	 reducedResultsTextPts[qi].y += 90*scaleFactor*qi;
	 reducedResultsTextPlyr[qi].y += 90*scaleFactor*qi;
	 reducedResultsRect[qi].y += 90*scaleFactor*qi;
	 
	 //pos -=1;	
	 
	 if(qi == 1){
	 	currentGame2nd = parseInt(keyExtract[1],10);
	 	console.log("Game 2nd "+parseInt(keyExtract[1],10));
	 }
	 
	 if(qi == 0){
	 	currentGame1st = parseInt(keyExtract[1],10);
	 	console.log("Game 1st "+parseInt(keyExtract[1],10));
	 }
	
	}
	
	
	
	if(isFirstRace == 1){ isFirstRace = 0;}
	scupperGame1st = 0;
	scupperGame2nd = 0;
	currentUser = 100;
	cueRaceEndMusic = 0;
	 

this.time.addEvent({ delay: 20000, callback: function() { this.scene.start('PreloadSc');}, callbackScope: this});
    }

}
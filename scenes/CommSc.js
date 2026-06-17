var commentary;

//MATT-insert
var hdHeight = 1080; //1080  //216
var hdWidth = 1920; //1920 //384

var scaleFactor = windowHeight / hdHeight;

var midHeight = windowHeight / 2;
var midWidth = windowWidth / 2;

var commBox;
var commText;
var comms;
var commsColour;
var fallerArray = [];
var retireArray = [];
var triggered;
var timedEvent;
var timedEventR;
var data;
var c = 0;

class CommSc extends Phaser.Scene {

    constructor() {
        super({
            key: 'CommSc'
        });
    }

    preload() {

        data = [
            {
              names: this.toSentence,
              text: [
                "{names}",
                {
                  one: "goes",
                  two: "both go",
                  more: "all go"
                },
                "down"
              ]
            },
            {
              names: this.toSentence,
              text: [
                "{names}",
                {
                  one: "is",
                  two: "are both",
                  more: "are all"
                },
                "down"
              ]
            },
            {
              names: this.toSentence,
              text: [
                "{names}",
                {
                  one: "is a",
                  two: "are both",
                  more: "are all"
                },
                {
                  one: "faller",
                  more: "fallers"
                }
              ]
            },
            {
              names: this.toSentence,
              text: [
                "{names}",
                {
                  one: "has",
                  two: "have both",
                  more: "have all"
                },
                "fallen"
              ]
            },
            {
              names: this.toSentence,
              text: [
                "{names}",
                {
                  one: "has",
                  more: "have"
                },
                "gone"
              ]
            },
            {
              names: this.toSentence,
              text: [
                "We've lost",
                "{names}"
              ]
            },
            {
              names: this.toSentence,
              text: [
                "{names}",
                {
                    one: "unseats his rider",
                    more: "have unseated their riders"
                }
              ]
            }
          ];

    }

    create() {

        commBox = this.add.group();
        // this.scene.get('GameSc').events.on('horseRetire', this.horseRetire, this);

        this.scene.get('GameSc').events.on('addFence', function() {
        triggered = true;

        if(triggered){
            this.scene.get('GameSc').events.once('firstHorse', function() {
                
                console.log('triggered');
                timedEvent = this.time.addEvent({ delay: 500, callback: this.changeStatus, callbackScope: this, loop: true });
                triggered=false;

             }, this);
        }

        }, this);

        timedEventR = this.time.addEvent({ delay: 750, callback: this.horseRetire, callbackScope: this, loop: true });


    }

    horseRetire() {
        console.log('r-check');
        console.log(horseState);
        for (const [i, v] of horseState.entries()) {
            if (v === 9 && retireArray.indexOf(horseNames[i]) === -1) {
                retireArray.push(horseNames[i]);
            }
        };

        if (retireArray.length === 0) {
            timedEventR.paused = false;
        }

        if (retireArray.length > 0) {
            timedEventR.paused = true;
            comms = retireArray[0] + ' has retired';
            commsColour = '#0054bc';
            this.displayCommentary(comms, commsColour);
            this.time.addEvent({ delay: 500, callback: function() { retireArray = [] }, callbackScope: this });
        }


    }

    changeStatus() {

        for (const [i, v] of horseState.entries()) {
            if (v === 3 && fallerArray.indexOf(horseNames[i]) === -1) {
                fallerArray.push(horseNames[i]);
            }
        };

        console.log(c);
        console.log(fallerArray);
    
        c++;

        if (c === 8) {
            timedEvent.remove(false);
            console.log('stop');
            if (fallerArray.length > 0) {

                let out = "";
                let index = Math.floor(Math.random() * data.length);
                let message = data[index];
                commsColour = '#ff00ff';
        
                let count = fallerArray.length;
                out = this.parseMessage(fallerArray.slice(0, count), message).join(" ");
        
                console.log(out + ' (' + count + ')');

                this.displayCommentary(out, commsColour);
            }
            c = 0;
            fallerArray = [];
        }

    }

    // renderCommentary() {
        
        // texts = [
        //         "There are 26 runners in this race", 
        //         "And they begin to move forward, the flag is up, the start is ready for them.",
        //         "Circling at the start in Cheltenham sunshine. Tension in the stands.", 
        //         "The 24 runners for this race are called together and they are off.",
        //         "As they leave the ground for the first time", 
        //         "That's it they're off and racing",
        //         "Just four minutes until the starter will drop the flag, and then it's 30 huge fences and four and a half miles between one horse and glory.", 
        //         "And they're off in the 2011 Cheltenham Gold Cup... Just what is in store for us in these next few minutes?"
        // ];

        // texts = [
        //         "Welcome to Taunton Racecourse, set in the heart of the Somerset countryside",
        //         "Runners expected to enjoy near perfect weather conditions in today's race",
        //         "England's youngest jumps racecourse, staging around fifteen race meetings each season",
        //         "The going is good to soft and good in places",
        //         "And they begin to move forward, the flag is up, the start is ready for them."
        // ];

        // this.timedEvent = this.time.addEvent({
        //     delay: 1500,
        //     callback: this.displayCommentary,
        //     callbackScope: this,
        //     loop: true
        // });

    // }

    toSentence(names) {
        return names.slice(0, -2).join(', ') + 
            (names.slice(0, -2).length ? ', ' : '') + 
            names.slice(-2).join(' and ');
        }


    parseMessage(names, message) {
        return message.text.map(function(value, key) {
          if (typeof value === "string") {
            if (value === "{names}") {
              return message.names(names);
            }
            return value;
          } else if (typeof value === "object") {
            if (names.length == 1) {
              return value.one;
            } else if (names.length == 2) {
              return value.two || value.more;
            } else {
              return value.more;
            }
          }
        });
      }
    

    displayCommentary(cText, bColor) {

        var style = {
            fontSize: 24,
            fontFamily: 'Arial',
            fontStyle: 'bold',
            align: 'center',
            backgroundColor: bColor
        }

        commText = this.add.text(windowWidth / 2, (1030 * scaleFactor), '', style).setOrigin(0.5, 0.5).setPadding({ x: windowWidth / 2, y: 16 });
        
        commBox.add(commText);

        commText.setText(cText);

        this.time.addEvent({ delay: 2000, callback: this.hideCommentary, callbackScope: this });
        
    }

    hideCommentary() {

        console.log('destroy');
        commBox.clear(true);
        console.log(fallerArray);

    }


}

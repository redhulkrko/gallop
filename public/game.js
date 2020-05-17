
  class WorldScene extends Phaser.Scene {
    constructor() {
      super({
        key: 'WorldScene'
      });
    }
    
    preload ()
{
    
    this.load.pack('main', 'pack.json');
}
  
    create() {
        this.socket = io();
        this.otherPlayers = this.physics.add.group();

        this.createAnimations();
        // user input
      this.cursors = this.input.keyboard.createCursorKeys();
        var playerCount = 0;
      // listen for web socket events
      this.socket.on('currentPlayers', function (players) {
        Object.keys(players).forEach(function (id) {
            playerCount++;
          if (players[id].playerId === this.socket.id) {
            this.createPlayer(players[id]);
          } else {
            this.addOtherPlayers(players[id]);
          }
        }.bind(this));
      }.bind(this));
     
      this.socket.on('newPlayer', function (playerInfo) {
        this.addOtherPlayers(playerInfo);
      }.bind(this));
    }
  
    createAnimations() {
        //  animation with key 'left', we don't need left and right as we will use one and flip the sprite
        this.anims.create({
          key: 'gallop',
          frames: this.anims.generateFrameNumbers('geegee1', {
            frames: [2,3,4,5,6,7,8,9,10,0,1]
          }),
          frameRate: 21,
          repeat: -1
        });
      
        // animation with key 'right'
        this.anims.create({
          key: 'jump',
          frames: this.anims.generateFrameNumbers('geegee1', {
            frames: [4, 11, 12, 13, 14, 15, 16, 17, 18, 1]
          }),
          frameRate: 14
        });
      }
  
      createPlayer(playerInfo) {
        // our player sprite created through the phycis system
        this.player = this.physics.add.sprite(100, 300, 'geegee1');
      
        this.container = this.add.container(playerInfo.x, playerInfo.y);
        this.container.setSize(240, 300);
        this.physics.world.enable(this.container);
        this.container.add(this.player);
      
        // don't go out of the map
        this.container.body.setCollideWorldBounds(true);
      }

      addOtherPlayers(playerInfo) {
        const otherPlayer = this.add.sprite(playerInfo.x, playerInfo.y, 'geegee1', 9);
        otherPlayer.playerId = playerInfo.playerId;
        this.otherPlayers.add(otherPlayer);
      }
      
      update() {
        if (this.container) {
          // Update the animation last and give left/right animations precedence over up/down animations
          if (this.cursors.up.isDown) {
            this.player.anims.play('jump', true);
          } else {
            this.player.anims.play('gallop', true);
          }
        }
      }
    }
      
  
  var config = {
    type: Phaser.CANVAS,
        width: 800,
        height: 600,
        backgroundColor: '#71c5cf',
        pixelArt: true,
        physics: {
            default: 'arcade',
            arcade: {
                debug: false
            }
        },
    scene: [
      WorldScene
    ]
  };
  var game = new Phaser.Game(config);
  
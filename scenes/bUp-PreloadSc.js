
// variables


var horseQty = 10;


class PreloadSc extends Phaser.Scene {
    
    constructor () {
        super({key: 'PreloadSc'});
    }
    
    preload() {

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
            
        
            for (var i = 0; i < horseQty; i++) {
                this.load.spritesheet('geegee' + i, 'assets/compressed/horse-' + i + '.png', { frameWidth: 368, frameHeight: 300 });
            }

            this.load.image('fence', 'assets/compressed/jumpfence1.png'); 
            //this.load.image('track', 'assets/grasstrack1.png');
            this.load.image('finish', 'assets/compressed/finishline.png');

    }
    
    create() {
        
        for (var i = 0; i < horseQty; i++) {

        var fpsGallop = Phaser.Math.Between(16, 22);

        // gallop animation
        this.anims.create({
            key: 'gallop' + i,
            frames: this.anims.generateFrameNumbers('geegee' + i, { start: 0, end: 10 }),
            frameRate: fpsGallop,
            repeat: -1
        });
            
        }
        
        for (var i = 0; i < horseQty; i++) {
        
        var fpsJump = Phaser.Math.Between(12, 16);

        // jump animation
        this.anims.create({
            key: 'jump' + i,
            frames: this.anims.generateFrameNumbers('geegee' + i, { frames: [4, 11, 12, 13, 14, 15, 16, 17, 4] }),
            frameRate: fpsJump
        });
            
        }

        for (var i = 0; i < horseQty; i++) {

        var fpsCanter = Phaser.Math.Between(8, 14);
    
        // gallop animation
        this.anims.create({
            key: 'canter' + i,
            frames: this.anims.generateFrameNumbers('geegee' + i, { start: 26, end: 33 }),
            frameRate: fpsCanter,
            repeat: -1
        });
                
        }
        
        this.scene.start('GameSc');

    }

}
var bootState = {
    init: function() {
        game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
        game.scale.pageAlignVertically = true;
        game.scale.pageAlignHorizontally = true;
        game.scale.refresh();
         
    },
    
    preload: function() {
        game.load.image('loadBar', 'assets/platform3.png');    
    },
    
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.state.start("load");
        
    }
};
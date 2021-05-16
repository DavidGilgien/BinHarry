export class loseScene extends Phaser.Scene{
    constructor(){
        super("lose")
    }
    init(data){
        this.level = data.level_ind;
    }
    preload(){
       
    }
    create(){
        this.add.text(this.game.renderer.width / 2, this.game.renderer.height/4, "Game Over", 
                        { color: 'black', 
                        fontFamily: 'Andale Mono', 
                        fontSize: '64px ',
                        backgroundColor: '#e30000',
                        padding: {left:10, right:10, bottom:10, top:10}
                    }).setOrigin(0.5, 0.5);

        this.add.text(this.game.renderer.width / 2, this.game.renderer.height*0.4, "Level ".concat(this.level, ": temps écoulé!"), 
                    { color: 'black', 
                    fontFamily: 'Andale Mono', 
                    fontSize: '32px ',
                    backgroundColor: '#e30000',
                    padding: {left:10, right:10, bottom:10, top:10}
                }).setOrigin(0.5, 0.5);
        let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height *0.65, 'new_btn')
        playButton.setInteractive();
        let scoreButton = this.add.image(this.game.renderer.width*7/8, this.game.renderer.height *9/10, 'score_btn')
        scoreButton.setInteractive();
        var rect = this.add.rectangle(200, 400, 40, 100, 0xe30000);
        var rect_sc = this.add.rectangle(200, 400, 20, 50, 0x0de7ff);
        rect.setVisible(false);
        rect_sc.setVisible(false);

        playButton.on("pointerup", ()=>{

            this.scene.start("play", {level_ind: this.level, instr_pass: 1})
        })

        playButton.on("pointerover", ()=>{
            rect.setVisible(true);
            rect.x = playButton.x - playButton.width/2 - 40;
            rect.y = playButton.y;
        })

        playButton.on("pointerout", ()=>{
            rect.setVisible(false);
        })

        scoreButton.on("pointerup", ()=>{
            this.scene.launch("score");
        })
       
        scoreButton.on("pointerover", ()=>{
            rect_sc.setVisible(true);
            rect_sc.x = scoreButton.x - scoreButton.width/2 - 20;
            rect_sc.y = scoreButton.y;
        })

        scoreButton.on("pointerout", ()=>{
            rect_sc.setVisible(false);
        })
       
    }
    update(){
       
    }

}
export class scoreScene extends Phaser.Scene{
    constructor(){
        super("score")
    }

    init(){
    }

    preload(){
    }
    create(){
        this.bg = this.add.image(0,0, 'score_bg').setOrigin(0,0);
        this.text = this.add.text(this.game.renderer.width *4/9, this.game.renderer.height*3/9, "", 
        { color: '#0de7ff', 
        fontFamily: 'Andale Mono', 
        fontSize: '40px ',
        }).setOrigin(0.5, 0.5);
        this.text.setText(this.registry.get("scores_arr"))

        this.text_tot = this.add.text(this.game.renderer.width *4/9, this.game.renderer.height*7/9, "", 
        { color: '#0de7ff', 
        fontFamily: 'Andale Mono', 
        fontSize: '54px ',
        }).setOrigin(0.5, 0.5);
        this.text_tot.setText("Total:  ".concat(this.registry.get("total_score")))
        let backButton = this.add.image(this.game.renderer.width *5/ 6, this.game.renderer.height *7/ 8, 'back_btn')
        backButton.setInteractive();
        var rect = this.add.rectangle(200, 400, 25, 50, 0x20d465);
        rect.setVisible(false);

        backButton.on("pointerup", ()=>{
            this.scene.stop("score");
        })
        
        backButton.on("pointerover", ()=>{
            rect.setVisible(true);
            rect.x = backButton.x - backButton.width/2 - 25;
            rect.y = backButton.y;
        })

        backButton.on("pointerout", ()=>{
            rect.setVisible(false);
        })



    }
    update(){
       
    }

}
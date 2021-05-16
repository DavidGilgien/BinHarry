export class winScene extends Phaser.Scene{
    constructor(){
        super("win")
    }
    init(data){
        this.level = data.level_ind
        this.score = data.score
        this.level_max = data.level_max
        if(this.level == 1) {
            this.scores = ["Level ".concat(this.level, ":  ",this.score)]
            this.registry.set('total_score', this.score)
        }
        else{
            this.scores = this.registry.get("scores_arr")
            this.scores.push("Level ".concat(this.level, ":  ",this.score))
            this.registry.set('total_score', this.registry.get('total_score')+this.score)
        }
        this.registry.set('scores_arr', this.scores)
    }
    preload(){
    }
    create(){

        this.add.text(this.game.renderer.width / 2, this.game.renderer.height/4, "Level ".concat(this.level, " réussi!"), 
                        { color: 'black', 
                        fontFamily: 'Andale Mono', 
                        fontSize: '64px ',
                        backgroundColor: '#20d465',
                        padding: {left:10, right:10, bottom:10, top:10}
                    }).setOrigin(0.5, 0.5);
        this.add.text(this.game.renderer.width / 2, this.game.renderer.height*0.4, "Score: ".concat(this.score), 
                        { color: 'black', 
                        fontFamily: 'Andale Mono', 
                        fontSize: '32px ',
                        backgroundColor: '#20d465',
                        padding: {left:10, right:10, bottom:10, top:10}
                    }).setOrigin(0.5, 0.5);
        let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height*0.65, 'next_btn')
        let scoreButton = this.add.image(this.game.renderer.width*7/8, this.game.renderer.height *9/10, 'score_btn')
        var rect = this.add.rectangle(200, 400, 40, 100, 0x20d465);
        var rect_sc = this.add.rectangle(200, 400, 20, 50, 0x0de7ff);
        rect.setVisible(false);
        rect_sc.setVisible(false);
        
        if(this.level+1 > this.level_max){
            playButton.setVisible(false)
        }

        playButton.setInteractive();
        scoreButton.setInteractive();

        playButton.on("pointerup", ()=>{
            this.scene.start("play", {level_ind: this.level+1, instr_pass: 0})
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
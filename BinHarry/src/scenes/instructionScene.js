export class instructionScene extends Phaser.Scene{
    constructor(){
        super("instruction")
    }

    init(data){
        this.instr_text = data.instr_text
        this.level_ind = data.level_ind
    }
    preload(){
    }
    create(){
        this.bg = this.add.image(0,0, 'score_bg').setOrigin(0,0);
        this.make.text({
            x: this.game.renderer.width/2, 
            y: this.game.renderer.height*2/5,
            text: this.instr_text,
            origin: { x: 0.5, y: 0.5 },
            style: {
                color: '#0de7ff', 
                fontSize: '32px',
                fontFamily: 'Andale Mono', 
                wordWrap: { width: 500 }
            }
        });
        this.make.text({
            x: this.game.renderer.width/2, 
            y: this.game.renderer.height*6/7,
            text: "Quand tu es prêt, appuie sur espace!",
            origin: { x: 0.5, y: 0.5 },
            style: {
                color: '#0de7ff', 
                fontSize: '32px',
                fontFamily: 'Andale Mono'
            }
        });
        this.touchSpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }
    update(){
        if (Phaser.Input.Keyboard.JustDown(this.touchSpace))
        {
            this.scene.start("play", {level_ind: this.level_ind, instr_pass: 1})
        }
       
    }

}
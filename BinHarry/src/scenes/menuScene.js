export class menuScene extends Phaser.Scene{
    constructor(){
        super("menu")
    }
    init(){

    }
    preload(){
        this.load.image('menu_bg', './dist/assets/menu_bg_3.png');
        this.load.image('play_btn', './dist/assets/play_btn.png');
        this.load.image('terminal', './dist/assets/terminal.png');
        this.load.image('harry', './dist/assets/harry.png');
        this.load.image('harry_bg', './dist/assets/harry_bg.png');
        this.load.image('score_bg', './dist/assets/score_bg.png');
        this.load.image('bulle', './dist/assets/bulle.png');
        this.load.image('next_btn', './dist/assets/next_btn.png');
        this.load.image('score_btn', './dist/assets/scores_btn.png');
        this.load.image('new_btn', './dist/assets/new_btn.png');
        this.load.image('back_btn', './dist/assets/back_btn.png');
        this.load.image('right_image', './dist/assets/right_image.png');
        this.load.image('wrong_image', './dist/assets/wrong_image.png');
        this.registry.set('total_score', 0)
    }
    create(){

        this.bg = this.add.image(0,0, 'menu_bg').setOrigin(0,0);
        var rect = this.add.rectangle(200, 400, 50, 120, 0x66f542);
        rect.setVisible(false);

        let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'play_btn')
        playButton.setInteractive();

        playButton.on("pointerup", ()=>{
            this.scene.start("play", {level_ind: 1, instr_pass: 0})
        })
        
        playButton.on("pointerover", ()=>{
            rect.setVisible(true);
            rect.x = playButton.x - playButton.width/2 - 40;
            rect.y = playButton.y;
        })

        playButton.on("pointerout", ()=>{
            rect.setVisible(false);
        })

        

    }
    update(){
        this.scrollbg(this.bg,1)
    }

    scrollbg(bg, speed)
    {
        bg.y = bg.y - speed
        if(bg.y < (bg.height*-1)+600){
            bg.y = 0
        }
    }

}
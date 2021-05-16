import{levels} from "../levels.js";
export class playScene extends Phaser.Scene{
    constructor(){
        super("play")
    }

init(data){
    this.level_ind = data.level_ind;
    let lev = "level_".concat(this.level_ind);
    this.level = levels[lev];
    this.instr_pass = data.instr_pass;
}

preload ()
{
    if(this.level.instr != "" & this.instr_pass == 0){
        this.scene.start("instruction", {instr_text: this.level.instr, level_ind: this.level_ind})
    } 
}


create ()
{
    this.add.image(500, 300, 'terminal');
    this.add.image(750, 180,'harry_bg');
    this.add.sprite(750, 200, 'harry');
    this.add.image(400, 200, 'bulle');
    this.cur_index = Math.floor(Math.random() *this.level.len);
    this.ask = this.add.text(360, 140, this.level.decimals[this.cur_index], { color: 'black', fontFamily: 'Andale Mono', fontSize: '50px '});
    this.userInput = "";
    this.text = this.add.text(200, 400, this.userInput, { color: '#7FFF00', fontFamily: 'Andale Mono', fontSize: '100px '});
    this.add.text(860, 10, "Level: ".concat(this.level_ind), { color: '#7FFF00', fontFamily: 'Andale Mono', fontSize: '18px '})
    
    // Add the score
    this.score = 0;
    this.score_text = this.add.text(860, 35, "Score: ".concat(this.score, "/", this.level.goal), { color: '#7FFF00', fontFamily: 'Andale Mono', fontSize: '18px '})
    
    // Add a timer
    this.timedEvent = new Phaser.Time.TimerEvent({ delay: this.level.temps*1000 });
    this.time.addEvent(this.timedEvent);
    this.time_text = this.add.text(890, 60, "T: ".concat(this.timedEvent.delay), { color: '#7FFF00', fontFamily: 'Andale Mono', fontSize: '18px '});
    
    // Keyboard logic
    this.touch0 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO);
    this.touch1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    this.touchBackspace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE);
    this.touchEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
   
    // Wrong and right images
    this.r_image = this.add.image(800, 400, 'right_image');
    this.r_image.visible = false;
    this.w_image = this.add.image(780, 450, 'wrong_image');
    this.w_image.visible = false;
    this.w_text = this.add.text(50, 520, "Ton essai était ", { color: '#0de7ff', fontFamily: 'Andale Mono', fontSize: '40px'});
    this.w_text.visible = false;

}

update ()
{
    if (Phaser.Input.Keyboard.JustDown(this.touch0))
        {
            this.userInput = this.userInput.concat("0");
        }
    if (Phaser.Input.Keyboard.JustDown(this.touch1))
         {
            this.userInput = this.userInput.concat("1");
         }
    if (Phaser.Input.Keyboard.JustDown(this.touchBackspace))
        {
            this.userInput = "";
        }
    if (Phaser.Input.Keyboard.JustDown(this.touchEnter))
        {
            this.validateAnswer();
        }

    if(this.timedEvent.getProgress() == 1){
        this.scene.start("lose", {level_ind: this.level_ind})
    }
    
    this.ask.setText(this.level.decimals[this.cur_index]);
    this.text.setText(this.userInput);
    this.score_text.setText("Score: ".concat(this.score, "/", this.level.goal));
    this.time_text.setText("T: ".concat(Math.round(this.timedEvent.getRemainingSeconds()*100)/100));
}

validateAnswer() {
    if(parseInt(this.userInput, 2) == parseInt(this.level.binary[this.cur_index], 2)){
        this.w_text.visible = false;
        this.score++;
        if(this.score == this.level.goal){
            this.scene.start("win", {level_ind: this.level_ind, score: Math.round(this.timedEvent.getRemaining()), level_max: Object.keys(levels).length});

        }else{
            this.r_image.visible = true;
            this.timed_r_image = this.time.delayedCall(1000, this.onEventr, [], this);
            let new_index = Math.floor(Math.random()*this.level.len);
            while(new_index == this.cur_index){
                new_index = Math.floor(Math.random()*this.level.len);
            }
            this.cur_index = new_index;
        }
        

    }else{
        this.w_image.visible = true;
        this.timed_w_image = this.time.delayedCall(1000, this.onEventw, [], this);
        this.w_text.setText("Ton essai était ".concat(parseInt(this.userInput, 2)))
        this.w_text.visible = true;
        this.timed_w_text = this.time.delayedCall(5000, this.onEventw_text, [], this);
    }
    this.userInput = ""
}

onEventr ()
{
    this.r_image.visible = false;
}

onEventw ()
{
    this.w_image.visible = false;
}

onEventw_text ()
{
    this.w_text.visible = false;
}

}
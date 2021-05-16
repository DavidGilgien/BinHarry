/**@type import("../typings/phaser") */

import { menuScene } from "./scenes/menuScene.js";
import { playScene } from "./scenes/playScene.js";
import { winScene } from "./scenes/winScene.js";
import { loseScene } from "./scenes/loseScene.js";
import { scoreScene } from "./scenes/scoreScene.js";
import { instructionScene } from "./scenes/instructionScene.js";

var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    scene: [menuScene, instructionScene, playScene, winScene, loseScene, scoreScene]
};

var game = new Phaser.Game(config);

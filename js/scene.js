import Paddle from "./paddle.js";
import Ball from "./ball.js";

export default class MainScene extends Phaser.Scene {
    constructor () {
        super('MainScene');
    }

    init() {
        this.padddleOffsetX = 80;

        // this.scoreLeft = 0;
        // this.scoreRight = 0;

        this.score = {
            left: 0,
            right: 0
        }
     }

    preload() {
        this.load.image('paddle', './images/paddle.png');
        this.load.image('ball', './images/ball.png');
     }

    create() {
        this.paddleL = this.paddleL.existing(
            new Paddle(this, this.padddleOffsetX,
                this.game.config.height * 0.5, 'paddle',
                { 'up': 38, 'down':40})
        );
        this.paddleL.init();

        this.paddleR = this.add.existing(
            new Paddle(this,
                this.game.config.width - this.padddleOffsetX,
                this.game.config.height * 0.5, 'paddle',
                { 'up': 65, 'down': 90})
                
        );
        this.paddleR.init();

        this.ball = this.add.existing(
            new Ball(this,
                0, 0,
                'ball',
                this.paddleL, this.paddleR)
        );
        
        this.scoreText = this.add.text(
            this.game.config.width * 0.5, 80,
            `${this.score.left} - ${this.score.right}`,
            '0 - 0',
            {
                fontFamily: 'Arial',
                fontSize: 64,
                color: '#fff',
                align: 'center'
            }
        ).setOrigin(0.5)
     }

    scoreKeeper(paddle){
        // if(paddle == 'left') {
        //     this.score.left += 1;
        // }else if (paddle == 'right') {
        //     this.score.right += 1;
        // }

        this.score[paddle] += 1;
    }

    update(time) {
        this.paddleL.update(time);
        this.paddleR.update(time);
        this.ball.update(time);
     }
}
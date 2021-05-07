export default class Ball extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, paddleL, paddleR) {
        super(scene, x, y, texture);

        this.scene = scene;
        this.setScale(15, 15);

        this.setPosition(
            this.scene.game.config.width * 0.5,
            this.scene.game.config.height * 0.5
        );

        this.direction = {
            x: -1 + Math.random() * 2,
            y: -1 + Math.random() * 2
        }

        this.velocity = 2;
        this.accel = 0.01;

        this.paddleL = paddleL;
        this.paddleR = paddleR;

        this.halfSize = this.displayWidth * 0.5;
    }

    setPaddles(paddleL, paddleR)
    {
        this.paddleL = paddleL;
        this.paddleR = paddleR;
    }

    moveBall() {
        this.velocity += this.accel;
        this.x += this.velocity * this.direction.x;
        this.y += this.velocity * this.direction.y;
    }

    checkCollisions() {
        let myBounds = this.getBounds();
        let boundsL = this.paddleL.getBounds();
        let boundsR = this.paddleR.getBounds();

        if(
            Phaser.Geom.Intersects.RectangleToRectangle(myBounds, boundsL) ||
            Phaser.Geom.Intersects.RectangleToRectangle(myBounds, boundsR)
        ) {
            this.reverseMe('x');
        }

        if(this.y <= this.halfSize || this.y >= this.scene.game.config.height - this.halfSize)
        {
            this.reverseMe('y');
        } 
    }

    checkScoreAndReset() {
        if(this.x <= 0) {
            this.scene.scoreKeeper('right');
            this.resetMe();
        }
        if(this.x >= this.scene.game.config.width) {
            this.scene.scoreKeeper('left');
            this.resetMe();
        }
    }

    reverseMe(axis) {
        // if(axis == 'x')
        // {
        //     this.direction.x = -this.direction.x;
        // }
        // if(axis == 'y')
        // {
        //     this.direction.y = -this.direction.y;
        // }

        this.direction[axis] = -this.direction[axis];
    }

    resetMe() {
        this.setPosition(
            this.scene.game.config.width * 0.5,
            this.scene.game.config.height * 0.5
        );
        this.direction = {
            x: -1 + Math.random() * 2,
            y: -1 + Math.random() * 2
        }
        this.velocity = 2;
        
    }

    update(time) {
        this.checkCollisions();
        this.checkScoreAndReset();
        this.moveBall();
    }
}
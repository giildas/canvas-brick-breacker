import './app.css'
import Game from './lib/canvasGameEngine'

import Keys from './lib/Keys'
import Paddle from './Paddle'
import Ball from './Ball'

const OPTIONS = {
  debug: true
}

class Brick extends Game {
  setup () {
    // game objects
    this.paddle = new Paddle(this.w / 2, this.h - 20, 30)
    this.ball = new Ball(this.w / 2, this.h / 2, 6)

    // keys
    this.keyboard = new Keys(OPTIONS.debug)
    this.keyboard.addKeysAction(39, () => { this.paddle.move(1) }, () => { this.paddle.move(0) }) // right
    this.keyboard.addKeysAction(37, () => { this.paddle.move(-1) }, () => { this.paddle.move(0) }) // left
  }

  loop (elapsedTime) {
    this.ctx.fillStyle = '#000'
    this.ctx.fillRect(0, 0, this.w, this.h)

    this.ctx.fillStyle = '#FFF'
    this.ctx.fillText(`fps: ${1000 / elapsedTime}`, 15, 15)

    this.paddle.update(elapsedTime, this.w, this.h)
    this.ball.update(elapsedTime, this.w, this.h)
    this.ball.checkHits(this.paddle)

    this.paddle.draw(this.ctx)
    this.ball.draw(this.ctx)
  }
}

// create & setup the game
const game = new Brick('canvas', 'Casse Briques', 220, 360)
// start it
game.start()

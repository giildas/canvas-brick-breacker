import './app.css'
import Game from './canvasGameEngine'

class Brick extends Game {
  setup () {

  }

  loop (elapsedTime) {
    this.ctx.fillStyle = '#000'
    this.ctx.fillRect(0, 0, this.w, this.h)

    this.ctx.fillStyle = '#FFF'
    this.ctx.fillText(`fps: ${1000 / elapsedTime}`, 15, 15)
  }
}

// create & setup the game
const game = new Brick('canvas', 'Casse Briques', 220, 360)
// start it
game.start()

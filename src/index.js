import './app.css'
import Game from './lib/canvasGameEngine'

import Keys from './lib/Keys'
import Paddle from './Paddle'
import Ball from './Ball'
import Level from './Level'

const OPTIONS = {
  debug: true
}

const GAME_IS = {
  UNSTARTED: 0,
  STARTED: 1,
  PAUSED: 2,
  FINISHED: 3,
  LOST: 4
}

let level1 = ''
level1 += '...5445...'
level1 += '...4554...'

let level2 = ''
level2 += '..321123..'
level2 += '..123321..'

let level3 = ''
level3 += '.53166135.'
level3 += '.61355316.'

const levels = [level1, level2, level3]

class BrickBreaker extends Game {
  setup () {
    this.levelNb = 0
    this.lives = 3
    this.gameState = GAME_IS.UNSTARTED

    // game objects
    this.paddle = new Paddle(this.w / 2, this.h - 20, 30)
    this.ball = new Ball(this.w / 2, this.h / 2 - 40, 6)
    this.newLevel()

    // keys
    this.keyboard = new Keys(OPTIONS.debug)
    this.keyboard.addKeysAction(39, () => { this.paddle.move(1) }, () => { this.paddle.move(0) }) // right
    this.keyboard.addKeysAction(37, () => { this.paddle.move(-1) }, () => { this.paddle.move(0) }) // left
    this.keyboard.addKeyDownAction(32, () => {
      if (this.gameState === GAME_IS.UNSTARTED) {
        this.gameState = GAME_IS.STARTED
      } else if (this.gameState === GAME_IS.STARTED) this.gameState = GAME_IS.PAUSED
      else if (this.gameState === GAME_IS.PAUSED) this.gameState = GAME_IS.STARTED
      else if (this.gameState === GAME_IS.FINISHED) {
        this.levelNb = 0
        this.newLevel()
        this.gameState = GAME_IS.STARTED
      }
    }) // space
  }

  newLevel () {
    this.level = new Level(this.w, 20, 10, levels[this.levelNb])
  }

  loop (elapsedTime) {
    this.ctx.fillStyle = '#000'
    this.ctx.fillRect(0, 0, this.w, this.h)

    this.ctx.fillStyle = '#FFF'
    this.ctx.textAlign = 'left'
    this.ctx.textBaseline = 'alphabetic'
    this.ctx.font = '10px sans-serif'
    // fps: ${Math.round(1000 / elapsedTime)} -
    this.ctx.fillText(`Level: ${this.levelNb + 1}/${levels.length} - Gamestate: ${this.gameState}`, 15, 15)

    this.paddle.draw(this.ctx)
    if (this.level) this.level.draw(this.ctx)
    this.ball.draw(this.ctx)

    if (this.gameState !== GAME_IS.STARTED) {
      this.ctx.fillStyle = '#FFF'
      this.ctx.textBaseline = 'middle'
      this.ctx.textAlign = 'center'
      let text = ''
      switch (this.gameState) {
        case GAME_IS.UNSTARTED:
          text = 'Press "space" to start'
          this.ctx.font = '18px sans-serif'
          this.ctx.fillText(text, this.w / 2, this.h / 2)
          break
        case GAME_IS.PAUSED:
          this.ctx.font = '18px sans-serif'
          this.ctx.fillText('Pause', this.w / 2, this.h / 2)
          this.ctx.font = '12px sans-serif'
          this.ctx.fillText('Press "space" to resume', this.w / 2, this.h / 2 + 15)
          break
        case GAME_IS.FINISHED:
          this.ctx.font = '18px sans-serif'
          this.ctx.fillText('Congratulations !', this.w / 2, this.h / 2)
          this.ctx.font = '12px sans-serif'
          this.ctx.fillText('Press "space" to restart', this.w / 2, this.h / 2 + 15)
          break
      }
    } else {
      this.paddle.update(elapsedTime, this.w, this.h)

      // TODO BUG HERE
      if (this.ball.checkHitsPaddle(this.paddle)) {
        this.lives--
      } else {
        this.ball.update(elapsedTime, this.w, this.h)
      }
      this.ball.checkHitsBrick(this.level, OPTIONS.debug)
    }

    if (this.level.finished) {
      this.gameState = GAME_IS.UNSTARTED
      this.ball.reset()
      if (this.levelNb + 1 === levels.length) {
        this.gameState = GAME_IS.FINISHED
      } else {
        this.levelNb++
        this.newLevel()
      }
    }
  }
}

// create & setup the game
const game = new BrickBreaker('canvas', 'Casse Briques', 220, 360)
// start it
game.start()

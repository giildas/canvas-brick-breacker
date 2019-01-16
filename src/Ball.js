export default class Ball {
  constructor (x, y, radius) {
    this.origX = this.oldX = x
    this.origY = this.oldY = y
    this.r = radius
    this.speed = 0.2

    this.reset()
  }

  reset () {
    this.x = this.origX
    this.y = this.origY
    this.angle = (Math.random() * (Math.PI / 2)) + (Math.PI / 4)
  }

  checkHitsBrick (level, debug) {
    for (let i = level.bricks.length - 1; i >= 0; i--) {
      const brick = level.bricks[i]

      const oldInsideX = this.oldX + this.r > brick.x && this.oldX - this.r < brick.x + brick.size
      const oldInsideY = this.oldY + this.r > brick.y && this.oldY - this.r < brick.y + brick.size
      const insideX = this.x + this.r > brick.x && this.x - this.r < brick.x + brick.size
      const insideY = this.y + this.r > brick.y && this.y - this.r < brick.y + brick.size

      if (insideX && insideY) {
        if (!debug) {
          if (!oldInsideX) this.invertX()
          if (!oldInsideY) this.invertY()
        }
        level.bricks.splice(i, 1)
        return
      }
    }
  }

  checkHitsPaddle (paddle) {
    const offset = this.x - paddle.x
    if (
      // is ball on the bottom ?
      this.y + this.r >= paddle.y &&
      this.y + this.r < paddle.y + 8 &&
      // is ball is good for left/right ?
      offset + this.r >= -paddle.size / 2 &&
      offset - this.r <= paddle.size / 2
    ) {
      // we make a new angle based on the spot the ball hit the paddle
      const normOffset = offset / (paddle.size / 2)
      this.angle = (normOffset * Math.PI / 4) - Math.PI / 2
    }
  }

  checkOutOfScreen (w, h) {
    if (this.y - 50 > h) { // - 50 == gives delay
      this.reset()
      console.log('out of screen')
      return true
    } else {
      console.log('in the screen')
      if (this.x + this.r > w) this.invertX()
      if (this.x - this.r < 0) this.invertX()
      if (this.y - this.r < 0) this.invertY()
      return false
    }
  }

  invertX () {
    this.angle = Math.PI - this.angle
  }
  invertY () {
    this.angle = -this.angle
  }

  update (elapsedTime) {
    this.oldX = this.x
    this.oldY = this.y
    const oX = Math.cos(this.angle) * this.speed * elapsedTime
    const oY = Math.sin(this.angle) * this.speed * elapsedTime

    const newX = this.x + oX
    const newY = this.y + oY

    this.x = newX
    this.y = newY
  }

  draw (ctx) {
    ctx.fillStyle = '#FFF'
    ctx.beginPath()
    ctx.ellipse(this.x, this.y, this.r, this.r, 0, 0, Math.PI * 2)
    ctx.fill()
  }
}

export default class Ball {
  constructor (x, y, radius) {
    this.origX = x
    this.origY = y

    this.reset()

    // this.angle = Math.random() * Math.PI * 2
    this.r = radius
    this.speed = 0.2
  }

  reset () {
    this.x = this.origX
    this.y = this.origY
    this.angle = (Math.random() * (Math.PI / 2)) + (Math.PI / 4)
  }

  checkHits (paddle) {
    const offset = this.x - paddle.x
    if (
      // is ball on the bottom ?
      this.y + this.r >= paddle.y &&
      this.y + this.r < paddle.y + 8 &&
      // is ball is good for left/right ?
      offset + this.r >= -paddle.size / 2 &&
      offset - this.r <= paddle.size / 2
    ) {
      const normOffset = offset / (paddle.size / 2)
      // console.log('hits', offset / (paddle.size / 2))
      // this.invertY()
      this.angle = (normOffset * Math.PI / 4) - Math.PI / 2
    }
  }

  invertX () {
    this.angle = Math.PI - this.angle
  }
  invertY () {
    this.angle = -this.angle
  }

  update (elapsedTime, w, h) {
    const oX = Math.cos(this.angle) * this.speed * elapsedTime
    const oY = Math.sin(this.angle) * this.speed * elapsedTime

    const newX = this.x + oX
    const newY = this.y + oY

    if (newX + this.r > w) this.invertX()
    if (newX - this.r < 0) this.invertX()
    if (newY - this.r < 0) this.invertY()

    if (newY - this.r > h) {
      this.reset()
    } else {
      this.x = newX
      this.y = newY
    }
  }

  draw (ctx) {
    ctx.fillStyle = '#FF0'
    ctx.beginPath()
    ctx.ellipse(this.x, this.y, this.r, this.r, 0, 0, Math.PI * 2)
    ctx.fill()
  }
}

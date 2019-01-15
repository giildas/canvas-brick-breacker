export default class Paddle {
  constructor (x, y, size) {
    this.x = x
    this.y = y
    this.size = size

    this.moveOffset = 0
    this.speed = 0.3
  }

  move (offset) {
    this.moveOffset = offset // -1, 0, 1
  }

  update (elapsedTime, w, h) {
    const newX = this.x + (this.moveOffset * this.speed * elapsedTime)
    if (newX < w && newX > 0) {
      this.x = newX
    }
  }

  draw (ctx) {
    ctx.fillStyle = '#FFF'
    ctx.fillRect(this.x - this.size / 2, this.y, this.size, 8)
  }
}

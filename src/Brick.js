export default class Brick {
  constructor (x, y, size, color) {
    this.x = x
    this.y = y
    this.c = color
    this.size = size

    this.margin = 1
  }

  draw (ctx) {
    ctx.save()
    ctx.fillStyle = this.c
    ctx.translate(this.x, this.y)
    ctx.beginPath()
    ctx.rect(
      this.margin, this.margin,
      this.size - this.margin * 2,
      this.size - this.margin * 2)
    ctx.fill()
    ctx.restore()
  }
}

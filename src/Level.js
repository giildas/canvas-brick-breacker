import Brick from './Brick'

const colors = [
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#FFFFFF',
  '#FFFF00',
  '#ec8ad6',
  '#ff8000'
]

export default class Level {
  constructor (gameW, brickW, bricksPerLine, str) {
    this.gameW = gameW
    this.brickW = brickW
    this.bricksPerLine = bricksPerLine
    this.bricks = []
    this.build(str)
  }

  build (str) {
    for (let i = 0; i < str.length; i++) {
      const char = str[i]

      const lineW = this.brickW * this.bricksPerLine

      const offsetX = (this.gameW - lineW) / 2
      const offsetY = 30
      const x = offsetX + (i % this.bricksPerLine) * this.brickW
      const y = offsetY + (Math.floor(i / this.bricksPerLine)) * this.brickW

      if (char !== '.') {
        this.bricks.push(new Brick(x, y, this.brickW, colors[char]))
      }
    }
  }

  get finished () {
    return this.bricks.length === 0
  }

  draw (ctx) {
    for (let i = 0; i < this.bricks.length; i++) {
      const b = this.bricks[i]
      b.draw(ctx)
    }
  }
}

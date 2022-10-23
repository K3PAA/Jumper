const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const scoreDisplay = document.querySelector('.your-score')

const ammo = new Image()
ammo.src = 'img/ammo/gun-ammo.jpg'

const playerImg = new Image()
playerImg.src = 'img/player/player2.jpg'

canvas.width = 512
canvas.height = 800

export default class Player {
  constructor({ position, velocity, width, height, gamestart, score }) {
    this.velocity = velocity
    this.position = position
    this.score = score
    this.width = width
    this.height = height
    this.gravity = undefined
    this.bullets = 3
    this.Interval = undefined
    this.gamestart = gamestart
  }

  draw() {
    c.drawImage(
      playerImg,
      0,
      0,
      playerImg.width,
      playerImg.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )
  }
  update() {
    if (this.position.y <= canvas.height) {
      this.velocity.y += this.gravity
    }

    if (this.position.x > canvas.width) {
      this.position.x = 0
    } else if (this.position.x < 0) {
      this.position.x = canvas.width
    }

    this.position.y += this.velocity.y
    this.position.x += this.velocity.x
    this.draw()
  }
  jump(eY, eX) {
    if (this.bullets <= 0) return
    else {
      let spacing = {
        x: eX - (this.position.x + this.width / 2),
        y: eY - (this.position.y + this.height / 2),
      }

      if (spacing.x > 0 && spacing.y > 0) {
        this.calc(spacing)
      } else if (spacing.x > 0 && spacing.y < 0) {
        this.calc(spacing)
      } else if (spacing.y > 0 && spacing.x < 0) {
        this.calc(spacing)
      } else if (spacing.x < 0 && spacing.y < 0) {
        this.calc(spacing)
      }

      this.update()
    }
    this.bullets--
  }

  calc(spacing) {
    if (
      (spacing.x < 32 && spacing.y < 32) ||
      (spacing.x < -32 && spacing.y < -32)
    ) {
      this.velocity.x = -spacing.x / 2
      this.velocity.y = -spacing.y / 2
    } else if (
      (spacing.x < 220 && spacing.y < 220) ||
      (spacing.x < -220 && spacing.y < -220)
    ) {
      this.velocity.x = -spacing.x / 20
      this.velocity.y = -spacing.y / 20
    } else {
      this.velocity.x = -spacing.x / 28
      this.velocity.y = -spacing.y / 28
    }

    this.Interval = setTimeout(() => {
      this.velocity.x += -spacing.x / 2000
      this.velocity.y += 0
    }, 2)
  }

  collect(position, width, height, bullets, i) {
    if (
      this.position.x < position.x + width &&
      this.position.x + this.width > position.x &&
      this.position.y + this.height > position.y &&
      this.position.y < position.y + height
    ) {
      if (this.bullets < 5) this.bullets += 1
      this.score++
      if (this.score < 10) scoreDisplay.innerHTML = `0${this.score}`
      else scoreDisplay.innerHTML = this.score
      bullets.splice(i, 1)
    }
  }

  bullInfo(ammoW, ammoH) {
    let spacing = 40
    for (let i = 1; i <= this.bullets; i++) {
      //c.fillRect(spacing * i, canvas.height - (ammoH + 30), ammoW, ammoH)

      c.drawImage(
        ammo,
        0,
        0,
        512,
        512,
        spacing * i,
        canvas.height - (ammoH + 30),
        ammoW,
        ammoH
      )
    }
  }

  reset() {
    this.velocity.y = 0
    this.velocity.x = 0
    this.score = 0
    this.position.y = 100
    this.position.x = canvas.width / 2
    this.bullets = 3
  }
}

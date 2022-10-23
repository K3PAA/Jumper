import Gun from './script/Gun.js'
import Player from './script/Player.js'
import Bullets from './script/Bullets.js'

let gameSong = new Audio('audio/game-song.mp3')
gameSong.volume = 0.5
let lostAudio = new Audio('audio/lostAudio.mp3')
lostAudio.volume = 0.5

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const startbtn = document.querySelector('.btn-start')
const displayFinalScore = document.querySelector('.final-score')
const lobby = document.querySelector('.lobby')
const game = document.querySelector('.game-container')
const scoreDisplay = document.querySelector('.your-score')

let bullets = []
let num = 0

const bg = new Image()
bg.src = 'img/bg/bg-1.jpg'

canvas.width = 512
canvas.height = 700

const player = new Player({
  position: {
    x: canvas.width / 2 - 34,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  width: 64,
  height: 64,
  score: 0,
})

const gun = new Gun({
  gunsize: {
    x: 20,
    y: 80,
  },
  degrees: 0,
  imageWidth: 64,
})

addEventListener('mousemove', (e) => {
  let eX = e.clientX
  let eY = e.clientY
  gun.rotate({
    eX,
    eY,
    width: player.width,
    height: player.height,
    position: player.position,
  })
})

let animate = () => {
  c.fillStyle = 'rgb(25,25,100)'
  c.fillRect(0, 0, canvas.width, canvas.height)

  c.drawImage(bg, 0, 0, bg.width, bg.height, 0, 0, canvas.width, canvas.height)

  for (let i = 0; i < bullets.length; i++) {
    bullets[i].draw()
    player.collect(
      bullets[i].position,
      bullets[i].width,
      bullets[i].height,
      bullets,
      i
    )
    if (bullets.length < 3) {
      const bullet = new Bullets({
        width: 20,
        height: 60,
        id: num,
      })

      bullet.randomNum()
      bullets.push(bullet)
    }
  }

  if (player.position.y > canvas.height) {
    displayFinalScore.innerHTML = player.score
    scoreDisplay.innerHTML = 0
    player.gravity = 0
    removeEventListener('click', juhujuh)
    player.reset()
    gameSong.pause()
    gameSong.currentTime = 0
    lobby.classList.remove('offscreen')
    game.classList.add('offscreen')
    lostAudio.play()
  } else {
    player.bullInfo(20, 60)
    player.update()
    gun.draw(player.width, player.height, player.position)

    requestAnimationFrame(animate)
  }
}

startbtn.addEventListener('click', () => {
  bullets = []
  lobby.classList.add('offscreen')
  game.classList.remove('offscreen')

  for (let i = 0; i < 3; i++) {
    const bullet = new Bullets({
      width: 20,
      height: 60,
      id: num,
    })

    bullet.randomNum()
    bullets.push(bullet)
  }
  gameSong.play()

  setTimeout(() => {
    player.gravity = 0.2
    addEventListener('click', juhujuh)
    animate()
  }, 400)
})

function juhujuh(e) {
  let eX = e.clientX
  let eY = e.clientY

  player.jump(eY, eX)
}

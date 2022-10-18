import Gun from "./script/Gun.js"
import Player from "./script/Player.js"
import Bullets from "./script/Bullets.js"

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')


canvas.width = 512
canvas.height = 700


c.fillRect(0, 0, canvas.width, canvas.height)

const player = new Player({
    position: {
        x: canvas.width/2,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0,
    },
    width: 64,
    height: 64,
    ammoPosition: {
        x: 50,
        y: canvas.height - 200
    }
})

const gun = new Gun({
    gunsize: {
        x: 20,
        y: 80
    },
    degrees: 0
})

addEventListener('mousemove', (e) =>{
    let eX = e.clientX
    let eY = e.clientY
    gun.rotate({
        eX ,
        eY,
        width: player.width,
        height: player.height,
        position: player.position
    })
})

addEventListener('click', (e)=>{
    let eX = e.clientX
    let eY = e.clientY

    player.jump(eY, eX)
})



let animate = () =>{
    c.fillStyle = 'rgb(25,25,100)'
    c.fillRect(0, 0, canvas.width, canvas.height)


    player.draw()
    gun.draw(player.width, player.height, player.position)
    
    Bullets.forEach(bullet => {
        bullet.draw()
        bullet.collect(player.position, player.width, player.height, )
    })

    requestAnimationFrame(animate)
}

animate()



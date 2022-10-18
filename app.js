import Gun from "./script/Gun.js"
import Player from "./script/Player.js"

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
})

const gun = new Gun({
    gunsize: {
        x: 20,
        y: 80
    },
    degrees: 0
})





let animate = () =>{
    c.fillStyle = 'rgb(25,25,100)'
    c.fillRect(0, 0, canvas.width, canvas.height)


    player.draw()
    gun.draw(player.width, player.height, player.position)

    requestAnimationFrame(animate)
}

animate()

addEventListener('mousemove', (e) =>{
    let eX = e.clientX
    let eY = e.clientY
    gun.rotate(eX, eY, player.width, player.height, player.position)
})

addEventListener('click', (e)=>{
    let eX = e.clientX
    let eY = e.clientY

    player.attack(eY, eX, gun.gunsize)
})
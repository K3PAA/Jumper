const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// Array.from
//.splice() od jakiego momentu liczy array od 1, ile elekemntow, kazdy kolejny element to dodadkowy item do arrayu

canvas.width = 512
canvas.height = 800



export default class Bullets{
    constructor({width, height, position, id}){
        this.width = width
        this.height = height
        this.position = position
        this.id = id
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    collect(position, width, height, bullets){
        bullets.forEach(b => {
            if(this.position.x < position.x + width &&
            this.position.x + this.width > position.x &&
            this.position.y + this.height > height &&
            this.position.y < height + position.y){
                console.log(this.id)
                bullets.splice(this.id, 2)
            }
         })
    }
}

    

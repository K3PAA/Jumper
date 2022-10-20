const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// Array.from
//.splice() od jakiego momentu liczy array od 1, ile elekemntow, kazdy kolejny element to dodadkowy item do arrayu

canvas.width = 512
canvas.height = 800



export default class Bullets{
    constructor({width, height}){
        this.width = width
        this.height = height
        this.position = {
            x: undefined,
            y: undefined
        }
    }

    randomNum(){
        this.position.x = Math.floor(Math.random() * (canvas.width - 40) )
        this.position.y = Math.floor(Math.random() * (canvas.height - 200) )
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}
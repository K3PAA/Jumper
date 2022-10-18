const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')


canvas.width = 512
canvas.height = 800

export default class Player{
    constructor({position, velocity, width, height}){
        this.velocity = velocity
        this.position = position
        this.width = width
        this.height = height
        this.gravity = 0.2
        this.Interval = undefined
    }

    draw(){
        c.fillStyle = 'rgb(22, 200, 200)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        this.update()
    }
    update(){
        
        if(this.position.y <= canvas.height){
            this.velocity.y += this.gravity
        }else{
            console.log('You lost')
        }

        if(this.position.x > canvas.width){
            this.position.x = 0
        }else if(this.position.x < 0){
            this.position.x = canvas.width
        }

        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
    }
    attack(eY, eX){

        let spacing = {
            x: eX - (this.position.x + (this.width/2)),
            y: eY - (this.position.y + (this.height/2))
        } 
        
        if(spacing.x > 0 && spacing.y > 0){
            this.calc(spacing)
        }
        else if(spacing.x > 0 && spacing.y < 0){
            this.calc(spacing)
        }
        else if(spacing.y > 0 && spacing.x < 0){
            this.calc(spacing)
        }
        else if(spacing.x < 0 && spacing.y < 0){
            this.calc(spacing)
        }

        this.update()
    }

    calc(spacing){

        if(spacing.x < 32 && spacing.y < 32 || spacing.x < -32 &&spacing.y < -32){
            this.velocity.x = (-spacing.x / 7)
            this.velocity.y = (-spacing.y / 7)
            console.log('w')
        }else{
            this.velocity.x = (-spacing.x / 26)
            this.velocity.y = (-spacing.y / 26)
            console.log('e')
        }
        

        this.Interval = setTimeout( ()=> {
            this.velocity.x += 0
            this.velocity.y += 0

        }, 30)
    }
}

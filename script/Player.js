const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')


canvas.width = 512
canvas.height = 800

export default class Player{
    constructor({position, velocity, width, height, ammoPosition}){
        this.velocity = velocity
        this.position = position
        this.width = width
        this.height = height
        this.gravity = 0.2
        this.bullets = 3
        this.ammoPosition = ammoPosition
        this.Interval = undefined
    }

    draw(){
        c.fillStyle = 'rgb(22, 200, 200)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        this.update()
    }
    update(){
        
        // if(this.position.y <= canvas.height){
        //     this.velocity.y += this.gravity
        // }else{
        //     console.log('You lost')
        // }

        if(this.position.x > canvas.width){
            this.position.x = 0
        }else if(this.position.x < 0){
            this.position.x = canvas.width
        }

        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
    }
    jump(eY, eX){
        if(this.bullets <= 0) return
        else{
            console.log(this.bullets)
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
        this.bullets --
    }

    // ammo(){
    //     for(let i=0; i<this.bullets; i++){
    //         c.fillStyle = 'orange'
    //         this.ammoPosition.y += 50
    //         c.fillRect(this.ammoPosition.x, this.ammoPosition.y, 20, 80)
    //         console.log(player.ammoPosition.y)
    //     }
    // }

    calc(spacing){

        if(spacing.x < 32 && spacing.y < 32 || spacing.x < -32 &&spacing.y < -32){
            this.velocity.x = (-spacing.x / 2)
            this.velocity.y = (-spacing.y / 2)
            console.log('w')
        }else if(spacing.x < 220 && spacing.y < 220 || spacing.x < -220 &&spacing.y < -220){
            this.velocity.x = (-spacing.x / 20)
            this.velocity.y = (-spacing.y / 20)
        }
        else{
            this.velocity.x = (-spacing.x / 28)
            this.velocity.y = (-spacing.y / 28)
            console.log('e')
        }
        

        this.Interval = setTimeout( ()=> {
            this.velocity.x += 0
            this.velocity.y += 0

        }, 1)
    }
}

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')


canvas.width = 512
canvas.height = 800


class Bullets{
    constructor({width, height, position}){
        this.width = width
        this.height = height
        this.position = position
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    collect(position, width, height){
        if(this.position.x < position.x + width &&
            this.position.x + this.width > position.x &&
            this.position.y + this.height > height &&
            this.position.y < height + position.y){
                console.log('w')
            }
    }
    
}

for(let i=0; i<3; i++){
    let ranX
    let ranY

    ranX = Math.floor(Math.random() * (canvas.width - 40) )
    ranY = Math.floor(Math.random() * (canvas.height - 200) )

    const bullet = new Bullets({
        width: 20,
        height: 60,
        position: {
            x: ranX,
            y: ranY,
        }
    })

    bullets.push(bullet)
}

export default bullets
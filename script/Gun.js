const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')


canvas.width = 512
canvas.height = 700

export default class Gun{
    constructor({gunsize, degrees}){


        this.gunsize = gunsize
        this.degrees = degrees

        this.bullets = 3

        this.canvas = canvas
        
    }

    draw(width, height, position){
        const shotgun = new Image()
        
        //Saving current context
        c.save()
        
        //Center the gun position on our player
        c.translate(position.x + (width/2), position.y + (height/2) );
        
        //Rotating our gun
        c.rotate(this.degrees * Math.PI / 180);
        
        //Drawing Gun

        // console.log('Lewo gora')
        c.fillStyle='red'
        c.fillRect(0,0, this.gunsize.x, this.gunsize.y)
        

        
        
        //Restoring not changed context
        c.restore()
    }

    rotate(eX, eY, width, height, position){

        const angle =  Math.atan2(eY - (position.y + (height/2) + (this.gunsize.y/2)) , eX - (position.x + (width/2))) * 180 / Math.PI;
        
        this.degrees = angle -90
    }
}
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 512
canvas.height = 700

let marginLeft = 100

export default class Gun {
  constructor({ gunsize, degrees, imageWidth }) {
    this.gunsize = gunsize
    this.degrees = degrees
    this.canvas = canvas
    this.imageWidth = imageWidth
  }

  draw(width, height, position) {
    const shotgun = new Image()
    shotgun.src = 'img/guns/shotgun.png'
    //Saving current context
    c.save()

    //Center the gun position on our player
    c.translate(position.x + width / 2, position.y + height / 2)

    //Rotating our gun
    c.rotate((this.degrees * Math.PI) / 180)

    //Drawing Gun

    // console.log('Lewo gora')
    c.fillStyle = 'red'
    c.drawImage(shotgun, 0, 0, 64, 32, 0, 0, 128, 64)

    //Restoring not changed context
    c.restore()
  }

  rotate({ eX, eY, width, height, position }) {
    // const angle =  Math.atan2(eY - (position.y + (height/2) + (this.gunsize.y/2)) , eX - (position.x + (width/2))) * 180 / Math.PI;
    const angle =
      (Math.atan2(
        eY - height - position.y,
        eX - marginLeft - canvas.width / 2 - width / 2
      ) *
        180) /
      Math.PI

    this.degrees = angle
  }
}

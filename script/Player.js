const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

import { gameSong } from "../app.js"

const lobby = document.querySelector('.lobby')
const game = document.querySelector('.game-container')


const finalScore = document.querySelector('.final-score')
const scoreDisplay = document.querySelector('.your-score')
let score = 0

let lostAudio = new Audio("audio/lost-audio.mp3")

canvas.width = 512
canvas.height = 800

export default class Player{
    constructor({position, velocity, width, height}){
        this.velocity = velocity
        this.position = position
        this.width = width
        this.height = height
        this.gravity = 0.2
        this.bullets = 3
        this.Interval = undefined
    }

    draw(){
        c.fillStyle = 'rgb(22, 200, 200)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        
    }
    update(){
        this.draw()
        if(this.position.y <= canvas.height){
            this.velocity.y += this.gravity
        }else{
            //lostAudio.play()
            gameSong.pause()
            gameSong.currTime = 0

            setTimeout( ()=> {
                finalScore.innerHTML = score
                    lobby.classList.remove('offscreen')
                    game.classList.add('offscreen')
            },1000)
        }

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

    calc(spacing){

        if(spacing.x < 32 && spacing.y < 32 || spacing.x < -32 &&spacing.y < -32){
            this.velocity.x = (-spacing.x / 2)
            this.velocity.y = (-spacing.y / 2)
        }else if(spacing.x < 220 && spacing.y < 220 || spacing.x < -220 &&spacing.y < -220){
            this.velocity.x = (-spacing.x / 20)
            this.velocity.y = (-spacing.y / 20)
        }
        else{
            this.velocity.x = (-spacing.x / 28)
            this.velocity.y = (-spacing.y / 28)
        }
        

        this.Interval = setTimeout( ()=> {
            this.velocity.x += -spacing.x/2000
            this.velocity.y += 0
        }, 2)
    }

    collect(position, width, height, bullets, i){
        
            if(this.position.x < position.x + width &&
            this.position.x + this.width > position.x &&
            this.position.y + this.height > position.y &&
            this.position.y < position.y + height
            ){
                if(this.bullets < 5) this.bullets += 1
                score ++
                if(score < 10) scoreDisplay.innerHTML = `0${score}`
                else scoreDisplay.innerHTML = score
                bullets.splice(i, 1)
            }
    }

    bullInfo(ammoW, ammoH){
        let spacing = 40
        for(let i=1; i<=this.bullets; i++){
            
            c.fillStyle = 'orange'
            c.fillRect( spacing * i, canvas.height - (ammoH + 30), ammoW, ammoH)
        }
    }
}


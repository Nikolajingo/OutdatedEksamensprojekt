import { squareRoot } from './lib'

// Variabler for Player
const d = 72
let x = 1200 / 2
const y = 675 - d
const fart = 10
const r = d / 2

// Variabler for Enemies
const enemies = []
const numberOfEnemies = 10

// Setup af Spillet
function setup () {
  createCanvas(windowWidth, windowHeight)
  rectMode(CENTER)
  console.log(dist2p(0, 0, 3, 4))
  // Enemy Spawning
  for (let index = 0; index < numberOfEnemies; index++) {
    enemies.push(new Enemy(random(50, windowWidth - 50), -50, 100, 100, 'red'))
  }
  enemies[0].drawEnemy = true
}

function draw () {
  // Player
  background(69)
  circle(x, y, d)
  strokeWeight(5)
  fill(162, 120, 9)

  // Nyt Enemy efter forrige Enemy er nået halvejs ned på skærmen
  for (let index = 0; index < enemies.length; index++) {
    const enemy = enemies[index]
    if (enemy.drawEnemy) {
      enemy.draw()
    } else {
      if (index > 0 && enemies[index - 1].Ey >= windowHeight / 2) {
        enemy.drawEnemy = true
      }
    }
  }

  // Movement
  if (keyIsDown(RIGHT_ARROW || 68)) {
    if (x <= windowWidth - r) {
      x = x + fart
    }
  }

  if (keyIsDown(LEFT_ARROW)) {
    if (x >= 0 + r) {
      x = x - fart
    }
  }
}

class Enemy {
  constructor (Ex, Ey, Ew, Eh, farve) {
    this.Ex = Ex
    this.Ey = Ey
    this.Ew = Ew
    this.Eh = Eh
    this.farve = farve
    this.hastighed = 5
    this.drawEnemy = false
  }

  draw () {
    push()
    fill(this.farve)
    rect(this.Ex, this.Ey, this.Ew, this.Eh)
    this.Ey += this.hastighed
    pop()
  }
}

function dist2p (x1, y1, x2, y2) {
  const d = sqrt(pow(x1 - x2, 2) + pow(y1 - y2, 2))
  return d
}

export { setup, draw }

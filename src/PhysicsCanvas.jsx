import { useEffect, useRef } from 'react'
import { rand } from 'three/tsl'

export default function PhysicsCanvas() {
  const canvasRef = useRef(null)
  const canvasRef2 = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const height = 400
    const width = 400

    let x = 200
    let y = 0
    let vy = 0
    let ay = 0

    const mass = 10 // mass of the ball
    const r = 10 // radius of the ball
    const dt = 0.02 // delta of time
    const boucingCoefficient = -0.5 // 
    const airDensity = 1.2 // Densité du fluide
    const ballDragCoefficient = 1 // Coefficient de trainée de la balle
    const frontalArea = Math.PI * r * r / 10000 // Zone de friction avant de la balle

    ctx.fillStyle = 'purple'

    function loop() {
      let fy = 0

      // Weight force
      fy += mass * 9.81

      // Air drag
      fy += -0.5 * airDensity * ballDragCoefficient * frontalArea * vy * vy * Math.sign(vy)

      // Verlet integration
      const dy = vy * dt + 0.5 * ay * dt * dt
      y += dy * 100

      const new_ay = fy / mass
      const avg_ay = 0.5 * (new_ay + ay)
      vy += avg_ay * dt
      ay = new_ay

      // Collision
      if (y + r > height && vy > 0) {
        vy *= boucingCoefficient
        y = height - r
      }

      draw()
    }

    function draw() {
      ctx.clearRect(0, 0, width, height)
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill()
    }

    const interval = setInterval(loop, dt * 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    //Remise à zero
    // Creation de l'objet qui contiendra le canva
    const canvas = canvasRef2.current
    const ctx = canvas.getContext('2d')
    const dt = 0.02
    // Creation des limites de l'univers
    let height = 400
    let width  = 400
    // Ajout de la vie dans l'univers
    let x = 200
    let y = 0
    let fy = 0
    let vy = 1
    let ay = 0
    let mass = 1

    ctx.fillStyle = 'purple'
    // A chaque nouvelle frame
    function loop() {
      let fy = 0

      // Weight force
      fy += mass * 9.81

      // Air drag
      fy += -0.5 * airDensity * ballDragCoefficient * frontalArea * vy * vy * Math.sign(vy)

      // Ajout de l'integration de verlet
      const dy = vy * dt + 0.5 * ay * dt * dt
      // Ajout du resultat de l'equation à la vélocité
      y += dy * 100

      // reccuperation de l'acceleration actuelle
      const new_ay = fy / mass
      // Reccuperation de la moyenne entre l'acceleration actuelle et celle du pas de temps dernier
      const avg_ay = 0.5 * (new_ay + ay)
      // Ajout de l'acceleration moyenne scaled sur le temps à la vélocité actuelle
      vy += avg_ay * dt

      // Ajout de la collision
      // Si la balle dépasse la limite de l'univers de son rayon et que sa vitesse est positive
      // La vélocité de la particule est inversée de moitié
      // On replace la balle en dehors de la limite, de la taille de son rayon
      if (y + r > height && vy > 0) {
        vy *= boucingCoefficient
        y = height - r
      }


      draw()
    }

    // Rayon de la balle
    const r = 10
    function draw() {
      ctx.clearRect(0, 0, width, height)
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill()
    }

    const interval = setInterval(loop, dt * 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        style={{
          border: '1px solid white',
          background: 'black'
        }}
      />
      <canvas
        ref={canvasRef2}
        width={400}
        height={400}
        style={{
          border: '1px solid white',
          background: 'black'
        }}
      />
    </>
  )
}

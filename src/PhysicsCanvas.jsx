import { useEffect, useRef } from 'react'
import { rand } from 'three/tsl'

export default function PhysicsCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const height = 400
    const width = 400

    let x = 200
    let y = 0
    let vy = 0
    let ay = 0

    const mass = 0.1 // mass of the ball
    const r = 10 // radius of the ball
    const dt = 0.02 // delta of time
    const boucingCoefficient = -0.5 // 
    const airDensity = 1.2 // Densité du fluide
    const ballDragCoefficient = 1 // Coefficient de trainée de la balle
    const frontalArea = Math.PI * r * r / 10000 // Zone de friction avant de la balle

    ctx.fillStyle = 'red'

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

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={400}
      style={{
        border: '1px solid white',
        background: 'black'
      }}
    />
  )
}

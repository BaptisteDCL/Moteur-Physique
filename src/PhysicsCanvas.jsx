import { useEffect, useRef } from 'react'

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

    const m = 0.1
    const r = 10
    const dt = 0.02
    const e = -0.5
    const rho = 1.2
    const C_d = 0.47
    const A = Math.PI * r * r / 10000

    ctx.fillStyle = 'red'

    function loop() {
      let fy = 0

      // Weight force
      fy += m * 9.81

      // Air drag
      fy += -0.5 * rho * C_d * A * vy * vy * Math.sign(vy)

      // Verlet integration
      const dy = vy * dt + 0.5 * ay * dt * dt
      y += dy * 100

      const new_ay = fy / m
      const avg_ay = 0.5 * (new_ay + ay)
      vy += avg_ay * dt
      ay = new_ay

      // Collision
      if (y + r > height && vy > 0) {
        vy *= e
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

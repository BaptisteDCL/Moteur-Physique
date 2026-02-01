import { useEffect, useRef, useState } from 'react'

export default function PhysicsCanvas() {
  const canvasRef = useRef(null)

  const [VyOffset, setVy] = useState(0)
  const [boucingCoefficient] = useState(-0.5)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const height = 400
    const width = 400

    let x = 200
    let y = 0
    let vy = VyOffset
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
      // Force à l'instant T
      let fy = 0

      // Le poids est égal à la masse * la gravité
      fy = mass * 9.81

      // Air drag
      // Coefficient de trainnée de la particule
      let particuleDrag = -0.5 * airDensity * ballDragCoefficient * frontalArea
      // Application des effets par rapport au carré de la vitesse (plus je vais vite, plus je dois déplacer de l'air autour de moi)
      let effetsByVelocity = vy * vy
      fy += particuleDrag * effetsByVelocity * Math.sign(vy)

      // [Passé]
      // Verlet integration
      // Captation d'à quel point la particule s'est déplacée dans cette frame
      let distanceRunned = vy * dt
      // Distance parcourue due à l'acceleration moyenne de la particule pendant la frame
      let meanAccelDist = 0.5 * ay * dt * dt
      // Distance parcourue par la particule avec l'integration de Verlet Vitesse * deltaTemps + moyenne(acceleration * deltaTemps²)
      const dy = distanceRunned + meanAccelDist
      
      // [Présent]
      // On applique le mouvement à la position actuelle de la particule
      y += dy * 100

      // Accélération selon la deuxième loi de Newton
      const new_ay = fy / mass
      // Reccupération de l'accélération moyenne entre le pas d'avant et l'accélération actuelle
      const avg_ay = 0.5 * (new_ay + ay)
      // On ajoute le déplacement moyen sur la frame actuelle du à l'accélération
      vy += avg_ay * dt
      // On stocke l'accélération actuelle à t + dt
      ay = new_ay

      // Collision
      if (y + r > height && vy > 0) {
        vy *= boucingCoefficient
        y = height - r
      }

      draw()
      if (VyOffset !== 0){
        vy *= VyOffset
        setVy(0)
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height)
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill()
    }

    const interval = setInterval(loop, dt * 1000)

    return () => clearInterval(interval)
  }, [VyOffset])

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
      <p>ajouter un boutton pour changer la densité de l'air à celle de l'eau</p>
      <button
      onClick={() => setVy(boucingCoefficient)}
      style={{marginTop: 10}}>Faire sauter la particule</button>
    </>
  )
}

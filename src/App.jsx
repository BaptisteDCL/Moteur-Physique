import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'
import PhysicsCanvas from './PhysicsCanvas'

function App() {
  return (
    <>
      <ShaderGradientCanvas
        style={{ width: '100vw', height: '100vh', position: 'fixed', inset: 0, zIndex: 0 }}
        pixelDensity={1.5}
        fov={45}
      >
      <ShaderGradient
        animate="on"
        axesHelper="off"
        brightness={1.2}
        cAzimuthAngle={180}
        cDistance={3.61}
        cPolarAngle={90}
        cameraZoom={2.1}
        color1="#bf75ff"
        color2="#35a9db"
        color3="#c785e1"
        destination="onCanvas"
        embedMode="off"
        envPreset="city"
        format="gif"
        fov={60}
        frameRate={10}
        gizmoHelper="hide"
        grain="on"
        lightType="3d"
        pixelDensity={2.1}
        positionX={-1.4}
        positionY={0}
        positionZ={0}
        range="enabled"
        rangeEnd={40}
        rangeStart={0}
        reflection={0.1}
        rotationX={0}
        rotationY={10}
        rotationZ={50}
        shader="defaults"
        type="waterPlane"
        uAmplitude={3}
        uDensity={6.6}
        uFrequency={5.5}
        uSpeed={0.2}
        uStrength={6.3}
        uTime={0}
        wireframe={false}
      />
      </ShaderGradientCanvas>

      <div style={{ position: 'relative', zIndex: 1, padding: 20 }}>
        <h2 style={{ color: 'white' }}>Physique d'une balle</h2>
        <PhysicsCanvas/>
      </div>

    </>
  )
}

export default App

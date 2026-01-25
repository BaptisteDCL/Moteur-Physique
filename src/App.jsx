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
        cDistance={3.6}
        cPolarAngle={90}
        cameraZoom={2.1}
        color1="#ff2f00"
        color2="#db72bb"
        color3="#e18a34"
        destination="onCanvas"
        embedMode="off"
        envPreset="city"
        format="gif"
        fov={60}
        frameRate={10}
        gizmoHelper="hide"
        grain="on"
        lightType="3d"
        pixelDensity={2.3}
        positionX={-1.4}
        positionY={0}
        positionZ={0}
        range="enabled"
        rangeEnd={40}
        rangeStart={10.2}
        reflection={0.1}
        rotationX={0}
        rotationY={10}
        rotationZ={50}
        shader="defaults"
        type="sphere"
        uAmplitude={3}
        uDensity={0.3}
        uFrequency={5.5}
        uSpeed={0.1}
        uStrength={8.6}
        uTime={10.2}
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

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import * as THREE from 'three'
import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { LayerMaterial, Base, Depth, Fresnel } from 'lamina'
import { useControls } from 'leva'


// CodeSandbox: https://codesandbox.io/s/layer-materials-forked-fm366c?file=/src/App.js:0-1990

export default function Background() {
  const props = useControls({
    base: { value: '#8c4fff' },
    colorA: { value: '#00ffff' },
    colorB: { value: '#d400ff' }
  })
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, -0.75, 0.75], fov: 80, near: 0.001 }}>
      <Suspense fallback={null}>
        <Bg {...props} />
        <Flower {...props} />
      </Suspense>
    </Canvas>
  )
}

function Bg({ base, colorA, colorB }) {
  const mesh = useRef()
  return (
    <mesh ref={mesh} scale={100}>
      <sphereGeometry args={[1, 64, 64]} />
      <LayerMaterial attach="material" side={THREE.BackSide}>
        <Base color={base} alpha={1} mode="normal" />
        <Depth colorA={colorB} colorB={colorA} alpha={0.5} mode="normal" near={0} far={300} origin={[100, 100, 100]} />
      </LayerMaterial>
    </mesh>
  )
}

function Flower({ base, colorA, colorB }) {
  const mesh = useRef()
  const depth = useRef()
  useFrame((state, delta) => {
    if(mesh?.current && mesh.current.rotation) {
      mesh.current.rotation.z += delta / 2
    }
    if(depth?.current) {
      depth.current.origin.set(-state.mouse.y, state.mouse.x, 0)
    }
  })
  return (
    <mesh rotation-y={Math.PI / 6} scale={[2, 2, 2]} ref={mesh}>
      <torusKnotGeometry args={[0.4, 0.09, 300, 50, 10, 7]} />
      <LayerMaterial>
        <Base color={base} alpha={1.5} mode="normal" />
        <Depth colorA={colorB} colorB={colorA} alpha={0.5} mode="normal" near={0} far={3} origin={[1, 1, 1]} />
        <Depth ref={depth} colorA={colorB} colorB="black" alpha={1} mode="lighten" near={0.25} far={2} origin={[1, 0, 0]} />
        <Fresnel mode="softlight" color="white" intensity={0.3} power={2} bias={0} />
      </LayerMaterial>
    </mesh>
  )
}

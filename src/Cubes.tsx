import React from 'react';
import * as THREE from "three";
import { useFrame } from "react-three-fiber";

const Cubes: React.FC = () => {
    const ref = React.useRef<THREE.Mesh>();

    useFrame(() => (ref.current!.rotation.x = ref.current!.rotation.y += 0.01))

    return (
        <mesh position={[0, 0, 1.5]} ref={ref}>
        <boxBufferGeometry args={[1, 1, 1]} attach="geometry" />
        <meshPhongMaterial color="#34495d" attach="material" />
        </mesh>
    );
}

export default Cubes;

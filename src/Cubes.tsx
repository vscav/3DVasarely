import React from 'react';
import * as THREE from "three";
import { useFrame } from "react-three-fiber";

const rows = 50;
const columns = 50;
const count: number = rows * columns;

const temporaryColor = new THREE.Color();
const colors1: string[] = new Array(count / 50).fill('').map((_, i) => (i % 2 === 0 ? '#ffffff' : '#000000'));
const colors2: string[] = new Array(count / 50).fill('').map((_, i) => (i % 2 === 0 ? '#000000' : '#ffffff'));
const colors: string[] = [];

const Cubes: React.FC = () => {
    const ref = React.useRef<THREE.Mesh>();

    let k = 0;
    while (colors.length < count) {
        for (let i = 0; i < colors1.length; i++) {
            colors[k] = colors1[i];
            k++;
        }
        for (let j = 0; j < colors2.length; j++) {
            colors[k] = colors2[j];
            k++;
        }
    }
    // console.log(colors);

    const colorArray = React.useMemo(() => Float32Array.from(new Array(count).fill(0).flatMap((_, i) => temporaryColor.set(colors[i]).toArray())), []);
    // console.log(colorArray);

    useFrame(() => (ref.current!.rotation.x = ref.current!.rotation.y += 0.01))

    return (
        <mesh position={[0, 0, 1.5]} ref={ref}>
        <boxBufferGeometry args={[1, 1, 1]} attach="geometry" />
        <meshPhongMaterial color="#34495d" attach="material" />
        </mesh>
    );
}

export default Cubes;

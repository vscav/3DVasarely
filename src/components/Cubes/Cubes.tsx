import React from 'react';
import * as THREE from "three";
import { useFrame } from "react-three-fiber";

import { getDistance } from "../../utils";

const temporaryObject = new THREE.Object3D()
const mousePosition = new THREE.Vector3()

const rows = 50;
const columns = 50;
const count: number = rows * columns;

const temporaryColor = new THREE.Color();
const colors1: string[] = new Array(count / 50).fill('').map((_, i) => (i % 2 === 0 ? '#ddd7c7' : '#000000'));
const colors2: string[] = new Array(count / 50).fill('').map((_, i) => (i % 2 === 0 ? '#000000' : '#ddd7c7'));
const colors: string[] = [];

const Cubes: React.FC = () => {
    const ref = React.useRef<THREE.InstancedMesh>();
    const light = React.useRef<THREE.PointLight>();

    const geometry = null as unknown as THREE.Geometry
    const material = null as unknown as THREE.Material

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

    const colorArray = React.useMemo(() => Float32Array.from(new Array(count).fill(0).flatMap((_, i) => temporaryColor.set(colors[i]).toArray())), []);

    useFrame(({ mouse, camera }) => {
        let id = 0;
    
        const vector = mousePosition.set(mouse.x, mouse.y, 0.5);
        vector.unproject(camera);
        const dir = vector.sub(camera.position).normalize();
        const targetZ = -5;
        const distance = (targetZ - camera.position.z) / dir.z;
        const position = camera.position.clone().add(dir.multiplyScalar(distance));
    
        if (light.current) light.current.position.copy(position);
    
        for (let x = 0; x < columns; x++) {
            for (let y = 0; y < rows; y++) {
                const xPosition = x - columns * 0.5;
                const yPosition = y - rows * 0.5;
    
                // const mouseDistance = getDistance(vector.x, vector.y, xPosition, yPosition) + 2;
                // const z = -THREE.MathUtils.clamp(mouseDistance, 0, 8);
                // temporaryObject.position.set(xPosition, yPosition, z);

                // const mouseDistance = getDistance(vector.x, vector.y, xPosition, yPosition) + 2;
                const mouseDistance = getDistance(vector.x, vector.y, xPosition, yPosition);
                const z = THREE.MathUtils.clamp(mouseDistance, 0, 8);
                temporaryObject.position.set(xPosition, yPosition, z - 16);
        
                temporaryObject.updateMatrix();
                if(ref.current) ref.current.setMatrixAt(id, temporaryObject.matrix);
                id++;
            }
        }

        if(ref.current) ref.current.instanceMatrix.needsUpdate = true
    });

    return (
        <>
            <pointLight ref={light} position={[0, 0, 1]} intensity={0.1} />
            <instancedMesh ref={ref} args={[geometry, material, count]}>
                <boxBufferGeometry attach="geometry" args={[0, 0, 0]}>
                    <instancedBufferAttribute attachObject={['attributes', 'color']} args={[colorArray, 3]} />
                </boxBufferGeometry>
                <meshPhongMaterial attach="material" vertexColors={true} />
            </instancedMesh>
        </>
    );
}

export default Cubes;

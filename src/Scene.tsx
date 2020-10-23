import React from 'react';
import { Canvas } from 'react-three-fiber'

import Cubes from "./Cubes"

const Scene: React.FC = () => {
    return (
        <Canvas gl={{ antialias: true }}>
            <ambientLight intensity={0.55} />
            <spotLight intensity={0.3} position={[10, 10, 20]} shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
            <Cubes />
        </Canvas>
    );
}

export default Scene;

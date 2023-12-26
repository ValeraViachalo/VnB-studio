'use client';
import { Canvas, useLoader } from '@react-three/fiber'
import { useRef } from 'react';
import { useScroll, useSpring, useTransform } from 'framer-motion';
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { motion } from 'framer-motion-3d';

export default function earth() {

    const scene = useRef(null);
    const { scrollYProgress: rotation } = useScroll({
        offset: ['0', '100%'] // changed to 100%
    });
    
    const { scrollYProgress: planetTransform } = useScroll({
        target: scene,
        offset: ['0', '100%']
    });

    const smoothRotation = useSpring(rotation, { stiffness: 2500, damping: 110 });
    const scale = useTransform(planetTransform, [0, 1], [2, 3]);

    const [color, normal, aoMap] = useLoader(TextureLoader, [
        '/assets/color.jpg',
        '/assets/normal.png',
        '/assets/occlusion.jpg'
    ])

    return (
        <Canvas ref={scene}>
            <ambientLight intensity={0.2} />
            <directionalLight intensity={3.5} position={[1, 0, -.25]} />
            <motion.mesh
                scale={scale}
                rotateY={smoothRotation}
                rotateX={smoothRotation}
            >
                <sphereGeometry args={[1, 64, 64]}/>
                <meshStandardMaterial map={color} normalMap={normal} aoMap={aoMap}/>
            </motion.mesh>
        </Canvas>
    )
}

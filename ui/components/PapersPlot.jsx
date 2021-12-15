import { Suspense, useRef, useState, useLayoutEffect, forwardRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import {
  Instances,
  Instance,
  Points,
  Point,
  MapControls,
  Html,
  PointMaterialImpl,
  ContactShadows,
  OrbitControls,
} from '@react-three/drei';
import { Box, Text } from '@styles/components';
import { css, styled } from '@styles/config';
import * as THREE from 'three';
import * as d3 from 'd3';

const colors = [
  '#bdc3c7',
  '#f1c40f',
  '#f39c12',
  '#e74c3c',
  '#ff6b81',
  '#9b59b6',
  '#3498db',
  '#2ecc71',
  '#1abc9c',
  '#2980b9',
  '#c0392b',
  '#8e44ad',
  '#7ed6df',
  '#686de0',
  '#6ab04c',
  '#7bed9f',
  '#e056fd',
  '#4834d4',
];

const hoverBox = css({
  width: '$7',
  position: 'absolute',
  textAlign: 'center',
  pointerEvents: 'none',
  backgroundColor: '$contrast2',
  border: '1.5px solid $contrast4',
  borderRadius: '$2',
  p: '$1',
  ':before': {
    content: '',
    position: 'absolute',
    left: '50%',
    marginLeft: '-8px',
    bottom: '-16px',
    border: 'solid 8px transparent',
    borderTopColor: '$contrast4',
  },
});

const InfoBox = styled(Box, {
  position: 'absolute',
  left: 0,
  bottom: '20vh',
  py: '$3',
  px: '$4',
});

export default function PapersPlot({ papers, onClick, ...props }) {
  const [hovered, setHovered] = useState(null);
  const [selected, setSeleted] = useState(null);

  const getColor = (clusterId) => {
    return clusterId === -1 ? '#efefef' : d3.interpolateRainbow((clusterId + 1) / 18.0);
  };

  const names = [
    {
      clusterId: 14,
      name: 'Social Biases',
    },
    {
      clusterId: 15,
      name: 'Disinformation & Fake news',
    },
    {
      clusterId: 4,
      name: 'Race & Identity',
    },
    {
      clusterId: 12,
      name: 'Climate Change',
    },
    {
      clusterId: 7,
      name: 'NLP for Education',
    },
  ];

  return (
    <Box css={{ width: '100%', height: '100%' }}>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 60, 60], up: [0, 0, 1], far: 10000 }} {...props}>
        <ambientLight />
        <OrbitControls
          autoRotate={!hovered && !selected}
          autoRotateSpeed={1.0}
          enableDamping={false}
        />
        <spotLight position={[0, 0, 100]} />

        <Instances
          limit={1000} // Optional: max amount of items (for calculating buffer size)
          range={1000} // Optional: draw-range
        >
          <sphereGeometry castShadow args={[1, 20, 20]} />
          <meshStandardMaterial receiveShadow />
          {papers.map((paper, idx) => (
            <Instance
              key={idx}
              position={[paper.position.x, paper.position.y, 0]}
              color={getColor(paper.cluster)}
              onClick={(e) => {
                e.stopPropagation();
                onClick(idx);
                setSeleted(idx);
                setHovered(null);
                console.log(paper);
              }}
              onPointerEnter={() => setHovered(idx)}
              onPointerLeave={() => {
                if (hovered === idx) setHovered(null);
              }}
            >
              {hovered === idx ? (
                <Html
                  className={hoverBox()}
                  style={{
                    transform: 'translateX(-50%) translateY(-100%) translateY(-16px)',
                    zIndex: 10,
                  }}
                  zIndexRange={[19, 10]}
                >
                  <Text css={{ lineHeight: '$3' }}>{paper.title}</Text>
                </Html>
              ) : null}
            </Instance>
          ))}
        </Instances>

        {selected && (
          <mesh position={[papers[selected].position.x, papers[selected].position.y, -0.01]}>
            <sphereGeometry args={[3, 50]} />
            <meshStandardMaterial
              color={getColor(papers[selected].cluster)}
              transparent={true}
              opacity={0.5}
            />
          </mesh>
        )}
      </Canvas>

      <InfoBox>
        {names.map((v) => {
          return (
            <Text key={v.clusterId} mono css={{ fontSize: '$2', lineHeight: '$5' }}>
              <span style={{ color: getColor(v.clusterId), opacity: 0.7 }}>⬤</span> &nbsp; {v.name}{' '}
            </Text>
          );
        })}
      </InfoBox>
    </Box>
  );
}

const PointMaterial = forwardRef((props, ref) => {
  const [material] = useState(() => new PointMaterialImpl());

  useFrame(({ raycaster, camera }) => {
    raycaster.params.Points.threshold = (props.scale * camera.position.z) / 2100;
  });

  return <primitive object={material} ref={ref} attach="material" {...props} />;
});

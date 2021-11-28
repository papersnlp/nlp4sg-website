import { useState, useRef } from 'react' 
import { Box } from '@styles/components'
import { styled } from '@styles/config'
import { useDrag } from '@use-gesture/react'
import { a, useSpring } from '@react-spring/web'
import graphjson from 'public/bipartite.json'
import { 
  Graph, 
  useNode, 
  useLink, 
  LayoutLayer
} from 'graphire'

const colors = ["#ff7675", "#74b9ff", "#26de81", "#F79F1F"];

const Component = (props) => {
  
  const [graph] = useState(() => graphjson)

  return (
    <Box>
       <svg style={{width: '100vw', height: '100vh'}}>
        <Graph>
          <LayoutLayer gaps={[250, 40]} anchor={[50, 50]} />

          <g id='nodes'>
            { graph.nodes.map((e, i) => <Node key={`n-${i}`} uid={e.id} color={colors[e.id%4]} />) }
          </g>
          { graph.links.map((e, i) => <Link key={`l-${i}`} source={e.source} target={e.target} />)}

          <use href='#nodes' style={{ pointerEvents: 'none' }}/>
        </Graph>
      </svg>
    </Box>
  )
}

const Node = (props) => {
  const { color, ...rest } = props
  const ref = useRef() 
  const node = useNode(([x, y]) => {
    ref.current.setAttribute('cx', x)  
    ref.current.setAttribute('cy', y)  
  }, rest)
  const bind = useDrag(({ active, offset: [x, y] }) => {
    node.set({ fx: active && x, fy: active && y })
  }, { from: () => [node.get().x, node.get().y] })

  return <circle ref={ref} r={10} {...bind()} fill={color} style={{ touchAction: 'none'}}/>
}

const Link = (props) => {
  const { source, target, color = '#95a5a6', ...rest } = props
  const ref = useRef()

  useLink(([x1, y1], [x2, y2]) => {
    ref.current.setAttribute('x1', x1)  
    ref.current.setAttribute('y1', y1)  
    ref.current.setAttribute('x2', x2)  
    ref.current.setAttribute('y2', y2)  
  }, source, target, rest)
  return (
    <line ref={ref} x1='0' y1='0' x2='0' y2='0' stroke={color} strokeWidth={1} />
  )
}

export default Component 
import { useState, useRef } from 'react' 
import { Box } from '@styles/components'
import { styled } from '@styles/config'
import { useDrag } from '@use-gesture/react'
import { a, useSpring } from '@react-spring/web'
// Check out the library doc: https://github.com/flavioschneider/graphire
import { 
  Graph, 
  useNode, 
  useLink, 
  LayoutForce,
  ForceCollide,
  ForceManyBody
} from 'graphire'

const colors = ["#ff7675", "#74b9ff", "#26de81", "#F79F1F"];

const Component = (props) => {
  const [ bubbles ] = useState(() => [
    {
      text: 'MT (low-resource)',
      amount: 25.7
    },
    {
      text: 'Education',
      amount: 22.9
    },
    {
      text: 'Pysical & Mental Health',
      amount: 18.6
    },
    {
      text: 'Assistive Tech',
      amount: 14.3
    },
    {
      text: 'NLP for Social Problems',
      amount: 18.6
    },
    {
      text: 'Friendlier Social Media',
      amount: 18.6
    },
    {
      text: 'Combat Misinformation',
      amount: 17.1
    },
    {
      text: 'NLP for Equity',
      amount: 11.4
    },
    {
      text: 'Efficiency \n Productivity',
      amount: 11.4
    },
    {
      text: 'Scientific Discovery',
      amount: 4.3
    },
    {
      text: 'Privacy',
      amount: 5.7
    }
  ])

  return (
    <Box>
       <svg style={{width: '100vw', height: '100vh'}}>
        <Graph>
          <LayoutForce alphaTarget={0.3} velocityDecay={0.1}>
            <ForceManyBody strength={-2} />
            <ForceCollide strength={1}/>
          </LayoutForce>
          { 
            bubbles.map((data, id) => <Node 
              key={id} 
              uid={id} 
              x={500} 
              y={400} 
              text={data.text}
              amount={data.amount} 
              color={colors[id%4]} 
              />)
          }
        </Graph>
      </svg>
    </Box>
  )
}

const Text = styled('text', {
  width: '$5',
  fontFamily: '$mono',
  opacity: 0.5,
  fontSize: '$1',
  pointerEvents: 'none'
})

const Node = (props) => {
  const { color='black', amount, x=0, y=0, uid, text } = props
  const [style, api] = useSpring(() => ({ x: 0, y: 0 })) 
  const radius = amount*2.5+60

  const node = useNode(([x, y]) => {
    // When node position changes we update the circle position using react-spring 
    api.start({ x: x, y: y, immediate: true })
  }, { radius, x, y, uid })
  
  const bind = useDrag(({ active, offset: [x, y] }) => {
    // When drag starts, we update the graphire node simulation by fixing x and y
    node.set({ fx: active ? x : undefined, fy: active ? y : undefined })
  }, { from: () => [node.get().x, node.get().y] })
  
  return (
    <a.g style={style} {...bind()}>
      <circle r={radius} fill={color} />
      <Text textAnchor="middle">{text}</Text>
      <Text textAnchor="middle" y={20}>{Math.round(amount*10)/10}%</Text>
    </a.g>
  )
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
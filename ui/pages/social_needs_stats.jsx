import dynamic from 'next/dynamic';
import { useEffect, useState, useRef } from 'react';
import { Box, Text, Span, Link, Separator, List } from '@styles/components';

import { styled } from '@mui/material/styles';
import * as Icon from 'react-feather';
import { useTheme } from 'next-themes';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import PapersPlot from '@components/PapersPlot';
import papers from 'public/papers.json';
import Paper from '@mui/material/Paper';
import { HelpCircle } from 'react-feather';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import Slider from '@mui/material/Slider';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'
import data_tasks from 'public/json/tasks_scirex.json';
import data_methods from 'public/json/methods_scirex.json';
import { ImageBitmapLoader } from 'three';
import GetPapers from './GetPapers';

// or
import Sidenav from 'rsuite/Sidenav';
import Nav from 'rsuite/Nav';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



export default function Papers({ papers }) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [paper, setPaper] = useState(null);
  const parallax = useRef();
  const [year, setYear] = useState(2022);
  const [goal, setgoal] = useState("Climate Action");
  const labels = [''];
  const [activeKey, setActiveKey] = useState("1");
  const [data, setdata] = useState();
  const [dataTask, setdataTask] = useState();
  const [dataMethod, setdataMethod] = useState();

useEffect(() => { 
  setdataTask({
    labels:data_tasks.filter((a) => a.Goal === goal ).map((data) => data.tasks).slice(0, 10),
    datasets: [
      {
        label:"Tasks",
        extended_label: '# Tasks',
        data: data_tasks.filter((a) => a.Goal === goal ).map((data) => data['ID']).slice(0, 10),
        backgroundColor: '#85e085',
      },

    ],});

    setdataMethod({
      labels:data_methods.filter((a) => a.Goal === goal ).map((data) => data.methods).slice(0, 10),
      datasets: [
        {
          label:"Methods",
          extended_label: '# Methods',
          data: data_methods.filter((a) => a.Goal === goal ).map((data) => data['ID']).slice(0, 10),
          backgroundColor: '#85e085',
        },

      ],});
  
  }, [goal]);


  const [marks,setmarks]=useState([
    {
      value: 1990,
      label: '1990',
    },
    {
      value: 2022,
      label: '2022',
    },
  ])

  function onToggleChange(value) {
    if (value === '') setTheme('system');
    else setTheme(value);
  }
  // To avoid having `theme` undefined.
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const Img = styled("img")({
    margin: "auto",
    width: "100%",
    height: "100%",
    position: 'relative',
    opacity: '0.2',
  });

  const Image = styled("image")({
    opacity: '0.6',
    maxWidth: "100%",
    maxHeight: "100%"
  });

  const Wrap = styled("Item")`
  position: relative;
  &:before {
    content: ' ';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.2;
    background-image: url('https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/12/E_SDG_action_card_square_1-1024x1024.jpg');
    background-repeat: no-repeat;
    background-position: 50% 0;
    background-size: cover;
  }
`;
const Wrap1 = styled(Wrap)`
&:before {
  background-image: url('https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/12/E_SDG_action_card_square_2-1-1024x1024.jpg');
}
`;


const Content = styled("div")`
position: relative;
`;

const options={

  scales: { yAxes: {title: {
    display: true,
    text: "# Papers", 
    font: {
      size: 10
      }
      }
      },
   },
  plugins: {
    tooltip: {
      enabled: true,
      callbacks: {
              label: function (tooltipItems, data) {
                return  tooltipItems.dataset.extended_label+": "+Math.round(tooltipItems.raw*100)/100;
              }
      }
    }
  }
}

function valuetext(value) {
  return `${value}`;
}
const goals={1:"Climate Action",2:"Gender Equality",3:"Quality Education"}
const handleSelect = (eventKey) => {
  setActiveKey(goals);
  
  setgoal(goals[eventKey]);
};

  return (
    <Box css={{ bc: '$contrast2', width: '100vw', height: '100vh'}}>
      <Box css={{  width: '30vw', height: '10vh'}}>
        <Sidenav defaultOpenKeys={['3', '4']} onSelect={handleSelect}>
          <Sidenav.Body>
            <Nav activeKey="1">
              <Nav.Item eventKey="1" goal_local="Climate Action">
              Climate Action
              </Nav.Item>
              <Nav.Item eventKey="2" goal_local="Gender Equality">
              Gender Equality
              </Nav.Item>
              <Nav.Item eventKey="3" goal_local="Quality Education">
              Quality Education
              </Nav.Item>
              
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </Box>
    <Box css={{ bc: '$contrast2', width: '100vw', height: '100vh'}}>
      <Grid container spacing={4} >
                 <Text> goal </Text>
                 <Grid item xs={5}>
                 <Bar options={options} data={dataTask} /> 
                 </Grid>
                 <Grid item xs={5}>
                 <Bar options={options} data={dataMethod} />
                 </Grid>
                 <Grid item xs={8}>
                 <GetPapers goal={goal}></GetPapers>
                 </Grid>

      </Grid>

      </Box>
    </Box>
  );
}

export async function getStaticProps(context) {
  return {
    props: { papers }, // will be passed to the page component as props
  };
}

const StyledToggleGroup = styled(ToggleGroupPrimitive.Root, {
  display: 'inline-flex',
  fontFamily: '$sans',
});

const StyledItem = styled(ToggleGroupPrimitive.Item, {
  all: 'unset',
  backgroundColor: '$contrast3',
  color: '$contrast12',
  height: '30px',
  p: '$2',
  display: 'flex',
  fontSize: '$2',
  alignItems: 'center',
  justifyContent: 'center',
  '&:first-child': {
    borderTopLeftRadius: '$round',
    borderBottomLeftRadius: '$round',
    pl: '$3',
  },
  '&:last-child': {
    borderTopRightRadius: '$round',
    borderBottomRightRadius: '$round',
    pr: '$3',
  },
  '&:hover': { backgroundColor: '$contrast4' },
  '&[data-state=on]': { backgroundColor: '$contrast5', color: 'contrast1' },
  '&:focus': { position: 'relative', boxShadow: `0 0 0 2px black` },
});

const ToggleGroup = StyledToggleGroup;
const ToggleGroupItem = StyledItem;

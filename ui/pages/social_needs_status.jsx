import dynamic from 'next/dynamic';
import { useEffect, useState, useRef } from 'react';
import { Box, Text, Span, Link, Separator, List } from '@styles/components';
import Navbar from '../components/navbar';
import { styled } from '@mui/material/styles';
import * as Icon from 'react-feather';
import { useTheme } from 'next-themes';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import PapersPlot from '@components/PapersPlot';
import Paper from '@mui/material/Paper';
import { HelpCircle } from 'react-feather';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import Slider from '@mui/material/Slider';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'

import { ImageBitmapLoader } from 'three';
import GetPapers from '../components/GetPapers';
import data_papers from 'public/proportions_years.json';
import data_scores from 'public/scores.json';

// or
import { scaleLinear } from "d3";
export default function Papers({  }) {
  const { setTheme, theme } = useTheme();
  const parallax = useRef();
  const [color, setcolor] = useState("#5eb0ef");
  const colorScale = scaleLinear().domain([30, 85]).range([color, "white"]);
  const colorScale2 = scaleLinear().domain([0, 100]).range([color, "white"]);
  const colorScale3 = scaleLinear().domain([0, 3000]).range([color, "white"]);
  const [RadioSelect, setRadioSelect] = useState(true);
  const [year, setYear] = useState(2021);
  const [slideryear, setsliderYear] = useState(2021);
  const setRadio = () => {
    setRadioSelect(!RadioSelect)
  };
  const setsliderradio = (val) => {
    setsliderYear(val)
    setRadioSelect(false)
  };

  const [dataPriority, setdataPriority] = useState({
    labels: data_scores.map((data) => data.goal_long),
    datasets: [
      {
        data: data_scores.map((data) => data['priority_score']),
        minBarLength: 2,
        backgroundColor: data_scores.map((data) => colorScale(data['priority_score'])),
      },
    ],
  });
  const [dataSurvey, setdataSurvey] = useState({
    labels: data_scores.map((data) => data.goal_long),
    datasets: [
      {
        data: data_scores.map((data) => data['weight']),
        minBarLength: 2,
        backgroundColor: data_scores.map((data) => colorScale2(data['weight'])),
      },

    ],
  });
  const [dataPapers, setdataPapers] = useState(()=>{
  return {
    labels: data_papers.filter((a) => a.year === year).map((data) => data.goal_long),
    datasets: [
      {
        minBarLength: 2,
        data: data_papers.filter((a) => a.year === year).map((data) => (data['papers'])),
        backgroundColor: data_papers.filter((a) => a.year === year).map((data) => colorScale3(data['papers'])),
      },

    ]
 }
  });

  useEffect(() => {
    var data = data_papers.filter((c) => c.year === year).sort(function(a, b){
      return a.goal_number.localeCompare(b.goal_number);
  });
    var max_val = Math.max.apply(Math, data.map(function (data) { return data.papers; }))
    var min_val = Math.min.apply(Math, data.map(function (data) { return data.papers; }))
    var colorScale4 = scaleLinear().domain([min_val, max_val + (max_val / 10)]).range([color, "white"]);
    if (year!='All years'){
      colorScale4 = scaleLinear().domain([0, 600]).range([color, "white"]);
    }
    setdataPapers({
      labels: data.map((data) => data.goal_long),
      datasets: [
        {
          data: data.map((data) => (data['papers'])),
          backgroundColor: data.map((data) => colorScale4(data['papers'])),
        },
      ],
    });
  }, [year]);
  useEffect(() => {
    if (RadioSelect == false) { setYear(slideryear); } else { setYear("All years"); }
  }, [slideryear, RadioSelect]);

  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    scales: {
      y: {
        grid: {
          display: false
        }
      },
      xAxes: {
        min: 30,
        title: {
          display: true,
          text: 'Rated Importance',
          font: {
            size: 15
          }
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        font: {
          size: 14,
        },
        display: true,
        text: ['                                                          Rated Importance (1-100)',
               '                                                         by 360 Sustainability Researchers'],
      },
      //['# NLP4SG Papers in',' ACL Anthology']
    },
  };
  const options2 = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    scales: {
      xAxes: {
        min: 0,
        title: {
          display: true,
          text: '% Mentions',
          font: {
            size: 15
          }
        }
      },
      y: {
        display: false,
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        font: {
          size: 14,
        },
        display: true,
        text: ['% Mentions as Important Goal','by 80 NLP Researchers'],
      },


    },
  }
  const computemax=()=>{
    if (year=='All years'){
      return 3000
    }
    else{
      return 460
    }
  }
  const options3 = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    scales: {
      xAxes: {
        max: computemax,
        title: {
          display: true,
          text: '# Papers',
          font: {
            size: 15
          }
        }
      },
      y: {
        display: false,
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        font: {
          size: 14,
        },
        display: true,
        text: ['# NLP4SG Papers in',' ACL Anthology'],
      },
    },
  };

/*useEffect(() => {
    console.log(data_scores.map((data) => data['priority_score']));
    console.log(colorScale(10));
  }, []); */
  function valuetext(value) {
    return `${value}`;
  }
  const [marks, setmarks] = useState([
    {
      value: 1990,
      label: '1990',
    },
    {
      value: 2021,
      label: '2021',
    },
  ])
  return (
    <Box css={{ bc: '$contrast2', width: '100vw', height: '100vh', backgroundColor: 'white' }}>
      <Box css={{ width: '100vw', height: '190px', position: 'fixed', backgroundColor: 'white', zIndex: '1' }}>
        <Navbar title={"Visualization of NLP4SG Research Papers Tracking"} />
        <Text
          css={{
            position: 'absolute',
            textAlign: 'center',
            top: 34,
            width: '100vw',
            pt: '$3',
            px: '$3',
            zIndex: '-1'
          }}
        >

          <div>
            <div style={{
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto', textAlign: 'center'
            }}>
              <input
                type='checkbox'
                id='bar'
                name='chart'
                checked={RadioSelect}
                onClick={setRadio}
              />
              <label htmlFor="bar" >All years</label>
            </div>
            Current visualization showing: <span style={{ fontWeight: 'bold' }}>{year}</span></div>
        </Text>

        <Grid item xs={10} >

          <Slider style={{ width: '85vw', left: '8%', top: '125px' }}
            value={slideryear}
            onChange={event => setsliderradio(event.target.value)}
            aria-label="Year"
            defaultValue={2012}
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            step={1}
            min={1990}
            max={2021}
            marks={marks}
          // valueLabelDisplay="on"
          // https://mui.com/material-ui/react-slider/

          ></Slider>
        </Grid>
      </Box>
      <br />
      <Box style={{ marginTop: '160px', bc: '$contrast2', width: '100vw', height: '80vh', flex: 1 }}>

        <Grid
          container
        >
          <Grid item xs={2}>

            <Grid style={{ height: "77vh" }}>
              
            </Grid>
          </Grid>
          <Grid item xs={4}>

            <Grid style={{ height: "77vh" }}>
              <Bar options={options} data={dataPriority} />
            </Grid>
          </Grid>
          <Grid item xs={2}>

            <Grid style={{ height: "77vh" }}>
              <Bar options={options2} data={dataSurvey} />
            </Grid>
          </Grid>
          <Grid item xs={2}>

            <Grid style={{ height: "77vh" }}>
              <Bar options={options3} data={dataPapers} />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export async function getStaticProps(context) {
  return {
    props: {  }, // will be passed to the page component as props
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

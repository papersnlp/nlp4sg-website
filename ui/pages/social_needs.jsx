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
import data_papers from 'public/json/proportions.json';
import { ImageBitmapLoader } from 'three';

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
  const labels = ['January'];

  const [data, setdata] = useState({
    labels,
    datasets: [
      {
        label: 'Current proportion',
        data: data_papers.filter((a) => a.year === year ).filter((a) => a.Goal === "Gender Equality" ).map((data) => data['proportion']),
        backgroundColor: '#ff6666',
      },
      {
        label: 'Expected proportion',
        data: labels.map(() => faker.datatype.number({ min: 5.88, max: 5.88 })),
        backgroundColor: '#6666ff',
      },
    ],
  });
  
  useEffect(() => {
    setdata({
      labels,
      datasets: [
        {
          label: 'Current proportion',
          data: data_papers.filter((a) => a.year === year ).filter((a) => a.Goal === "Gender Equality" ).map((data) => data['proportion']),
          backgroundColor: '#ff6666',
        },
        {
          label: 'Expected proportion',
          data: [5.8],
          backgroundColor: '#6666ff',
        },
      ],});
  
  }, [year]);

  function goal_specific(goal) {
    return {
      labels,
      datasets: [
        {
          label: 'Current proportion',
          data: data_papers.filter((a) => a.year === year ).filter((a) => a.Goal === goal ).map((data) => data['proportion']),
          backgroundColor: '#ff6666',
        },
        {
          label: 'Expected proportion',
          data: [5.8],
          backgroundColor: '#6666ff',
        },
      ],};
  }

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


function valuetext(value) {
  return `${value}`;
}

  return (
    <Box css={{ bc: '$contrast2', width: '100vw', height: '100vh'}}>

      <Text
        type="subtitle"
        css={{
          position: 'absolute',
          top: '0',
          textAlign: 'center',
          width: '100vw',
          pt: '$4',
          px: '$3',
        }}
      >
        Visualization of Existing NLP4SG Research Papers
      </Text>
       <Box sx={{ flexGrow: 1 }}>
         <br/>
         <br/>
         <br/>
         <Grid item xs={10}>
            <Slider style={{ width: '90vw',left: '5%'}}
            value={year}
            onChange={event => setYear(event.target.value)}
            aria-label="Year"
            defaultValue={2012}
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            step={1}
            min={1990}
            max={2022}
            marks={marks}
            // valueLabelDisplay="on"
            // https://mui.com/material-ui/react-slider/

            ></Slider>
        </Grid>
        <Grid container spacing={4} >
                 
          <Grid item xs={4}> 
            <Wrap>
                <Content>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                <Bar  data={goal_specific("No Poverty")} />
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                </Content>

            </Wrap>
          </Grid>

          <Grid item xs={4}> 
            <Wrap sx={{'&:before':  {
                      backgroundImage:  `url('https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/12/E_SDG_action_card_square_2-1-1024x1024.jpg') `
                      }}}>
                <Content>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                <Bar  data={goal_specific("No Hunger")} />
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                </Content>

            </Wrap>
          </Grid>
          <Grid item xs={4}> 
          <Wrap sx={{'&:before':  {
                      backgroundImage:  `url('https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/12/E_SDG_action_card_square_3-1024x1024.jpg') `
                      }}}>
                <Content>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                <Bar  data={goal_specific("Good Health and Well-Being")} />
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                </Content>

            </Wrap>
          </Grid>
          <Grid item xs={4}> 
          <Wrap sx={{'&:before':  {
                      backgroundImage:  `url('https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/12/E_SDG_action_card_square_4-1024x1024.jpg') `
                      }}}>
                <Content>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                <Bar  data={goal_specific("Quality Education")} />
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                </Content>

            </Wrap>
          </Grid>
          <Grid item xs={4}> 
          <Wrap sx={{'&:before':  {
                      backgroundImage:  `url('https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/12/E_SDG_action_card_square_5-1024x1024.jpg') `
                      }}}>
                <Content>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                <Bar  data={goal_specific("Gender Equality")}/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                </Content>

            </Wrap>
          </Grid>
          <Grid item xs={4}> 
          <Wrap sx={{'&:before':  {
                      backgroundImage:  `url('https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/12/E_SDG_action_card_square_6-1024x1024.jpg') `
                      }}}>
                <Content>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                <Bar  data={goal_specific("Clean Water and Sanitation")} />
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                </Content>

            </Wrap>
          </Grid>
          <Grid item xs={4}> 
          <Wrap sx={{'&:before':  {
                      backgroundImage:  `url('https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/12/E_SDG_action_card_square_7-1024x1024.jpg') `
                      }}}>
                <Content>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                <Bar  data={goal_specific("Affordable and Clean Energy")} />
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                </Content>

            </Wrap>
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

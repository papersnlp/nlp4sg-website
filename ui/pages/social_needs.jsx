import dynamic from 'next/dynamic';
import { useEffect, useState, useRef } from 'react';
import { Box, Text, Span, Link, Separator, List } from '@styles/components';

import { styled } from '@mui/material/styles';
import { useTheme } from 'next-themes';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import papers from 'public/json/papers.json';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import Slider from '@mui/material/Slider';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import { useRouter } from 'next/router';
import data_papers from 'public/proportions2.json';
import data_people from 'public/proportions_people.json';
import data_priority from 'public/social_needs_priorities.json';
import data_survey from 'public/proportions_survey.json';
import { ImageBitmapLoader } from 'three';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
//import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from '../components/navbar';


export default function Papers({ papers }) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [paper, setPaper] = useState(null);
  const parallax = useRef();
  const [year, setYear] = useState(2022);
  const [slideryear, setsliderYear] = useState(2022);
  const labels = [''];

  const [data, setdata] = useState();
  const [RadioSelect, setRadioSelect] = useState(true);
  const router = useRouter();
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const setRadio = () => {
    setRadioSelect(!RadioSelect)
  };
  const setsliderradio = (val) => {
    setsliderYear(val)
    setRadioSelect(false)
  };



  useEffect(() => {
    if (RadioSelect == false) { setYear(slideryear); } else { setYear("All years"); }
  }, [slideryear, RadioSelect]);


  function goal_specific(goal) {
    return {
      labels,
      datasets: [
        {
          label: 'Importance Yang et al. (2020)',
          yAxisID: 'y1',
          extended_label: 'Importance rated by Yang et al. (2020):  ' + Math.round(data_priority.filter((a) => a.Goal === goal).map((data) => data['priority_score']) * 10) / 10,
          additionalinfo: 'Normalized importance rated by Yang et al. (2020):  ' + Math.round(data_priority.filter((a) => a.Goal === goal).map((data) => data['priority_score_normalized']) * 10) / 10,
          data: data_priority.filter((a) => a.Goal === goal).map((data) => data['priority_score_normalized']),
          backgroundColor: '#6666ff',
        },
        /*{
           label: '% People suffering',
           yAxisID: 'y2',
           extended_label: '% World population suffering',
           additionalinfo: '# People suffering (millions): '+Math.round(data_people.filter((a) => a.Goal === goal ).map((data) => data['Num_people_suffering'])*10)/10,
           
           data: data_people.filter((a) => a.Goal === goal ).map((data) => data['proportion_people']),
           backgroundColor: 'green',
         },*/
        {
          label: '% NLP Researchers',
          yAxisID: 'y2',
          extended_label: '% NLP Researchers that think we should pursue this goal: ' + Math.round(data_survey.filter((a) => a.Goal === goal).map((data) => data['Normalized_proportion']) * 10) / 10,
          additionalinfo: '',
          data: data_survey.filter((a) => a.Goal === goal).map((data) => data['Normalized_proportion'] + 3),
          backgroundColor: '#85e085',
        },
        {
          label: '% NLP4SG papers',
          yAxisID: 'y2',
          extended_label: '% NLP ACL papers that help this goal' + ": " + Math.round(data_papers.filter((a) => a.year === year).filter((a) => a.Goal === goal).map((data) => (data['proportion'] * 100)) * 10) / 10,
          additionalinfo: '# NLP ACL papers: ' + data_papers.filter((a) => a.year === year).filter((a) => a.Goal === goal).map((data) => data['papers']),
          data: data_papers.filter((a) => a.year === year).filter((a) => a.Goal === goal).map((data) => (data['proportion'] * 100) + 3),
          backgroundColor: '#ff6666',
        },


      ],
    };
  }

  const [marks, setmarks] = useState([
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
  display: block;
  background-size: cover;
  &:before {
    content: ' ';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.2;
    background-repeat: no-repeat;
    background-position: 50% 0;
    background-image: url('https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/12/E_SDG_action_card_square_1-1024x1024.jpg');
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

  const options = {

    scales: {
      y1: {
        type: 'linear',
        display: true,
        position: 'left',
        min: 0,
        max: 60,
        title: {
          display: true,
          text: 'Score'
        }

      },
      y2: {
        type: 'linear',
        display: true,
        position: 'right',
        min: 0,
        max: 60,
        title: {
          display: true,
          text: '% Percentage'
        },
        // grid line settings
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (tooltipItems, data) {
            var multistringText = [tooltipItems.dataset.extended_label];
            if (tooltipItems.dataset.additionalinfo != '') {
              multistringText.push(tooltipItems.dataset.additionalinfo);
            }
            return multistringText
          }
        }
      }
    }
  }
  const Button = styled('button', {
    borderRadius: '$round',
    width: '$5',
    height: '$5',
    border: 'none',
    bc: '$primary',
    color: '$contrast1',
    cursor: 'pointer',
    position: 'relative',
    zIndex: 1,
    '&:hover': {
      opacity: 0.7,
    },
  });





  function valuetext(value) {
    return `${value}`;
  }

  return (
    <Box css={{ bc: '$contrast2', width: '100vw', height: '100vh' ,backgroundColor: 'white'}}>


      <Box css={{ width: '100vw', height: '23vh', position: 'fixed', backgroundColor: 'white', zIndex: '1' }}>
        {/*
    <Navbar bg="dark" variant="dark" fixed="top" css={{zIndex: '100'}}>
    <Container>
    <Nav className="me-auto">
      <Nav.Link href="/social_needs">NLP4SG UN Goals</Nav.Link><br/>
      <Nav.Link href="/sankey">NLP4SG Overview</Nav.Link><br/>
      <Nav.Link href="/sankey_org">NLP4SG Organizations</Nav.Link>
    </Nav>
    </Container>
  </Navbar>*/}
        <Navbar title={"Visualization of NLP4SG Research Papers Tracking"}/>
        <Text
          type="subtitle"
          css={{
            position: 'absolute',
            textAlign: 'center',
            top: 34,
            width: '100vw',
            pt: '$4',
            px: '$3',
            zIndex: '-1',
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

        <Box >


          <Grid item xs={10} >

            <Slider style={{ width: '85vw', left: '5%',top:'145px' }}
              value={slideryear}
              onChange={event => setsliderradio(event.target.value)}
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
        </Box>
      </Box>
      <br />

      <Box style={{marginTop:'230px' }}>

        <Grid container spacing={4} >


          <Grid item xs={3}>
            <Wrap>
              <Content>
                <br />
                <br />
                <br />

                <br />

                <Bar options={options} data={goal_specific("No Poverty")} />


                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </Content>

            </Wrap>
            <Item >
              <Typography gutterBottom variant="subtitle1" component="div" css={{ position: 'relative' }}>
                Goal 1: No Poverty
              </Typography>
            </Item>
          </Grid>

          <Grid item xs={3}>
            <Wrap sx={{
              '&:before': {
                backgroundImage: `url('https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/12/E_SDG_action_card_square_2-1-1024x1024.jpg') `
              }
            }}>
              <Content>
                <br />
                <br />
                <br />
                <br />
                <Bar options={options} data={goal_specific("No Hunger")} />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </Content>

            </Wrap>
            <Item>
              <Typography gutterBottom variant="subtitle1" component="div" css={{ position: 'relative' }}>
                Goal 2: Zero Hunger
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Wrap sx={{
              '&:before': {
                backgroundImage: `url('https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/12/E_SDG_action_card_square_3-1024x1024.jpg') `
              }
            }}>
              <Content>
                <br />
                <br />
                <br />
                <br />
                <Bar options={options} data={goal_specific("Good Health and Well-Being")} />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </Content>

            </Wrap>
            <Item>
              <Typography gutterBottom variant="subtitle1" component="div" css={{ position: 'relative' }}>
                Goal 3: Good Health and Well-Being
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Wrap sx={{
              '&:before': {
                backgroundImage: `url('https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/12/E_SDG_action_card_square_4-1024x1024.jpg') `
              }
            }}>
              <Content>
                <br />
                <br />
                <br />
                <br />
                <Bar options={options} data={goal_specific("Quality Education")} />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </Content>

            </Wrap>
            <Item>
              <Typography gutterBottom variant="subtitle1" component="div" css={{ position: 'relative' }}>
                Goal 4: Quality Education
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Wrap sx={{
              '&:before': {
                backgroundImage: `url('https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/12/E_SDG_action_card_square_5-1024x1024.jpg') `
              }
            }}>
              <Content>
                <br />
                <br />
                <br />
                <br />
                <Bar options={options} data={goal_specific("Gender Equality")} />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </Content>

            </Wrap>
            <Item>
              <Typography gutterBottom variant="subtitle1" component="div" css={{ position: 'relative' }}>
                Goal 5: Gender Equality
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Wrap sx={{
              '&:before': {
                backgroundImage: `url('https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/12/E_SDG_action_card_square_6-1024x1024.jpg') `
              }
            }}>
              <Content>
                <br />
                <br />
                <br />
                <br />
                <Bar options={options} data={goal_specific("Clean Water and Sanitation")} />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </Content>

            </Wrap>
            <Item>
              <Typography gutterBottom variant="subtitle1" component="div" css={{ position: 'relative' }}>
                Goal 6: Clean Water and Sanitation
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Wrap sx={{
              '&:before': {
                backgroundImage: `url('https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/12/E_SDG_action_card_square_7-1024x1024.jpg') `
              }
            }}>
              <Content>
                <br />
                <br />
                <br />
                <br />
                <Bar options={options} data={goal_specific("Affordable and Clean Energy")} />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </Content>

            </Wrap>
            <Item>
              <Typography gutterBottom variant="subtitle1" component="div" css={{ position: 'relative' }}>
                Goal 7: Affordable and Clean Energy
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Wrap sx={{
              '&:before': {
                backgroundImage: `url('https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/12/E_SDG_action_card_square_8-1024x1024.jpg') `
              }
            }}>
              <Content>
                <br />
                <br />
                <br />
                <br />
                <Bar options={options} data={goal_specific("Decent Work and Economic Growth")} />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </Content>

            </Wrap>
            <Item>
              <Typography gutterBottom variant="subtitle1" component="div" css={{ position: 'relative' }}>
                Goal 8: Decent Work and Economic Growth
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Wrap sx={{
              '&:before': {
                backgroundImage: `url('https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/12/E_SDG_action_card_square_9-1024x1024.jpg') `
              }
            }}>
              <Content>
                <br />
                <br />
                <br />
                <br />
                <Bar options={options} data={goal_specific("Industry, Innovation and Infrastrucure")} />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </Content>

            </Wrap>
            <Item>
              <Typography gutterBottom variant="subtitle1" component="div" css={{ position: 'relative' }}>
                Goal 9: Industry, Innovation and Infrastrucure
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Wrap sx={{
              '&:before': {
                backgroundImage: `url('https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/12/E_SDG_action_card_square_10-1024x1024.jpg') `
              }
            }}>
              <Content>
                <br />
                <br />
                <br />
                <br />
                <Bar options={options} data={goal_specific("Reduced Inequalities")} />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </Content>

            </Wrap>
            <Item>
              <Typography gutterBottom variant="subtitle1" component="div" css={{ position: 'relative' }}>
                Goal 10: Reduced Inequalities
              </Typography>

            </Item>
          </Grid>
          <Grid item xs={3}>
            <Wrap sx={{
              '&:before': {
                backgroundImage: `url('https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/12/E_SDG_action_card_square_11-1024x1024.jpg') `
              }
            }}>
              <Content>
                <br />
                <br />
                <br />
                <br />
                <Bar options={options} data={goal_specific("Sustainable Cities and Communities")} />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </Content>

            </Wrap>
            <Item>
              <Typography gutterBottom variant="subtitle1" component="div" css={{ position: 'relative' }}>
                Goal 11: Sustainable Cities and Communities
              </Typography>

            </Item>
          </Grid>
          <Grid item xs={3}>
            <Wrap sx={{
              '&:before': {
                backgroundImage: `url('https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/12/E_SDG_action_card_square_12-1024x1024.jpg') `
              }
            }}>
              <Content>
                <br />
                <br />
                <br />
                <br />
                <Bar options={options} data={goal_specific("Responsible Consumption and Production")} />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </Content>

            </Wrap>
            <Item>
              <Typography gutterBottom variant="subtitle1" component="div" css={{ position: 'relative' }}>
                Goal 12: Responsible Consumption and Production
              </Typography>

            </Item>
          </Grid>
          <Grid item xs={3}>
            <Wrap sx={{
              '&:before': {
                backgroundImage: `url('https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/12/E_SDG_action_card_square_13-1024x1024.jpg') `
              }
            }}>
              <Content>
                <br />
                <br />
                <br />
                <br />
                <Bar options={options} data={goal_specific("Climate Action")} />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </Content>

            </Wrap>
            <Item>
              <Typography gutterBottom variant="subtitle1" component="div" css={{ position: 'relative' }}>
                Goal 13: Climate Action
              </Typography>

            </Item>
          </Grid>
          <Grid item xs={3}>
            <Wrap sx={{
              '&:before': {
                backgroundImage: `url('https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/12/E_SDG_action_card_square_14-1024x1024.jpg') `
              }
            }}>
              <Content>
                <br />
                <br />
                <br />
                <br />
                <Bar options={options} data={goal_specific("Life Below Water")} />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </Content>

            </Wrap>
            <Item>
              <Typography gutterBottom variant="subtitle1" component="div" css={{ position: 'relative' }}>
                Goal 14: Life Below Water
              </Typography>

            </Item>
          </Grid>
          <Grid item xs={3}>
            <Wrap sx={{
              '&:before': {
                backgroundImage: `url('https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/12/E_SDG_action_card_square_15-1024x1024.jpg') `
              }
            }}>
              <Content>
                <br />
                <br />
                <br />
                <br />
                <Bar options={options} data={goal_specific("Life on Land")} />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </Content>

            </Wrap>
            <Item>
              <Typography gutterBottom variant="subtitle1" component="div" css={{ position: 'relative' }}>
                Goal 15: Life on Land
              </Typography>

            </Item>
          </Grid>
          <Grid item xs={3}>
            <Wrap sx={{
              '&:before': {
                backgroundImage: `url('https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/12/E_SDG_action_card_square_16-1024x1024.jpg') `
              }
            }}>
              <Content>
                <br />
                <br />
                <br />
                <br />
                <Bar options={options} data={goal_specific("Peace, Justice and Strong Institutions")} />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </Content>

            </Wrap>
            <Item>

              <Typography gutterBottom variant="subtitle1" component="div" css={{ position: 'relative' }}>
                Goal 16: Peace, Justice and Strong Institutions
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Wrap sx={{
              '&:before': {
                backgroundImage: `url('https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/12/E_SDG_action_card_square_17-1024x1024.jpg') `
              }
            }}>
              <Content>
                <br />
                <br />
                <br />
                <br />
                <Bar options={options} data={goal_specific("Partnership for the Goals")} />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </Content>

            </Wrap>
            <Item>
              <Typography gutterBottom variant="subtitle1" component="div" css={{ position: 'relative' }}>
                Goal 17: Partnership for the Goals
              </Typography>
            </Item>
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

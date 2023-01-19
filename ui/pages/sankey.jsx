import dynamic from 'next/dynamic';
import { useEffect, useState, useRef } from 'react';
import { Box, Text, Span, Separator, List } from '@styles/components';

import { styled } from '@mui/material/styles';
import { useTheme } from 'next-themes';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import papers from 'public/json/papers.json';
import order from 'public/order_sankey.json';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Sankey, {
  Tooltip,
  Link,
  Node,Label,Font,Size,weight
} from 'devextreme-react/sankey';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import GetPapers from '../components/GetPapers';
import data2 from 'public/sankey_no_org.json';
import names from 'public/names.json';
import { useRouter } from 'next/router';
import Navbar from '../components/navbar';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Sankey_chart({ papers }) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [paper, setPaper] = useState(null);
  const parallax = useRef();
  const [year, setYear] = useState(2022);
  const labels = [''];
  const [info, setinfo] = useState({ "goal": "", "task": "", "method": "" });

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

  const router = useRouter();
  const Content = styled("div")`
position: relative;
`;

  function valuetext(value) {
    return `${value}`;
  }
  const handleClick = (e) => {
    var node_type_source = names.filter((a) => a.name == e.target.connection.source)[0]['node_type'];
    var node_source = names.filter((a) => a.name == e.target.connection.source)[0]['name'];
    var node_type_target = names.filter((a) => a.name == e.target.connection.target)[0]['node_type'];
    var node_target = names.filter((a) => a.name == e.target.connection.target)[0]['name'];
    var goal = "";
    var task = "";
    var method = "";
    var info_data = { "goal": goal, "task": task, "method": method }
    if (node_source == "Other tasks") { node_source = "" }
    if (node_target == "Other tasks" || node_target == "Other methods") { node_target = "" }
    info_data[node_type_source.toLowerCase()] = node_source
    info_data[node_type_target.toLowerCase()] = node_target
    setinfo(info_data)
    const anchor = document.querySelector('#papers')
    anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
  const handleClickNode = (e) => {
    var node_type = names.filter((a) => a.name == e.target.label)[0]['node_type']
    var node = names.filter((a) => a.name == e.target.label)[0]['name']
    var goal = "";
    var task = "";
    var method = "";
    if (node_type == "Goal") {
      goal = node;
    } else if (node_type == "Task") {
      task = node;
    } else {
      method = node;
    }
    setinfo({ "goal": goal, "task": task, "method": method })
    const anchor = document.querySelector('#papers')
    anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const customPalette = ['#00ac00', '#d30000', '#00aa98', '#cc9c9c', '#ff4500', '#00a97d', '#00a4bb', '#ffc900', '#d80000', '#670075', '#00aaa3', '#009fcb', '#00ca00', '#00aa8d', '#ffa900', '#ccf900', '#58ff00', '#0000d1', '#00fc00', '#0070dd',
    '#0092dd', '#63009e', '#004bdd', '#ecef00', '#009a00', '#0025dd', '#cc5c5c', '#1c0020', '#ff1500', '#0000dd', '#fcd200', '#00a200', '#ce0000', '#0000b1', '#ff9900', '#0000c1', '#7e008f', '#00b700', '#ff7500', '#dc0000', '#ffb900', '#79008a',
    '#f2f2f2', '#00dc00', '#41004b', '#00a353', '#009adb', '#cc1c1c', '#00e700', '#00f200', '#f1e700', '#bcff00', '#1dff00', '#009e28', '#830094', '#0d00a8', '#007ddd', '#93ff00', '#3800a3', '#870098', '#00b700', '#00d400', '#ffc900', '#0070dd', '#f10000', '#00bf00', '#fc0000', '#000000', '#f2f2f2'];
  return (

    <Box css={{ bc: '$contrast2', width: '100vw', height: '100vh' }}>

      <Navbar title={"NLP4SG Research Activity"} />

      {/*
      <ProSidebar>
  <Menu iconShape="square">
    <MenuItem onClick={() => router.push('/social_needs')}>UN Goals </MenuItem>
    <MenuItem onClick={() => router.push('/sankey')}>NLP4SG </MenuItem>
    <MenuItem onClick={() => router.push('/sankey_org')}>NLP4SG org</MenuItem>
  </Menu>
</ProSidebar> */}
      <Box css={{ width: '100vw', height: '100vh', top: '0', backgroundColor: 'white', left: '18%' }}>
        <br />
        <br />
        <Grid item xs={11} style={{ marginTop:'20px'}} >
          <Sankey id="sankey" css={{ height: '105vh', width: '97vw'}}
            palette={customPalette}
            dataSource={data2}
            sourceField="source"
            targetField="target"
            weightField="weight"
            sortData={order}
            title=""
            onLinkClick={handleClick}
            onNodeClick={handleClickNode}
          >
            <Label>
                <Font size={14} weight={700}>

                </Font>
              </Label>

            <Tooltip
              enabled={true}
              customizeLinkTooltip={customizeLinkTooltip}
              customizeNodeTooltip={customizeNodeTooltip}
            >
            </Tooltip>

            <Link
              colorMode="gradient" border={{ width: 0.01 }}>
            </Link>
            <Node
              width={10}
              padding={18}>
            </Node>

          </Sankey>
        </Grid>
        <br />
        <br />
        <Grid item xs={8}>
          <br />
          <div id="papers" >
            <Text
              type="subtitle"
              css={{
                textAlign: 'center'
              }}>
              List of NLP4SG Papers
            </Text>
          </div>
          <br />
          <GetPapers info={info} ></GetPapers>
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

function customizeLinkTooltip(info) {
  return {
    html: `<b>From:</b> ${info.source}<br/><b>To:</b> ${info.target}<br/><b># Weighted papers:</b> ${Math.round(info.weight * 10) / 10}`,
  };
}

function customizeNodeTooltip(info) {
  return {
    html: `<b>${info.label}</b><br/><b>Incoming weight:</b> ${Math.round(info.weightIn * 10) / 10}<br/><b>Outgoing weight:</b> ${Math.round(info.weightOut * 10) / 10}`,
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

import dynamic from 'next/dynamic';
import { useEffect, useState, useRef } from 'react';
import { Box, Text, Span, Separator, List } from '@styles/components';

import { styled } from '@mui/material/styles';
import * as Icon from 'react-feather';
import { useTheme } from 'next-themes';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import papers from 'public/json/papers.json';
import order from 'public/order_sankey.json';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Sankey, {
  Tooltip,
  Link,
  Node,
} from 'devextreme-react/sankey';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

import  data2   from 'public/sankey_no_org.json';
import { useRouter } from 'next/router';

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
const customPalette = ['#ecef00','#0000c5','#ee0000','#ffa900','#ff7500','#00aa8d','#f9d700','#49ff00','#ff5100','#00a3bf','#009b13','#00aaa8','#0025dd','#0041dd','#ffcd00','#cc0c0c','#008add','#00a97d',
'#84ff00','#830094','#009f33','#00d200','#b0ff00','#ffb500','#0000d1','#00e200','#dc0000','#d80000','#00a400','#700080','#00a7b3','#00da00','#1c0020','#cc6c6c','#dcf400','#63009e','#0082dd','#c4fc00','#7f0090','#f1e700','#00c700','#00fc00','#00aa95','#380040','#009adb','#870098','#f5df00','#f2f2f2','#fe0000','#0300aa','#cc9c9c','#0078dd','#1dff00','#000000','#ff9900',
'#009c00','#e60000','#00aaa0','#f60000','#d40000','#009fcb','#ffc100','#0092dd','#0000dd','#4300a2','#d00000','#2300a6','#d0f800','#0000b9','#00b700','#00ea00','#005ddd','#7b008c','#00bf00','#540060','#ff2d00','#00f400','#00a55d','#f2f2f2'];
  return (
    
    <Box css={{ bc: '$contrast2', width: '90vw', height: '100vh'}}>
      <ProSidebar>
  <Menu iconShape="square">
    <MenuItem onClick={() => router.push('/social_needs')}>UN Goals </MenuItem>
    <MenuItem onClick={() => router.push('/sankey')}>NLP4SG </MenuItem>
    <MenuItem onClick={() => router.push('/sankey_org')}>NLP4SG org</MenuItem>
  </Menu>
</ProSidebar>
      <Box css={{width: '90vw', height: '100vh',position:'fixed',top:'0',backgroundColor:'white',left:'8%'}}>
      <Grid item xs={10} >
      <Sankey id="sankey" css={{ height: '100vh',width: '90vw'}}
      palette={customPalette}
        dataSource={data2}
        sourceField="source"
        targetField="target"
        weightField="weight"
        sortData ={order}
        title="NLP Research Activity"
        
      >
        <Tooltip
          enabled={true}
          customizeLinkTooltip={customizeLinkTooltip}
        >
        </Tooltip>

        <Link
          colorMode="gradient" border={{width:0.01}}>
        </Link>
        <Node
          width={10}
          padding={20}>
        </Node>

      </Sankey>
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
    html: `<b>From:</b> ${info.source}<br/><b>To:</b> ${info.target}<br/><b># Weighted papers:</b> ${info.weight}`,
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

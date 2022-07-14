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
const customPalette = ['#0000c5','#ff2100','#de0000','#0095dd','#ffc900','#00bc00','#00aaa8','#75ff00','#fc0000','#00aa9d','#cf0000',
'#00b200','#49ff00','#7e008f','#f0ea00','#cc1c1c','#ff7500','#00e400','#ff9d00','#00c400','#00ec00','#009c00','#00a700','#00a0c7','#7a008b','#e4f100','#ff5100','#b0ff00','#83009a','#d8f500','#009d1d','#41004b','#ffad00','#002fdd','#3800a3','#00a13d','#0000d1','#58009f','#0080dd','#009cd3',
'#670075','#fbd500','#f2f2f2','#830094','#cccccc','#00aa95','#00a6b7','#e90000','#0fff00','#0000b5','#cc5c5c','#d30000','#f10000','#000000','#cc9c9c','#0054dd','#ffbd00','#c8fb00','#008add','#f5df00','#0078dd','#0d00a8','#00f700','#00cf00','#1c0020','#00a668','#0009dd','#d80000','#f2f2f2'];
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
          colorMode="gradient">
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
    html: `<b>From:</b> ${info.source}<br/><b>To:</b> ${info.target}<br/><b>Weight:</b> ${info.weight}`,
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

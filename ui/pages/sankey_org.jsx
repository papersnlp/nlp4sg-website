import dynamic from 'next/dynamic';
import { useEffect, useState, useRef } from 'react';
import { Box, Text, Span, Separator, List } from '@styles/components';

import { styled } from '@mui/material/styles';
import * as Icon from 'react-feather';
import { useTheme } from 'next-themes';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import papers from 'public/json/papers.json';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Sankey, {
  Tooltip,
  Link,
  Node,
} from 'devextreme-react/sankey';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Navbar from '../components/navbar';
import  data2   from 'public/sankey_json.json';
import { useRouter } from 'next/router';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



export default function Sankey_org({ papers }) {
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

  return (
    

    <Box css={{ bc: '$contrast2', width: '100vw', height: '100vh' }}>

      <Navbar title={"NLP Research Activity"} />

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
      <Sankey id="sankey" css={{ height: '100vh',width: '90vw'}}
        dataSource={data2}
        sourceField="source"
        targetField="target"
        weightField="weight"
        title=""
        
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

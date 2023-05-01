import dynamic from 'next/dynamic';
import { useEffect, useState, useRef } from 'react';
import { Box, Text, Span, Separator, List } from '@styles/components';

import { styled } from '@mui/material/styles';
import * as Icon from 'react-feather';
import { useTheme } from 'next-themes';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Sankey, {
  Tooltip,
  Link,
  Node,Label,Font,Size,weight
} from 'devextreme-react/sankey';
import Navbar from '../components/navbar';
import  data2   from 'public/sankey_org.json';
import { useRouter } from 'next/router';
import order from 'public/order_sankey_org.json';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



export default function Sankey_org({  }) {
  const { setTheme, theme } = useTheme();
  const parallax = useRef();


const router = useRouter();
const Content = styled("div")`
position: relative;
`;

function valuetext(value) {
  return `${value}`;
}

  return (
    

    <Box css={{ bc: '$contrast2', width: '100vw', height: '100vh' }}>

      <Navbar title={"NLP4SG Research Activity"} />
      <Box css={{ width: '100vw', height: '80vh', top: '0', backgroundColor: 'white', left: '18%' }}>
        <br />
        <br />
        <Grid item xs={11} style={{ marginTop:'20px'}} >
      <Sankey id="sankey_org" css={{ height: '100vh',width: '80vw'}}
        dataSource={data2}
        sourceField="source"
        targetField="target"
        weightField="weight"
        sortData={order}
        title=""
      >
            <Label>
                <Font size={14} weight={700}>

                </Font>
              </Label>

        <Tooltip
          enabled={true}
          customizeNodeTooltip={customizeNodeTooltip}
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
    props: {  }, // will be passed to the page component as props
  };
}

function customizeLinkTooltip(info) {
  return {
    html: `<b>From:</b> ${info.source}<br/><b>To:</b> ${info.target}<br/><b>Weight:</b> ${info.weight}`,
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

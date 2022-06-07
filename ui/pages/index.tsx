import { Box, Grid, Text, List, Link } from '@styles/components';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import EarthIcon from '@components/Earth';
import PapersPlot from '@components/PapersPlot';
import { styled } from '@styles/config';
import * as Icon from 'react-feather';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Cards from '@components/Cards';
import content from '../content.json';
import Events from '@components/Events';
import Avatars from '@components/Avatars';
import ListBlock from '@components/ListBlock';

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

const Home = (props) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{content.title}</title>
      </Head>
      <Box css={{ pb: '$7' }}>
        <Box
          column
          center
          css={{ width: '100vw', height: '90vh', backgroundColor: '$contrast1', zIndex: 0 }}
        >
          <Box container column center>
            <EarthIcon />
            <Text
              type="title"
              css={{
                textAlign: 'center',
                fontSize: '$9',
                fontWeight: '500',
                lineHeight: '$9',
                pt: '$6',
              }}
            >
              {content.index.title}
            </Text>
            <Text
              css={{
                fontFamily: '$mono',
                color: '$contrast10',
                pt: '$5',
                pb: '$5',
                textAlign: 'center',
              }}
            >
              {content.index.slogan}
            </Text>
            <Button onClick={() => router.push('/papers')}>
              <Icon.Play></Icon.Play>
            </Button>
            <Text mono css={{ pt: '$3', zIndex: '1', color: '$contrast8' }}>
              Open paper visualization
            </Text>
            <Button onClick={() => router.push('/social_needs')}>
              <Icon.Play></Icon.Play>
            </Button>
            <Text mono css={{ pt: '$3', zIndex: '1', color: '$contrast8' }}>
              Open social needs visualization
            </Text>
          </Box>
        </Box>

        {content.index.content.map((v, k) => {
          if (v.type === 'cards') return <Cards key={k} {...v} />;
          if (v.type === 'events') return <Events key={k} {...v} />;
          if (v.type === 'avatars') return <Avatars key={k} {...v} />;
          if (v.type === 'list') return <ListBlock key={k} {...v} />;
          if (v.type === 'space') return <Box css={{ py: '$4' }} />;
        })}
      </Box>
    </>
  );
};

export default Home;

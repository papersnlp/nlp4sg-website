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
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { Url } from 'devextreme-react/chart';

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

const Card = styled('li', {
  bc: '$contrast6',
  borderRadius: '$3',
  display: 'inline',
  zIndex:0,
  opacity:0.7
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
          css={{ width: '100vw', height: '96vh', backgroundColor: '$contrast1', zIndex: 0 }}
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
                pt: '$5',
              }}
            >
              {content.index.title}
            </Text>
            <Text
              css={{
                fontFamily: '$mono',
                color: '$contrast10',
                pt: '$5',
                pb: '$1',
                textAlign: 'center',
              }}
            >
              {content.index.slogan}
            </Text>
          </Box>
          <Box container css={{ pt: '0px', pb: '$5', gap: '$3' }}>
            <Grid css={{ gridTemplateColumns: 'repeat(auto-fit, minmax($7, 1fr))' }}>
            {content.index.content.map((b, c) => {
              if (b.type === 'visualization'){
                return(
                b['content'].map((v, k) => {
                  return(
                  <Card key={k}>
                     

                    <Link
                      href={v.path}
                      /* onClick={() => router.push(v.path)} */
                      css={{
                        backgroundImage:"url("+v.img+")",
                        backgroundSize:'cover',
                        height: '200px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                      }}
                    >
                    </Link>

                    <Box css={{ flex: 1 }}></Box>
                <Box css={{ borderTop: '1.5px solid $contrast5', p: '$4', py: '$1' }}>
                  <Text>{v.linkText}</Text>
                </Box>
                  </Card>
                  );
              }));}
            }
              )}
              </Grid>


          </Box>
        </Box>

        {content.index.content.map((v, k) => {
          if (v.type === 'cards') return (<Cards key={k} {...v} />);
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

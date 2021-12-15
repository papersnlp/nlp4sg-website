import { Box, Grid, Text, Link } from '@styles/components';
import { styled } from '@styles/config';

const Card = styled('li', {
  bc: '$contrast1',
  borderRadius: '$3',
  display: 'block',
});

const Cards = (props) => {
  const { titles, content } = props;
  return (
    <Box
      column
      center
      css={{ width: '100vw', backgroundColor: '$blue9', position: 'relative', zIndex: 1 }}
    >
      <Box container column css={{ py: '$6' }}>
        {titles.map((v, k) => {
          return (
            <>
              <Text type="title" css={{ color: '$blue1', pb: '$4' }}>
                {v.title}
              </Text>
              <Text css={{ pb: '$4', color: '$blue5' }}>{v.description}</Text>
            </>
          );
        })}

        <Grid>
          {content.map((v, k) => (
            <Card key={k}>
              <Link
                href={v.link}
                css={{
                  height: '270px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                }}
              >
                <Box css={{ p: '$4' }}>
                  <Text>{v.text}</Text>
                </Box>
                <Box css={{ flex: 1 }}></Box>
                <Box css={{ borderTop: '1.5px solid $contrast5', p: '$4', py: '$3' }}>
                  <Text>{v.linkText}</Text>
                </Box>
              </Link>
            </Card>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Cards;

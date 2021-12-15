import { Box, Grid, Text, Link } from '@styles/components';
import { UserBox } from '@components/Avatar';
import { styled } from '@styles/config';

const Avatars = (props) => {
  const { title, content } = props;
  return (
    <Box column center css={{ width: '100vw', position: 'relative', zIndex: 1 }}>
      <Box container css={{ pt: '$6', pb: '$5', gap: '$3' }}>
        <Text type="title" css={{ pb: '$4' }}>
          {title}
        </Text>
        <Grid css={{ gridTemplateColumns: 'repeat(auto-fit, minmax($6, 1fr))' }}>
          {content.map((v, k) => (
            <UserBox key={k} {...v} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Avatars;

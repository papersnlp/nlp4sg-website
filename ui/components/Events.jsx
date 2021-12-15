import { useState } from 'react';
import { Box, Text, Link } from '@styles/components';
import { styled } from '@styles/config';
import TimeAgo from 'react-timeago';

const Card = styled(Box, {
  bc: '$contrast1',
  borderRadius: '$3',
  p: '$4',
  cursor: 'pointer',
});

const DateBox = styled(Box, {
  width: '$4',
  textAlign: 'center',
});

const DateNum = styled(Text, {
  fontSize: '$5',
  fontFamily: '$mono',
  color: '$primary',
});

const Events = (props) => {
  const { title, content } = props;

  return (
    <Box
      column
      center
      css={{ width: '100vw', backgroundColor: '$blue9', position: 'relative', zIndex: 1 }}
    >
      <Box container column css={{ py: '$6' }}>
        <Text type="title" css={{ color: '$blue1', pb: '$4' }}>
          {title}
        </Text>
        <Box column css={{ gap: '$3' }}>
          {content.map((event) => (
            <Event key={event.name + event.date} {...event} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

const Event = (props) => {
  const { name, date: dateTxt, link } = props;

  const [date] = useState(new Date(dateTxt));

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return (
    <Card>
      <Link href={link} css={{ display: 'flex', flexDirection: 'row' }}>
        <Box css={{ flex: 1, pr: '$3' }}>
          <Text>{name}</Text>
          <Text mono css={{ pt: '$2' }}>
            <TimeAgo date={date} />.
          </Text>
        </Box>
        <DateBox column center css={{ justifyContent: 'center' }}>
          <Text mono css={{ lineHeight: '$3' }}>
            {monthNames[date.getMonth()]}
          </Text>
          <DateNum>{date.getDate()}</DateNum>
          <Text mono css={{ lineHeight: '$3' }}>
            {date.getFullYear()}
          </Text>
        </DateBox>
      </Link>
    </Card>
  );
};

export default Events;

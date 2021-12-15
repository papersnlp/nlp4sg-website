import { Box, List, Text, Link } from '@styles/components';

const ListBlock = (props) => {
  const { title, description, content } = props;
  return (
    <Box column center css={{ width: '100vw', backgroundColor: '$contrast1' }}>
      <Box container column>
        <Text type="title" css={{ pb: '$3' }}>
          {title}
        </Text>
        {description && (
          <Text css={{ pb: '$2' }}>
            <span dangerouslySetInnerHTML={{ __html: description }} />{' '}
          </Text>
        )}
        <List css={{ color: '$contrast11' }}>
          {content.map((v, k) => {
            return (
              <li key={k}>
                {' '}
                {v.link && <Link href={v.link}>{v.text}</Link>}{' '}
                {!v.link && <span dangerouslySetInnerHTML={{ __html: v.text }}></span>}{' '}
              </li>
            );
          })}
        </List>
      </Box>
    </Box>
  );
};

export default ListBlock;

import { css, styled } from './config';

export const Box = styled('div', {
  variants: {
    row: {
      true: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
    },
    column: {
      true: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      },
    },
    center: {
      true: {
        alignItems: 'center',
      },
    },
    container: {
      true: {
        width: '$container',
        maxWidth: '100%',
        px: '$4',
      },
    },
  },
});

export const Grid = styled('ul', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax($7, 1fr));',
  gridGap: '$3',
  p: '0',
  listStyleType: 'none',
});

export const Text = styled('p', {
  margin: 0,
  color: '$contrast12',
  fontFamily: '$sans',
  fontSize: '$3',
  fontWeight: 300,
  lineHeight: '$5',

  variants: {
    type: {
      title: {
        fontSize: '$7',
        fontWeight: 500,
        lineHeight: '$7',
        fontFamily: '$serif',
      },
      subtitle: {
        fontSize: '$5',
        fontWeight: 500,
        lineHeight: '$5',
        fontFamily: '$serif',
      },
    },
    mono: {
      true: {
        fontFamily: '$mono',
        fontSize: '$2',
        fontWeight: '370',
        color: '$contrast11',
        lineHeight: '$3',
      },
    },
  },
});

export const Span = styled('span', {});

export const Link = styled('a', {
  color: 'inherit',
  textDecoration: 'inherit',
  transition: 'all 100ms linear 0ms',
  borderRadius: '$1',

  '&:hover': {
    opacity: 0.6,
  },

  '&:focus': {
    outline: 'none',
    opacity: 0.4,
  },

  variants: {
    underline: {
      true: {
        textDecoration: 'underline',
      },
    },
  },
});

export const List = styled('ol', {
  listStyleType: 'none',
  px: '0',
  pl: '$4',
  lineHeight: '$5',
  fontFamily: '$sans',
  fontSize: '$3',
  fontWeight: 300,
  'li::before': {
    position: 'absolute',
    content: '• ',
    display: 'inline-block',
    width: '$4',
    ml: '-$4',
  },
  li: {
    pl: '$3',
    py: '$2',
  },
  variants: {
    numbered: {
      true: {
        counterReset: 'my-counter',
        'li::before': { content: 'counter(my-counter) ". "' },
        li: { counterIncrement: 'my-counter' },
      },
    },
  },
});

export const Separator = styled('hr', {
  border: 'none',
  borderTop: '1.5px solid $contrast5',
  bc: '$transparent',
  height: 0,
  my: '$5',
});

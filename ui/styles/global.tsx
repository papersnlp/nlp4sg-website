import { globalCss } from './config';

export const globalStyles = globalCss({
  '*, *::after, *::before': {
    boxSizing: 'inherit',
  },
  html: {
    boxSizing: 'border-box',
  },
  body: {
    backgroundColor: '$background',
    margin: 0,
  },
  ul: {
    paddingLeft: '$4',
  },
  button: {
    outline: 0,
  },
  a: {
    color: 'inherit',
    transition: 'all 100ms linear 0ms',
    borderRadius: '$1',
    textDecoration: 'underline',

    '&:hover': {
      opacity: 0.6,
    },

    '&:focus': {
      outline: 'none',
      opacity: 0.4,
    },
  }
});

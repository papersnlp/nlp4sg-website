import { globalStyles } from '@styles/global';
import { darkTheme } from '@styles/config';
import { ThemeProvider } from 'next-themes';
import "styles/styles.css";
import "styles/custom.scss";
function MyApp({ Component, pageProps }) {
  globalStyles();

  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        disableTransitionOnChange
        value={{
          dark: darkTheme.className,
          light: 'light',
        }}
      >
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;

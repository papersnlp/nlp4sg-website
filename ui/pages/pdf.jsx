import { Box } from '@styles/components';
import dynamic from 'next/dynamic';
import hgnlp from 'public/hgnlp.json';
import attention from 'public/attention.json';
import gan from 'public/gan.json';

const PDFViewer = dynamic(() => import('@components/PDFViewer'), { ssr: false });

const Component = (props) => {
  const example = [{ value: 'a', type: 'MODEL' }];

  return (
    <>
      <Box>
        <PDFViewer file="gan.pdf" entities={hgnlp} />
      </Box>
    </>
  );
};

export default Component;

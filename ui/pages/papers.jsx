import dynamic from 'next/dynamic';
import { useEffect, useState, useRef } from 'react';
import { Box, Text, Span, Link, Separator, List } from '@styles/components';
import { styled } from '@styles/config';
import * as Icon from 'react-feather';
import { useTheme } from 'next-themes';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import PapersPlot from '@components/PapersPlot';
import papers from 'public/papers.json';
import { HelpCircle } from 'react-feather';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';

export default function Papers({ papers }) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [paper, setPaper] = useState(null);
  const parallax = useRef();

  function onToggleChange(value) {
    if (value === '') setTheme('system');
    else setTheme(value);
  }
  // To avoid having `theme` undefined.
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <Box css={{ bc: '$contrast2', width: '100vw', height: '100vh' }}>
      {/*<Parallax ref={parallax} pages={5} style={{ top: '0', left: '0' }}>
        <ParallaxLayer speed={-0.5}>*/}
      <Box css={{ width: '100vw', height: '80vh', bc: '$contrast1' }}>
        <PapersPlot
          papers={papers}
          onClick={(id) => {
            setPaper(papers[id]);
            //parallax.current.scrollTo(0.3)
          }}
        />
      </Box>

      <Text
        type="subtitle"
        css={{
          position: 'absolute',
          top: '0',
          textAlign: 'center',
          width: '100vw',
          pt: '$4',
          px: '$3',
        }}
      >
        Visualization of Existing NLP4SG Research ({papers.length} Papers)
      </Text>

      <Link href="#what" css={{ position: 'absolute', bottom: '20vh', right: 0, p: '$3' }}>
        <Text mono>
          <HelpCircle />
        </Text>
      </Link>
      {/*</ParallaxLayer>*/}

      {/*<ParallaxLayer offset={0.8}> */}
      <Box column center css={{ width: '100vw', bc: '$contrast2' }}>
        <Box container css={{ p: '$4', py: '$5' }}>
          {paper !== null && (
            <>
              <Text type="subtitle" css={{ pb: '$3' }}>
                {paper.title}
              </Text>
              <Text mono css={{ pb: '$3' }}>
                By {paper.authors.map((a) => a.name).join(', ')}
              </Text>

              <Text mono css={{ pb: '$4' }}>
                <Link underline href={paper.url}>
                  Open in Semantic Scholar
                </Link>
              </Text>
              <Text css={{ pb: '$3' }}>{paper.abstract}</Text>

              <br />
              <ToggleGroup
                type="single"
                defaultValue={theme}
                aria-label="Theme"
                onValueChange={(value) => onToggleChange(value)}
                css={{ pt: '$4' }}
              >
                <ToggleGroupItem value="light" aria-label="Day">
                  <Icon.Sun size={18} />
                </ToggleGroupItem>
                <ToggleGroupItem value="dark" aria-label="Night">
                  <Icon.Moon size={18} />
                </ToggleGroupItem>
              </ToggleGroup>
              <Separator />
            </>
          )}
          <Box css={{ pb: '$7' }}>
            <Text type="subtitle" css={{ pb: '$3' }} id="what">
              Where do the papers come from?
            </Text>
            <Text>
              This is a visualization of papers from the GitHub{' '}
              <Link underline href="https://github.com/zhijing-jin/NLP4SocialGood_Papers">
                NLP4SG paper list
              </Link>
              , papers that are closer together are considered more similar. The paper data is
              obtained using the{' '}
              <Link underline href="https://www.semanticscholar.org/product/api">
                Semantic Scholar API
              </Link>
              .
            </Text>

            <Text type="subtitle" css={{ pb: '$3', pt: '$4' }}>
              How is the visualization made?
            </Text>
            <Text>
              The visualization is constructed automatically by feeding the title and abstract of
              each paper through a pretrained transformer neural network model which extracts a high
              dimensional embedding which is then projected to two dimensions using{' '}
              <Link
                underline
                href="https://scikit-learn.org/stable/modules/generated/sklearn.manifold.TSNE.html"
              >
                T-SNE algorithm
              </Link>
              . The coloring is automatically produced by clustering papers using{' '}
              <Link
                underline
                href="https://hdbscan.readthedocs.io/en/latest/how_hdbscan_works.html"
              >
                HDBSCAN
              </Link>{' '}
              algorithm. The website is built with ReactJ and ThreeJS for the data visualization.
              The entire code to generate the{' '}
              <Link
                underline
                href="https://github.com/papersnlp/nlp4sg-website/blob/main/models/src/scripts/papers_abstract_to_tsne.py"
              >
                clustering
              </Link>{' '}
              and the{' '}
              <Link underline href="https://github.com/papersnlp/nlp4sg-website/tree/main/ui">
                visualization
              </Link>{' '}
              is available on{' '}
              <Link underline href="https://github.com/papersnlp/nlp4sg-website">
                our GitHub
              </Link>
              .
            </Text>
          </Box>
        </Box>
      </Box>
      {/*</Box></ParallaxLayer>
      </Parallax>*/}
    </Box>
  );
}

export async function getStaticProps(context) {
  return {
    props: { papers }, // will be passed to the page component as props
  };
}

const StyledToggleGroup = styled(ToggleGroupPrimitive.Root, {
  display: 'inline-flex',
  fontFamily: '$sans',
});

const StyledItem = styled(ToggleGroupPrimitive.Item, {
  all: 'unset',
  backgroundColor: '$contrast3',
  color: '$contrast12',
  height: '30px',
  p: '$2',
  display: 'flex',
  fontSize: '$2',
  alignItems: 'center',
  justifyContent: 'center',
  '&:first-child': {
    borderTopLeftRadius: '$round',
    borderBottomLeftRadius: '$round',
    pl: '$3',
  },
  '&:last-child': {
    borderTopRightRadius: '$round',
    borderBottomRightRadius: '$round',
    pr: '$3',
  },
  '&:hover': { backgroundColor: '$contrast4' },
  '&[data-state=on]': { backgroundColor: '$contrast5', color: 'contrast1' },
  '&:focus': { position: 'relative', boxShadow: `0 0 0 2px black` },
});

const ToggleGroup = StyledToggleGroup;
const ToggleGroupItem = StyledItem;

import { Box, Text, List } from "@styles/components"
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import EarthIcon from '@components/Earth'
import PapersPlot from "@components/PapersPlot"
import { styled } from "@styles/config"
import * as Icon from "react-feather"
import { useRouter } from 'next/router'
import Head from "next/head"
import Cards from "@components/Cards"
import content from '../content.json';


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
    opacity: 0.7
  }
})

const Home = (props) => {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>{ content.title }</title>
      </Head>
      <Box>
          <Box column center css={{ width: '100vw', height: '80vh', backgroundColor: '$contrast1', zIndex: 0 }}>
            <Box container column center>
              <EarthIcon />
              <Text type="title" css={{ textAlign: 'center', fontSize: '$9', fontWeight: '500', lineHeight: '$9', pt: '$6'}}>
                { content.index.title }
              </Text>
              <Text css={{fontFamily: '$mono', color: '$contrast10', pt: '$5', pb: '$5', textAlign: 'center'}}>
                { content.index.slogan }    
              </Text>
              <Button onClick={() => router.push('/papers')}><Icon.Play></Icon.Play></Button>
            </Box>
          </Box>

          {
            content.index.content.map((v, k) => {
              if (v.type === 'cards') return <Cards key={k} {...v} />
            })
          }

          <Box column center css={{ width: '100vw', backgroundColor: '$contrast1' }}>
            <Box container column css={{ py: '$6'}}>
              <Text type='title' css={{ pb: '$4'}}>How can I partecipate &amp; contribute?</Text>
              <List numbered css={{color: '$contrast11'}}>
                <li> Join our slack "ACL with Love ❤️": See our #nlp4sg-discussions channel! To keep updated, you are also welcome to join our Google Group mailing list "NLP4SG" [How to join a google group] </li>
                <li> Contribute your opinions to our ongoing survey "What is NLP for Social Good?" (Short link for sharing: bit.ly/nlp4sg-survey) </li>
                <li> Participate in various discussions: ACL 2021 Workshop - NLP for Positive Impact 2021 [Schedule (Aug 5)] </li>
                <li>Tell us "what you want to get from the NLP4SG community" & "what you want to help others with" by filling in a community role form</li>
                <li> Support our initiative by signing up as a supporter to be listed on our website.</li>
                <li> Follow us on Twitter @nlp4sg !</li>
              </List>
            </Box>
          </Box>

          <Box column center css={{ width: '100vw', backgroundColor: '$blue9', position: 'relative', zIndex: 1}}>
            <Box container column css={{ py: '$6'}}>
              <Text type='title' css={{ color: '$blue1', pb: '$4'}}>Past Events</Text>
              <List numbered css={{color: '$blue5'}}>
                <li> ACL 2021 Workshop -- NLP for Positive Impact 2021 [Schedule (Aug 5)] </li>
                <li> ACL 2021 -- Theme Track "NLP for Social Good" [Register for ACL]</li>
                <li> ACL 2021 -- BoF/Meetup: NLP for Social Good  </li>
              </List>
            </Box>
          </Box>
      </Box>
    </>
  )
}


export default Home 
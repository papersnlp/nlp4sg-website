import { Box, Text, List } from "@styles/components"
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import EarthIcon from '@components/Earth'
import PapersPlot from "@components/PapersPlot"
import { styled } from "@styles/config"
import * as Icon from "react-feather"
import { useRouter } from 'next/router'


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
    <Box>
        <Box column center css={{ width: '100vw', height: '80vh', backgroundColor: '$contrast1', zIndex: 0 }}>
          <Box container column center>
            <EarthIcon />
            <Text type="title" css={{ textAlign: 'center', fontSize: '$9', fontWeight: '500', lineHeight: '$9', pt: '$6'}}>
              NLP for Social Good
            </Text>
            <Text css={{fontFamily: '$mono', color: '$contrast10', pt: '$5', pb: '$5', textAlign: 'center'}}>
              A new initiative aiming to empower NLP researchers who want to consider the societal impact of their work.
            </Text>
            <Button onClick={() => router.push('/papers')}><Icon.Play></Icon.Play></Button>
          </Box>
        </Box>

        <Box column center css={{ width: '100vw', backgroundColor: '$blue9', position: 'relative', zIndex: 1}}>
          <Box container column css={{ py: '$6'}}>
            <Text type='title' css={{ color: '$blue1', pb: '$4'}}>But what is it exactly?</Text>
            <List numbered css={{color: '$blue5'}}>
              <li> A curated GitHub paper list of NLP on Social Good  </li>
              <li> ACL 2021 Findings paper "How Good Is NLP? A Sober Look at NLP Tasks through the Lens of Social Impact" by Zhijing Jin (Max Planck Institute&amp;ETH), Geeticka Chauhan (MIT), Brian Tse (Oxford), Mrinmaya Sachan (ETH), Rada Mihalcea (University of Michigan) </li>
              <li> Survey result overview "How Current NLP Researchers Think about NLP4SG" (2021, keep updating) compiled based on our NLP4SG survey </li>
              <li>Register for a reading group (once a week for 8 weeks) to go through NLP4SG papers &amp; questions with a group of NLP researchers! The tentative plan is to target at a small but focused reading group of 10-20 core attendees. [Link &amp; Time: TBD, ~Sept 2021]</li>
            </List>
          </Box>
        </Box>

        <Box column center css={{ width: '100vw', backgroundColor: '$contrast1' }}>
          <Box container column css={{ py: '$6'}}>
            <Text type='title' css={{ pb: '$4'}}>How can I partecipate &amp; contribute?</Text>
            <List numbered css={{color: '$contrast11'}}>
              <li> Join our slack "ACL with Love ❤️" => See our #nlp4sg-discussions channel! To keep updated, you are also welcome to join our Google Group mailing list "NLP4SG" [How to join a google group] </li>
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
  )
}


export default Home 
import { Box, List, Text, Link } from '@styles/components'

const ListBlock = (props) => {
  const { title, description, descriptionLink, content } = props 
  return (
    <Box column center css={{ width: '100vw', backgroundColor: '$contrast1' }}>
      <Box container column>
        <Text type='title' css={{ pb: '$4'}}>{title}</Text>
        <Text css={{pb: '$2'}}>{!descriptionLink && description} { descriptionLink && <Link href={descriptionLink}>{description}</Link> }</Text>
        <List css={{color: '$contrast11'}}>
          { 
            content.map((v, k) => {
              return <li key={k}> {v.link && <Link href={v.link}>{v.text}</Link> } { !v.link && v.text } </li>
            })
          }
        </List>
      </Box>
    </Box>
  )
}

export default ListBlock 
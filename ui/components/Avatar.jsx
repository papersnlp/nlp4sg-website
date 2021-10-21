import { styled } from '@styles/config'
import { Box, Text, Link } from '@styles/components';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

const StyledAvatar = styled(AvatarPrimitive.Root, {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'middle',
  overflow: 'hidden',
  userSelect: 'none',
  fontFamily: '$sans',
  width: '$6',
  height: '$6',
  borderRadius: '100%',
  bc: '$contrast3',
});

const StyledImage = styled(AvatarPrimitive.Image, {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: 'inherit',
});

const StyledFallback = styled(AvatarPrimitive.Fallback, {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$contrast3',
  color: '$contrast11',
  fontSize: '$3',
  lineHeight: 1,
  fontWeight: 500,
});

// Exports
const Avatar = StyledAvatar;
const AvatarImage = StyledImage;
const AvatarFallback = StyledFallback;

export const UserBox = (props) => {
  const { name, description, image, url } = props
  
  const getAcronym = (sentence) => {
    var matches = sentence.match(/\b(\w)/g); 
    return matches.join('');
  }

  return (
    <Link href={url}>
      <Box column center>
        <Avatar>
          <AvatarImage
            src={image}
            alt={name}
          />
          <AvatarFallback delayMs={600}>{getAcronym(name)}</AvatarFallback>
        </Avatar>
        <Text css={{pt: '$3', pb: '0', lineHeight: '$2', color: '$contrast11'}}>{name}</Text>
        <Text css={{ fontSize: '$1', textAlign: 'center', lineHeight: '$1', pb: '$4', color: '$contrast9' }}>{description}</Text> 
      </Box>    
    </Link>
  )
}
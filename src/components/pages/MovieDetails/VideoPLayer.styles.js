import styled from 'styled-components';
import YouTubePlayer from 'react-player/lib/players/YouTube';

const PlayerWrapper = styled.div`

  position: relative;
  padding-top: 35%;
`
const ResponsivePlayer = styled(YouTubePlayer)`

  && {
    position: absolute;
    top: 0;
    left: 0;
    height: 500px !important;
  }
`

export  {
  PlayerWrapper,
  ResponsivePlayer,
}

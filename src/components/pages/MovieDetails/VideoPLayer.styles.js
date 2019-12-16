import styled from 'styled-components';
import YouTubePlayer from 'react-player/lib/players/YouTube';

const PlayerWrapper = styled.div`

  margin-top: 30px;
  position: relative;
  padding-top: 56.25%;
`
const ResponsivePlayer = styled(YouTubePlayer)`

  && {
    position: absolute;
    top: 0;
    left: 0;
    height: 400px !important;
  }
`

export  {
  PlayerWrapper,
  ResponsivePlayer,
}

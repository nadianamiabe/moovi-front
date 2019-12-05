import styled from 'styled-components';
import { Button as ButtonBase } from 'antd';

export const Title1 = styled.h1`
  color: blue;
  background-color: ${props => props.primary ? 'green' : 'yellow'}
`;

export const Button = styled(ButtonBase)`
  && {
    background-color: green;

    :hover {
      background-color: black;
    }
  }
`;

export const Container = styled.div`
  display: flex
`;

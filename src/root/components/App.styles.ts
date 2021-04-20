import styled from '@emotion/styled';
import Div100vh from 'react-div-100vh';

export const Container = styled(Div100vh)`
  display: flex;
  flex-direction: column;
  width: 100vw;
  overflow: hidden;

  @media all and (display-mode: standalone) {
    padding-bottom: 25px;
  }
`;

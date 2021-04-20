import styled from '@emotion/styled';
import Div100vh from 'react-div-100vh';

export const Container = styled(Div100vh)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  width: 100vw;
  box-shadow: 0 -2px 4px -1px rgb(0 0 0 / 25%);
  background-color: white;
  position: absolute;
  z-index: 200;
  transition: top 0.3s;
  will-change: top;
  top: 100vh;
  &.enter,
  &.entered {
    top: 0vh;
  }
  &.exit,
  &.exited {
    top: 100vh;
  }
  @media all and (display-mode: standalone) {
    padding-bottom: 25px;
  }
`;

export const ScannerRoot = styled.video`
  height: 30vh;
  max-height: 30vh;
  border: 1px solid black;
`;

export const QrCodeRoot = styled.canvas`
  height: 40vh;
  max-height: 40vh;
`;

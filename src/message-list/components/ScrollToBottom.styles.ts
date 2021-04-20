import styled from '@emotion/styled';

export const Container = styled.div`
  position: absolute;
  z-index: 100;
  right: 5px;
  bottom: 65px;
  transition: opacity 0.2s;
  opacity: 0;
  &.enter,
  &.entered {
    opacity: 1;
  }
  &.exit,
  &.exited {
    opacity: 1;
  }
  @media all and (display-mode: standalone) {
    bottom: 90px;
  }
`;

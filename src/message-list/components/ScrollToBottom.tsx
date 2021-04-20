import { FC, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Transition } from 'react-transition-group';
import { Button } from '../../common/components';
import { Container } from './ScrollToBottom.styles';

const SCROLL_TO_BOTTOM_ROOT = document.getElementById('scroll-to-bottom-root');

interface ScrollToBottomProps {
  show: boolean;
  onClick: () => void;
}

export const ScrollToBottom: FC<ScrollToBottomProps> = ({ show, onClick }) => {
  const containerRef = useRef(null);

  if (!SCROLL_TO_BOTTOM_ROOT) {
    return null;
  }

  return createPortal(
    <Transition
      nodeRef={containerRef}
      mountOnEnter
      unmountOnExit
      timeout={{ exit: 200 }}
      in={show}
    >
      {(className) => (
        <Container ref={containerRef} className={className}>
          <Button onClick={onClick}>⬇️</Button>
        </Container>
      )}
    </Transition>,
    SCROLL_TO_BOTTOM_ROOT
  );
};

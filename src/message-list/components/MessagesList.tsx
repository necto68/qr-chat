import { useCallback, useEffect, useRef } from 'react';
import useSmoothScroll from 'react-smooth-scroll-hook';
import { useMessages, useUsername } from '../../api/hooks';
import { Message } from './Message';
import { ScrollToBottom } from './ScrollToBottom';
import { Container } from './MessageList.styles';

export const MessagesList = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { messages, deleteMessage } = useMessages();
  const { username: myUsername } = useUsername();

  const onDelete = useCallback(
    (timestamp) => {
      deleteMessage(timestamp);
    },
    [deleteMessage]
  );

  const { scrollTo, reachedBottom } = useSmoothScroll({
    ref: containerRef,
    speed: 80,
    direction: 'y'
  });

  const scrollToBottom = useCallback(() => {
    scrollTo(Infinity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  return (
    <Container ref={containerRef}>
      {messages.map(([timestamp, username, data]) => (
        <Message
          isOwn={username === myUsername}
          key={timestamp}
          username={username}
          timestamp={timestamp}
          data={data}
          onDelete={onDelete}
        />
      ))}
      <ScrollToBottom show={!reachedBottom} onClick={scrollToBottom} />
    </Container>
  );
};

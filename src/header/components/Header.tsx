import { useCallback } from 'react';

import { Button } from '../../common/components';
import { useMessages } from '../../api/hooks';
import { useShareMessages } from '../hooks';
import { Container } from './Header.styles';

export const Header = () => {
  const { messages, setMessages } = useMessages();
  const { handleShareClick } = useShareMessages();

  const handleDeleteMessages = useCallback(() => {
    const isDelete = window.confirm(
      `Удалить все сообщения? (${messages.length} шт.)`
    );

    if (isDelete) {
      setMessages([]);
    }
  }, [messages, setMessages]);

  return (
    <Container>
      <Button onClick={handleShareClick}>📤</Button>
      <p>{`Всего: ${messages.length}`}</p>
      <Button onClick={handleDeleteMessages}>❌</Button>
    </Container>
  );
};

import { useCallback } from 'react';
import { useUsername } from '../../api/hooks';
import { Button } from '../../common/components';
import { Container, MessagesContainer } from './NoMessages.styles';

export const NoMessages = () => {
  const { username, setUsername } = useUsername();

  const handleSubmitUsername = useCallback(() => {
    const nextUsername = prompt('Введите юзернейм. A-Z/0-9');

    if (nextUsername) {
      setUsername(nextUsername.trim());
    }
  }, [setUsername]);

  return (
    <Container>
      {username ? (
        <MessagesContainer>
          <p>Сообщений нет</p>
          <p>Сменить юзернейм</p>
        </MessagesContainer>
      ) : (
        <p>Введите юзернейм</p>
      )}
      <Button onClick={handleSubmitUsername}>👤</Button>
    </Container>
  );
};

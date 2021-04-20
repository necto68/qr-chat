import { FC, useCallback } from 'react';
import { timeFormatter } from '../../common/formatters';
import { MessageInterface } from '../../common/types';
import { Container, Bubble, Username, Data, Time } from './Message.styles';

export interface MessageProps {
  isOwn: boolean;
  timestamp: MessageInterface[0];
  username: MessageInterface[1];
  data: MessageInterface[2];
  onDelete: (timestamp: number) => void;
}

export const Message: FC<MessageProps> = ({
  isOwn,
  username,
  timestamp,
  data,
  onDelete
}) => {
  const formattedMessage = data.replaceAll('\n', '<br/>');
  const handleDelete = useCallback(() => {
    if (isOwn) {
      const isDelete = window.confirm(`Удалить сообщение?\n\n${data}`);

      if (isDelete) {
        onDelete(timestamp);
      }
    }
  }, [isOwn, data, onDelete, timestamp]);

  return (
    <Container>
      <Bubble isOwn={isOwn} onDoubleClick={handleDelete}>
        <Username>{username}</Username>
        <Data dangerouslySetInnerHTML={{ __html: formattedMessage }} />
        <Time>{timeFormatter.format(timestamp)}</Time>
      </Bubble>
    </Container>
  );
};

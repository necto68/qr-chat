import { useCallback } from 'react';
import { useMessages, useUsername } from '../../api/hooks';
import { MessageInterface } from '../../common/types';

export const useSubmitMessage = () => {
  const { username } = useUsername();
  const { pushMessage } = useMessages();

  const submitMessage = useCallback(
    (messageData: string) => {
      const message: MessageInterface = [Date.now(), username, messageData];

      pushMessage(message);
    },
    [username, pushMessage]
  );

  return submitMessage;
};

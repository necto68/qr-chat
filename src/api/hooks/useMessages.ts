import { useCallback, useContext } from 'react';
import { MessageInterface } from '../../common/types';
import { MessagesContext } from '../contexts';

export const useMessages = () => {
  const { messages, setMessages } = useContext(MessagesContext);

  const pushMessage = useCallback(
    (message: MessageInterface) => {
      setMessages([...messages, message]);
    },
    [messages, setMessages]
  );

  const deleteMessage = useCallback(
    (timestampToDelete: number) => {
      const nextMessages = messages.filter(
        ([timestamp]) => timestamp !== timestampToDelete
      );

      setMessages(nextMessages);
    },
    [messages, setMessages]
  );

  const mergeMessages = useCallback(
    (nextMessages: Array<MessageInterface>) => {
      const prevLength = messages.length;
      const unsortedMessages = [...messages, ...nextMessages];
      const messageTuples: Array<
        [number, MessageInterface]
      > = unsortedMessages.map((message) => [message[0], message]);

      const messagesMap = new Map<number, MessageInterface>(messageTuples);
      const uniqMessages = [...messagesMap.values()];
      const sortedMessages = uniqMessages.sort((a, b) => a[0] - b[0]);
      const nextLength = sortedMessages.length;

      setMessages(sortedMessages);

      return {
        prevLength,
        nextLength
      };
    },

    [messages, setMessages]
  );

  return {
    messages,
    setMessages,
    pushMessage,
    deleteMessage,
    mergeMessages
  };
};

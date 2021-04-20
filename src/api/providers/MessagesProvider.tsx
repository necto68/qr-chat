import { FC } from 'react';
import createPersistedState from 'use-persisted-state';
import { MessagesContextProvider, defaultMessagesContext } from '../contexts';

const useMessagesState = createPersistedState('messages');
const { messages: defaultMessagesState } = defaultMessagesContext;

export const MessagesProvider: FC = ({ children }) => {
  const [messages, setMessages] = useMessagesState(defaultMessagesState);

  return (
    <MessagesContextProvider value={{ messages, setMessages }}>
      {children}
    </MessagesContextProvider>
  );
};

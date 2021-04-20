import { createContext } from 'react';
import { MessageInterface } from '../../common/types';

interface MessagesContextInterface {
  messages: Array<MessageInterface>;
  setMessages: (messages: Array<MessageInterface>) => void;
}

export const defaultMessagesContext: MessagesContextInterface = {
  messages: [],
  setMessages: () => {}
};

export const MessagesContext = createContext(defaultMessagesContext);

export const MessagesContextProvider = MessagesContext.Provider;

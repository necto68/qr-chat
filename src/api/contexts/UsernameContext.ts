import { createContext } from 'react';

interface UsernameContextInterface {
  username: string;
  setUsername: (username: string) => void;
}

export const defaultUsernameContext: UsernameContextInterface = {
  username: '',
  setUsername: () => {}
};

export const UsernameContext = createContext(defaultUsernameContext);

export const UsernameContextProvider = UsernameContext.Provider;

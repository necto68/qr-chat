import { FC } from 'react';
import createPersistedState from 'use-persisted-state';
import { UsernameContextProvider, defaultUsernameContext } from '../contexts';

const useUsernameState = createPersistedState('username');
const { username: defaultUsernameState } = defaultUsernameContext;

export const UsernameProvider: FC = ({ children }) => {
  const [username, setUsername] = useUsernameState(defaultUsernameState);

  return (
    <UsernameContextProvider value={{ username, setUsername }}>
      {children}
    </UsernameContextProvider>
  );
};

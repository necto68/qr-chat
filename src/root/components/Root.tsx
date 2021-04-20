import { MessagesProvider, UsernameProvider } from '../../api/providers';
import { App } from './App';

export const Root = () => (
  <MessagesProvider>
    <UsernameProvider>
      <App />
    </UsernameProvider>
  </MessagesProvider>
);

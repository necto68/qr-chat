import { useState } from 'react';
import { useMessages, useUsername } from '../../api/hooks';
import { Header } from '../../header/components';
import { MessagesList, NoMessages } from '../../message-list/components';
import { InputContainer } from '../../input-container/components';
import { ShareModal } from '../../share-modal/components';
import { Container } from './App.styles';

export const App = () => {
  const [showModal, setShowModal] = useState(false);
  const { username } = useUsername();
  const { messages } = useMessages();

  const showMessagesList = username && messages.length;

  return (
    <Container>
      <Header />
      {showMessagesList ? <MessagesList /> : <NoMessages />}
      {username ? <InputContainer setShowModal={setShowModal} /> : null}
      <ShareModal show={showModal} setShowModal={setShowModal} />
    </Container>
  );
};

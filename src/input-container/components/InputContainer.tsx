import { FC, useCallback, useRef, useState } from 'react';
import { Button } from '../../common/components';
import { useSubmitMessage } from '../hooks';
import { Container, MessageInput } from './InputContainer.styles';

interface InputContainerProps {
  setShowModal: (showModal: boolean) => void;
}

export const InputContainer: FC<InputContainerProps> = ({ setShowModal }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [messageData, setMessageData] = useState('');
  const submitMessage = useSubmitMessage();

  const handleShowModal = useCallback(() => {
    setShowModal(true);
  }, [setShowModal]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMessageData(e.target.value);
    },
    [setMessageData]
  );

  const handleSubmit = useCallback(() => {
    const message = messageData.trim();

    if (message) {
      submitMessage(message);
      setMessageData('');
    }

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [messageData, submitMessage, setMessageData]);

  return (
    <Container>
      <Button onClick={handleShowModal}>🔃</Button>
      <MessageInput
        ref={inputRef}
        maxRows={7}
        value={messageData}
        onChange={handleChange}
      />
      <Button onClick={handleSubmit}>➡️</Button>
    </Container>
  );
};

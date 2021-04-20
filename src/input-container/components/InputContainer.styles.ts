import styled from '@emotion/styled';
import TextareaAutosize from 'react-textarea-autosize';

export const Container = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  min-height: 58px;
  padding: 5px;
  box-shadow: 0 -2px 4px -1px rgb(0 0 0 / 25%);
`;

export const MessageInput = styled(TextareaAutosize)`
  display: flex;
  flex: 1;
  resize: none;
  font-size: 16px;
  outline: none;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
`;

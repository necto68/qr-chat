import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Bubble = styled.div<{ isOwn: boolean }>`
  display: flex;
  flex-direction: column;
  align-self: ${({ isOwn }) => (isOwn ? 'flex-end' : 'flex-start')};
  max-width: 85%;
  border: 1px solid black;
  border-radius: ${({ isOwn }) =>
    isOwn ? '15px 5px 5px 15px' : '5px 15px 15px 5px'};
  padding: 5px;
`;

export const Username = styled.b`
  font-size: 1em;
`;

export const Data = styled.span`
  word-break: break-all;
`;

export const Time = styled.i`
  color: gray;
  font-size: 0.8em;
  text-align: right;
`;

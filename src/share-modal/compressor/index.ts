import pako from 'pako';
// @ts-ignore
import { encode, decode } from 'uint8-to-base64';
import _chunk from 'lodash.chunk';
import { MessageInterface } from '../../common/types';

export interface UncompressedChunk {
  index: number;
  total: number;
  data: string;
}

export const DELIMITER = '§';

export const CHUNK_SIZE = 500;

export const MESSAGE_INTERFACE_LENGTH = 3;

export const getCompressedChunks = (
  messages: MessageInterface[]
): Array<string> => {
  const preparedMessages = messages.map(
    ([timestamp, username, data], index, arr) => {
      const prevTimestamp = index > 0 ? arr[index - 1][0] : 0;
      const currentTimestamp = timestamp;

      return [currentTimestamp - prevTimestamp, username, data];
    }
  );

  const stringifiedMessages = preparedMessages
    .map((message) => message.join(DELIMITER))
    .join(DELIMITER);

  const compressedMessages = encode(
    pako.deflate(stringifiedMessages, { level: 9 })
  );

  const compressedMessagesLength = compressedMessages.length;

  const total = Math.ceil(compressedMessagesLength / CHUNK_SIZE);

  const chunks = [];

  let index = 0;

  while (index < total) {
    const messageChunk = [
      index,
      total,
      compressedMessages.substr(index * CHUNK_SIZE, CHUNK_SIZE)
    ];
    chunks.push(messageChunk.join(DELIMITER));
    index += 1;
  }

  return chunks;
};

export const getUncompressedChunk = (chunk: string): UncompressedChunk => {
  const [index, total, data] = chunk.split(DELIMITER);

  return {
    index: parseInt(index, 10),
    total: parseInt(total, 10),
    data
  };
};

export const getUncompressedMessages = (
  uncompressedChunks: Array<UncompressedChunk>
): Array<MessageInterface> => {
  const compressedMessages = uncompressedChunks
    .sort((a, b) => a.index - b.index)
    .map(({ data }) => data)
    .join('');

  const stringifiedMessages = pako.inflate(decode(compressedMessages), {
    to: 'string'
  });

  const preparedMessages = _chunk(
    stringifiedMessages.split(DELIMITER),
    MESSAGE_INTERFACE_LENGTH
  );

  const messages: Array<MessageInterface> = [];

  preparedMessages.forEach(([timestamp, username, data], index, arr) => {
    const prevTimestamp = index > 0 ? messages[index - 1][0] : 0;
    const currentTimestamp = parseInt(timestamp, 10);

    const message: MessageInterface = [
      prevTimestamp + currentTimestamp,
      username,
      data
    ];

    messages.push(message);
  });

  return messages;
};

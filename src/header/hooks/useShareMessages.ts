import { useCallback } from 'react';
import { useMessages } from '../../api/hooks';
import { timeFormatter } from '../../common/formatters';

export const useShareMessages = () => {
  const { messages } = useMessages();

  const handleShareClick = useCallback(async () => {
    const messagesString = messages
      .map(([timestamp, username, data]) => {
        const headerString = `👤🕓 **${username}** ( __${timeFormatter.format(
          timestamp
        )}__ )`;
        const dataString = '```' + data + '```';

        return [headerString, dataString].join('\n');
      })
      .join('\n_______________________________\n\n');

    await navigator.clipboard.writeText(messagesString);

    alert(`Скопировано: ${messages.length}`);
  }, [messages]);

  return { handleShareClick };
};

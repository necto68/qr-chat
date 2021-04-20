import { useCallback, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { useMessages } from '../../api/hooks';
import { getCompressedChunks } from '../compressor';

export const INCREMENT_INTERVAL = 1500;

export const useQrCode = (qrCodeComponentId: string, show: boolean) => {
  const { messages } = useMessages();

  const chunks = getCompressedChunks(messages);

  const chunkIndexRef = useRef(0);
  const chunkIntervalRef = useRef<NodeJS.Timeout>();

  const drawQrCode = useCallback(() => {
    const currentChunkIndex = chunkIndexRef.current;
    const currentChunk = chunks[currentChunkIndex];

    const canvas = document.getElementById(qrCodeComponentId);

    QRCode.toCanvas(canvas, currentChunk, {
      errorCorrectionLevel: 'L',
      width: canvas?.clientHeight,
      margin: 0
    });
  }, [chunks, qrCodeComponentId]);

  // useLayoutEffect(() => {
  //   const currentChunkIndex = chunkIndexRef.current;
  //   const currentChunk = chunks[currentChunkIndex];

  //   const canvas = document.getElementById(qrCodeComponentId);

  //   QRCode.toCanvas(canvas, currentChunk, {
  //     errorCorrectionLevel: 'L',
  //     width: 300,
  //     margin: 0
  //   });
  // }, [chunkIndexRef.current, qrCodeComponentId])

  const incrementChunkIndex = useCallback(() => {
    const currentChunkIndex = chunkIndexRef.current;

    chunkIndexRef.current =
      currentChunkIndex < chunks.length - 1 ? currentChunkIndex + 1 : 0;
  }, [chunks]);

  const clearChunkInterval = useCallback(() => {
    const currentInterval = chunkIntervalRef.current;

    if (currentInterval) {
      clearInterval(currentInterval);
    }
  }, []);

  const startChunkInterval = useCallback(() => {
    clearChunkInterval();

    const intervalFunction = () => {
      incrementChunkIndex();
      drawQrCode();
    };

    chunkIntervalRef.current = setInterval(
      intervalFunction,
      INCREMENT_INTERVAL
    );
  }, [drawQrCode, incrementChunkIndex, clearChunkInterval]);

  useEffect(() => {
    if (show && messages.length) {
      drawQrCode();

      if (chunks.length > 1) {
        startChunkInterval();
      }
    }

    if (!show) {
      clearChunkInterval();
    }
  }, [
    show,
    messages,
    chunks,
    drawQrCode,
    startChunkInterval,
    clearChunkInterval
  ]);
};

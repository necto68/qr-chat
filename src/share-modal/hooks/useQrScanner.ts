import { useRef, useCallback, useEffect, useState } from 'react';
import { BrowserQRCodeReader, IScannerControls } from '@zxing/browser/es2015';
import { DecodeContinuouslyCallback } from '@zxing/browser/es2015/common/DecodeContinuouslyCallback';
import { useMessages } from '../../api/hooks';
import {
  getUncompressedChunk,
  getUncompressedMessages,
  UncompressedChunk
} from '../compressor';

let GLOBAL_SCANNED_CHUNKS_INSTANCE: Array<UncompressedChunk> = [];

interface UseQrScanner {
  scannedChunks: Array<UncompressedChunk>;
  total: number;
}

export const useQrScanner = (
  scannerComponentId: string,
  show: boolean
): UseQrScanner => {
  const { mergeMessages } = useMessages();
  const [scannedChunks, setScannedChunks] = useState<Array<UncompressedChunk>>(
    []
  );

  const total = scannedChunks[0] ? scannedChunks[0].total : 0;

  const controlsRef = useRef<IScannerControls>();

  const processChunk = useCallback((newScannedChunk: UncompressedChunk) => {
    const localScannedChunks = GLOBAL_SCANNED_CHUNKS_INSTANCE;

    const isChunkFromSameQr = Boolean(
      localScannedChunks.length &&
        localScannedChunks.every(
          (chunk) => chunk.total === newScannedChunk.total
        )
    );

    if (!isChunkFromSameQr) {
      setScannedChunks([newScannedChunk]);
      return;
    }

    const isChunkAlreadyScanned = localScannedChunks.some(
      (chunk) => chunk.data === newScannedChunk.data
    );

    if (!isChunkAlreadyScanned) {
      setScannedChunks([...localScannedChunks, newScannedChunk]);
    }
  }, []);

  const codeReaderCallback = useCallback<DecodeContinuouslyCallback>(
    (result, _error, controls) => {
      if (result) {
        processChunk(getUncompressedChunk(result.getText()));
      }

      if (controls && !controlsRef.current) {
        controlsRef.current = controls;
      }
    },
    [processChunk]
  );

  useEffect(() => {
    if (
      scannedChunks.length > 0 &&
      total > 0 &&
      scannedChunks.length === total
    ) {
      const nextMessages = getUncompressedMessages(scannedChunks);
      const { prevLength, nextLength } = mergeMessages(nextMessages);

      setScannedChunks([]);

      alert(
        `Импортировано: ${nextMessages.length}\nНовых: ${
          nextLength - prevLength
        }`
      );
    }

    GLOBAL_SCANNED_CHUNKS_INSTANCE = scannedChunks;
  }, [scannedChunks, total, mergeMessages]);

  useEffect(() => {
    if (show && !controlsRef.current) {
      const codeReader = new BrowserQRCodeReader();

      codeReader.decodeFromVideoDevice(
        undefined,
        scannerComponentId,
        codeReaderCallback
      );
    }

    if (!show && controlsRef.current) {
      setScannedChunks([]);
      controlsRef.current.stop();
      controlsRef.current = undefined;
    }
  }, [show, scannerComponentId, codeReaderCallback]);

  return {
    scannedChunks,
    total
  };
};

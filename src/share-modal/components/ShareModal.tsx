import { FC, useCallback, useRef } from 'react';
import { Transition } from 'react-transition-group';
import { Button } from '../../common/components';
import { useQrScanner, useQrCode } from '../hooks';
import { Container, ScannerRoot, QrCodeRoot } from './ShareModal.styles';

const SCANNER_COMPONENT_ID = 'scanner-root';
const QRCODE_COMPONENT_ID = 'qrcode-root';

interface ShareModalProps {
  show: boolean;
  setShowModal: (showModal: boolean) => void;
}

export const ShareModal: FC<ShareModalProps> = ({ show, setShowModal }) => {
  const containerRef = useRef(null);
  const handleHideModal = useCallback(() => {
    setShowModal(false);
  }, [setShowModal]);

  const { scannedChunks, total } = useQrScanner(SCANNER_COMPONENT_ID, show);
  useQrCode(QRCODE_COMPONENT_ID, show);

  return (
    <Transition
      nodeRef={containerRef}
      mountOnEnter
      unmountOnExit
      timeout={{ exit: 300 }}
      in={show}
    >
      {(className) => (
        <Container ref={containerRef} className={className}>
          <ScannerRoot id={SCANNER_COMPONENT_ID} />
          <span>
            {total > 0
              ? `Загрузка: ${scannedChunks.length}/${total}`
              : 'Наведите камеру на QRcode'}
          </span>
          <QrCodeRoot id={QRCODE_COMPONENT_ID} />
          <Button onClick={handleHideModal}>🔙</Button>
        </Container>
      )}
    </Transition>
  );
};

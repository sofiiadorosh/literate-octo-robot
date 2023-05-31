import React, { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';

import './Modal.scss';

type ModalProps = {
  closeModal: () => void;
  children: React.ReactNode;
};

export const Modal: FC<ModalProps> = ({ closeModal, children }) => {
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [closeModal]);

  const backdropClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  return createPortal(
    <div className="modal__container" onClick={backdropClickHandler}>
      <div className="modal">{children}</div>
    </div>,
    document.querySelector('#modal-root') as HTMLElement
  );
};

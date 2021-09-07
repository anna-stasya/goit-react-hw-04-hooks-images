import React from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

function Modal({ onClose, largeImageURL, alt }) {
  return createPortal(
    <div className={s.Overlay} onClick={onClose}>
      <div className={s.Modal}>
        <img src={largeImageURL} alt={alt} />
      </div>
    </div>,
    modalRoot,
  );
}

export { Modal };

// src/context/ModalContext.jsx
import React, { createContext, useContext, useCallback, useEffect, useState } from 'react';

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [payload, setPayload] = useState(null); // { service?: string }

  const openModal = useCallback((data = null) => {
    setPayload(data);
    setIsOpen(true);
    document.body.classList.add('no-scroll');
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setPayload(null);
    document.body.classList.remove('no-scroll');
  }, []);

  useEffect(() => {
    return () => document.body.classList.remove('no-scroll');
  }, []);

  return (
    <ModalContext.Provider value={{ isOpen, payload, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used inside ModalProvider');
  return ctx;
}

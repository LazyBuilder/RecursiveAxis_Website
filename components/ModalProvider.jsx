'use client';
import React, { createContext, useContext, useState, useCallback } from 'react';
import { ServiceModal, TextModal, FullDescriptionModal } from './modals/Modals';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [serviceModal, setServiceModal] = useState({ isOpen: false, content: null });
  const [textModal, setTextModal] = useState({ isOpen: false, content: null });
  const [projectModal, setProjectModal] = useState({ isOpen: false, content: null });

  const openServiceModal = useCallback((content) => {
    setServiceModal({ isOpen: true, content });
  }, []);

  const closeServiceModal = useCallback(() => {
    setServiceModal({ isOpen: false, content: null });
  }, []);

  const openTextModal = useCallback((content) => {
    setTextModal({ isOpen: true, content });
  }, []);

  const closeTextModal = useCallback(() => {
    setTextModal({ isOpen: false, content: null });
  }, []);

  const openProjectModal = useCallback((content) => {
    setProjectModal({ isOpen: true, content });
  }, []);

  const closeProjectModal = useCallback(() => {
    setProjectModal({ isOpen: false, content: null });
  }, []);

  return (
    <ModalContext.Provider value={{
      openServiceModal, closeServiceModal,
      openTextModal, closeTextModal,
      openProjectModal, closeProjectModal
    }}>
      {children}
      <ServiceModal
        isOpen={serviceModal.isOpen}
        onClose={closeServiceModal}
        content={serviceModal.content}
      />
      <TextModal
        isOpen={textModal.isOpen}
        onClose={closeTextModal}
        content={textModal.content}
      />
      <FullDescriptionModal
        project={projectModal.content}
        onClose={closeProjectModal}
      />
    </ModalContext.Provider>
  );
};

export const useModals = () => useContext(ModalContext);

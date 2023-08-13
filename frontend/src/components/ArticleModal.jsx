import React from 'react';
import Modal from 'react-modal';

const ArticleModal = ({ isOpen, closeModal, articleText }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Article Modal"
      className="Modal"
      overlayClassName="Overlay"
    >
      <button className="close-btn" onClick={closeModal}>
        Close
      </button>
      <div className="modal-content">
        <div dangerouslySetInnerHTML={{ __html: articleText }} />
      </div>
    </Modal>
  );
};

export default ArticleModal;

import React from "react";

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal d-block" : "modal d-none";

  return (
    <div className={showHideClassName}>
      <div className="container">
        <div className="modal-content content-popup">
          <a href="" className="modal-close" onClick={handleClose}>&times;</a>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
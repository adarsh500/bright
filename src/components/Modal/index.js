import './modal.css';

const Modal = (props) => {
  const { show, onClose } = props;
  if (!show) {
    return null;
  }
  return (
    <div className="modal" id="modal">
      <h2>Modal Window</h2>
      <div className="content"></div>
      <div className="actions">
        <button className="toggle-button" onClick={onClose}>
          close
        </button>
      </div>
    </div>
  );
};

export default Modal;

import {  useEffect } from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

export function ModalAlert({ show, message, type, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  const icon = type === "danger" ? <FaExclamationCircle className="text-danger me-2" /> : <FaCheckCircle className="text-success me-2" />;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      onClick={onClose}
    >
      <div className="modal-dialog modal-sm modal-dialog-centered " onClick={(e) => e.stopPropagation()}>
        <div className={`glass-div modal-content shadow border-${type}`}>
          <div className={`modal-body d-flex align-items-center`}>
            {icon}
            <span>{message}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
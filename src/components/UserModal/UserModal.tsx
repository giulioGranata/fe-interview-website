import { useCallback, useEffect, useRef } from "react";
import type { User } from "../../types";
import { RoleBadge } from "../RoleBadge/RoleBadge";
import "./UserModal.css";

interface UserModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export function UserModal({ user, isOpen, onClose }: UserModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Handle ESC key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose],
  );

  // Focus trap
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      closeButtonRef.current?.focus();
      document.body.style.overflow = "hidden";

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    }
  }, [isOpen, handleKeyDown]);

  // Handle overlay click
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose],
  );

  if (!isOpen || !user) {
    return null;
  }

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <div
      className="user-modal__overlay"
      onClick={handleOverlayClick}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="user-modal card" ref={modalRef} tabIndex={-1}>
        <header className="user-modal__header">
          <RoleBadge role={user.role} />
          <h2 id="modal-title" className="user-modal__name">
            {fullName}
          </h2>
          <p className="user-modal__job-title">{user.jobTitle}</p>
        </header>

        <div className="user-modal__body">
          <div className="user-modal__info-grid">
            <div className="user-modal__info-item">
              <span className="user-modal__info-label text-label">Team</span>
              <span className="user-modal__info-value text-value">{user.team}</span>
            </div>
            <div className="user-modal__info-item">
              <span className="user-modal__info-label text-label">Contact information:</span>
              <span className="user-modal__info-value user-modal__email">{user.email}</span>
            </div>
          </div>

          <div className="user-modal__details">
            <span className="user-modal__info-label text-label">Other details</span>
            <p className="user-modal__details-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>

        <footer className="user-modal__footer">
          <button
            ref={closeButtonRef}
            type="button"
            className="user-modal__close-button btn-primary"
            onClick={onClose}
            aria-label="Close modal"
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  );
}

import React from 'react';
import styles from './ConfirmModal.module.scss';

interface ConfirmModalProps {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  error?: string | null;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title,
  message,
  confirmText = 'Подтвердить',
  cancelText = 'Отмена',
  isLoading = false,
  onConfirm,
  onCancel,
  error,
}) => {
  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.actions}>
          
          <button className={styles.cancelBtn} onClick={onCancel} disabled={isLoading}>
            {cancelText}
          </button>
          <button className={styles.confirmBtn} onClick={onConfirm} disabled={isLoading}>
            {isLoading ? 'Удаляем...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
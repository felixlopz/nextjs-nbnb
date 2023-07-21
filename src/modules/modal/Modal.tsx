'use client';

import { useCallback, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { cn } from '@/libs/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  disabled?: boolean;
  body?: React.ReactElement;
  footer?: React.ReactElement;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  disabled,
  body,
  footer,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    if (showModal === false) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled === true) return;
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, disabled]);

  const ref = useOnClickOutside(handleClose);

  if (isOpen === false) return null;

  return (
    <>
      <div className="fixed left-0 top-0 z-50 flex h-full w-full justify-center overflow-x-hidden overflow-y-hidden bg-neutral-800/70 outline-none focus:outline-none md:items-center">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="relative mx-auto h-full w-full md:h-auto md:w-4/5 lg:h-auto lg:w-full lg:max-w-2xl"
        >
          <div
            className={cn([
              'translate h-full translate-y-full opacity-0 duration-300',
              showModal && 'translate-y-7 opacity-100 md:translate-y-0',
            ])}
          >
            <div className="translate relative flex h-full w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none md:h-auto lg:h-auto">
              <div className="relative flex items-center justify-center rounded-t border-b-[1px] p-6">
                <button
                  className="absolute left-4 border-0 p-1 transition hover:opacity-70
                  "
                  onClick={handleClose}
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">{title}</div>
              </div>
              <div className="relative flex-auto p-6">{body}</div>
              {footer != null ? (
                <div className="flex flex-col gap-2 p-6">{footer}</div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;

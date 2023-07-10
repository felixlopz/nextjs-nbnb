'use client';

import { useCallback, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Button from '@/src/modules/common/Button';
import { useOnClickOutside } from '@/src/hooks/useOnClickOutside';
import { cn } from '@/src/libs/utils';

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

  const ref = useOnClickOutside(() => {
    handleClose();
  });

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled === true) return;

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  if (isOpen === false) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-neutral-800/70 outline-none focus:outline-none">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="relative mx-auto my-6 h-full w-full md:h-auto md:w-4/6 lg:h-auto lg:w-3/6 xl:w-2/5"
        >
          {/* Content */}
          <div
            className={cn([
              'translate h-full translate-y-full opacity-0 duration-300',
              showModal && 'translate-y-0 opacity-100',
            ])}
          >
            <div className="translate relative flex h-full w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none md:h-auto lg:h-auto">
              {/* HEADER */}
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
              {/*BODY*/}
              <div className="relative flex-auto p-6">{body}</div>
              {/*FOOTER*/}
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

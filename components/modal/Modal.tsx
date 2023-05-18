'use client';

import { useCallback, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disbaled?: boolean;
  secondaryAction?: () => void;
  secondaryLabel?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disbaled,
  secondaryAction,
  secondaryLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disbaled === true) return;

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disbaled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disbaled === true) return;

    onSubmit();
  }, [disbaled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disbaled === true || secondaryAction == null) return;

    secondaryAction();
  }, [disbaled, secondaryAction]);

  if (isOpen === false) return null;

  return (
    <>
      <div
        className="
        fixed 
        inset-0 
        z-50 
        flex 
        items-center 
        justify-center 
        overflow-y-auto 
        overflow-x-hidden 
        bg-neutral-800/70 
        outline-none
        focus:outline-none"
      >
        <div
          className="
            relative 
            mx-auto
            my-6
            h-full
            w-full
            md:h-auto
            md:w-4/6 
            lg:h-auto 
            lg:w-3/6
            xl:w-2/5"
        >
          {/* Content */}
          <div
            className={`
            translate
            h-full
            duration-300
            ${showModal ? 'translate-y-0' : 'translate-y-full'}
            ${showModal ? 'opacity-100' : 'opacity-0'}`}
          >
            <div
              className="
               translate
               relative
               flex
               h-full
               w-full 
               flex-col 
               rounded-lg 
               border-0 
               bg-white 
               shadow-lg 
               outline-none 
               focus:outline-none 
               md:h-auto 
               lg:h-auto"
            >
              {/* HEADER */}
              <div
                className="
                 relative 
                 flex 
                 items-center
                 justify-center
                 rounded-t
                 border-b-[1px]
                 p-6"
              >
                <button
                  className="
                    absolute
                    left-9 
                    border-0
                    p-1
                    transition
                    hover:opacity-70
                  "
                  onClick={handleClose}
                >
                  <IoMdClose size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;

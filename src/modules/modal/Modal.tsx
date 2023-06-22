'use client';

import { useCallback, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Button from '@/src/modules/common/Button';
import { useClickAway } from '@/src/hooks/useClickAway';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  const ref = useClickAway(() => {
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

  const handleSubmit = useCallback(() => {
    if (disabled === true) return;

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled === true || secondaryAction == null) return;

    secondaryAction();
  }, [disabled, secondaryAction]);

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
          ref={ref}
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
                    left-4
                    border-0
                    p-1
                    transition
                    hover:opacity-70
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
              <div className="flex flex-col gap-2 p-6">
                <div
                  className="
                    flex 
                    w-full 
                    flex-row 
                    items-center 
                    gap-4
                  "
                >
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      className="w-full"
                      disabled={disabled}
                      onClick={handleSecondaryAction}
                      variant="outline"
                      size="lg"
                    >
                      {secondaryActionLabel}
                    </Button>
                  )}
                  <Button
                    className="w-full"
                    disabled={disabled}
                    isLoading={disabled}
                    onClick={handleSubmit}
                    size="lg"
                  >
                    {actionLabel}
                  </Button>
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;

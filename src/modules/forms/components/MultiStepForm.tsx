'use client';

import { FC, ReactNode, useCallback, useMemo } from 'react';
import Button from '@/src/modules/common/Button';

export const convertEnumToNumberArray = (enumObject: any): Array<number> => {
  return Object.values(enumObject)
    .filter((value) => isNaN(Number(value)))
    .map((value) => Number(value));
};

interface MultiStepFormProps {
  children: ReactNode;
  isSubmitting?: boolean;
  step: number;
  totalSteps: Array<number>;
  updateStep: (step: number) => void;
  onSubmit: () => void;
  actionLabel?: string;
}

export const MultiStepForm: FC<MultiStepFormProps> = ({
  children,
  step,
  totalSteps,
  isSubmitting,
  onSubmit,
  updateStep,
  actionLabel = 'Submit',
}) => {
  const isFirstStep = useMemo(() => step === 0, [step]);
  const isLastStep = useMemo(
    () => step === totalSteps.length - 1,
    [step, totalSteps]
  );

  const onNextFormStep = useCallback(() => {
    if (isLastStep) {
      return;
    }
    updateStep(step + 1);
  }, [isLastStep, step, updateStep]);

  const onPreviousFormStep = useCallback(() => {
    if (isFirstStep) {
      return;
    }
    updateStep(step - 1);
  }, [isFirstStep, step, updateStep]);

  const goNextOrSubmitAction = useCallback(() => {
    if (isLastStep) {
      onSubmit();
    } else {
      onNextFormStep();
    }
  }, [isLastStep, onSubmit, onNextFormStep]);

  const submitLabel = useMemo(() => {
    if (isLastStep) {
      return actionLabel;
    }
    return 'Next';
  }, [isLastStep, actionLabel]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      {children}
      <div className="mt-12 flex items-center gap-x-4">
        <Button
          disabled={isFirstStep || isSubmitting}
          className="w-full"
          size="lg"
          variant="outline"
          onClick={onPreviousFormStep}
        >
          Back
        </Button>
        <Button
          className="w-full"
          size="lg"
          isLoading={isSubmitting}
          onClick={goNextOrSubmitAction}
          type="submit"
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default MultiStepForm;

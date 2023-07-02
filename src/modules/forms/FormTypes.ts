export type SubmitFormProps = {
  onSubmitStarted?: () => void;
  onSubmitSuccess?: () => void;
  onSubmitFail?: (error?: string) => void;
};

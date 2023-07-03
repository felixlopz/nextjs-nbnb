import { FC } from 'react';
import { SubmitFormProps } from '../FormTypes';

type SearchFormProps = SubmitFormProps & {};

export const SearchForm: FC<SearchFormProps> = ({
  onSubmitFail = () => {},
  onSubmitStarted = () => {},
  onSubmitSuccess = () => {},
}) => {
  return <div>SearchForm</div>;
};

export default SearchForm;

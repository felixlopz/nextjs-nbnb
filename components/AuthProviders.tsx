import React from 'react';
import Button from './Button';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

export const AuthProviders = () => {
  return (
    <>
      <Button
        outline
        label="Continue With Google"
        icon={FcGoogle}
        onClick={() => {}}
      />
      <Button
        outline
        label="Continue With Github"
        icon={AiFillGithub}
        onClick={() => {}}
      />
    </>
  );
};

import React from 'react';
import Button from './Button';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';

export const AuthProviders = () => {
  return (
    <>
      <Button
        outline
        label="Continue With Google"
        icon={FcGoogle}
        onClick={() => {
          signIn('google');
        }}
      />
      <Button
        outline
        label="Continue With Github"
        icon={AiFillGithub}
        onClick={() => {
          signIn('github');
        }}
      />
    </>
  );
};

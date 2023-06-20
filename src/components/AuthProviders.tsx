import React from 'react';
import Button from './Button';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';

import NewButton from '@/src/modules/common/Button';

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
      <NewButton
        variant="outline"
        size="lg"
        icon={FcGoogle}
        onClick={() => {
          signIn('google');
        }}
      >
        Continue With Google
      </NewButton>
      <NewButton
        size="lg"
        icon={AiFillGithub}
        variant="outline"
        onClick={() => {
          signIn('github');
        }}
        isLoading={true}
      >
        Continue With Github
      </NewButton>
    </>
  );
};

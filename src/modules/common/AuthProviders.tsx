import React from 'react';
import Button from './Button';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';

export const AuthProviders = () => {
  return (
    <>
      <Button
        variant="outline"
        size="lg"
        icon={FcGoogle}
        onClick={() => {
          signIn('google');
        }}
      >
        Continue With Google
      </Button>
      <Button
        size="lg"
        icon={AiFillGithub}
        variant="outline"
        onClick={() => {
          signIn('github');
        }}
      >
        Continue With Github
      </Button>
    </>
  );
};

export default AuthProviders;

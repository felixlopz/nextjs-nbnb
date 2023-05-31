import { getCurrentUser } from '@/actions/getCurrentUser';
import { User } from '@prisma/client';
import { useEffect, useState } from 'react';

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const getCurrentUserEffect = async () => {
      const currentUser = await getCurrentUser();
      setCurrentUser(currentUser);
    };

    getCurrentUserEffect();
  }, []);

  return { currentUser };
};

export default useCurrentUser;

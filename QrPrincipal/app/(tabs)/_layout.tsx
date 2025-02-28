import { useAuth } from '../../context/AuthContext';
import { useRouter, Slot } from 'expo-router';
import { useEffect, useState } from 'react';

const ProtectedRoutes = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady && !user) {
      router.replace('/Login');
    }
  }, [isReady, user]);

  return <Slot />;
};

export default ProtectedRoutes;

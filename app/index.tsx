import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import Loading from '../components/Loading';

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/login');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return <Loading />;
}

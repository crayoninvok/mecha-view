import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import Loading from '../components/Loading';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/login'); // langsung ke login setelah 2 detik
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return <Loading />;
}

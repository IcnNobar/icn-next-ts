// pages/404.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Custom404: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the homepage
    router.replace('/ar/jo/about');
  }, [router]);

  return null; // Optionally, render a loading spinner here
};

export default Custom404;

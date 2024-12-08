import { useRouter } from "next/router";
import { useEffect } from "react";

const Home = () => {

  const router = useRouter();

  useEffect(() => {
    // Redirect to the homepage
    router.replace('/ar/jo/about');
  }, [router]);

  return (
    <div>
      <h1>Welcome to the /ar-jo page!</h1>
      <p>You are currently on: </p>
    </div>
  );
};

export default Home;

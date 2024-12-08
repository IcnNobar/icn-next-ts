import { useRouter } from "next/router";

const About = () => {
  const router = useRouter();
  const { local, lang } = router.query;

  return (
    <div>
      <p>You are currently on: about</p>
      <p>
        Local: {local}, Language: {lang}
      </p>
    </div>
  );
};

export default About;

// If the user enter to the root redirect to /jr/ar
const Comp = () => {
  return <></>;
};

export default Comp;

export function getServerSideProps() {
  return {
    redirect: {
      permanent: true,
      destination: "/jr/ar",
    },
  };
}

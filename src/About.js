import HeroSection from "./components/HeroSection";
import { useProductContext } from "./context/productContex";

const About = () => {
  const { myName } = useProductContext();

  const data = {
    name: "Vinisha Ecommerce",
  };

  return (
    <>
      {myName}
      <HeroSection myData={data} />
    </>
  );
};

export default About;

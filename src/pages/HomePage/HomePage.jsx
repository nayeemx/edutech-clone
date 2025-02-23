import HeroPage from "../../components/Home/HeroPage/HeroPage";
import Galary from "../../components/Home/Galary/Galary";
import SuccessBlock from "../../components/Home/SuccessBlock/SuccessBlock";
import GalaryImage from "../../components/Home/GalaryImage/GalaryImage";
import Privacy from "../../components/Home/Privacy/Privacy";
import NewsCase from "../../components/Home/NewsCase/NewsCase";
const HomePage = () => {
  return (
    <>
    <HeroPage />
    <Galary />
    <GalaryImage />
    <SuccessBlock />
    <Privacy />
    <NewsCase />
    </>
  );
}

export default HomePage;
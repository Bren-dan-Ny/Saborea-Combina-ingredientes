import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

const BaseLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}

      <Footer />
    </>
  );
};

export default BaseLayout;

import { Flex } from "@chakra-ui/react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import type { ReactNode } from "react";

interface BaseLayoutProps {
  children: ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <Flex direction="column" minH="100vh" id="inicio">
      <Header />
      <Flex as="main" flex="1" direction="column">
        {children}
      </Flex>
      <Footer />
    </Flex>
  );
};

export default BaseLayout;

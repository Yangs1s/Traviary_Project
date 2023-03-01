/** @format */

import styled from "styled-components";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutContainer>
      <Header />
      <Content className="content">{children}</Content>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;

const LayoutContainer = styled.section``;

const Content = styled.div`
  width: 100%;
  height: 100%;
`;

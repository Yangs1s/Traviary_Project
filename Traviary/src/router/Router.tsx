/** @format */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "../components/common/Footer/Footer";
import Auth from "../pages/Auth";
import Header from "../components/common/Header/Header";
import MainContainer from "../pages/MainContainer";
import { useState } from "react";
import NotLoginPage from "../pages/NotLoginPage";
import Layout from "../components/common/Layout";

export default function Router() {
  const [showed, setShowed] = useState(true);

  const onClick = () => {
    setShowed(prev => !prev);
  };
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<NotLoginPage />} />
            <Route path="/main" element={<MainContainer />} />
            <Route path="auth" element={<Auth />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

/** @format */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "@/pages/Auth";
import Main from "@/pages/Main";
import NotLoginPage from "@/pages/NotLoginPage";
import Layout from "@/pages/Layout";
import AboutUs from "@/pages/AboutUs";
import NotFound from "@/pages/NotFound";
import { login } from "@/Store/login";
import { useRecoilState } from "recoil";
import GoToGalleryPage from "@/pages/GoToGalleryPage";

export default function Router() {
  const isLoggin = useRecoilState(login);
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {isLoggin[0] === false ? (
            <>
              <Route path={"/"} element={<NotLoginPage />} />
              <Route path={"auth"} element={<Auth />} />
            </>
          ) : (
            <>
              <Route path="/" element={<GoToGalleryPage />} />
              <Route path="main" element={<Main />} />
              <Route path="aboutus" element={<AboutUs />} />
            </>
          )}
          {/* <Route path={"/*"} element={<NotFound />} /> */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

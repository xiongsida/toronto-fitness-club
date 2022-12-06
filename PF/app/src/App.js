import React from "react";
import GlobalStyles from './styles/GlobalStyles';
import { css } from "styled-components/macro"; //eslint-disable-line

import TFCPage from "./pages/TorontoFitnessClubPage.js"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProfilePage from "./pages/Profile";
import ChangePass from "./pages/changePass";
import PaymentMethod from "./pages/PaymentMethod";
import Subscription from "./pages/Subscription";
import Header from "./pages/TFCHeader";
import Footer from "./pages/TFCFooter";
import History from "./pages/PaymentHistory";
import AnimationRevealPage from "./helpers/AnimationRevealPage.js";
const Layout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

export default function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <AnimationRevealPage>
          <Layout>
            <Routes>
              <Route path="/" element={<TFCPage />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="change-password" element={<ChangePass />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="history" element={<History />} />
              <Route path="add-payment-method" element={<PaymentMethod />} />
              <Route path="subscription" element={<Subscription />} />
            </Routes >
          </Layout>
        </AnimationRevealPage>
      </Router>
    </>
  );
}
import React from "react";
import GlobalStyles from './styles/GlobalStyles';
import { css } from "styled-components/macro"; //eslint-disable-line

import TFCPage from "./pages/TorontoFitnessClubPage.js"
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
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
import StudiosList from "./components/StudiosList";
import Classes from "./components/Classes";
import StudioDetails from "./components/StudioDetails";
import TFCPrice from "./pages/TFCPrice";

const Layout = ({ }) => (
  <>
    <div style={{
      display: "flex",
      minHeight: "100vh",
      minWidth: "100vw",
      flexDirection: "column",
      justifyContent: "flex-start",
      padding: "2rem",
    }}>
      <Header />
      <Outlet />
    </div>
    {/* <Footer /> */}

  </>
);

export default function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <AnimationRevealPage>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<TFCPage />} />
              <Route path="studios" element={<StudiosList />} />
              <Route path='studios/:studio_id' element={<StudioDetails />} />
              <Route path='classes' element={<Classes />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="change-password" element={<ChangePass />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="history" element={<History />} />
              <Route path="add-payment-method" element={<PaymentMethod />} />
              <Route path="subscription" element={<Subscription />} />
              <Route path="plans" element={<TFCPrice />} />
            </Route >
          </Routes>
        </AnimationRevealPage>
      </Router>
    </>
  );
}
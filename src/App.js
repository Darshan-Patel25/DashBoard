import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Account from "scenes/Account";
import Calender from "scenes/Calender";
import Analytics from "scenes/Analytics";
import Schedule from "scenes/Schedule";
import ConnectAccount from "scenes/Schedule/connectaccount";
import ManageAccount from "scenes/Schedule/manageaccount";
import CompetitorAnalysis from "scenes/competitoeanalysis";
import SyncTelegrambot from "scenes/syncTelegrambot.jsx";
import Home from "homepage/components/Home";
import SignIn from "homepage/components/SignIn";
import SignUp from "homepage/components/SignUp";
import About from "homepage/components/AboutUs/About";
import Cookies from "js-cookie";

import NearByComp from "scenes/NearBycomp";

import PageunderConstruction from "homepage/components/PageunderConstruction";


// Protected Route Component
function Protected({ Component }) {
  const isAuthenticated = !!Cookies.get("accessToken"); // Check if accessToken cookie exists

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return <Component />;
}

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          {/* Public routes without theme */}
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/aboutus" element={<About />} />

          {/* Protected Dashboard Routes with Theme */}
          <Route
            element={
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <Layout />
              </ThemeProvider>
            }
          >
            <Route
              path="/dashboard"
              element={<Protected Component={Dashboard} />}
            />
            <Route
              path="/analytics"
              element={<Protected Component={Analytics} />}
            />
            <Route
              path="/schedule"
              element={<Protected Component={Schedule} />}
            />
            <Route
              path="/calender"
              element={<Protected Component={Calender} />}
            />
            <Route
              path="/account"
              element={<Protected Component={Account} />}
            />
            <Route
              path="/connectaccount"
              element={<Protected Component={ConnectAccount} />}
            />
            {/* no requriement of this manageaccount route */}
            <Route
              path="/manageaccount"
              element={<Protected Component={ManageAccount} />}
            />
            <Route
              path="/competitor-insight"
              element={<Protected Component={CompetitorAnalysis} />}
            />
            <Route
              path="/sync-telegrambot"
              element={<Protected Component={SyncTelegrambot} />}
            />
           <Route path="/nearby-comp" element={<NearByComp />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

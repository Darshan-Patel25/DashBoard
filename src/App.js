import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

          {/* Dashboard Routes with Theme */}
          <Route
            element={
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <Layout />
              </ThemeProvider>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/schedule" element={<Schedule />} />

            <Route path="/calender" element={<Calender />} />

            <Route path="/account" element={<Account />} />
            <Route path="/connectaccount" element={<ConnectAccount />} />
            <Route path="/manageaccount" element={<ManageAccount />} />
            <Route
              path="/competitor-insight"
              element={<CompetitorAnalysis />}
            />
            <Route path="/sync-telegrambot" element={<SyncTelegrambot />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

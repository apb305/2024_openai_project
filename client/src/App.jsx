import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import PrivateRoute from "./utils/PrivateRoutes";
import { AuthProvider } from "./context/AuthContext";
import PrivateLayout from "./components/privateLayout/PrivateLayout";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Chat from "./components/Chat";
import AccountSettings from "./pages/AccountSettings";
import CompleteSignIn from "./pages/CompleteSignIn";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/complete-signin" element={<CompleteSignIn />} />
            <Route path="/reset-password" element={<ForgotPassword />} />
            <Route element={<PrivateRoute />}>
              <Route
                path="/dashboard"
                element={
                  <PrivateLayout>
                    <Dashboard />
                  </PrivateLayout>
                }
              />
              <Route
                path="/account-settings"
                element={
                  <PrivateLayout>
                    <AccountSettings />
                  </PrivateLayout>
                } 
              />
              <Route
                path="/chat"
                element={
                  <PrivateLayout>
                    <Chat />
                  </PrivateLayout>
                }
              />
               <Route
                path="/chat/:id"
                element={
                  <PrivateLayout>
                    <Chat />
                  </PrivateLayout>
                }
              />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
      <ToastContainer autoClose={5000} hideProgressBar={true} />
    </>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./pages/SignIn";
// import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
// import Profile from "./pages/Profile";
// import Account from "./pages/Account";
import Home from "./pages/Home";
// import ForgotPassword from "./pages/ForgotPassword";
// import Trip from "./pages/Trip";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import PrivateRoute from "./utils/PrivateRoutes";
import { AuthProvider } from "./context/AuthContext";
import PrivateLayout from "./components/privateLayout/PrivateLayout";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Chat from "./components/Chat";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/reset-password" element={<ForgotPassword />} />
            {/* <Route path="/trip/:id" element={<PrivateRoute />}>
              <Route path="/trip/:id" element={<Trip />} />
            </Route> */}
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
              {/* <Route path="/profile" element={<Profile />} />
              <Route path="/account" element={<Account />} /> */}
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
      <ToastContainer autoClose={5000} hideProgressBar={true} />
    </>
  );
}

export default App;

import { Navigate, Outlet, redirect } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import VerifyEmailPrompt from "../components/VerifyEmailPrompt";

const PrivateRoute = () => {
  // Get userLoggedIn and currentUser from AuthContext
  const { userLoggedIn, currentUser } = useAuth();

  // Check if the user is logged in and their email is verified
  const isUserLoggedIn = userLoggedIn;
  const isUserVerified = currentUser && currentUser.emailVerified;

  // Redirect user to sign-in page if not logged in
  if (!isUserLoggedIn) {
    return <Navigate to="/signin" replace={true} />;
  }

  // Render the protected route if the user is logged in and their email is verified
  if (isUserLoggedIn && isUserVerified) {
    return <Outlet />;
  }

  // Render component prompting user to verify email if logged in but email is not verified
  return <VerifyEmailPrompt />;
};

export default PrivateRoute;

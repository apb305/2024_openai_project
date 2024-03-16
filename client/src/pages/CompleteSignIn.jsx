import { useEffect, useState } from "react";
import { isSignInWithEmailLink } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../config/firebase";

export default function CompleteSignIn() {
  const { completeSignIn, currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(currentUser);
    if (currentUser) {
      navigate("/dashboard");
    }
    (async () => {
      try {
        setLoading(true);
        let email = window.localStorage.getItem("emailForSignIn");
        if (!email) {
          email = prompt("Please provide your email for confirmation");
        }
        if (isSignInWithEmailLink(auth, window.location.href)) {
          await completeSignIn(email, window.location.href);
          window.localStorage.removeItem("emailForSignIn"); // Clear email from storage
          navigate("/dashboard"); // Navigate to dashboard upon successful sign-in
        } else {
          navigate("/signin");
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [navigate]);

  return (
    <div className="text-center mt-5">{loading && <h3>Signing in...</h3>}</div>
  );
}

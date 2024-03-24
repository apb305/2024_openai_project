import { Button, Container } from "react-bootstrap";
import { MdOutlineEmail } from "react-icons/md";
import { CgArrowLongLeft } from "react-icons/cg";
import { useAuth } from "../context/AuthContext";
import { sendEmailVerification } from "firebase/auth";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function VerifyEmailPrompt() {
  const { currentUser, signOut } = useAuth();

  const emailVerification = async (user) => {
    try {
      await sendEmailVerification(user);
      await signOut();
      toast.success("Verification email sent");
    } catch (error) {
      console.error(error);
    }
  };

  const backToSignIn = async () => {
    await signOut();
    return <Navigate to="/signin" />;
  };

  return (
    <>
      <Container className="text-center mt-5">
        <MdOutlineEmail size={60} />
        <h3 className="mt-2">Please verify your email to continue</h3>
        <p className="mt-2">
          We've sent a verification link to your email address. Click on the
          link to verify your email.
        </p>
        <p className="mt-2">
          If you haven't received the email, click the button below to resend
          the verification link.
        </p>
        <button
          className="btn btn-primary mt-3"
          onClick={() => emailVerification(currentUser)}
        >
          {" "}
          Resend Verification Email
        </button>
        <div className="mt-3">
          <Button
            as={Link}
            variant="link"
            className="text-decoration-none"
            onClick={backToSignIn}
          >
            {" "}
           <span><CgArrowLongLeft size={25} /></span> {""}
            Back to Sign In
          </Button>
        </div>
      </Container>
    </>
  );
}

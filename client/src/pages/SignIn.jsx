import { Card, Form, Button, Container, Image, Alert } from "react-bootstrap";
import { set, useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import GoogleButton from "../components/GoogleButton";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FacebookButton from "../components/FacebookButton";

export default function SignIn() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, currentUser, googleSignIn, facebookSignIn, sendMagicLink } =
    useAuth();
  const [formMessage, setFormMessage] = useState(null);

  // const actionCodeSettings = {
  //   url: getAuthUrl(),
  //   handleCodeInApp: true,
  // }

  // function getAuthUrl() {
  //   const origin = window.location.origin;
  //   const path = '/complete-signin';
  //   return [origin, path].join('');
  // }

  const handleEmailPasswordLogin = async (data) => {
    try {
      setLoading(true);
      // await sendMagicLink(data.email, actionCodeSettings);
      // window.localStorage.setItem("emailForSignIn", data.email);
      // setFormMessage("Check your email for the magic link");
      // setLoading(false);
      await signIn(data.email, data.password);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error.code);
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await googleSignIn();
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.code);
      setLoading(false);
    }
  };

  const handleFacebookLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await facebookSignIn();
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.code);
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center">
      {/* {currentUser && <Navigate to="/" replace={true} />} */}
      <Card className="shadow border-0 mt-5 bg-white">
        <Card.Body>
          <div className="text-center">
            <Image
              alt="Company logo"
              src="/FAQtual-logos_black.png"
              height={150}
              width={150}
            />
          </div>
          {/* <h4 className="text-center mb-4">FAQtual</h4> */}
          <Form onSubmit={handleSubmit(handleEmailPasswordLogin)}>
            {/* Email login */}
            {formMessage && <Alert variant="success">{formMessage}</Alert>}
            <Form.Group id="email">
              <Form.Control
                type="email"
                name="email"
                placeholder="example@email.com"
                {...register("email", { required: true })}
              ></Form.Control>
              {errors.email && (
                <p className="mt-1 text-danger">This field is required</p>
              )}
            </Form.Group>

            {/* Password */}
            <Form.Group id="password" className="mt-3">
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", { required: true })}
              ></Form.Control>
              <div className="icon-div" onClick={toggleShowPassword}>
                <Link className="text-decoration-none text-black">
                  <i
                    className={
                      showPassword
                        ? "fa fa-eye-slash password-icon"
                        : "fa fa-eye password-icon"
                    }
                    aria-hidden="true"
                  ></i>
                </Link>
              </div>
              {errors.password && (
                <p className="mt-1 text-danger">This field is required</p>
              )}
            </Form.Group>
            <div className="text-start mt-2">
              <Link
                className="text-decoration-none fw-light"
                to="/reset-password"
                style={{ color: "rgb(25, 118, 210)", fontSize: 15 }}
              >
                Forgot Password?
              </Link>
            </div>
            <Button
              disabled={loading}
              className="w-100 mt-4"
              type="submit"
              variant="dark"
              // style={{ backgroundColor: "rgb(25, 118, 210)" }}
            >
              {loading ? "Please wait..." : "Sign In"}
            </Button>
          </Form>

          <div className="row my-3">
            <div className="col">
              <hr />
            </div>
            <div className="col-auto mt-1">
              <p className="d-inline">or</p>
            </div>
            <div className="col">
              <hr />
            </div>
          </div>
          <GoogleButton
            handleGoogleLogin={handleGoogleLogin}
            loading={loading}
          />
          {/* <FacebookButton
            handleFacebookLogin={handleFacebookLogin}
            loading={loading}
          /> */}
          {/* Site Terms */}
          <div className="text-center my-3 fst-italic fw-light">
            <p className="small ">
              By continuing, you agree to FAQtual Company’s{" "}
              <a href="#" className="text-dark">
                Terms of Use
              </a>{" "}
              and{" "}
              <a href="#" className="text-dark">
                Privacy Policy
              </a>{" "}
              .
            </p>
          </div>
          {/* <div className="mt-3">
              <hr></hr>
            </div> */}
          <div className="text-center mt-4">
            <span>Need an account?</span>{" "}
            <Link
              className="text-decoration-none"
              to="/signup"
              style={{ color: "rgb(25, 118, 210)" }}
            >
              Sign Up
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

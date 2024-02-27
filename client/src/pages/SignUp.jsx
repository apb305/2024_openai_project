import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Card, Form, Button, Alert, Container, Image } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import GoogleButton from "../components/GoogleButton";
import FacebookButton from "../components/FacebookButton";

export default function SignUp() {
  const { signUp, currentUser, googleSignIn, facebookSignIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignup = async (data) => {
    try {
      setLoading(true);
      const user = await signUp(data.name, data.email, data.password);
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      toast.error(error.code);
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

  // const handleFacebookLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     setLoading(true);
  //     await facebookSignIn();
  //     navigate("/dashboard");
  //   } catch (error) {
  //     toast.error(error.code);
  //     setLoading(false);
  //   }
  // };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center">
      {/* {currentUser && <Navigate to="/" replace={true} />} */}
      <Card className="shadow border-0 mt-5">
        <Card.Body>
          <div className="text-center">
            <Image
              alt="Company logo"
              src="/FAQtual-logos_black.png"
              height={150}
              width={150}
            />
          </div>
          <p className="text-center mb-4">Create Account</p>
          <Form onSubmit={handleSubmit(handleSignup)}>
            <Form.Group id="name">
              <Form.Control
                type="text"
                name="name"
                placeholder="Name"
                {...register("name", { required: true })}
              ></Form.Control>
              {errors.name && (
                <p className="mt-1 text-danger">Name is required</p>
              )}
            </Form.Group>
            <Form.Group id="email" className="mt-3">
              <Form.Control
                type="text"
                name="email"
                placeholder="Email"
                {...register("email", {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
                })}
              ></Form.Control>
              {errors.email && errors.email.type === "required" && (
                <p className="mt-1 text-danger">Email is required</p>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <p className="mt-1 text-danger">Email is not valid</p>
              )}
            </Form.Group>
            <Form.Group id="password" className="mt-3">
              <Form.Control
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                {...register("password", { required: true, minLength: 6 })}
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
              {errors.password && errors.password.type === "required" && (
                <p className="mt-1 text-danger">Password is required</p>
              )}
              {errors.password && errors.password.type === "minLength" && (
                <p className="mt-1 text-danger">
                  Password must be at least 6 characters long
                </p>
              )}
            </Form.Group>
            <Button
              disabled={loading}
              className="w-100 mt-3"
              type="submit"
              style={{ backgroundColor: "rgb(25, 118, 210)" }}
            >
              {loading ? "Please Wait..." : "Sign Up"}
            </Button>
          </Form>

          {/* Divider */}
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

          {/* Google button */}
          <GoogleButton
            handleGoogleLogin={handleGoogleLogin}
            loading={loading}
          />
          {/* Facebook button */}
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
          <div className="text-center mt-4">
            <span>Already have an account?</span>{" "}
            <Link
              className="text-decoration-none"
              to="/signin"
              style={{ color: "rgb(25, 118, 210)" }}
            >
              Sign In
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

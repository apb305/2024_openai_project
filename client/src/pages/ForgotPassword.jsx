import React, { useState } from "react";
import { Card, Form, Button, Alert, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

export default function ForgotPassword() {
  const { resetPasswordByEmail } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPasswordByEmail(data.email);
      setLoading(false);
      setMessage("Check your email for the password reset instructions");
    } catch (error) {
      setLoading(false);
      setError("Failed to reset password");
    }
  }

  return (
    <Container className="d-flex align-items-center justify-content-center">
      <Card className="shadow border-0 mt-5 w-50">
        <Card.Body>
          {error && (
            <Alert className="text-center" variant="danger">
              {error}
            </Alert>
          )}
          {message && <Alert variant="success">{message}</Alert>}
          <div className="my-4">
            <h4>Forgot your password?</h4>
            <small className="fw-light">
              Enter your email and we will send you a reset link
            </small>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group id="email">
              <Form.Control
                type="email"
                name="email"
                {...register("email", { required: true })}
                placeholder="Email"
              ></Form.Control>
              {errors.email && (
                <p className="mt-1 text-danger">This field is required</p>
              )}
            </Form.Group>
            <Button
              disabled={loading}
              className="w-100 mt-3"
              type="submit"
              style={{ backgroundColor: "rgb(25, 118, 210)" }}
            >
              {loading ? "Please Wait..." : "Send reset link"}
            </Button>
          </Form>
          <div className="text-center mt-4">
            <Link
              className="text-decoration-none fw-light"
              to="/signin"
              style={{ color: "rgb(25, 118, 210)" }}
            >
              Back to Sign In
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

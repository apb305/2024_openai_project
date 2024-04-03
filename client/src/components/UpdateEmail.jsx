import { useState } from "react";
import { toast } from "react-toastify";
import { Form, Button, Card, CardHeader } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function UpdateEmail() {
  const [loading, setLoading] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const { currentUser, changeUserEmail } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const handleUpdateEmail = async (data) => {
    try {
      setLoading(true);
      await changeUserEmail(data.currentPassword, data.email);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("An error has occured");
      console.log(error);
    }
  };

  const toggleShowEmailInput = () => {
    reset();
    setShowEmailInput(!showEmailInput);
  };

  return (
    <Card className="mt-3">
        <CardHeader>
      <Card.Title style={{ fontSize: 15, textAlign: "center" }}> Account Email </Card.Title>
      </CardHeader>
      <Card.Body>
      <div style={{ fontSize: 15 }}>
          Account Email:{" "}
          <span style={{ fontWeight: 700 }}> {currentUser.email}</span>
        </div>
        <Form onSubmit={handleSubmit(handleUpdateEmail)}>
          <Form.Group className="my-3">
            <Form.Control
              hidden={!showEmailInput}
              type="text"
              name="email"
              placeholder="New email"
              {...register("email", {
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
              })}
            />
            {errors.email && errors.email.type === "pattern" && (
              <p className="mt-1 text-danger">Email is not valid</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              hidden={!showEmailInput}
              type="password"
              name="currentPassword"
              placeholder="Current password"
              {...register("currentPassword", { required: true })}
            />
            {errors.currentPassword && (
              <p className="mt-1 text-danger">Current password is required</p>
            )}
          </Form.Group>
          <Card.Text  hidden={!showEmailInput}> <small>Logout is required </small> </Card.Text>
          <div className="mt-2">
            {watch("email") ? (
              <Button
                size="sm"
                className="w-100"
                type="submit"
                disabled={loading}
              >
                {loading ? "Please wait..." : "Save"}
              </Button>
            ) : (
              ""
            )}
          </div>
          <div className="mt-2">
            <Link
              className="text-decoration-none text-primary"
              onClick={toggleShowEmailInput}
              hidden={showEmailInput}
            >
              Change Email
            </Link>
            <Link
              className="text-decoration-none text-primary"
              variant="link"
              onClick={toggleShowEmailInput}
              hidden={!showEmailInput}
            >
              Cancel
            </Link>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

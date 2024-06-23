import { useState } from "react";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";
import { Form, Button, Card, CardHeader } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function AccountDetails() {
  const [loading, setLoading] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);
  const { currentUser } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const handleUpdateName = async (data) => {
    setLoading(true);
    try {
      await updateProfile(currentUser, {
        displayName: data.name,
      });
      reset();
      setLoading(false);
      toast.success("Name updated");
    } catch (error) {
      setLoading(false);
      toast.error("An error has occured");
      console.log(error);
    }
  };

  const toggleShowNameInput = () => {
    reset();
    setShowNameInput(!showNameInput);
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <Card.Title style={{ fontSize: 15, textAlign: "center" }}>
          {" "}
          Account Name{" "}
        </Card.Title>
      </CardHeader>
      <Card.Body>
        <div style={{ fontSize: 15 }}>
          Name:{" "}
          <span style={{ fontWeight: 700 }}> {currentUser.displayName}</span>
        </div>
        <Form onSubmit={handleSubmit(handleUpdateName)}>
          <Form.Group className="my-3">
            <Form.Control
              hidden={!showNameInput}
              type="text"
              name="name"
              placeholder="Enter name"
              {...register("name")}
            />
          </Form.Group>
          <div className="mt-2">
            {watch("name") ? (
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
              onClick={toggleShowNameInput}
              hidden={showNameInput}
            >
              Change Name
            </Link>
            <Link
              className="text-decoration-none text-primary"
              variant="link"
              onClick={toggleShowNameInput}
              hidden={!showNameInput}
            >
              Cancel
            </Link>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

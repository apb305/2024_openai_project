import { useState } from "react";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";
import { Form, Button, Card, CardHeader } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";


export default function AccountDetails() {
  const [loading, setLoading] = useState(false);
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
      toast.success("Profile updated");
    } catch (error) {
      setLoading(false);
      toast.error("An error has occured");
      console.log(error);
    }
  };

  return (
    <Card className="shadow-sm">
         <CardHeader>
        <Card.Title style={{ fontSize: 15, textAlign: "center" }}> Profile </Card.Title>
        </CardHeader>
      <Card.Body>
        <div style={{ fontSize: 15 }}>
          Account Email:{" "}
          <span style={{ fontWeight: 700 }}> {currentUser.email}</span>
        </div>
        <div style={{ marginTop: 20, fontSize: 15 }}>
          Name:{" "}
          <span style={{ fontWeight: 700 }}> {currentUser.displayName}</span>
        </div>
        <Form onSubmit={handleSubmit(handleUpdateName)}>
          <Form.Group className="my-3">
            <Form.Control
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
        </Form>
      </Card.Body>
    </Card>
  );
}

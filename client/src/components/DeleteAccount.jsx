import { useState } from "react";
import { Button, Card, CardHeader, Modal } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";

export default function DeleteAccount() {
  const { currentUser, deleteAccount } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleDeleteAccount = async () => {
    // Prompt the user for confirmation
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (!confirmDelete) {
      return; // Exit function if user cancels
    }
    try {
      const password = prompt(
        "Please enter your password to confirm account deletion"
      );
      if (password === null) {
        return;
      }
      setLoading(true);
      await deleteAccount(currentUser, password);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <Card className="shadow-sm mt-3 text-center">
      <CardHeader>
        <Card.Title style={{ fontSize: 15 }}> Delete Account </Card.Title>
      </CardHeader>
      <Card.Body>
        <Card.Text>
          {" "}
          You will lose access to your FAQtual account once your deletion
          request has been submitted.{" "}
        </Card.Text>
        <Button
          variant="danger"
          disabled={loading}
          size="sm"
          className="mt-3"
          onClick={handleDeleteAccount}
        >
          {" "}
          {loading ? "Deleting..." : "Delete Account"}
        </Button>
      </Card.Body>
    </Card>
  );
}

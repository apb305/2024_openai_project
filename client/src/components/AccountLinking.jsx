import { Button, Card, CardHeader, Row } from "react-bootstrap";
import { FaSquareFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function AccountLinking() {
  const { currentUser, linkAccount, unlinkAccount } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLinkAccount = async (provider) => {
    try {
      setLoading(true);
      await linkAccount(provider);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleUnlinkAccount = async (provider) => {
    try {
      setLoading(true);
      await unlinkAccount(provider);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Card className="mt-3">
      <CardHeader>
        <Card.Title style={{ fontSize: 15, textAlign: "center" }}>
          Link Accounts
        </Card.Title>
      </CardHeader>
      <Card.Body>
        <Row className="justify-content-center">
          <Button
            variant="white"
            className="w-75 mb-3 text-dark shadow"
            type="submit"
            disabled={loading}
            style={{ border: "none" }}
            onClick={
              currentUser.providerData.some(
                (provider) => provider.providerId === "google.com"
              )
                ? () => handleUnlinkAccount("google")
                : () => handleLinkAccount("google")
            }
          >
            <FcGoogle size="1.5em" style={{ marginRight: "10px" }} />
            {currentUser.providerData.some(
              (provider) => provider.providerId === "google.com"
            )
              ? " Unlink Google Account"
              : " Link Google Account"}
          </Button>
        </Row>
        <Row className="justify-content-center">
          <Button
            variant="white"
            className="w-75 mb-3 shadow text-white"
            type="submit"
            disabled={loading}
            style={{ border: "none", backgroundColor: "rgb(25, 118, 210)" }}
            onClick={
              currentUser.providerData.some(
                (provider) => provider.providerId === "facebook.com"
              )
                ? () => handleUnlinkAccount("facebook")
                : () => handleLinkAccount("facebook")
            }
          >
            <FaSquareFacebook size="1.5em" style={{ marginRight: "10px" }} />{" "}
            {currentUser.providerData.some(
              (provider) => provider.providerId === "facebook.com"
            )
              ? "Unlink Facebook Account"
              : "Link Facebook Account"}
          </Button>
        </Row>
      </Card.Body>
    </Card>
  );
}

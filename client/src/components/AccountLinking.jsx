import { Button, Card, CardHeader, Row } from "react-bootstrap";
import { FaSquareFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../context/AuthContext";

export default function AccountLinking() {
  const { linkAccount } = useAuth();

  const handleLinkAccount = async (provider) => {
    try {
      await linkAccount(provider);
    } catch (error) {
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
        <h6 className="text-center">Link your account with social media</h6>
        <Row className="justify-content-center">
          <Button
            variant="white"
            className="w-75 mb-3 text-dark shadow"
            type="submit"
            style={{ border: "none" }}
            onClick={() => handleLinkAccount("google")}
          >
            <FcGoogle size="1.5em" style={{ marginRight: "10px" }} /> Link
            Google Account
          </Button>
        </Row>
        <Row className="justify-content-center">
          <Button
            variant="white"
            className="w-75 mb-3 shadow text-white"
            type="submit"
            style={{ border: "none", backgroundColor: "rgb(25, 118, 210)" }}
            onClick={() => handleLinkAccount("facebook")}
          >
            <FaSquareFacebook size="1.5em" style={{ marginRight: "10px" }} />{" "}
            Link Facebook Account
          </Button>
        </Row>
      </Card.Body>
    </Card>
  );
}

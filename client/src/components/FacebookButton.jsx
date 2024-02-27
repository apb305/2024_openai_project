import { Button } from "react-bootstrap";
import { FaSquareFacebook } from "react-icons/fa6";

export default function FacebookButton({handleFacebookLogin, loading}) {

  return (
    <>
      <Button
        disabled={loading}
        className="w-100 mb-3 text-white shadow-sm"
        type="submit"
        style={{border: "none", backgroundColor: "rgb(25, 118, 210)"}}
        onClick={handleFacebookLogin}
      >
        <FaSquareFacebook size="1.5em" style={{ marginRight: "10px" }} />   {loading ? "Please wait..." : " Continue with Facebook"}
      </Button>
    </>
  );
}

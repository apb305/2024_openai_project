import { Button } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";

export default function GoogleButton({handleGoogleLogin, loading}) {

  return (
    <>
      <Button
        disabled={loading}
        variant="white"
        className="w-100 mb-3 text-dark shadow-sm"
        type="submit"
        style={{border: "none"}}
        onClick={handleGoogleLogin}
      >
        <FcGoogle size="1.5em" style={{ marginRight: "10px" }} />   {loading ? "Please wait..." : " Continue with Google"}
      </Button>
    </>
  );
}

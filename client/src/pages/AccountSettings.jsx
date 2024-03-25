import { Container } from "react-bootstrap";
// import ProfileImageUpload from "../components/ProfileImageUpload";
import AccountPassword from "../components/UpdatePassword";
import UpdateEmail from "../components/UpdateEmail";
import AccountDetails from "../components/AccountDetails";
import DeleteAccount from "../components/DeleteAccount";
import { Link } from "react-router-dom";

export default function AccountSettings() {
  return (
    <Container className="align-items-center justify-content-center mt-4">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <h4 className="text-center mb-4">Account Settings</h4>
          {/* Profile Image upload */}
          {/* <ProfileImageUpload /> */}
          <AccountDetails />
          {/* <UpdateEmail /> */}
          <AccountPassword />
          <DeleteAccount />

          <div className="text-left mt-3">
            <Link
              to="/dashboard"
              className="btn btn-sm text-decoration-none text-white btn-sm btn-dark border"
            >
              Back to dashboard
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}

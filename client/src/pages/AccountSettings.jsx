import { Container } from "react-bootstrap";
// import ProfileImageUpload from "../components/ProfileImageUpload";
import AccountPassword from "../components/UpdatePassword";
import UpdateEmail from "../components/UpdateEmail";
import AccountLinking from "../components/AccountLinking";
import AccountDetails from "../components/AccountDetails";
import DeleteAccount from "../components/DeleteAccount";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AccountSettings() {
  const { currentUser } = useAuth();

  return (
    <Container className="align-items-center justify-content-center mt-4">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <h4 className="text-center mb-4">Account Settings</h4>
          {/* Profile Image upload */}
          {/* <ProfileImageUpload /> */}
          <AccountDetails />
          {/*If the user is signed in with email and password, 
           show the AccountPassword and UpdateEmail components*/}
          {currentUser.providerData.some(
            (provider) => provider.providerId === "password"
          ) && (
            <>
              <AccountPassword />
              <UpdateEmail />
            </>
          )}
          {/* Show AccountLinking and DeleteAccount components */}
          <AccountLinking />
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

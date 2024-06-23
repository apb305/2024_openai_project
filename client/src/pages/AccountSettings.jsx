import { Container } from "react-bootstrap";
import AccountPassword from "../components/UpdatePassword";
import UpdateEmail from "../components/UpdateEmail";
import AccountLinking from "../components/AccountLinking";
import AccountDetails from "../components/AccountDetails";
import DeleteAccount from "../components/DeleteAccount";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { IoMdArrowBack } from "react-icons/io";

export default function AccountSettings() {
  const { currentUser } = useAuth();

  return (
    <Container className="align-items-center justify-content-center my-4">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <h4 className="text-center mb-4">Account Settings</h4>
          <div className="my-3">
            <Link to="/dashboard" className="text-dark text-decoration-none">
              <span>
                <IoMdArrowBack size={25} />
              </span>{" "}
              Back to Dashboard
            </Link>
          </div>
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
        </div>
      </div>
    </Container>
  );
}

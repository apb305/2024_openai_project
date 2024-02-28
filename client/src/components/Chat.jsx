import { useEffect, useRef, useState } from "react";
import {
  Container,
  Row,
  Card,
  Button,
  Form,
  InputGroup,
  FormControl,
  Alert,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import ChatMessages from "./ChatMessages";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../config/axiosConfig";
import { CgAttachment } from "react-icons/cg";
import { BsUpload } from "react-icons/bs";

export default function Chat() {
  const [isLoading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [isMessagesLoading, setMessagesLoading] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const { currentUser } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (id) {
      getMessages();
    }
  }, []);

  //Handles retrieving messages
  const getMessages = async () => {
    try {
      setMessagesLoading(true);

      const token = await currentUser.getIdToken();
      // Correctly passing parameters in a GET request
      const response = await instance.get(`/api/chats/`, {
        params: {
          chatId: id,
        },
        headers: { Authorization: `Bearer ${token}` },
      });
      // Directly using response.data without await
      setMessages(response.data);
    } catch (error) {
      console.error(error);
      // Consider setting an error state here to display an error message to the user
    } finally {
      // This will run regardless of the try/catch outcome
      setMessagesLoading(false);
    }
  };

  // Handles the submit event on form submit.
  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      setNewQuestion(formData.text);

      const token = await currentUser.getIdToken();
      const response = await instance.post(
        "/api/chats",
        {
          uid: currentUser.uid,
          chatId: id ? id : null,
          text: formData.text,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const result = await response.data;
      setNewQuestion("");
      setMessages(result.data);
      reset();
      setLoading(false);
      if (!id) {
        navigate(`/chat/${result.chatId}`, { replace: true });
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleButtonClick = () => {
    // Trigger the hidden file input click event
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file.name);
    // Process the file here (e.g., uploading to a server or reading the file)
  };

  return (
    <>
      <main>
        <Container className="justify-content-center">
          <div className="mt-5">
            {currentUser && (
              <div className="mt-2">
                <p className="mx-2">Welcome, {currentUser.displayName}</p>{" "}
              </div>
            )}
          </div>
          <div className="mt-3">
            {/* Chat Card */}
            <Card className="bg-white shadow border-0">
              {/* Messages */}
              <ChatMessages
                isLoading={isLoading}
                user={currentUser}
                newQuestion={newQuestion}
                messages={messages}
                previousMessagesLoading={isMessagesLoading}
              />
              <Card.Footer className="text-muted bg-light">
                {/* Chat input field and button section */}
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <InputGroup className="mb-1">
                    <Form.Control
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      style={{ display: "none" }} // Hide the file input
                    />
                    {/* Custom button that triggers the file input */}
                    <Button onClick={handleButtonClick} style={{ backgroundColor: "rgb(25, 118, 210)" }}>
                      <CgAttachment />
                    </Button>
                    <FormControl
                      id="messageInput"
                      type="text"
                      name="text"
                      placeholder="Type message here..."
                      aria-label="User Message"
                      aria-describedby="button-addon2"
                      {...register("text", { required: true })}
                    />
                    <Button
                      style={{ backgroundColor: "rgb(25, 118, 210)" }}
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? "Processing..." : "Submit"}
                    </Button>
                  </InputGroup>
                  {errors.text && (
                    <Alert variant="danger" className="mt-2">
                      This field is required!
                    </Alert>
                  )}
                </Form>
              </Card.Footer>
            </Card>
            <div>
              <Button
                href="/dashboard"
                variant="dark"
                size="sm"
                className="mb-5 mt-3 shadow"
              >
                Back to Dashboard
              </Button>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}

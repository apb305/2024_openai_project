import { Button, Col, Modal, Row, Spinner } from "react-bootstrap";
import { RiChatNewFill } from "react-icons/ri";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useAuth } from "../context/AuthContext";
import instance from "../config/axiosConfig";
import { useEffect, useState } from "react";

export default function ChatCards() {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getAllChats();
  }, []);

  const getAllChats = async () => {
    try {
      setLoading(true);
      const token = await currentUser.getIdToken();
      const response = await instance.post(
        "/api/chats/all",
        { uid: currentUser.uid },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setChats(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle click
  const handleClick = (chatId) => {
    if (!chatId) {
      return navigate("/chat");
    }
    navigate(`/chat/${chatId}`);
  };

  const deleteChat = async (chatId) => {
    try {
      setLoading(true);
      const token = await currentUser.getIdToken();
      const response = await instance.delete("/api/chats/delete-chat", {
        data: { chatId: chatId, uid: currentUser.uid },
        headers: { Authorization: `Bearer ${token}` },
      });
      setChats(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row xs={1} md={4} className="g-2 mt-3">
          <Col>
            <Card
              onClick={() => handleClick()}
              style={{ cursor: "pointer", minHeight: "130px" }}
              className="shadow-sm"
            >
              {" "}
              {/* Add onClick and cursor style */}
              <Card.Body className="text-center">
                <Card.Title>New Chat</Card.Title>
                <RiChatNewFill size={50} className="mt-2" />
              </Card.Body>
            </Card>
          </Col>
          {chats &&
            chats.map((data, index) => (
              <Col key={index}>
                <Card style={{ minHeight: "125px" }} className="shadow-sm">
                  <Card.Body
                    className="text-end"
                    onClick={() => handleClick(data.chatId)}
                    style={{ cursor: "pointer" }}
                  >
                    {/* <Card.Title className="text-start text-truncate">{data.chatTitle}</Card.Title> */}
                    <Card.Subtitle className="mb-2 text-start text-truncate text-center">
                      <small>{data.chatTitle}</small>
                    </Card.Subtitle>
                    <Card.Text
                      className="text-start text-muted text-center"
                      style={{ fontSize: 13 }}
                    >
                      Created {format(new Date(data.createdAt), "MM-dd-yyyy")}
                    </Card.Text>
                    {/* <Card.Link href="#" className="text-decoration-none">View</Card.Link> */}
                    {/* <Card.Link href="#" className="text-danger text-decoration-none">Delete</Card.Link> */}
                  </Card.Body>
                  <Card.Footer className="text-muted bg-white border-0 text-center">
                    <Button
                      variant="link"
                      className="text-danger text-decoration-none"
                      onClick={handleShow}
                    >
                      Delete Chat
                    </Button>

                    <Modal
                      show={show}
                      onHide={handleClose}
                      animation={true}
                      centered={true}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Delete Chat</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        Are you sure you want to delete this chat?
                      </Modal.Body>
                      <Modal.Footer className="border-0">
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => deleteChat(data.chatId)}
                        >
                          Delete
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
        </Row>
      )}
    </>
  );
}

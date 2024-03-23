import { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { RiChatNewFill } from "react-icons/ri";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useAuth } from "../context/AuthContext";
import instance from "../config/axiosConfig";
import { FaTrashAlt } from "react-icons/fa";

export default function ChatCards() {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

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
    // Prompt the user for confirmation
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this chat?"
    );
    if (!confirmDelete) {
      return; // Exit function if user cancels
    }
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
              <Card.Body className="text-center">
                <Card.Title>New Chat</Card.Title>
                <RiChatNewFill size={50} className="mt-2" />
              </Card.Body>
            </Card>
          </Col>
          {chats &&
            chats.map((data, index) => (
              <Col key={index}>
                <Card style={{ minHeight: "130px" }} className="shadow-sm">
                  <Card.Header className="d-flex justify-content-between align-items-center border-0 bg-white">
                    <small className="text-start">
                      {" "}
                      Created {format(new Date(data.createdAt), "MM-dd-yyyy")}
                    </small>
                    <Link onClick={() => deleteChat(data.chatId)}>
                      <FaTrashAlt className="text-danger" />
                    </Link>
                  </Card.Header>
                  <Card.Body
                    className="text-end"
                    onClick={() => handleClick(data.chatId)}
                    style={{ cursor: "pointer" }}
                  >
                    <Card.Text
                      className="text-start text-truncate"
                      style={{ fontSize: 14 }}
                    >
                      <strong>File: </strong>{" "}
                      <small className="text-muted">{data.chatTitle}</small>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      )}
    </>
  );
}

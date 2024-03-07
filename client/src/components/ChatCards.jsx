import { Col, Row, Spinner } from "react-bootstrap";
import { RiChatNewFill } from "react-icons/ri";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";

export default function ChatCards({ chatThreads, loading }) {
  const navigate = useNavigate();

  // Function to handle click
  const handleClick = (chatId) => {
    if (!chatId) {
      return navigate("/chat");
    }
    navigate(`/chat/${chatId}`);
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
              style={{ cursor: "pointer", minHeight: "125px" }}
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
          {chatThreads &&
            chatThreads.map((data, index) => (
              <Col key={index}>
                <Card
                
                  style={{ minHeight: "125px" }}
                  className="shadow-sm"
                >
                  <Card.Body className="text-end"   onClick={() => handleClick(data.chatId)} style={{ cursor: "pointer"}}>
                    {/* <Card.Title className="text-start text-truncate">{data.chatTitle}</Card.Title> */}
                    <Card.Subtitle className="mb-2 text-start text-truncate text-center">
                     <small>{data.chatTitle}</small> 
                    </Card.Subtitle>
                    <Card.Text className="text-start text-muted text-center" style={{fontSize: 13}}>
                      Created {format(new Date(data.createdAt), "MM-dd-yyyy")}
                    </Card.Text>
                    {/* <Card.Link href="#" className="text-decoration-none">View</Card.Link> */}
                    {/* <Card.Link href="#" className="text-danger text-decoration-none">Delete</Card.Link> */}
                  </Card.Body>
                  <Card.Footer className="text-muted bg-white border-0 text-end"><Link className="text-danger text-decoration-none">Delete</Link></Card.Footer>
                </Card>
              </Col>
            ))}
        </Row>
      )}
    </>
  );
}

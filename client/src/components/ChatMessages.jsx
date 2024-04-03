import { useEffect, useRef } from "react";
import { Card, Image } from "react-bootstrap";
import { FaRobot } from "react-icons/fa6";

export default function ChatMessages({
  isLoading,
  user,
  newQuestion,
  messages,
  previousMessagesLoading,
}) {
  const container = useRef(null);

  useEffect(() => {
    if (container.current) {
      container.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, newQuestion]);

  return (
    <Card.Body className="bg-white scroll">
      {/* Show a loading message while waiting
       for previous thread messages */}
      {previousMessagesLoading ? (
        <div className="text-dark text-center mt-5">Loading messages...</div>
      ) : (
        <Card className="bg-light p-2 mt-2 rounded border-0 shadow-sm">
          <div className="d-flex align-items-center">
            <div className="flex-shrink-0">
              <FaRobot size={40} />
            </div>
            <div className="ms-3">
              Hi, I am Jake, your friendly assistant. Feel free to ask me
              anything about your documents!
            </div>
          </div>
        </Card>
      )}

      {/* If a thread exists, display all previous messages */}
      {messages &&
        messages.map((item, index) => (
          <Card
            className="bg-light p-2 mt-2 rounded border-0 shadow-sm"
            key={index}
          >
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0">
                {item.role === "user" ? (
                  <Image
                    className="rounded-circle"
                    src={user.photoURL ? user.photoURL : "/avatar.png"}
                    alt={user.displayName}
                    width={40}
                    height={40}
                  />
                ) : (
                  <FaRobot size={40} />
                )}
              </div>
              <div className="ms-3">{item.content[0]?.text.value || ""}</div>
            </div>
          </Card>
        ))}

      {/* Display the user's input message right away */}
      {newQuestion && (
        <Card className="bg-light p-2 mt-2 rounded border-0 shadow-sm">
          <div className="d-flex align-items-center">
            <div className="flex-shrink-0">
              <Image
                className="rounded-circle"
                src={user.photoURL ? user.photoURL : "/avatar.png"}
                alt={user.displayName}
                width={40}
                height={40}
              />
            </div>
            <div className="ms-3">{newQuestion}</div>
          </div>
        </Card>
      )}

      {/* Show robot avatar and ellipsis 
loader while waiting for response */}
      {isLoading && (
        <Card className="bg-light p-2 mt-2 rounded border-0 shadow-sm">
          <div className="d-flex align-items-center">
            <div className="flex-shrink-0">
              <FaRobot size={40} />
            </div>
            <div className="lds-ellipsis ms-2">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </Card>
      )}

      {/* Auto scroll to bottom for new message */}
      <div ref={container} />
    </Card.Body>
  );
}

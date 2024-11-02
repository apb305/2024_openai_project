import React from "react";
import { useAuth } from "../context/AuthContext";
import { Container } from "react-bootstrap";
import ChatCards from "../components/ChatCards";

export default function Dashboard() {
  const { currentUser } = useAuth();

  return (
    <Container>
      <div className="mt-5">
        <div className="d-flex justify-content-between align-items-center">
          <p className="mb-0">Welcome, {currentUser.displayName}</p>
        </div>
        <ChatCards />
      </div>
    </Container>
  );
}

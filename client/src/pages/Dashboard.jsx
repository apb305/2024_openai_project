import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Button, Container, Image } from "react-bootstrap";
import ChatCards from "../components/ChatCards";
import instance from "../config/axiosConfig";

export default function Dashboard() {
  const { currentUser } = useAuth();

  return (
    <Container>
      <div className="mt-5">
        <div className="d-flex justify-content-between align-items-center">
          <p className="mb-0">Welcome, {currentUser.displayName}</p>
        </div>
        <ChatCards />
         <Button className="mt-1" onClick={() => {throw new Error("This is your first error!");}}>Break the world</Button>
      </div>
    </Container>
  );
}

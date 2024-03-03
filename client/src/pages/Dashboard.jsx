import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Button, Container, Image } from "react-bootstrap";
import ChatCards from "../components/ChatCards";
import instance from "../config/axiosConfig";

export default function Dashboard() {
  const [chatThreads, setChatThreads] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => { 
    getAllChatThreads();
  } , []);

  console.log(chatThreads);

  const getAllChatThreads = async () => {
    try {
      setLoading(true);
      const token = await currentUser.getIdToken();
      const response = await instance.get("/api/chats/all", {
        params: {
          uid: currentUser.uid,
        },
        headers: { Authorization: `Bearer ${token}` },
      });
      setChatThreads(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
   }

  return (
    <Container>
      <div className="mt-5">
        <div className="d-flex justify-content-between align-items-center">
          <p className="mb-0">Welcome, {currentUser.displayName}</p>
        </div>
        {/* <Image src={currentUser.photoURL} roundedCircle /> */}
        <ChatCards chatThreads={chatThreads} loading={loading} />
      </div>
    </Container>
  );
}

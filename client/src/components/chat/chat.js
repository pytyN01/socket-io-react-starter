import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import queryString from "query-string";
import io from "socket.io-client";
import Navbar from "../chat/navbar";
import Messages from "./messages";
import Input from "./input";
let socket = "";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));

const Chat = ({ location }) => {
  const styles = useStyles();
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "https://socket-io-starter.herokuapp.com/";
  const QUERY = location.search;

  useEffect(() => {
    const { name, room } = queryString.parse(QUERY);
    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, error => {
      if (error) {
        alert(error, users);
      }
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
    // eslint-disable-next-line
  }, [ENDPOINT, QUERY]);

  useEffect(() => {
    socket.on("message", message => {
      setMessages(messages => [...messages, message]);
    });
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
    // eslint-disable-next-line
  }, []);

  const sendMessage = event => {
    event.preventDefault();
    if (message) socket.emit("sendMessage", message, () => setMessage(""));
  };

  return (
    <div className={styles.root}>
      <Navbar room={room} name={name} />
      <Messages messages={messages} name={name} />
      <Input
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default Chat;

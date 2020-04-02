import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./message";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  messages: {
    overflow: "auto",
    flex: "auto"
  }
});

export default function Messages({ messages, name }) {
  const styles = useStyles();
  return (
    <ScrollToBottom className={styles.messages}>
      {messages.map((message, index) => (
        <Message key={index} message={message} name={name} />
      ))}
    </ScrollToBottom>
  );
}

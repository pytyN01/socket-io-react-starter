import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import SendIcon from "@material-ui/icons/Send";
import React from "react";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "2% 0",
    position: "absolute",
    alignItems: "center",
    display: "flex",
    width: "100%",
    bottom: 0,
    backgroundColor: theme.palette.background.paper
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10,
    paddingRight: 20
  },
  divider: {
    height: 28,
    margin: 4
  }
}));

export default function Input({ message, setMessage, sendMessage }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <InputBase
        value={message}
        onChange={event => setMessage(event.target.value)}
        onKeyPress={event =>
          event.key === "Enter" ? sendMessage(event) : null
        }
        className={classes.input}
        placeholder="Say something..."
      />
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="message"
        onClick={event => sendMessage(event)}
      >
        <SendIcon />
      </IconButton>
    </div>
  );
}

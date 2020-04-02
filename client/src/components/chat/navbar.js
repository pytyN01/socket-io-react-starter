import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Drawer from "./drawer";
import React from "react";

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginLeft: theme.spacing(2)
  },
  backButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  avatar: {
    marginTop: theme.spacing(1)
  }
}));

export default function Navbar({ room, name }) {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          className={classes.backButton}
          color="inherit"
          aria-label="menu"
          href="/"
        >
          <KeyboardBackspaceIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Room: {room}
        </Typography>
        <Avatar className={classes.avatar}>
          {name.slice(0, 1).toUpperCase()}
        </Avatar>
      </Toolbar>
      <Toolbar variant="dense">
        <Typography variant="h6" gutterBottom noWrap className={classes.title}>
          User 1, User 2, User 3, User 4, User 5
        </Typography>
        <Drawer />
      </Toolbar>
    </AppBar>
  );
}

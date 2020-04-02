import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ReactEmoji from "react-emoji";

export default function Message({ message: { user, text }, name }) {
  let sentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();
  const firstLetter = user
    .trim()
    .slice(0, 1)
    .toUpperCase();

  if (user === trimmedName) {
    sentByCurrentUser = true;
  }
  return (
    <List>
      {sentByCurrentUser ? (
        <React.Fragment>
          <ListItem>
            <ListItemText
              primary={ReactEmoji.emojify(text)}
              secondary={` — ${trimmedName}`}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar>{firstLetter}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={ReactEmoji.emojify(text)}
              secondary={` — ${user}`}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      )}
    </List>
  );
}

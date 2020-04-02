import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { Link } from "react-router-dom";
import React, { useState } from "react";

const useStyles = makeStyles({
  container: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  card: {
    minWidth: 300
  },
  input: {
    marginTop: "5%"
  },
  button: {
    marginTop: "10%",
    marginBottom: "5%"
  }
});

const Join = () => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const joinChat = e => {
    if (!name || !room) e.preventDefault();
  };

  return (
    <div className={classes.container}>
      <Card elevation={24} className={classes.card}>
        <CardContent>
          <Typography align="center" variant="h5">
            Join the conversation!!
          </Typography>
        </CardContent>
        <CardActions>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <TextField
                onChange={event => setName(event.target.value)}
                className={classes.input}
                id="name"
                label="Name"
                variant="filled"
                color="secondary"
              />
            </Grid>
            <Grid item>
              <TextField
                onChange={event => setRoom(event.target.value)}
                className={classes.input}
                id="room"
                label="Room"
                variant="filled"
                color="secondary"
              />
            </Grid>
            <Grid item className={classes.button}>
              <Button
                component={Link}
                onClick={() => joinChat}
                to={`/chat?name=${name}&room=${room}`}
                variant="contained"
                color="secondary"
              >
                Enter
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </div>
  );
};

export default Join;

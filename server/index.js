const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

const { addUser, removeUser, getUser, getUserByRoom } = require("./users");

const router = require("./router");

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

io.on("connect", socket => {
  socket.on("join", ({ name, room }, callBack) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callBack(error);

    socket.join(user.room);

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to room ${user.room}!`
    });

    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.name}, has joined the chat!`
    });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUserByRoom(user.room)
    });

    callBack();
  });

  socket.on("sendMessage", (message, callBack) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });

    callBack();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socketio.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left the chat.`
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUserByRoom(user.room)
      });
    }
  });
});

server.listen(PORT, () => console.log(`Server Active On Port:${PORT}`));

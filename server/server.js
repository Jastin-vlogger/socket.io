const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors()); // Add cors middleware

const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("Hello world");
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

let chatRoom = "";
let allUsers = [];
let CHAT_BOT = "CHAT_BOT";

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on("join_room", (data) => {
    const { username, room } = data;
    socket.join(room);

    const time = Date.now();
    console.log(time);
    socket.to(room).emit("receive_message", {
      message: `${username} has joined the chat room`,
      time,
    });
    socket.emit("receive_message", {
      message: `Welcome ${username}`,
      username: CHAT_BOT,
      time,
    });

    chatRoom = room;
    allUsers.push({ id: socket.id, username, room });
    chatRoomUsers = allUsers.filter((user) => user.room === room);
    socket.to(room).emit("chatroom_users", chatRoomUsers);
    socket.emit("chatroom_users", chatRoomUsers);
  });
  socket.on("send_message", (data) => {
    console.log(data);
    const { message, username, room, __createdtime__ } = data;
    io.in(room).emit("receive_message", data);
  });
  //   socket.on("send_message", (data) => {
  //     try {
  //       // Code that might throw an error
  //       const { message, username, room, __createdtime__ } = data;
  //       io.in(room).emit("receive_message", data);
  //     } catch (error) {
  //       console.log(error);
  //     }
});

server.listen(4000, () => "Server is running on port 4000");

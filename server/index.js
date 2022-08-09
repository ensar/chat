const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

let onlineUsers = [];
const channels = [
  {
    channelId: "Qb4iMlXkL8",
    name: "Music",
    img: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
  },
  {
    channelId: "f20VDA0S5n",
    name: "English",
    img: "https://bizenglish.com.tr/wp-content/uploads/2020/02/English-Desk.jpg",
  },
];

io.on("connection", (socket) => {
  socket.on("login", (name) => {
    if (!onlineUsers.some((u) => Object.keys(u)[0].toString() == socket.id)) {
      onlineUsers.push({ [socket.id]: name });
    }
    /*const user = onlineUsers.find(
      (u) => Object.keys(u)[0].toString() == socket.id
    );*/

    io.emit("users", {
      onlineUsers,
    });
    socket.emit("get-channels", { channels: channels });
  });

  socket.on("join-channel", (arg) => {
    socket.join(arg.channel.channelId);
    socket.to(arg.channel.channelId).emit("message", {
      user: "bot",
      message: `${arg.user} joined the chat!`,
    });
  });

  socket.on("send-message", (arg) => {
    io.to(arg.channelId).emit("message", {
      user: arg.user,
      message: arg.message,
    });
  });

  socket.on("disconnect", () => {
    let filtered = onlineUsers.filter(
      (user) => Object.keys(user)[0].toString() != socket.id
    );
    io.emit("users", {
      onlineUsers: filtered,
    });

    console.log("an user disconnected");
  });
});

httpServer.listen(process.env.PORT, () => {
  console.log("server is running");
});

const { io } = require("socket.io-client");

const socket = io("http://localhost:4000");

socket.on("connect_error", (error) => {
  console.log(error.message);
});